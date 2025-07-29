<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Student::insert([
            [
                'name' => 'Alice Smith',
                'email' => 'alice@example.com',
                'age' => 20,
                'class' => 'A1',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bob Johnson',
                'email' => 'bob@example.com',
                'age' => 22,
                'class' => 'B2',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
