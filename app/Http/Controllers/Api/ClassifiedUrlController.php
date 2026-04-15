<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClassifiedUrl;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClassifiedUrlController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        $urls = ClassifiedUrl::query()
            ->where('final_label', 'bahaya')
            ->where(function ($query) use ($userId) {
                $query->whereNull('user_id')->orWhere('user_id', $userId);
            })
            ->orderByRaw('user_id is null desc')
            ->orderBy('url')
            ->get()
            ->map(fn(ClassifiedUrl $item) => $this->mapItem($item))
            ->values();

        return response()->json([
            'message' => 'Blocked websites fetched successfully',
            'data' => $urls,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'url' => ['required', 'string', 'max:255'],
        ]);

        $normalizedUrl = $this->normalizeUrl($validated['url']);

        $existing = ClassifiedUrl::query()
            ->where('user_id', $request->user()->id)
            ->where('url', $normalizedUrl)
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'Website already exists in your blocked list',
                'data' => $this->mapItem($existing),
            ]);
        }

        $created = ClassifiedUrl::create([
            'user_id' => $request->user()->id,
            'url' => $normalizedUrl,
            'final_label' => 'bahaya',
            'title' => $normalizedUrl,
            'description' => 'Blocked by parent',
            'title_raw' => $normalizedUrl,
        ]);

        return response()->json([
            'message' => 'Blocked website created successfully',
            'data' => $this->mapItem($created),
        ], 201);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'url' => ['required', 'string', 'max:255'],
        ]);

        $classifiedUrl = ClassifiedUrl::query()
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$classifiedUrl) {
            return response()->json([
                'message' => 'Blocked website not found',
                'data' => null,
            ], 404);
        }

        $normalizedUrl = $this->normalizeUrl($validated['url']);

        $exists = ClassifiedUrl::query()
            ->where('user_id', $request->user()->id)
            ->where('url', $normalizedUrl)
            ->where('id', '!=', $classifiedUrl->id)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Website already exists in your blocked list',
                'data' => $this->mapItem($classifiedUrl),
            ], 422);
        }

        $classifiedUrl->update([
            'url' => $normalizedUrl,
            'title' => $normalizedUrl,
            'title_raw' => $normalizedUrl,
        ]);

        return response()->json([
            'message' => 'Blocked website updated successfully',
            'data' => $this->mapItem($classifiedUrl->fresh()),
        ]);
    }

    public function destroy(Request $request, string $id): JsonResponse
    {
        $classifiedUrl = ClassifiedUrl::query()
            ->where('id', $id)
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$classifiedUrl) {
            return response()->json([
                'message' => 'Blocked website not found',
                'data' => null,
            ], 404);
        }

        $classifiedUrl->delete();

        return response()->json([
            'message' => 'Blocked website deleted successfully',
            'data' => null,
        ]);
    }

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

    private function normalizeUrl(string $url): string
    {
        $trimmed = trim(strtolower($url));

        if ($trimmed === '') {
            return $trimmed;
        }

        if (!str_contains($trimmed, '://')) {
            $trimmed = 'https://' . $trimmed;
        }

        $host = parse_url($trimmed, PHP_URL_HOST);
        if (is_string($host) && $host !== '') {
            return preg_replace('/^www\./', '', $host) ?? $host;
        }

        return preg_replace('/^www\./', '', $url) ?? $url;
    }

    private function mapItem(ClassifiedUrl $item): array
    {
        return [
            'id' => (string) $item->id,
            'url' => $item->url,
            'isGlobal' => $item->user_id === null,
            'label' => $item->final_label,
        ];
    }
}
