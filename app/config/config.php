<?php
// Basic configuration

define('APP_BASE_PATH', dirname(__DIR__, 2));

define('APP_DB_HOST', '127.0.0.1');
define('APP_DB_NAME', 'event_system');
define('APP_DB_USER', 'root');
// Set your local MySQL password
define('APP_DB_PASS', 'emma3');

define('APP_BASE_URL', '/Ticketing_system/Cursor/public');

define('APP_SESSION_NAME', 'iap_session');

define('APP_2FA_EXPIRY_SECONDS', 300); // 5 minutes

// SMTP settings for PHPMailer (use Gmail SMTP or school SMTP)
// For Gmail: enable 2-Step Verification and create an App Password
// Never commit real secrets publicly
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587); // TLS
define('SMTP_USERNAME', 'emmaogwayo@gmail.com');
define('SMTP_PASSWORD', 'zxdt atdr lukf mabb');
define('SMTP_FROM_EMAIL', 'emmaogwayo@gmail.com');
define('SMTP_FROM_NAME', 'E-Tiko');

// If true, also display OTP on-screen for classroom demos
define('APP_DEBUG_SHOW_OTP', true);
?>
