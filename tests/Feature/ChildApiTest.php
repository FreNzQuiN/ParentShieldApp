<?php

namespace Tests\Feature;

use App\Models\Child;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ChildApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_crud_own_children(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('test')->plainTextToken;

        $createResponse = $this->withHeader('Authorization', 'Bearer ' . $token)
            ->postJson('/api/child', [
                'name' => 'Kid One',
            ]);

        $createResponse
            ->assertCreated()
            ->assertJsonPath('data.name', 'Kid One');

        $childId = $createResponse->json('data.id');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/child')
            ->assertOk()
            ->assertJsonCount(1, 'data');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/child/' . $childId, [
                'name' => 'Kid Updated',
            ])
            ->assertOk()
            ->assertJsonPath('data.name', 'Kid Updated');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->deleteJson('/api/child/' . $childId)
            ->assertOk();

        $this->assertDatabaseMissing('children', [
            'id' => $childId,
        ]);
    }

    public function test_user_cannot_access_other_users_child_resource(): void
    {
        $owner = User::factory()->create();
        $attacker = User::factory()->create();
        $child = Child::create([
            'user_id' => $owner->id,
            'name' => 'Private Kid',
        ]);

        $token = $attacker->createToken('test')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/child/' . $child->id)
            ->assertNotFound();
    }
}
