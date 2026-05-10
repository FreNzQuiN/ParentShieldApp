<?php

namespace App\Http\Controllers;

use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChildController extends Controller
{
    public function index(Request $request)
    {
        $children = $request->user()
            ->children()
            ->orderBy('name')
            ->get(['id', 'name']);

        return response()->json([
            'message' => 'Children fetched',
            'data' => $children,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator);
        }

        $child = $request->user()->children()->create([
            'name' => $request->input('name'),
        ]);

        return response()->json([
            'message' => 'Child created',
            'data' => $child,
        ]);
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator);
        }

        $child = $request->user()->children()->where('id', $id)->first();

        if (!$child) {
            return response()->json([
                'message' => 'Child not found',
            ], 404);
        }

        $child->update([
            'name' => $request->input('name'),
        ]);

        return response()->json([
            'message' => 'Child updated',
            'data' => $child,
        ]);
    }

    public function destroy(Request $request, string $id)
    {
        $child = $request->user()->children()->where('id', $id)->first();

        if (!$child) {
            return response()->json([
                'message' => 'Child not found',
            ], 404);
        }

        $child->delete();

        return response()->json([
            'message' => 'Child deleted',
        ]);
    }
}
