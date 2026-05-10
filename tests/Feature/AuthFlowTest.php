<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthFlowTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_login_me_logout_flow_works(): void
    {
        $registerPayload = [
            'name' => 'Auth Test User',
            'email' => 'auth-flow@example.com',
            'password' => 'secret123',
            'confirmPassword' => 'secret123',
        ];

        $registerResponse = $this->postJson('/api/auth/register', $registerPayload);

        $registerResponse
            ->assertOk()
            ->assertJsonPath('message', 'Register success')
            ->assertJsonPath('data.email', 'auth-flow@example.com');

        $this->assertDatabaseHas('users', [
            'email' => 'auth-flow@example.com',
            'name' => 'Auth Test User',
        ]);

        $loginResponse = $this->postJson('/api/auth/login', [
            'email' => 'auth-flow@example.com',
            'password' => 'secret123',
        ]);

        $loginResponse
            ->assertOk()
            ->assertJsonPath('message', 'Login success')
            ->assertJsonStructure([
                'message',
                'data' => ['id', 'name', 'email', 'accessToken'],
            ]);

        $accessToken = $loginResponse->json('data.accessToken');

        $meResponse = $this
            ->withHeader('Authorization', 'Bearer ' . $accessToken)
            ->getJson('/api/auth/me');

        $meResponse
            ->assertOk()
            ->assertJsonPath('message', 'User fetched')
            ->assertJsonPath('data.email', 'auth-flow@example.com');

        $logoutResponse = $this
            ->withHeader('Authorization', 'Bearer ' . $accessToken)
            ->postJson('/api/auth/logout');

        $logoutResponse
            ->assertOk()
            ->assertJsonPath('message', 'Logout success');

        [$tokenId] = explode('|', $accessToken);

        $this->assertDatabaseMissing('personal_access_tokens', [
            'id' => (int) $tokenId,
        ]);
    }

    public function test_login_fails_with_invalid_credentials(): void
    {
        User::factory()->create([
            'email' => 'wrong-pass@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'wrong-pass@example.com',
            'password' => 'invalid-password',
        ]);

        $response
            ->assertStatus(401)
            ->assertJsonPath('message', 'Email or password is invalid');
    }

    public function test_register_fails_when_confirm_password_mismatch(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Mismatch User',
            'email' => 'mismatch@example.com',
            'password' => 'secret123',
            'confirmPassword' => 'different123',
        ]);

        $response->assertStatus(422);
    }

    public function test_me_requires_authentication(): void
    {
        $this->getJson('/api/auth/me')->assertUnauthorized();
    }
}
