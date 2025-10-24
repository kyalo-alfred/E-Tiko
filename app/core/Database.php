<?php
class Database {
	private static ?PDO $instance = null;

	public static function getConnection(): PDO {
		if (self::$instance === null) {
			$dsn = 'mysql:host=' . APP_DB_HOST . ';dbname=' . APP_DB_NAME . ';charset=utf8mb4';
			$options = [
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
				PDO::ATTR_EMULATE_PREPARES => false,
			];
			self::$instance = new PDO($dsn, APP_DB_USER, APP_DB_PASS, $options);
		}
		return self::$instance;
	}
}
?>
