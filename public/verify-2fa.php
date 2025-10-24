<?php
require_once __DIR__ . '/../app/config/config.php';
require_once __DIR__ . '/../app/helpers/Session.php';
require_once __DIR__ . '/../app/core/Database.php';
require_once __DIR__ . '/../app/models/User.php';
require_once __DIR__ . '/../app/services/AuthService.php';

Session::start();

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	$code = trim($_POST['code'] ?? '');
	try {
		AuthService::verifyOtp($code);
		header('Location: ' . APP_BASE_URL . '/dashboard.php');
		exit;
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
	<title>Verify 2FA</title>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
	<div class="container py-5">
		<div class="row justify-content-center">
			<div class="col-md-4">
				<div class="card shadow-sm">
					<div class="card-body">
						<h5 class="card-title mb-3">Two-Factor Authentication</h5>
						<?php if ($error): ?>
							<div class="alert alert-danger"><?php echo htmlspecialchars($error); ?></div>
						<?php endif; ?>
						<form method="post">
							<div class="mb-3">
								<label class="form-label">Enter 6-digit code</label>
								<input type="text" name="code" class="form-control" required />
							</div>
							<button class="btn btn-primary w-100" type="submit">Verify</button>
						</form>
					</div>
				</div>
				<div class="text-center mt-3">
					<a href="<?php echo APP_BASE_URL; ?>/login.php">Back to Login</a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
