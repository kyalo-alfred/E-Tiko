<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class TestUserSeeder extends Seeder
{
    public function run(): void
    {
        // Get or create Organizer role
        $organizerRole = Role::where('role_name', 'Organizer')->first();
        if (!$organizerRole) {
            $organizerRole = Role::create(['role_name' => 'Organizer']);
        }

        // Create or update the test user
        $user = User::updateOrCreate(
            ['email' => 'etikoeventsystem@gmail.com'],
            [
                'full_name' => 'E-Tiko System Admin',
                'password_hash' => Hash::make('password123'),
                'role_id' => $organizerRole->role_id,
                'two_fa_enabled' => true,
                'two_factor_delivery' => 'email'
            ]
        );

        $this->command->info('✅ Test user created/updated:');
        $this->command->info('   Email: etikoeventsystem@gmail.com');
        $this->command->info('   Password: password123');
        $this->command->info('   Role: Organizer');
        $this->command->info('   2FA Enabled: Yes');
    }
}
