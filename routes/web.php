<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Reports
    Route::get('/reports/users.csv', [ReportController::class, 'usersCsv'])->name('reports.users.csv');
});

require __DIR__.'/auth.php';

// Two-Factor routes
Route::get('/two-factor/challenge', [TwoFactorController::class, 'show'])->name('two-factor.challenge');
Route::post('/two-factor/verify', [TwoFactorController::class, 'verify'])->name('two-factor.verify');
Route::post('/two-factor/resend', [TwoFactorController::class, 'resend'])->name('two-factor.resend');
