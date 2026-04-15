<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_login_and_me_flow(): void
    {
        $registerResponse = $this->postJson('/api/auth/register', [
            'name' => 'Parent One',
            'email' => 'parent@example.com',
            'password' => 'password123',
        ]);

        $registerResponse
            ->assertCreated()
            ->assertJsonStructure([
                'message',
                'data' => ['id', 'name', 'email', 'accessToken'],
            ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => 'parent@example.com',
            'password' => 'password123',
            'registrationToken' => 'fcm-token-test',
        ]);

        $loginResponse->assertOk();
        $token = $loginResponse->json('data.accessToken');

        $this->assertNotEmpty($token);

        $this->assertDatabaseHas('users', [
            'email' => 'parent@example.com',
            'registration_token' => 'fcm-token-test',
        ]);

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('data.email', 'parent@example.com');
    }

    public function test_profile_update_requires_valid_old_password_for_password_change(): void
    {
        $user = User::factory()->create([
            'password' => 'password123',
        ]);

        $token = $user->createToken('test')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/profile/' . $user->id, [
                'name' => 'Updated Parent',
                'oldPassword' => 'wrong-password',
                'newPassword' => 'new-password-123',
                'confirmPassword' => 'new-password-123',
            ])
            ->assertStatus(422)
            ->assertJsonPath('message', 'Old password is invalid');

        $this->withHeader('Authorization', 'Bearer ' . $token)
            ->putJson('/api/profile/' . $user->id, [
                'name' => 'Updated Parent',
            ])
            ->assertOk()
            ->assertJsonPath('data.name', 'Updated Parent');
    }
}
