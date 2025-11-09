<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('auth.login');
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        /** @var User $user */
        $user = Auth::user();

        if ($user && $user->two_factor_enabled) {
            $code = (string)random_int(100000, 999999);
            $user->forceFill([
                'two_factor_code' => $code,
                'two_factor_expires_at' => now()->addMinutes(10),
                'two_factor_delivery' => 'email',
            ])->save();

            // Send via PHPMailer bound in service container
            $mailer = App::make('smtp.phpmailer');
            $mailer->clearAllRecipients();
            $mailer->addAddress($user->email, $user->name ?? null);
            $mailer->Subject = 'Your 2FA Verification Code';
            $mailer->Body = 'Your verification code is: ' . $code;
            $mailer->send();

            $request->session()->put('2fa:user:id', $user->id);
            Auth::logout();
            return redirect()->route('two-factor.challenge');
        }

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
