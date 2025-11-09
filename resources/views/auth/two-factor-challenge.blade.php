<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Two-Factor Verification</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <style>
        body { background: #f8fafc; }
        .card { max-width: 420px; margin: 10vh auto; }
    </style>
    </head>
<body>
<div class="card shadow-sm">
    <div class="card-body">
        <h5 class="card-title mb-3">Verify your identity</h5>
        <p class="text-muted">Enter the 6-digit code we emailed to you. The code expires in 10 minutes.</p>

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

        <form method="POST" action="{{ route('two-factor.verify') }}" class="mb-3">
            @csrf
            <div class="mb-3">
                <label for="code" class="form-label">Verification code</label>
                <input id="code" type="text" name="code" class="form-control" maxlength="6" required autofocus>
            </div>
            <button type="submit" class="btn btn-primary w-100">Verify</button>
        </form>

        <form method="POST" action="{{ route('two-factor.resend') }}">
            @csrf
            <button type="submit" class="btn btn-link p-0">Resend code</button>
        </form>
    </div>
</div>

</body>
</html>


