<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed roles first (required before creating users)
        $this->call(RoleSeeder::class);

        // Seed test users
        $this->call(TestUserSeeder::class);

        // Optional: Create additional test user via factory
        // Note: UserFactory needs to be updated to match User model structure
        // User::factory()->create([
        //     'full_name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'role_id' => 2, // Attendee role
        // ]);
    }
}
