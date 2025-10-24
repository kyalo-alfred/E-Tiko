<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\OtpCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Rate limiting
        $key = 'login.' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 5)) {
            $seconds = RateLimiter::availableIn($key);
            throw ValidationException::withMessages([
                'email' => "Too many login attempts. Please try again in {$seconds} seconds.",
            ]);
        }

        $user = User::findByEmail($request->email);
        
        if (!$user || !User::verifyPassword($request->password, $user->password_hash)) {
            RateLimiter::hit($key, 60); // 1 minute lockout
            throw ValidationException::withMessages([
                'email' => 'Invalid credentials.',
            ]);
        }

        // Clear rate limit on successful login
        RateLimiter::clear($key);

        // Check if 2FA is enabled
        if ($user->two_fa_enabled) {
            $otp = random_int(100000, 999999);
            
            // Store OTP in session
            Session::put('pending_user_id', $user->user_id);
            Session::put('otp_code', (string)$otp);
            Session::put('otp_expires_at', time() + 300); // 5 minutes
            
            // Send OTP via email
            try {
                Mail::to($user->email)->send(new OtpCodeMail($otp, $user->full_name));
            } catch (\Exception $e) {
                // Log error but continue for demo purposes
                \Log::error('Failed to send OTP email: ' . $e->getMessage());
            }
            
            return redirect()->route('verify-2fa')->with('info', 'Please check your email for the verification code.');
        }

        // Login user without 2FA
        Auth::login($user);
        return redirect()->intended('/dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect('/login');
    }
}
