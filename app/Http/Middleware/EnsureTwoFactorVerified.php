<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class EnsureTwoFactorVerified
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            $user = Auth::user();
            
            // If user has 2FA enabled, check if they've completed verification
            if ($user->two_fa_enabled && !Session::has('two_fa_verified')) {
                return redirect()->route('verify-2fa');
            }
        }

        return $next($request);
    }
}
