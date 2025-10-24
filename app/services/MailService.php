<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class MailService {
	public static function sendOtp(string $toEmail, string $toName, string $otp): void {
		if (!class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
			throw new RuntimeException('PHPMailer not installed. Run composer require phpmailer/phpmailer');
		}
		$mail = new PHPMailer(true);
		$mail->isSMTP();
		$mail->Host = SMTP_HOST;
		$mail->SMTPAuth = true;
		$mail->Username = SMTP_USERNAME;
		$mail->Password = SMTP_PASSWORD;
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
		$mail->Port = SMTP_PORT;
		$mail->setFrom(SMTP_FROM_EMAIL, SMTP_FROM_NAME);
		$mail->addAddress($toEmail, $toName);
		$mail->isHTML(true);
		$mail->Subject = 'Your 2FA Code';
		$mail->Body = '<p>Your verification code is: <strong>' . htmlspecialchars($otp) . '</strong></p>';
		$mail->AltBody = 'Your verification code is: ' . $otp;
		$mail->send();
	}
}
?>
