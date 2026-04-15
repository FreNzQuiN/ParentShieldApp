<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function update(Request $request, string $id)
    {
        $user = $request->user();

        if ((string) $user->id !== $id) {
            return response()->json([
                'message' => 'Forbidden',
                'data' => null,
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => ['sometimes', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'oldPassword' => 'nullable|string',
            'newPassword' => 'nullable|string|min:8',
            'confirmPassword' => 'nullable|string|same:newPassword',
        ]);

        if (!empty($validated['newPassword'])) {
            if (empty($validated['oldPassword']) || !Hash::check($validated['oldPassword'], $user->password)) {
                return response()->json([
                    'message' => 'Old password is invalid',
                    'data' => null,
                ], 422);
            }

            $user->password = $validated['newPassword'];
        }

        if (array_key_exists('name', $validated)) {
            $user->name = $validated['name'];
        }

        if (array_key_exists('email', $validated)) {
            $user->email = $validated['email'];
        }

        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'data' => [
                'id' => (string) $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
