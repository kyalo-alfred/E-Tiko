<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    /**
     * Display reports dashboard
     */
    public function index()
    {
        return view('reports.index');
    }

    /**
     * Generate PDF report for users
     */
    public function usersPdf()
    {
        $users = User::with('role')->get();
        
        $pdf = Pdf::loadView('reports.users-pdf', compact('users'));
        $pdf->setPaper('A4', 'landscape');
        
        return $pdf->download('users_report_' . now()->format('Ymd_His') . '.pdf');
    }

    /**
     * Generate PDF report for bookings (when booking system is implemented)
     */
    public function bookingsPdf(Request $request)
    {
        // This will be implemented when booking system is ready
        // For now, return a placeholder
        $bookings = collect([
            (object)[
                'booking_id' => 1,
                'user_name' => 'John Doe',
                'event_name' => 'Tech Summit 2025',
                'ticket_type' => 'VIP',
                'amount' => 5000.00,
                'status' => 'PAID',
                'booking_date' => now()->subDays(5)
            ],
            (object)[
                'booking_id' => 2,
                'user_name' => 'Jane Smith',
                'event_name' => 'Tech Summit 2025',
                'ticket_type' => 'Regular',
                'amount' => 2500.00,
                'status' => 'PENDING',
                'booking_date' => now()->subDays(2)
            ]
        ]);

        $pdf = Pdf::loadView('reports.bookings-pdf', compact('bookings'));
        $pdf->setPaper('A4', 'landscape');
        
        return $pdf->download('bookings_report_' . now()->format('Ymd_His') . '.pdf');
    }

    /**
     * Generate PDF report for revenue
     */
    public function revenuePdf(Request $request)
    {
        // Mock revenue data - will be replaced with actual data
        $revenueData = [
            'total_revenue' => 15000.00,
            'total_bookings' => 3,
            'paid_bookings' => 2,
            'pending_bookings' => 1,
            'monthly_breakdown' => [
                'January' => 5000.00,
                'February' => 7500.00,
                'March' => 2500.00
            ]
        ];

        $pdf = Pdf::loadView('reports.revenue-pdf', compact('revenueData'));
        $pdf->setPaper('A4', 'portrait');
        
        return $pdf->download('revenue_report_' . now()->format('Ymd_His') . '.pdf');
    }

    /**
     * Export users to Excel
     */
    public function usersExcel()
    {
        return Excel::download(new \App\Exports\UsersExport, 'users_' . now()->format('Ymd_His') . '.xlsx');
    }

    /**
     * Export bookings to Excel (placeholder)
     */
    public function bookingsExcel()
    {
        return Excel::download(new \App\Exports\BookingsExport, 'bookings_' . now()->format('Ymd_His') . '.xlsx');
    }

    /**
     * Export revenue to Excel
     */
    public function revenueExcel()
    {
        return Excel::download(new \App\Exports\RevenueExport, 'revenue_' . now()->format('Ymd_His') . '.xlsx');
    }
     /* Legacy CSV export for users
     */
    public function usersCsv(): Response
    {
        $filename = 'users_' . now()->format('Ymd_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['User ID', 'Full Name', 'Email', 'Role', '2FA Enabled', 'Created At']);

            User::query()->orderBy('user_id')->chunk(500, function ($users) use ($handle) {
                foreach ($users as $user) {
                    fputcsv($handle, [
                        $user->user_id,
                        $user->full_name,
                        $user->email,
                        $user->role->role_name ?? 'N/A',
                        $user->two_fa_enabled ? 'Yes' : 'No',
                        optional($user->created_at)->toDateTimeString(),
                    ]);
                }
            });

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
