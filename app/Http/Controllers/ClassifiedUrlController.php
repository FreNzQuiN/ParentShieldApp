<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\DangerousWebsite;
use App\Models\Log;
use Illuminate\Http\Request;

class ClassifiedUrlController extends Controller
{
    public function index()
    {
        $websites = DangerousWebsite::orderBy('url')->get(['url']);

        return response()->json([
            'message' => 'Dangerous websites fetched',
            'data' => $websites,
        ]);
    }

    public function forChild(Request $request, string $childId)
    {
        $child = Child::where('id', $childId)
            ->where('parent_id', $request->user()->id)
            ->first();

        if (!$child) {
            return response()->json([
                'message' => 'Child not found',
            ], 404);
        }

        $blocked = DangerousWebsite::pluck('url')->toArray();

        $lockedLogs = Log::where('parent_id', $request->user()->id)
            ->where('child_id', $childId)
            ->where(function ($query) {
                $query->where('grant_access', false)
                    ->orWhere(function ($innerQuery) {
                        $innerQuery->whereNull('grant_access')
                            ->where('classified_final_label', 'bahaya');
                    });
            })
            ->get();

        foreach ($lockedLogs as $log) {
            $blocked[] = $this->normalizeHost($log->url);
        }

        $blocked = array_values(array_unique($blocked));

        return response()->json([
            'message' => 'Dangerous websites for child fetched',
            'data' => $blocked,
        ]);
    }

    private function normalizeHost(string $url): string
    {
        $host = parse_url($url, PHP_URL_HOST);

        if (!$host) {
            $host = $url;
        }

        $host = preg_replace('/^www\./', '', $host);

        return strtolower(rtrim($host, '/'));
    }
}
