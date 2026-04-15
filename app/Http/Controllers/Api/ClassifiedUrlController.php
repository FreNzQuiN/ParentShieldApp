<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClassifiedUrl;
use Illuminate\Http\Request;

class ClassifiedUrlController extends Controller
{
    public function dangerousWebsite(Request $request)
    {
        $urls = ClassifiedUrl::query()
            ->where('final_label', 'bahaya')
            ->whereNull('user_id')
            ->pluck('url')
            ->unique()
            ->values();

        return response()->json([
            'message' => 'Dangerous websites fetched successfully',
            'data' => $urls,
        ]);
    }

    public function dangerousWebsiteByUser(Request $request, string $userId)
    {
        if ((string) $request->user()->id !== $userId) {
            return response()->json([
                'message' => 'Forbidden',
                'data' => null,
            ], 403);
        }

        $urls = ClassifiedUrl::query()
            ->where('final_label', 'bahaya')
            ->where(function ($query) use ($userId) {
                $query->whereNull('user_id')->orWhere('user_id', $userId);
            })
            ->pluck('url')
            ->unique()
            ->values();

        return response()->json([
            'message' => 'Dangerous websites fetched successfully',
            'data' => $urls,
        ]);
    }
}
