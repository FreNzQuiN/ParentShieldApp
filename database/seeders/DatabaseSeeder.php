<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'email' => 'devhackfest@gmail.com',
        ], [
            'name' => 'ParentShield Parent',
            'password' => 'password',
        ]);

        $this->call(ClassifiedUrlSeeder::class);
    }
}
