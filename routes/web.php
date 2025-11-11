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

    // Reports Dashboard (Organizer only)
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index')->middleware('role:Organizer');
    
    // PDF Reports (Organizer only)
    Route::get('/reports/users/pdf', [ReportController::class, 'usersPdf'])->name('reports.users.pdf')->middleware('role:Organizer');
    Route::get('/reports/bookings/pdf', [ReportController::class, 'bookingsPdf'])->name('reports.bookings.pdf')->middleware('role:Organizer');
    Route::get('/reports/revenue/pdf', [ReportController::class, 'revenuePdf'])->name('reports.revenue.pdf')->middleware('role:Organizer');
    
    // Excel Reports (Organizer only)
    Route::get('/reports/users/excel', [ReportController::class, 'usersExcel'])->name('reports.users.excel')->middleware('role:Organizer');
    Route::get('/reports/bookings/excel', [ReportController::class, 'bookingsExcel'])->name('reports.bookings.excel')->middleware('role:Organizer');
    Route::get('/reports/revenue/excel', [ReportController::class, 'revenueExcel'])->name('reports.revenue.excel')->middleware('role:Organizer');
    
    // CSV Reports (Organizer only)
    Route::get('/reports/users.csv', [ReportController::class, 'usersCsv'])->name('reports.users.csv')->middleware('role:Organizer');
});

require __DIR__.'/auth.php';

// Two-Factor routes
Route::get('/two-factor/challenge', [TwoFactorController::class, 'show'])->name('two-factor.challenge');
Route::post('/two-factor/verify', [TwoFactorController::class, 'verify'])->name('two-factor.verify');
Route::post('/two-factor/resend', [TwoFactorController::class, 'resend'])->name('two-factor.resend');
