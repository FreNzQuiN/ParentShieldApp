<?php

namespace Tests\Feature;

use App\Models\Child;
use App\Models\ClassifiedUrl;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LogActivityApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_log_ingestion_list_summary_and_statistics_flow(): void
    {
        $user = User::factory()->create();
        $child = Child::create([
            'user_id' => $user->id,
            'name' => 'Kid One',
        ]);

        ClassifiedUrl::create([
            'user_id' => null,
            'url' => 'danger.example.com',
            'final_label' => 'bahaya',
            'title' => 'Danger Example',
        ]);

        $token = $user->createToken('test')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/log', [
                'childId' => (string) $child->id,
                'parentId' => (string) $user->id,
                'url' => 'https://danger.example.com/home',
                'web_title' => 'Danger',
                'web_description' => '',
                'detail_url' => '',
            ])
            ->assertCreated()
            ->assertJsonPath('data.child.name', 'Kid One');

        $listResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/log/ALL?period=&page=1&limit=10');

        $listResponse
            ->assertOk()
            ->assertJsonPath('data.total', 1)
            ->assertJsonPath('data.items.0.child.name', 'Kid One');

        $logId = $listResponse->json('data.items.0.log_id');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/log/grant-access/' . $logId, [
                'grantAccess' => 'true',
            ])
            ->assertOk()
            ->assertJsonPath('data.grantAccess', true);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/log/summary/ALL')
            ->assertOk()
            ->assertJsonStructure([
                'message',
                'data' => [
                    'totalSafeWebsites',
                    'totalDangerousWebsites',
                    'persentageSafeWebsite',
                    'persentageDangerousWebsite',
                ],
            ]);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/log/statistic-year/ALL?year=2026')
            ->assertOk()
            ->assertJsonCount(12, 'data');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/log/statistic-month/ALL?date=2026-04')
            ->assertOk()
            ->assertJsonCount(2, 'data');
    }
}
