<?php
require_once __DIR__ . '/../app/config/config.php';
require_once __DIR__ . '/../app/helpers/Session.php';
require_once __DIR__ . '/../app/core/Database.php';
require_once __DIR__ . '/../app/models/User.php';
require_once __DIR__ . '/../app/services/AuthService.php';

Session::start();

$error = '';
$success = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$fullName = trim($_POST['full_name'] ?? '');
	$email = trim($_POST['email'] ?? '');
	$phone = trim($_POST['phone'] ?? '');
	$password = trim($_POST['password'] ?? '');
	try {
		AuthService::register($fullName, $email, $phone ?: null, $password);
		$success = 'Registration successful. Please login.';
	} catch (Throwable $e) {
		$error = $e->getMessage();
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<title>Register</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
	<div class="container py-5">
		<div class="row justify-content-center">
			<div class="col-md-5">
				<div class="card shadow-sm">
					<div class="card-body">
						<h5 class="card-title mb-3">Create Account</h5>
						<?php if ($error): ?>
							<div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
						<?php endif; ?>
						<?php if ($success): ?>
							<div class="alert alert-success"><?php echo htmlspecialchars($success); ?></div>
						<?php endif; ?>
						<form method="post">
							<div class="mb-3">
								<label class="form-label">Full Name</label>
								<input type="text" name="full_name" class="form-control" required />
							</div>
							<div class="mb-3">
								<label class="form-label">Email</label>
								<input type="email" name="email" class="form-control" required />
							</div>
							<div class="mb-3">
								<label class="form-label">Phone (optional)</label>
								<input type="text" name="phone" class="form-control" />
							</div>
							<div class="mb-3">
								<label class="form-label">Password</label>
								<input type="password" name="password" class="form-control" required />
							</div>
							<button class="btn btn-primary w-100" type="submit">Register</button>
							<div class="mt-3 text-center">
								<a href="<?php echo APP_BASE_URL; ?>/login.php">Back to Login</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
