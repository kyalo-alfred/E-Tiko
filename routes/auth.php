<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    // 2FA Password Reset Routes
    Route::get('password-reset', [App\Http\Controllers\Auth\TwoFactorPasswordResetController::class, 'create'])
        ->name('password.reset.request');

    Route::post('password-reset', [App\Http\Controllers\Auth\TwoFactorPasswordResetController::class, 'store']);

    Route::get('password-reset/verify', [App\Http\Controllers\Auth\TwoFactorPasswordResetController::class, 'showVerification'])
        ->name('password.reset.verify');

    Route::post('password-reset/verify', [App\Http\Controllers\Auth\TwoFactorPasswordResetController::class, 'verifyCode'])
        ->name('password.reset.verify.post');

    Route::post('password-reset/resend', [App\Http\Controllers\Auth\TwoFactorPasswordResetController::class, 'resendCode'])
        ->name('password.reset.resend');

    Route::get('password-reset/form', [App\Http\Controllers\Auth\TwoFactorPasswordResetController::class, 'showResetForm'])
        ->name('password.reset.form');

    Route::post('password-reset/form', [App\Http\Controllers\Auth\TwoFactorPasswordResetController::class, 'resetPassword'])
        ->name('password.reset.update');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
