<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class TwoFactorPasswordResetController extends Controller
{
    /**
     * Display the password reset request view.
     */
    public function create(): View
    {
        return view('auth.two-factor-forgot-password');
    }

    /**
     * Handle an incoming password reset request with 2FA.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'We could not find a user with that email address.']);
        }

        // Generate 2FA code for password reset
        $code = (string)random_int(100000, 999999);
        $user->forceFill([
            'two_factor_code' => $code,
            'two_factor_expires_at' => now()->addMinutes(15), // 15 minutes for password reset
            'two_factor_delivery' => 'email',
        ])->save();

        // Send 2FA code via email
        $mailer = App::make('smtp.phpmailer');
        $mailer->clearAllRecipients();
        $mailer->addAddress($user->email, $user->full_name ?? null);
        $mailer->Subject = 'Password Reset Verification Code';
        $mailer->Body = 'Your password reset verification code is: ' . $code . '. This code expires in 15 minutes.';
        $mailer->send();

        // Store user ID in session for verification
        $request->session()->put('password_reset:user:id', $user->user_id);

        return redirect()->route('password.reset.verify')->with('status', 'A verification code has been sent to your email address.');
    }

    /**
     * Display the 2FA verification view for password reset.
     */
    public function showVerification(): View
    {
        return view('auth.two-factor-password-reset-verify');
    }

    /**
     * Verify the 2FA code for password reset.
     */
    public function verifyCode(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'string', 'size:6'],
        ]);

        $userId = $request->session()->get('password_reset:user:id');
        $user = User::find($userId);

        if (!$user) {
            return redirect()->route('password.request')->withErrors(['email' => 'Session expired. Please try again.']);
        }

        if (!$user->two_factor_code || now()->greaterThan($user->two_factor_expires_at)) {
            return back()->withErrors(['code' => 'The verification code has expired.']);
        }

        if (trim($request->input('code')) !== $user->two_factor_code) {
            return back()->withErrors(['code' => 'Invalid verification code.']);
        }

        // Clear the 2FA code and store token for password reset
        $user->forceFill([
            'two_factor_code' => null,
            'two_factor_expires_at' => null,
        ])->save();

        // Generate a password reset token
        $token = Str::random(64);
        $request->session()->put('password_reset:token', $token);
        $request->session()->put('password_reset:verified', true);

        return redirect()->route('password.reset.form');
    }

    /**
     * Display the password reset form.
     */
    public function showResetForm(): View
    {
        if (!session('password_reset:verified')) {
            return redirect()->route('password.request');
        }

        return view('auth.two-factor-reset-password');
    }

    /**
     * Handle the password reset.
     */
    public function resetPassword(Request $request): RedirectResponse
    {
        if (!session('password_reset:verified')) {
            return redirect()->route('password.request');
        }

        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $userId = $request->session()->get('password_reset:user:id');
        $user = User::find($userId);

        if (!$user) {
            return redirect()->route('password.request')->withErrors(['email' => 'Session expired. Please try again.']);
        }

        // Update the password
        $user->forceFill([
            'password' => Hash::make($request->password),
            'remember_token' => Str::random(60),
        ])->save();

        // Clear session data
        $request->session()->forget(['password_reset:user:id', 'password_reset:token', 'password_reset:verified']);

        return redirect()->route('login')->with('status', 'Your password has been reset successfully. You can now log in with your new password.');
    }

    /**
     * Resend the 2FA code for password reset.
     */
    public function resendCode(Request $request): RedirectResponse
    {
        $userId = $request->session()->get('password_reset:user:id');
        $user = User::find($userId);

        if (!$user) {
            return redirect()->route('password.request');
        }

        $code = (string)random_int(100000, 999999);
        $user->forceFill([
            'two_factor_code' => $code,
            'two_factor_expires_at' => now()->addMinutes(15),
            'two_factor_delivery' => 'email',
        ])->save();

        // Send 2FA code via email
        $mailer = App::make('smtp.phpmailer');
        $mailer->clearAllRecipients();
        $mailer->addAddress($user->email, $user->name ?? null);
        $mailer->Subject = 'Password Reset Verification Code';
        $mailer->Body = 'Your password reset verification code is: ' . $code . '. This code expires in 15 minutes.';
        $mailer->send();

        return back()->with('status', 'A new verification code has been sent.');
    }
}