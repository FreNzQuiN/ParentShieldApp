<?php

namespace Tests\Feature;

use App\Models\Child;
use App\Models\DangerousWebsite;
use App\Models\Log;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_child_crud_and_ownership_isolation(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $otherUserChild = Child::create([
            'parent_id' => $otherUser->id,
            'name' => 'Other Child',
        ]);

        Sanctum::actingAs($user);

        $createResponse = $this->postJson('/api/child', [
            'name' => 'My Child',
        ]);

        $createResponse
            ->assertOk()
            ->assertJsonPath('message', 'Child created')
            ->assertJsonPath('data.name', 'My Child');

        $childId = (string) $createResponse->json('data.id');

        $this->assertDatabaseHas('children', [
            'id' => $childId,
            'parent_id' => $user->id,
            'name' => 'My Child',
        ]);

        $indexResponse = $this->getJson('/api/child');
        $indexResponse
            ->assertOk()
            ->assertJsonPath('message', 'Children fetched')
            ->assertJsonCount(1, 'data');

        $updateResponse = $this->putJson('/api/child/' . $childId, [
            'name' => 'My Child Updated',
        ]);

        $updateResponse
            ->assertOk()
            ->assertJsonPath('message', 'Child updated')
            ->assertJsonPath('data.name', 'My Child Updated');

        $forbiddenUpdateResponse = $this->putJson('/api/child/' . $otherUserChild->id, [
            'name' => 'Should Fail',
        ]);

        $forbiddenUpdateResponse->assertStatus(404);

        $deleteResponse = $this->deleteJson('/api/child/' . $childId);
        $deleteResponse
            ->assertOk()
            ->assertJsonPath('message', 'Child deleted');

        $this->assertDatabaseMissing('children', [
            'id' => $childId,
        ]);
    }

    public function test_log_grant_access_summary_and_statistics_flow(): void
    {
        $user = User::factory()->create();
        $child = Child::create([
            'parent_id' => $user->id,
            'name' => 'Flow Child',
        ]);

        DangerousWebsite::create(['url' => 'bad.com']);

        Sanctum::actingAs($user);

        $createLogResponse = $this->postJson('/api/log', [
            'childId' => $child->id,
            'url' => 'https://bad.com/some-path',
            'web_title' => 'Bad Site',
            'web_description' => 'Bad description',
            'detail_url' => 'https://bad.com/detail',
        ]);

        $createLogResponse
            ->assertStatus(201)
            ->assertJsonPath('message', 'Log created')
            ->assertJsonPath('data.classified_url.0.FINAL_label', 'bahaya');

        $logId = (string) $createLogResponse->json('data.log_id');

        $listLogResponse = $this->getJson('/api/log/' . $child->id . '?period=&page=1&limit=10');
        $listLogResponse
            ->assertOk()
            ->assertJsonPath('message', 'Log activity fetched')
            ->assertJsonPath('data.total', 1)
            ->assertJsonPath('data.items.0.log_id', $logId);

        $grantAccessResponse = $this->putJson('/api/log/grant-access/' . $logId, [
            'grantAccess' => 'true',
        ]);

        $grantAccessResponse
            ->assertOk()
            ->assertJsonPath('message', 'Grant access updated')
            ->assertJsonPath('data.grantAccess', true);

        $summaryResponse = $this->getJson('/api/log/summary/' . $child->id);
        $summaryResponse
            ->assertOk()
            ->assertJsonPath('message', 'Summary fetched')
            ->assertJsonPath('data.totalSafeWebsites', 1)
            ->assertJsonPath('data.totalDangerousWebsites', 0);

        $monthDate = now()->format('Y-m');

        $statMonthResponse = $this->getJson('/api/log/statistic-month/' . $child->id . '?date=' . $monthDate);
        $statMonthResponse
            ->assertOk()
            ->assertJsonPath('message', 'Statistic month fetched')
            ->assertJsonPath('data.0.name', 'Good')
            ->assertJsonPath('data.0.value', 1)
            ->assertJsonPath('data.1.name', 'Bad')
            ->assertJsonPath('data.1.value', 0);

        $statYearResponse = $this->getJson('/api/log/statistic-year/' . $child->id . '?year=' . now()->year);
        $statYearResponse
            ->assertOk()
            ->assertJsonPath('message', 'Statistic year fetched')
            ->assertJsonCount(12, 'data');
    }

    public function test_classified_for_child_merges_global_and_locked_log_sources(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $child = Child::create([
            'parent_id' => $user->id,
            'name' => 'Main Child',
        ]);

        $otherChild = Child::create([
            'parent_id' => $otherUser->id,
            'name' => 'Other Child',
        ]);

        DangerousWebsite::create(['url' => 'globalbad.com']);

        Log::create([
            'parent_id' => $user->id,
            'child_id' => $child->id,
            'url' => 'https://locked-only.com/path',
            'classified_final_label' => 'bahaya',
            'grant_access' => null,
        ]);

        Sanctum::actingAs($user);

        $response = $this->getJson('/api/classified-url/dangerous-website/' . $child->id);

        $response
            ->assertOk()
            ->assertJsonPath('message', 'Dangerous websites for child fetched');

        $blocked = $response->json('data');

        $this->assertContains('globalbad.com', $blocked);
        $this->assertContains('locked-only.com', $blocked);

        $notFoundOtherChildResponse = $this->getJson('/api/classified-url/dangerous-website/' . $otherChild->id);
        $notFoundOtherChildResponse->assertStatus(404);
    }
}
