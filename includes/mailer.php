<?php
/**
 * OMG Tech Hub — Mailer
 * Sends HTML email via PHP mail(), always saves to contacts.json as backup.
 */

function send_contact_email(array $data): bool {
    $to      = SITE_EMAIL;
    $name    = htmlspecialchars($data['name']    ?? '');
    $email   = htmlspecialchars($data['email']   ?? '');
    $phone   = htmlspecialchars($data['phone']   ?? 'N/A');
    $company = htmlspecialchars($data['company'] ?? 'N/A');
    $service = htmlspecialchars($data['service'] ?? 'N/A');
    $budget  = htmlspecialchars($data['budget']  ?? 'N/A');
    $message = nl2br(htmlspecialchars($data['message'] ?? ''));
    $start   = htmlspecialchars($data['start_date'] ?? 'N/A');
    $end     = htmlspecialchars($data['end_date']   ?? 'N/A');
    $source  = htmlspecialchars($data['how_found']  ?? 'N/A');

    $subject = "New Project Enquiry from $name — " . SITE_NAME;

    $html = <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;margin:0;padding:32px 0}
  .wrap{max-width:580px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .header{background:#7A0D0D;padding:32px 40px;text-align:center}
  .header h1{color:#F5B301;font-size:1.8rem;margin:0;letter-spacing:-.04em}
  .header p{color:rgba(255,255,255,.7);font-size:.85rem;margin:6px 0 0}
  .body{padding:40px}
  .row{display:flex;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #f0f0f0}
  .row:last-child{border-bottom:none}
  .label{font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7A0D0D;width:140px;flex-shrink:0}
  .val{font-size:.92rem;color:#333;line-height:1.6}
  .message-box{background:#fafafa;border:1px solid #e8e8e8;border-radius:10px;padding:20px;margin-top:8px;color:#444;line-height:1.75;font-size:.92rem}
  .footer{background:#f9f9f9;padding:20px 40px;text-align:center;font-size:.78rem;color:#999;border-top:1px solid #eee}
  .btn{display:inline-block;padding:12px 28px;background:#7A0D0D;color:#fff;border-radius:50px;text-decoration:none;font-weight:700;font-size:.88rem;margin-top:24px}
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <h1>OMG.Tech Hub</h1>
    <p>New Project Enquiry</p>
  </div>
  <div class="body">
    <div class="row"><span class="label">Name</span><span class="val">$name</span></div>
    <div class="row"><span class="label">Email</span><span class="val"><a href="mailto:$email">$email</a></span></div>
    <div class="row"><span class="label">Phone</span><span class="val">$phone</span></div>
    <div class="row"><span class="label">Company</span><span class="val">$company</span></div>
    <div class="row"><span class="label">Service</span><span class="val">$service</span></div>
    <div class="row"><span class="label">Budget</span><span class="val">$budget</span></div>
    <div class="row"><span class="label">Start Date</span><span class="val">$start</span></div>
    <div class="row"><span class="label">End Date</span><span class="val">$end</span></div>
    <div class="row"><span class="label">Found Via</span><span class="val">$source</span></div>
    <div class="row">
      <span class="label">Message</span>
      <div style="flex:1">
        <div class="message-box">$message</div>
      </div>
    </div>
    <div style="text-align:center">
      <a href="mailto:$email?subject=Re: Your project enquiry" class="btn">Reply to $name →</a>
    </div>
  </div>
  <div class="footer">
    This message was sent via the contact form at <a href="https://omgtechhub.com">omgtechhub.com</a>
  </div>
</div>
</body>
</html>
HTML;

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . SITE_NAME . " <omigiegraphics@gmail.com>\r\n";
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "X-Mailer: OMG-Tech-Hub/1.0\r\n";

    return @mail($to, $subject, $html, $headers);
}

function send_contact_autoresponder(array $data): void {
    $email = $data['email'] ?? '';
    $name  = ucfirst(strtolower($data['name'] ?? 'there'));
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return;

    $subject = "We got your message, $name ✅ — " . SITE_NAME;
    $html = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<style>
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;margin:0;padding:32px 0}
  .wrap{max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .header{background:#0A0A0A;padding:36px 40px;text-align:center}
  .header h1{color:#F5B301;font-size:1.6rem;margin:0;letter-spacing:-.04em}
  .body{padding:40px;color:#444;line-height:1.8;font-size:.95rem}
  .body h2{color:#0A0A0A;font-size:1.2rem;letter-spacing:-.03em;margin-bottom:12px}
  .highlight{color:#7A0D0D;font-weight:700}
  .divider{border:none;border-top:1px solid #f0f0f0;margin:28px 0}
  .btn{display:inline-block;padding:13px 30px;background:#7A0D0D;color:#fff;border-radius:50px;text-decoration:none;font-weight:700;font-size:.9rem}
  .footer{background:#f9f9f9;padding:20px 40px;text-align:center;font-size:.78rem;color:#aaa;border-top:1px solid #eee}
</style>
</head>
<body>
<div class="wrap">
  <div class="header"><h1>OMG.Tech Hub</h1></div>
  <div class="body">
    <h2>Hey $name, we've got your message! 🙌</h2>
    <p>Thank you for reaching out to <span class="highlight">OMG Tech Hub</span>. We've received your project enquiry and our team will review it carefully.</p>
    <p>We typically respond within <strong>24 hours</strong> during business hours (Mon–Fri, 9am–6pm WAT). For urgent projects, don't hesitate to message us directly on WhatsApp.</p>
    <hr class="divider">
    <p>While you wait, feel free to:</p>
    <ul>
      <li>Browse our <a href="https://omgtechhub.com/portfolio.php" style="color:#7A0D0D">portfolio</a> to see what we've been building</li>
      <li>Read our <a href="https://omgtechhub.com/blog.php" style="color:#7A0D0D">blog</a> for design and branding insights</li>
      <li>Check our <a href="https://omgtechhub.com/pricing.php" style="color:#7A0D0D">pricing</a> to understand our packages</li>
    </ul>
    <div style="text-align:center;margin-top:32px">
      <a href="https://wa.me/2347084321204" class="btn">💬 WhatsApp Us Directly</a>
    </div>
  </div>
  <div class="footer">
    OMG Tech Hub · Benin City, Edo State, Nigeria<br>
    <a href="mailto:omigiegraphics@gmail.com" style="color:#bbb">omigiegraphics@gmail.com</a>
  </div>
</div>
</body>
</html>
HTML;

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . SITE_NAME . " <omigiegraphics@gmail.com>\r\n";
    $headers .= "Reply-To: omigiegraphics@gmail.com\r\n";

    @mail($email, $subject, $html, $headers);
}

function send_newsletter_confirm(string $email): void {
    $subject = "You're subscribed to OMG Tech Hub insights ✅";
    $html = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8">
<style>
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f4f4f4;margin:0;padding:32px 0}
  .wrap{max-width:520px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .header{background:#7A0D0D;padding:32px 40px;text-align:center}
  .header h1{color:#F5B301;font-size:1.5rem;margin:0;letter-spacing:-.04em}
  .body{padding:36px 40px;color:#444;line-height:1.8;font-size:.93rem;text-align:center}
  .emoji{font-size:3rem;margin-bottom:16px}
  .footer{background:#f9f9f9;padding:18px 40px;text-align:center;font-size:.75rem;color:#aaa;border-top:1px solid #eee}
</style>
</head>
<body>
<div class="wrap">
  <div class="header"><h1>OMG.Tech Hub</h1></div>
  <div class="body">
    <div class="emoji">🎉</div>
    <h2 style="color:#0A0A0A;font-size:1.15rem;margin-bottom:12px;">You're on the list!</h2>
    <p>You'll now receive our best insights on branding, design, and digital strategy — straight to your inbox. No spam, ever.</p>
  </div>
  <div class="footer">OMG Tech Hub · Benin City, Nigeria</div>
</div>
</body>
</html>
HTML;

    $headers  = "MIME-Version: 1.0\r\nContent-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . SITE_NAME . " <omigiegraphics@gmail.com>\r\n";
    @mail($email, $subject, $html, $headers);
}
