<?php

namespace Tests\Feature;

use App\Models\ClassifiedUrl;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ClassifiedUrlApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_list_and_delete_personal_blocked_websites(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        ClassifiedUrl::create([
            'user_id' => null,
            'url' => 'global-danger.example',
            'final_label' => 'bahaya',
            'title' => 'Global Danger',
        ]);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/classified-url', [
                'url' => 'https://www.custom-danger.example/path',
            ])
            ->assertCreated()
            ->assertJsonPath('data.url', 'custom-danger.example')
            ->assertJsonPath('data.isGlobal', false);

        $listResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/classified-url');

        $listResponse
            ->assertOk()
            ->assertJsonPath('data.0.url', 'global-danger.example')
            ->assertJsonPath('data.0.isGlobal', true);

        $personalId = collect($listResponse->json('data'))->firstWhere('url', 'custom-danger.example')['id'];

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/classified-url/' . $personalId)
            ->assertOk()
            ->assertJsonPath('message', 'Blocked website deleted successfully');
    }

    public function test_user_cannot_delete_global_or_other_users_blocked_websites(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $globalUrl = ClassifiedUrl::create([
            'user_id' => null,
            'url' => 'global-danger.example',
            'final_label' => 'bahaya',
            'title' => 'Global Danger',
        ]);

        $otherUserUrl = ClassifiedUrl::create([
            'user_id' => $otherUser->id,
            'url' => 'other-danger.example',
            'final_label' => 'bahaya',
            'title' => 'Other Danger',
        ]);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/classified-url/' . $globalUrl->id)
            ->assertNotFound();

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/classified-url/' . $otherUserUrl->id)
            ->assertNotFound();
    }

    public function test_user_can_update_own_blocked_website_but_not_global_or_other_user_item(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $ownedUrl = ClassifiedUrl::create([
            'user_id' => $user->id,
            'url' => 'old-owned.example',
            'final_label' => 'bahaya',
            'title' => 'Old Owned',
        ]);

        $globalUrl = ClassifiedUrl::create([
            'user_id' => null,
            'url' => 'global-danger.example',
            'final_label' => 'bahaya',
            'title' => 'Global Danger',
        ]);

        $otherUserUrl = ClassifiedUrl::create([
            'user_id' => $otherUser->id,
            'url' => 'other-danger.example',
            'final_label' => 'bahaya',
            'title' => 'Other Danger',
        ]);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/classified-url/' . $ownedUrl->id, [
                'url' => 'https://www.updated-owned.example/path',
            ])
            ->assertOk()
            ->assertJsonPath('data.url', 'updated-owned.example');

        $this->assertDatabaseHas('classified_urls', [
            'id' => $ownedUrl->id,
            'url' => 'updated-owned.example',
        ]);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/classified-url/' . $globalUrl->id, [
                'url' => 'cannot-update-global.example',
            ])
            ->assertNotFound();

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/classified-url/' . $otherUserUrl->id, [
                'url' => 'cannot-update-other.example',
            ])
            ->assertNotFound();
    }

    public function test_dangerous_website_endpoints_match_original_contract_expectation(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        ClassifiedUrl::create([
            'user_id' => null,
            'url' => 'global-a.example',
            'final_label' => 'bahaya',
            'title' => 'Global A',
        ]);

        ClassifiedUrl::create([
            'user_id' => null,
            'url' => 'global-b.example',
            'final_label' => 'bahaya',
            'title' => 'Global B',
        ]);

        ClassifiedUrl::create([
            'user_id' => $user->id,
            'url' => 'personal-a.example',
            'final_label' => 'bahaya',
            'title' => 'Personal A',
        ]);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/classified-url/dangerous-website')
            ->assertOk()
            ->assertJsonPath('data.0', 'global-a.example');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/classified-url/dangerous-website/' . $user->id)
            ->assertOk()
            ->assertJsonFragment(['personal-a.example']);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/classified-url/dangerous-website/' . $otherUser->id)
            ->assertForbidden();
    }
}
