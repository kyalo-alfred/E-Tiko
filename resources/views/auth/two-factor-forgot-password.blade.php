<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - E-Tiko</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <style>
        body { background: #f8fafc; }
        .card { max-width: 420px; margin: 10vh auto; }
    </style>
</head>
<body>
<div class="card shadow-sm">
    <div class="card-body">
        <h5 class="card-title mb-3">Reset Password</h5>
        <p class="text-muted">Enter your email address and we'll send you a verification code to reset your password.</p>

        @if ($errors->any())
            <div class="alert alert-danger">
                <ul class="mb-0">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        @if (session('status'))
            <div class="alert alert-success">{{ session('status') }}</div>
        @endif

        <form method="POST" action="{{ route('password.reset.request') }}">
            @csrf
            <div class="mb-3">
                <label for="email" class="form-label">Email Address</label>
                <input id="email" type="email" name="email" class="form-control" value="{{ old('email') }}" required autofocus>
            </div>
            <button type="submit" class="btn btn-primary w-100">Send Verification Code</button>
        </form>

        <div class="text-center mt-3">
            <a href="{{ route('login') }}" class="text-decoration-none">Back to Login</a>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
