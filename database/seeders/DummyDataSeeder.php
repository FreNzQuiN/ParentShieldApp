<?php

namespace Database\Seeders;

use App\Models\Child;
use App\Models\LogActivity;
use App\Models\User;
use Illuminate\Database\Seeder;

class DummyDataSeeder extends Seeder
{
    /**
     * Run the database seeds to create sample data for testing.
     */
    public function run(): void
    {
        // Get or create the parent user
        $parent = User::firstWhere('email', 'devhackfest@gmail.com');

        if (!$parent) {
            $parent = User::create([
                'name' => 'ParentShield Parent',
                'email' => 'devhackfest@gmail.com',
                'password' => bcrypt('password'),
            ]);
        }

        // Create sample children
        $children = [
            ['name' => 'Andi Pratama', 'user_id' => $parent->id],
            ['name' => 'Siti Nurhaliza', 'user_id' => $parent->id],
            ['name' => 'Budi Santoso', 'user_id' => $parent->id],
        ];

        $childModels = [];
        foreach ($children as $childData) {
            $child = Child::firstOrCreate(
                ['name' => $childData['name'], 'user_id' => $childData['user_id']],
                $childData
            );
            $childModels[] = $child;
        }

        // Sample websites (safe and dangerous)
        $safeUrls = [
            ['url' => 'google.com', 'title' => 'Google Search', 'description' => 'Search engine'],
            ['url' => 'youtube.com', 'title' => 'YouTube', 'description' => 'Video platform'],
            ['url' => 'wikipedia.org', 'title' => 'Wikipedia', 'description' => 'Encyclopedia'],
            ['url' => 'github.com', 'title' => 'GitHub', 'description' => 'Code repository'],
            ['url' => 'stackoverflow.com', 'title' => 'Stack Overflow', 'description' => 'Q&A platform'],
            ['url' => 'khan.academy.org', 'title' => 'Khan Academy', 'description' => 'Learning platform'],
            ['url' => 'medium.com', 'title' => 'Medium', 'description' => 'Writing platform'],
            ['url' => 'linkedin.com', 'title' => 'LinkedIn', 'description' => 'Professional network'],
            ['url' => 'twitter.com', 'title' => 'Twitter', 'description' => 'Social media'],
            ['url' => 'reddit.com', 'title' => 'Reddit', 'description' => 'Discussion board'],
        ];

        $dangerousUrls = [
            ['url' => 'pornhub.com', 'title' => 'Adult Content', 'description' => 'Dangerous site'],
            ['url' => 'xvideos.com', 'title' => 'Adult Content', 'description' => 'Dangerous site'],
            ['url' => 'xnxx.com', 'title' => 'Adult Content', 'description' => 'Dangerous site'],
            ['url' => 'betamax-casino.net', 'title' => 'Gambling', 'description' => 'Dangerous site'],
            ['url' => 'illegal-download.com', 'title' => 'Illegal Content', 'description' => 'Dangerous site'],
        ];

        // Sample titles for log activities
        $titles = [
            'Google Search Results',
            'YouTube Video',
            'Wikipedia Article',
            'GitHub Repository',
            'Stack Overflow Question',
            'Khan Academy Lesson',
            'Medium Article',
            'LinkedIn Profile',
            'Twitter Feed',
            'Reddit Thread',
        ];

        // Create 25 sample log activities
        $now = now();
        $count = 0;

        foreach ($childModels as $child) {
            for ($i = 0; $i < 8; $i++) {
                // Mix of safe and dangerous URLs
                $isUnsafe = $count % 4 == 0; // 25% dangerous
                $urlData = $isUnsafe
                    ? $dangerousUrls[array_rand($dangerousUrls)]
                    : $safeUrls[array_rand($safeUrls)];

                LogActivity::create([
                    'child_id' => $child->id,
                    'parent_id' => $parent->id,
                    'url' => $urlData['url'],
                    'web_title' => $urlData['title'],
                    'web_description' => $urlData['description'],
                    'detail_url' => 'https://' . $urlData['url'] . '/page-' . ($count + 1),
                    'grant_access' => $isUnsafe ? null : true, // Pre-grant access for safe URLs
                    'created_at' => $now->copy()->subDays(rand(0, 6))->subHours(rand(0, 23)),
                    'updated_at' => now(),
                ]);

                $count++;
            }
        }

        $this->command->info("✅ Created {$count} sample log activities across " . count($childModels) . " children");
    }
}
