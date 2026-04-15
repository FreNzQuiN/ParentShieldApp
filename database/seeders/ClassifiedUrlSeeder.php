<?php

namespace Database\Seeders;

use App\Models\ClassifiedUrl;
use Illuminate\Database\Seeder;

class ClassifiedUrlSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $urls = [
            'pornhub.com',
            'xvideos.com',
            'xnxx.com',
            'bet365.com',
            '1xbet.com',
        ];

        foreach ($urls as $url) {
            ClassifiedUrl::updateOrCreate(
                ['user_id' => null, 'url' => $url],
                [
                    'final_label' => 'bahaya',
                    'title' => ucfirst(explode('.', $url)[0]),
                    'description' => 'Seed dangerous website',
                    'title_raw' => $url,
                ]
            );
        }
    }
}
