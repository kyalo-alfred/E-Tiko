<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class BookingsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        // Mock data - replace with actual booking data when available
        return collect([
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
    }

    public function headings(): array
    {
        return [
            'Booking ID',
            'User Name',
            'Event Name',
            'Ticket Type',
            'Amount',
            'Status',
            'Booking Date'
        ];
    }

    public function map($booking): array
    {
        return [
            $booking->booking_id,
            $booking->user_name,
            $booking->event_name,
            $booking->ticket_type,
            $booking->amount,
            $booking->status,
            $booking->booking_date->format('Y-m-d H:i:s'),
        ];
    }
}
