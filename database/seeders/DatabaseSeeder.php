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
<<<<<<< HEAD
        // Seed roles first
        $this->call(RoleSeeder::class);

=======
>>>>>>> main
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
<<<<<<< HEAD
            'role_id' => 2, // Attendee role
=======
>>>>>>> main
        ]);
    }
}
