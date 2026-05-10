<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Validation\Validator;

abstract class Controller
{
    protected function validationErrorResponse(Validator $validator)
    {
        $messages = [];

        foreach ($validator->errors()->all() as $message) {
            $messages[] = ['message' => $message];
        }

        return response()->json([
            'message' => $messages,
        ], 422);
    }
}
