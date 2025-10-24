<?php
require_once __DIR__ . '/../app/config/config.php';
require_once __DIR__ . '/../app/helpers/Session.php';
require_once __DIR__ . '/../app/core/Database.php';
require_once __DIR__ . '/../app/models/User.php';

Session::start();

$userId = Session::get('user_id');
if (!$userId) {
	header('Location: ' . APP_BASE_URL . '/login.php');
	exit;
}

$users = User::all(10000);

header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="users_export.csv"');
$out = fopen('php://output', 'w');
fputcsv($out, ['user_id', 'full_name', 'email', 'phone', 'role_id', 'two_fa_enabled', 'created_at']);
foreach ($users as $u) {
	fputcsv($out, [
		$u['user_id'],
		$u['full_name'],
		$u['email'],
		$u['phone'],
		$u['role_id'],
		$u['two_fa_enabled'] ? 1 : 0,
		$u['created_at'],
	]);
}
fclose($out);
exit;
