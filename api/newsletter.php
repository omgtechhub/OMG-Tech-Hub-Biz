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

require_once dirname(__DIR__) . '/includes/config.php';
require_once dirname(__DIR__) . '/includes/db.php';
require_once dirname(__DIR__) . '/includes/mail_config.php';
require_once dirname(__DIR__) . '/vendor/phpmailer/src/Exception.php';
require_once dirname(__DIR__) . '/vendor/phpmailer/src/PHPMailer.php';
require_once dirname(__DIR__) . '/vendor/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// ── Parse & validate ─────────────────────────────────────────────────────────
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) $input = $_POST;

$email = trim(strtolower($input['email'] ?? ''));

if (!$email) {
    ob_end_clean();
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Email address is required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    ob_end_clean();
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please enter a valid email address.']);
    exit;
}

// ── Duplicate check ──────────────────────────────────────────────────────────
$data        = omg_read_json(NEWSLETTER_FILE);
$subscribers = $data['subscribers'] ?? [];

foreach ($subscribers as $sub) {
    if (strtolower($sub['email'] ?? '') === $email) {
        ob_end_clean();
        echo json_encode(['ok' => true, 'already' => true]);
        exit;
    }
}

// ── Save subscriber ──────────────────────────────────────────────────────────
$subscribers[] = [
    'email'      => $email,
    'subscribed' => date('c'),
];
$data['subscribers'] = $subscribers;
omg_write_json(NEWSLETTER_FILE, $data);

// ── Build emails ─────────────────────────────────────────────────────────────
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

$attempts = [
    [PHPMailer::ENCRYPTION_SMTPS,    465],
    [PHPMailer::ENCRYPTION_STARTTLS, 587],
];

// ── 1. Confirmation email to subscriber ──────────────────────────────────────
$confirmHtml = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'><meta name='viewport' content='width=device-width,initial-scale=1'></head>
<body style='margin:0;padding:0;background:#f4f4f4;font-family:Inter,Arial,sans-serif'>
  <div style='max-width:600px;margin:32px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)'>
    <div style='background:#e63322;padding:40px 48px'>
      <img src='https://omgtechhub.great-site.net/images/logo-dark.png' alt='OMG Tech Hub' style='height:36px;width:auto;margin-bottom:20px;display:block' />
      <h1 style='margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.02em'>You're in the loop.</h1>
      <p style='margin:10px 0 0;color:rgba(255,255,255,0.85);font-size:15px'>Welcome to the OMG Tech Hub newsletter.</p>
    </div>
    <div style='padding:40px 48px'>
      <p style='color:#333;font-size:15px;line-height:1.7;margin:0 0 20px'>
        Hey there — thanks for subscribing! You'll now get our latest articles, case studies, design insights, and agency news delivered straight to your inbox.
      </p>
      <p style='color:#333;font-size:15px;line-height:1.7;margin:0 0 32px'>
        We only send content worth reading — no spam, no fluff. Just the good stuff.
      </p>
      <div style='text-align:center;margin-bottom:36px'>
        <a href='https://omgtechhub.great-site.net/blog' style='display:inline-block;background:#e63322;color:#ffffff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:0.01em'>Browse the Blog →</a>
      </div>
      <div style='background:#f9f9f9;border-radius:10px;padding:20px 24px'>
        <p style='margin:0 0 10px;color:#555;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em'>Follow us</p>
        <div style='display:flex;gap:12px;flex-wrap:wrap'>
          <a href='https://www.instagram.com/omigiedavid' style='color:#e63322;font-size:13px;text-decoration:none'>Instagram</a>
          <span style='color:#ddd'>·</span>
          <a href='https://x.com/OMGTechHub' style='color:#e63322;font-size:13px;text-decoration:none'>X (Twitter)</a>
          <span style='color:#ddd'>·</span>
          <a href='https://www.linkedin.com/in/david-omigie-2b0644353' style='color:#e63322;font-size:13px;text-decoration:none'>LinkedIn</a>
        </div>
      </div>
    </div>
    <div style='padding:20px 48px;background:#f9f9f9;border-top:1px solid #eee;text-align:center'>
      <p style='margin:0;color:#aaa;font-size:12px'>OMG Tech Hub · Benin City, Edo State, Nigeria</p>
      <p style='margin:6px 0 0;color:#ccc;font-size:11px'>You're receiving this because you subscribed at omgtechhub.great-site.net</p>
    </div>
  </div>
