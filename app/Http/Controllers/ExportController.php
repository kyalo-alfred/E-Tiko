<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ExportController extends Controller
{
    public function exportUsers()
    {
        $users = User::orderBy('user_id', 'desc')->limit(10000)->get();
        
        $filename = 'users_export_' . date('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($users) {
            $file = fopen('php://output', 'w');
            
            // CSV headers
            fputcsv($file, ['user_id', 'full_name', 'email', 'phone', 'role_id', 'two_fa_enabled', 'created_at']);
            
            // CSV data
            foreach ($users as $user) {
                fputcsv($file, [
                    $user->user_id,
                    $user->full_name,
                    $user->email,
                    $user->phone,
                    $user->role_id,
                    $user->two_fa_enabled ? 1 : 0,
                    $user->created_at,
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function exportBookings()
    {
        $bookings = Booking::with(['user', 'event'])
            ->orderBy('booking_id', 'desc')
            ->limit(10000)
            ->get();
        
        $filename = 'bookings_export_' . date('Y-m-d_H-i-s') . '.csv';
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function() use ($bookings) {
            $file = fopen('php://output', 'w');
            
            // CSV headers
            fputcsv($file, ['booking_id', 'status', 'booking_date', 'user_name', 'user_email', 'event_name', 'event_start', 'event_end']);
            
            // CSV data
            foreach ($bookings as $booking) {
                fputcsv($file, [
                    $booking->booking_id,
                    $booking->status,
                    $booking->booking_date,
                    $booking->user->full_name ?? '',
                    $booking->user->email ?? '',
                    $booking->event->event_name ?? '',
                    $booking->event->start_time ?? '',
                    $booking->event->end_time ?? '',
                ]);
            }
            
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
