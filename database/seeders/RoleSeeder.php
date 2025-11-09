<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['role_name' => 'Organizer'],
            ['role_name' => 'Attendee'],
        ];

        foreach ($roles as $role) {
            // Use raw insert to avoid timestamp issues
            \DB::table('roles')->insert($role);
        }
    }
}
