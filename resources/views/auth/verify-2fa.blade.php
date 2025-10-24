<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Verify 2FA - IAP Ticketing</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title mb-3">Two-Factor Authentication</h5>
                        
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                @foreach ($errors->all() as $error)
                                    {{ $error }}
                                @endforeach
                            </div>
                        @endif

                        @if (session('success'))
                            <div class="alert alert-success">{{ session('success') }}</div>
                        @endif

                        <form method="POST" action="{{ route('verify-2fa') }}">
                            @csrf
                            <div class="mb-3">
                                <label for="code" class="form-label">Enter 6-digit code</label>
                                <input type="text" class="form-control @error('code') is-invalid @enderror" 
                                       id="code" name="code" maxlength="6" required>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Verify</button>
                        </form>
                        
                        <div class="mt-3 text-center">
                            <form method="POST" action="{{ route('resend-otp') }}" class="d-inline">
                                @csrf
                                <button type="submit" class="btn btn-link">Resend Code</button>
                            </form>
                            <a href="{{ route('login') }}" class="btn btn-link">Back to Login</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
