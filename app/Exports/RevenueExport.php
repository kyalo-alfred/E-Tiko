<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class RevenueExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        // Mock revenue data - replace with actual data
        return collect([
            (object)[
                'month' => 'January',
                'revenue' => 5000.00,
                'bookings' => 2
            ],
            (object)[
                'month' => 'February',
                'revenue' => 7500.00,
                'bookings' => 3
            ],
            (object)[
                'month' => 'March',
                'revenue' => 2500.00,
                'bookings' => 1
            ]
        ]);
    }

    public function headings(): array
    {
        return [
            'Month',
            'Revenue (KSh)',
            'Number of Bookings'
        ];
    }

    public function map($revenue): array
    {
        return [
            $revenue->month,
            $revenue->revenue,
            $revenue->bookings,
        ];
    }
}
