<?php
class Session {
	public static function start(): void {
		if (session_status() === PHP_SESSION_NONE) {
			session_name(APP_SESSION_NAME);
			session_start();
		}
	}

	public static function set(string $key, $value): void {
		$_SESSION[$key] = $value;
	}

	public static function get(string $key, $default = null) {
		return $_SESSION[$key] ?? $default;
	}

	public static function remove(string $key): void {
		unset($_SESSION[$key]);
	}

	public static function destroy(): void {
		if (session_status() !== PHP_SESSION_NONE) {
			$_SESSION = [];
			if (ini_get('session.use_cookies')) {
				$params = session_get_cookie_params();
				setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
			}
			session_destroy();
		}
	}
}
?>
