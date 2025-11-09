<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class UsersExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return User::with('role')->get();
    }

    public function headings(): array
    {
        return [
            'User ID',
            'Full Name',
            'Email',
            'Role',
            '2FA Enabled',
            'Created At'
        ];
    }

    public function map($user): array
    {
        return [
            $user->user_id,
            $user->full_name,
            $user->email,
            $user->role->role_name ?? 'N/A',
            $user->two_fa_enabled ? 'Yes' : 'No',
            $user->created_at->format('Y-m-d H:i:s'),
        ];
    }
}
