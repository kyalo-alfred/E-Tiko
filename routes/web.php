<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\TwoFactorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExportController;
use Illuminate\Support\Facades\Route;

// Authentication Routes
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);

// Two-Factor Authentication Routes
Route::get('/verify-2fa', [TwoFactorController::class, 'showVerifyForm'])->name('verify-2fa');
Route::post('/verify-2fa', [TwoFactorController::class, 'verify']);
Route::post('/resend-otp', [TwoFactorController::class, 'resend'])->name('resend-otp');

// Protected Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Export Routes
    Route::get('/export/users', [ExportController::class, 'exportUsers'])->name('export.users');
    Route::get('/export/bookings', [ExportController::class, 'exportBookings'])->name('export.bookings');
});

// Redirect root to login
Route::get('/', function () {
    return redirect()->route('login');
});
