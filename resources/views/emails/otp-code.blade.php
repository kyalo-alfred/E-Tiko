<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OTP Code</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Your Verification Code</h2>
        <p>Hello {{ $userName }},</p>
        <p>Your two-factor authentication code is:</p>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; border: 2px solid #dee2e6; border-radius: 5px; margin: 20px 0;">
            {{ $otp }}
        </div>
        <p>This code will expire in 5 minutes.</p>
        <p>If you didn't request this code, please ignore this email.</p>
        <hr>
        <p style="color: #6c757d; font-size: 12px;">
            This is an automated message from IAP Ticketing System.
        </p>
    </div>
</body>
</html>
