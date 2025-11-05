<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Response;

class ReportController extends Controller
{
    public function usersCsv(): Response
    {
        $filename = 'users_' . now()->format('Ymd_His') . '.csv';

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ];

        $callback = function () {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['ID', 'Name', 'Email', 'Created At']);

            User::query()->orderBy('id')->chunk(500, function ($users) use ($handle) {
                foreach ($users as $user) {
                    fputcsv($handle, [
                        $user->id,
                        $user->name,
                        $user->email,
                        optional($user->created_at)->toDateTimeString(),
                    ]);
                }
            });

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }
}
