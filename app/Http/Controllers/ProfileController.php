<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function update(Request $request, string $id)
    {
        $user = $request->user();

        if ((string) $user->id !== (string) $id) {
            return response()->json([
                'message' => 'Forbidden',
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255|unique:users,email,' . $user->id,
            'oldPassword' => 'required|string',
            'newPassword' => 'required|string|min:6',
            'confirmPassword' => 'required|same:newPassword',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator);
        }

        if (!Hash::check($request->input('oldPassword'), $user->password)) {
            return response()->json([
                'message' => 'Old password is incorrect',
            ], 400);
        }

        $updateData = [
            'password' => Hash::make($request->input('newPassword')),
        ];

        if ($request->filled('name')) {
            $updateData['name'] = $request->input('name');
        }

        if ($request->filled('email')) {
            $updateData['email'] = $request->input('email');
        }

        $user->update($updateData);

        return response()->json([
            'message' => 'Profile updated',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }
}
