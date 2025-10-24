<?php
class User {
	public int $user_id;
	public int $role_id;
	public string $full_name;
	public string $email;
	public ?string $phone;
	public string $password_hash;
	public bool $two_fa_enabled;
	public string $created_at;

	public static function findByEmail(string $email): ?array {
		$db = Database::getConnection();
		$stmt = $db->prepare('SELECT * FROM Users WHERE email = ? LIMIT 1');
		$stmt->execute([$email]);
		$row = $stmt->fetch();
		return $row ?: null;
	}

	public static function create(string $fullName, string $email, ?string $phone, string $password, int $roleId = 2): int {
		$db = Database::getConnection();
		$hash = password_hash($password, PASSWORD_BCRYPT);
		$stmt = $db->prepare('INSERT INTO Users (role_id, full_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)');
		$stmt->execute([$roleId, $fullName, $email, $phone, $hash]);
		return (int)$db->lastInsertId();
	}

	public static function verifyPassword(string $password, string $hash): bool {
		return password_verify($password, $hash);
	}

	public static function all(int $limit = 100): array {
		$db = Database::getConnection();
		$stmt = $db->prepare('SELECT user_id, full_name, email, phone, role_id, two_fa_enabled, created_at FROM Users ORDER BY user_id DESC LIMIT ?');
		$stmt->bindValue(1, $limit, PDO::PARAM_INT);
		$stmt->execute();
		return $stmt->fetchAll();
	}
}
?>
