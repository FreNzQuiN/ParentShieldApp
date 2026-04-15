<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Child;
use Illuminate\Http\Request;

class ChildController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $children = Child::where('user_id', auth()->id())
            ->orderBy('name')
            ->get()
            ->map(fn(Child $child) => [
                'id' => (string) $child->id,
                'name' => $child->name,
                'parentsId' => (string) $child->user_id,
            ])
            ->values();

        return response()->json([
            'message' => 'Children fetched successfully',
            'data' => $children,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $child = Child::create([
            'user_id' => auth()->id(),
            'name' => $validated['name'],
        ]);

        return response()->json([
            'message' => 'Child created successfully',
            'data' => [
                'id' => (string) $child->id,
                'name' => $child->name,
                'parentsId' => (string) $child->user_id,
            ],
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $child = Child::where('user_id', auth()->id())->findOrFail($id);

        return response()->json([
            'message' => 'Child fetched successfully',
            'data' => [
                'id' => (string) $child->id,
                'name' => $child->name,
                'parentsId' => (string) $child->user_id,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $child = Child::where('user_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $child->update($validated);

        return response()->json([
            'message' => 'Child updated successfully',
            'data' => [
                'id' => (string) $child->id,
                'name' => $child->name,
                'parentsId' => (string) $child->user_id,
            ],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $child = Child::where('user_id', auth()->id())->findOrFail($id);
        $child->delete();

        return response()->json([
            'message' => 'Child deleted successfully',
            'data' => null,
        ]);
    }
}
