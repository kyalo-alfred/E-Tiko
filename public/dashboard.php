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

$users = User::all(100);
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Dashboard</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" rel="stylesheet" />
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">IAP Ticketing</a>
			<div class="d-flex">
				<a class="btn btn-outline-light" href="<?php echo APP_BASE_URL; ?>/export-users.php">Export Users CSV</a>
				<a class="btn btn-danger ms-2" href="<?php echo APP_BASE_URL; ?>/logout.php">Logout</a>
			</div>
		</div>
	</nav>
	<div class="container py-4">
		<h3 class="mb-3">Users</h3>
		<div class="table-responsive">
			<table id="usersTable" class="table table-striped table-bordered">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Role</th>
						<th>2FA</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					<?php foreach ($users as $u): ?>
					<tr>
						<td><?php echo (int)$u['user_id']; ?></td>
						<td><?php echo htmlspecialchars($u['full_name']); ?></td>
						<td><?php echo htmlspecialchars($u['email']); ?></td>
						<td><?php echo htmlspecialchars((string)$u['phone']); ?></td>
						<td><?php echo (int)$u['role_id'] === 1 ? 'Organizer' : 'Attendee'; ?></td>
						<td><?php echo !empty($u['two_fa_enabled']) ? 'Enabled' : 'Disabled'; ?></td>
						<td><?php echo htmlspecialchars($u['created_at']); ?></td>
					</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</div>
	<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
	<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
	<script>
		$(function(){
			$('#usersTable').DataTable();
		});
	</script>
</body>
</html>
