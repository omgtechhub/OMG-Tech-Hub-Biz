<?php
ob_start();
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    ob_end_clean();
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    ob_end_clean();
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once dirname(__DIR__) . '/includes/mail_config.php';
require_once dirname(__DIR__) . '/vendor/phpmailer/src/Exception.php';
require_once dirname(__DIR__) . '/vendor/phpmailer/src/PHPMailer.php';
require_once dirname(__DIR__) . '/vendor/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// ── Parse input ─────────────────────────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) $input = $_POST;

function clean($v) {
    return htmlspecialchars(strip_tags(trim($v ?? '')));
}

$name       = clean($input['name']       ?? '');
$email      = clean($input['email']      ?? '');
$company    = clean($input['company']    ?? '');
$service    = clean($input['service']    ?? '');
$budget     = clean($input['budget']     ?? '');
$message    = clean($input['message']    ?? '');
$newsletter = !empty($input['newsletter']) ? 'Yes' : 'No';

// ── Validate ─────────────────────────────────────────────────────
if (!$name || !$email || !$service || !$budget || !$message) {
    ob_end_clean();
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    ob_end_clean();
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

// ── Label maps ───────────────────────────────────────────────────
$serviceLabels = [
    'brand'      => 'Brand Identity Design',
    'graphic'    => 'Graphic Design',
    'uiux'       => 'UI/UX Design',
    'web'        => 'Web Development',
    'video'      => 'Video Editing',
    'motion'     => 'Motion Graphics',
    'animation'  => 'Animation',
    'product'    => 'Digital Product Design',
    'consulting' => 'Creative Consulting',
    'multiple'   => 'Multiple Services',
    'other'      => 'Other',
];

$serviceLabel = $serviceLabels[$service] ?? $service;
$budgetLabel  = $budget;

// ── Build HTML email body ────────────────────────────────────────
$companyRow   = $company ? "<tr><td style='padding:6px 0;color:#888;font-size:13px;width:120px'>Company</td><td style='padding:6px 0;color:#1a1a1a;font-size:14px'>{$company}</td></tr>" : '';
$htmlBody = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='margin:0;padding:0;background:#f4f4f4;font-family:Inter,Arial,sans-serif'>
  <div style='max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)'>
    <div style='background:#e63322;padding:32px 40px'>
      <h1 style='margin:0;color:#ffffff;font-size:22px;font-weight:700'>New Enquiry — OMG Tech Hub</h1>
      <p style='margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px'>From the website contact form</p>
    </div>
    <div style='padding:36px 40px'>
      <h2 style='margin:0 0 16px;color:#1a1a1a;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em'>Contact Details</h2>
      <table style='width:100%;border-collapse:collapse;margin-bottom:28px'>
        <tr><td style='padding:6px 0;color:#888;font-size:13px;width:120px'>Name</td><td style='padding:6px 0;color:#1a1a1a;font-size:14px;font-weight:600'>{$name}</td></tr>
        <tr><td style='padding:6px 0;color:#888;font-size:13px'>Email</td><td style='padding:6px 0'><a href='mailto:{$email}' style='color:#e63322;font-size:14px'>{$email}</a></td></tr>
        {$companyRow}
      </table>

      <h2 style='margin:0 0 16px;color:#1a1a1a;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em'>Project Details</h2>
      <table style='width:100%;border-collapse:collapse;margin-bottom:28px'>
        <tr><td style='padding:6px 0;color:#888;font-size:13px;width:120px'>Service</td><td style='padding:6px 0;color:#1a1a1a;font-size:14px'>{$serviceLabel}</td></tr>
        <tr><td style='padding:6px 0;color:#888;font-size:13px'>Budget</td><td style='padding:6px 0;color:#1a1a1a;font-size:14px'>{$budgetLabel}</td></tr>
        <tr><td style='padding:6px 0;color:#888;font-size:13px'>Newsletter</td><td style='padding:6px 0;color:#1a1a1a;font-size:14px'>{$newsletter}</td></tr>
      </table>

      <h2 style='margin:0 0 12px;color:#1a1a1a;font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em'>Message</h2>
      <div style='background:#f9f9f9;border-left:3px solid #e63322;border-radius:4px;padding:16px 20px;color:#333;font-size:14px;line-height:1.7'>{$message}</div>

      <div style='margin-top:32px;padding-top:24px;border-top:1px solid #eee;text-align:center'>
        <a href='mailto:{$email}' style='display:inline-block;background:#e63322;color:#ffffff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:8px;text-decoration:none'>Reply to {$name}</a>
      </div>
    </div>
    <div style='padding:20px 40px;background:#f9f9f9;border-top:1px solid #eee;text-align:center'>
      <p style='margin:0;color:#aaa;font-size:12px'>OMG Tech Hub · Benin City, Edo State, Nigeria</p>
    </div>
  </div>
</body>
</html>";

// ── Send via PHPMailer ───────────────────────────────────────────
function buildMailer($secure, $port) {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = MAIL_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = MAIL_USERNAME;
    $mail->Password   = MAIL_PASSWORD;
    $mail->SMTPSecure = $secure;
    $mail->Port       = $port;
    $mail->CharSet    = 'UTF-8';
    return $mail;
}

$sent = false;
$attempts = [
    [PHPMailer::ENCRYPTION_SMTPS,    465],
    [PHPMailer::ENCRYPTION_STARTTLS, 587],
];

foreach ($attempts as [$secure, $port]) {
    try {
        $mail = buildMailer($secure, $port);
        $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
        $mail->addAddress(MAIL_TO);
        $mail->addReplyTo($email, $name);
        $mail->isHTML(true);
        $mail->Subject = "New Enquiry from {$name} | OMG Tech Hub";
        $mail->Body    = $htmlBody;
        $mail->AltBody = "New enquiry from {$name} ({$email})\nService: {$serviceLabel}\nBudget: {$budgetLabel}\n\nMessage:\n{$message}";
        $mail->send();
        $sent = true;
        break;
    } catch (Exception $e) {
        // try next port
    }
}

ob_end_clean();
if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Failed to send your message. Please reach us directly via WhatsApp or email.']);
}
