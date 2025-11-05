<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\View\View;

class TwoFactorController extends Controller
{
    public function show(Request $request): View|RedirectResponse
    {
        if (!$request->session()->has('2fa:user:id')) {
            return redirect()->route('login');
        }

        return view('auth.two-factor-challenge');
    }

    public function verify(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => ['required', 'string'],
        ]);

        $userId = $request->session()->get('2fa:user:id');
        /** @var User|null $user */
        $user = User::find($userId);
        if (!$user) {
            return redirect()->route('login')->withErrors(['email' => 'User not found.']);
        }

        if (!$user->two_factor_code || now()->greaterThan($user->two_factor_expires_at)) {
            return back()->withErrors(['code' => 'The verification code has expired.']);
        }

        if (trim($request->input('code')) !== $user->two_factor_code) {
            return back()->withErrors(['code' => 'Invalid verification code.']);
        }

        $user->forceFill([
            'two_factor_code' => null,
            'two_factor_expires_at' => null,
        ])->save();

        Auth::login($user);
        $request->session()->forget('2fa:user:id');
        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function resend(Request $request): RedirectResponse
    {
        $userId = $request->session()->get('2fa:user:id');
        /** @var User|null $user */
        $user = User::find($userId);
        if (!$user) {
            return redirect()->route('login');
        }

        $code = (string)random_int(100000, 999999);
        $user->forceFill([
            'two_factor_code' => $code,
            'two_factor_expires_at' => now()->addMinutes(10),
            'two_factor_delivery' => 'email',
        ])->save();

        $mailer = App::make('smtp.phpmailer');
        $mailer->clearAllRecipients();
        $mailer->addAddress($user->email, $user->name ?? null);
        $mailer->Subject = 'Your 2FA Verification Code';
        $mailer->Body = 'Your verification code is: ' . $code;
        $mailer->send();

        return back()->with('status', 'A new verification code has been sent.');
    }
}
