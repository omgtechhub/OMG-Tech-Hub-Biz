<?php
require_once __DIR__ . '/env_loader.php';

// Gmail SMTP credentials for PHPMailer
// Loaded from env/.env (or environment variables)

define('MAIL_HOST',      omg_env('MAIL_HOST') ?: 'smtp.gmail.com');
define('MAIL_PORT',      (int)(omg_env('MAIL_PORT') ?: 587));
define('MAIL_USERNAME',  omg_env('MAIL_USERNAME') ?: 'omgtechhub@gmail.com');
define('MAIL_PASSWORD',  omg_env('MAIL_PASSWORD') ?: '');
define('MAIL_FROM',      omg_env('MAIL_FROM') ?: 'omgtechhub@gmail.com');
define('MAIL_FROM_NAME', omg_env('MAIL_FROM_NAME') ?: 'OMG Tech Hub');
define('MAIL_TO',        omg_env('MAIL_TO') ?: 'omgtechhub@gmail.com');
