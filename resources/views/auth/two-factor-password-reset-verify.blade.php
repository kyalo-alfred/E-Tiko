<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Password Reset - E-Tiko</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <style>
        body { background: #f8fafc; }
        .card { max-width: 420px; margin: 10vh auto; }
    </style>
</head>
<body>
<div class="card shadow-sm">
    <div class="card-body">
        <h5 class="card-title mb-3">Verify Password Reset</h5>
        <p class="text-muted">Enter the 6-digit verification code sent to your email address. The code expires in 15 minutes.</p>

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

        <form method="POST" action="{{ route('password.reset.verify') }}" class="mb-3">
            @csrf
            <div class="mb-3">
                <label for="code" class="form-label">Verification Code</label>
                <input id="code" type="text" name="code" class="form-control" maxlength="6" required autofocus>
            </div>
            <button type="submit" class="btn btn-primary w-100">Verify Code</button>
        </form>

        <form method="POST" action="{{ route('password.reset.resend') }}">
            @csrf
            <button type="submit" class="btn btn-link p-0">Resend verification code</button>
        </form>

        <div class="text-center mt-3">
            <a href="{{ route('password.request') }}" class="text-decoration-none">Back to Email</a>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