</body>
</html>";

$sentConfirm = false;
foreach ($attempts as [$secure, $port]) {
    try {
        $mail = buildMailer($secure, $port);
        $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = 'Welcome to OMG Tech Hub — You\'re subscribed!';
        $mail->Body    = $confirmHtml;
        $mail->AltBody = "Thanks for subscribing to the OMG Tech Hub newsletter!\n\nYou'll receive our latest articles, case studies, and agency news in your inbox.\n\nVisit the blog: https://omgtechhub.great-site.net/blog\n\n— David Omigie, OMG Tech Hub";
        $mail->send();
        $sentConfirm = true;
        break;
    } catch (Exception $e) {
        // try next port
    }
}

// ── 2. Notification email to site owner ──────────────────────────────────────
$totalCount  = count($subscribers);
$notifyHtml  = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='margin:0;padding:0;background:#f4f4f4;font-family:Inter,Arial,sans-serif'>
  <div style='max-width:600px;margin:32px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)'>
    <div style='background:#1a1a1a;padding:28px 40px;display:flex;align-items:center;gap:16px'>
      <div style='width:40px;height:40px;background:#e63322;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0'>
        <span style='color:#fff;font-size:18px;font-weight:800'>✉</span>
      </div>
      <div>
        <h1 style='margin:0;color:#ffffff;font-size:16px;font-weight:700'>New Newsletter Subscriber</h1>
        <p style='margin:4px 0 0;color:#888;font-size:13px'>OMG Tech Hub</p>
      </div>
    </div>
    <div style='padding:32px 40px'>
      <table style='width:100%;border-collapse:collapse'>
        <tr>
          <td style='padding:10px 0;color:#888;font-size:13px;width:120px'>Email</td>
          <td style='padding:10px 0'><a href='mailto:{$email}' style='color:#e63322;font-size:14px;font-weight:600'>{$email}</a></td>
        </tr>
        <tr>
          <td style='padding:10px 0;color:#888;font-size:13px'>Subscribed at</td>
          <td style='padding:10px 0;color:#1a1a1a;font-size:14px'>" . date('D, d M Y · H:i T') . "</td>
        </tr>
        <tr>
          <td style='padding:10px 0;color:#888;font-size:13px'>Total subscribers</td>
          <td style='padding:10px 0;color:#1a1a1a;font-size:14px;font-weight:700'>{$totalCount}</td>
        </tr>
      </table>
    </div>
    <div style='padding:20px 40px;background:#f9f9f9;border-top:1px solid #eee;text-align:center'>
      <p style='margin:0;color:#aaa;font-size:12px'>OMG Tech Hub · Benin City, Edo State, Nigeria</p>
    </div>
  </div>
</body>
</html>";

$sentNotify = false;
foreach ($attempts as [$secure, $port]) {
    try {
        $mail = buildMailer($secure, $port);
        $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
        $mail->addAddress(MAIL_TO);
        $mail->isHTML(true);
        $mail->Subject = "New subscriber: {$email} | OMG Tech Hub";
        $mail->Body    = $notifyHtml;
        $mail->AltBody = "New newsletter subscriber: {$email}\nTotal subscribers: {$totalCount}\nDate: " . date('D, d M Y H:i T');
        $mail->send();
        $sentNotify = true;
        break;
    } catch (Exception $e) {
        // try next port
    }
}

ob_end_clean();
echo json_encode([
    'ok'    => true,
    'debug' => ['confirm' => $sentConfirm, 'notify' => $sentNotify],
]);
