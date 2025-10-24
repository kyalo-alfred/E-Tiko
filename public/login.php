<?php
require_once __DIR__ . '/../app/config/config.php';
require_once __DIR__ . '/../app/helpers/Session.php';
require_once __DIR__ . '/../app/core/Database.php';
require_once __DIR__ . '/../app/models/User.php';
require_once __DIR__ . '/../app/services/AuthService.php';

Session::start();

$error = '';
$info = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$email = trim($_POST['email'] ?? '');
	$password = trim($_POST['password'] ?? '');
	try {
		$result = AuthService::login($email, $password);
		if (!empty($result['requires_2fa'])) {
			if (APP_DEBUG_SHOW_OTP && !empty($result['otp'])) {
				$info = 'Enter OTP (also emailed): ' . htmlspecialchars((string)$result['otp']);
			}
			header('Location: ' . APP_BASE_URL . '/verify-2fa.php');
			exit;
		} else {
			header('Location: ' . APP_BASE_URL . '/dashboard.php');
			exit;
		}
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
	<title>Login</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
	<div class="container py-5">
		<div class="row justify-content-center">
			<div class="col-md-4">
				<div class="card shadow-sm">
					<div class="card-body">
						<h5 class="card-title mb-3">Login</h5>
						<?php if ($error): ?>
							<div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
						<?php endif; ?>
						<?php if ($info): ?>
							<div class="alert alert-info"><?php echo htmlspecialchars($info); ?></div>
						<?php endif; ?>
						<form method="post">
							<div class="mb-3">
								<label class="form-label">Email</label>
								<input type="email" name="email" class="form-control" required />
							</div>
							<div class="mb-3">
								<label class="form-label">Password</label>
								<input type="password" name="password" class="form-control" required />
							</div>
							<button class="btn btn-primary w-100" type="submit">Login</button>
							<div class="mt-3 text-center">
								<a href="<?php echo APP_BASE_URL; ?>/register.php">Create an account</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
