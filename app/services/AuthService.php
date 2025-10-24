<?php
class AuthService {
	public static function register(string $fullName, string $email, ?string $phone, string $password): int {
		if (User::findByEmail($email)) {
			throw new RuntimeException('Email already registered');
		}
		return User::create($fullName, $email, $phone, $password);
	}

	public static function login(string $email, string $password): array {
		$user = User::findByEmail($email);
		if (!$user) {
			throw new RuntimeException('Invalid credentials');
		}
		if (!User::verifyPassword($password, $user['password_hash'])) {
			throw new RuntimeException('Invalid credentials');
		}
		// If 2FA enabled, generate OTP and require verification
		if (!empty($user['two_fa_enabled'])) {
			$otp = random_int(100000, 999999);
			Session::set('pending_user_id', (int)$user['user_id']);
			Session::set('otp_code', (string)$otp);
			Session::set('otp_expires_at', time() + APP_2FA_EXPIRY_SECONDS);
			// Send OTP via email
			try {
				require_once APP_BASE_PATH . '/vendor/autoload.php';
				require_once __DIR__ . '/MailService.php';
				MailService::sendOtp($user['email'], $user['full_name'], (string)$otp);
			} catch (Throwable $e) {
				// In class/demo, allow fallback to on-screen display
			}
			return ['requires_2fa' => true, 'otp' => APP_DEBUG_SHOW_OTP ? $otp : null];
		}
		self::establishSession((int)$user['user_id']);
		return ['requires_2fa' => false];
	}

	public static function verifyOtp(string $code): void {
		$pendingUserId = Session::get('pending_user_id');
		$otp = Session::get('otp_code');
		$exp = Session::get('otp_expires_at');
		if (!$pendingUserId || !$otp || !$exp) {
			throw new RuntimeException('No OTP in progress');
		}
		if (time() > $exp) {
			throw new RuntimeException('OTP expired');
		}
		if (trim($code) !== (string)$otp) {
			throw new RuntimeException('Invalid OTP');
		}
		self::clearOtp();
		self::establishSession((int)$pendingUserId);
	}

	private static function establishSession(int $userId): void {
		Session::set('user_id', $userId);
	}

	public static function logout(): void {
		self::clearOtp();
		Session::destroy();
	}

	private static function clearOtp(): void {
		Session::remove('pending_user_id');
		Session::remove('otp_code');
		Session::remove('otp_expires_at');
	}
}
?>
