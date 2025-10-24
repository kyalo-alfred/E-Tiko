<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Mail\OtpCodeMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\ValidationException;

class TwoFactorController extends Controller
{
    public function showVerifyForm()
    {
        if (!Session::has('pending_user_id')) {
            return redirect()->route('login')->with('error', 'No verification in progress.');
        }
        
        return view('auth.verify-2fa');
    }

    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string|size:6',
        ]);

        $pendingUserId = Session::get('pending_user_id');
        $otp = Session::get('otp_code');
        $expiresAt = Session::get('otp_expires_at');

        if (!$pendingUserId || !$otp || !$expiresAt) {
            return redirect()->route('login')->with('error', 'No verification in progress.');
        }

        if (time() > $expiresAt) {
            $this->clearOtp();
            return redirect()->route('login')->with('error', 'Verification code expired. Please login again.');
        }

        if (trim($request->code) !== $otp) {
            return back()->withErrors(['code' => 'Invalid verification code.']);
        }

        // Verification successful
        $user = User::find($pendingUserId);
        if (!$user) {
            $this->clearOtp();
            return redirect()->route('login')->with('error', 'User not found.');
        }

        $this->clearOtp();
        Auth::login($user);
        
        return redirect()->intended('/dashboard');
    }

    public function resend(Request $request)
    {
        $key = 'resend-otp.' . $request->ip();
        if (RateLimiter::tooManyAttempts($key, 3)) {
            $seconds = RateLimiter::availableIn($key);
            return back()->with('error', "Please wait {$seconds} seconds before requesting another code.");
        }

        $pendingUserId = Session::get('pending_user_id');
        if (!$pendingUserId) {
            return redirect()->route('login')->with('error', 'No verification in progress.');
        }

        $user = User::find($pendingUserId);
        if (!$user) {
            $this->clearOtp();
            return redirect()->route('login')->with('error', 'User not found.');
        }

        $otp = random_int(100000, 999999);
        Session::put('otp_code', (string)$otp);
        Session::put('otp_expires_at', time() + 300);

        try {
            Mail::to($user->email)->send(new OtpCodeMail($otp, $user->full_name));
            RateLimiter::hit($key, 30); // 30 second cooldown
            return back()->with('success', 'New verification code sent to your email.');
        } catch (\Exception $e) {
            \Log::error('Failed to resend OTP: ' . $e->getMessage());
            return back()->with('error', 'Failed to send verification code. Please try again.');
        }
    }

    private function clearOtp()
    {
        Session::forget(['pending_user_id', 'otp_code', 'otp_expires_at']);
    }
}
