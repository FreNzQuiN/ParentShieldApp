<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Child;
use App\Models\ClassifiedUrl;
use App\Models\LogActivity;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class LogActivityController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'childId' => 'required|integer|exists:children,id',
            'parentId' => 'nullable|integer',
            'url' => 'required|string|max:4000',
            'web_title' => 'nullable|string|max:255',
            'web_description' => 'nullable|string',
            'detail_url' => 'nullable|string|max:4000',
        ]);

        $user = $request->user();

        if (!empty($validated['parentId']) && (int) $validated['parentId'] !== (int) $user->id) {
            return response()->json([
                'message' => 'Parent mismatch',
                'data' => null,
            ], 422);
        }

        $child = Child::where('id', $validated['childId'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        $log = LogActivity::create([
            'child_id' => $child->id,
            'parent_id' => $user->id,
            'url' => $validated['url'],
            'web_title' => $validated['web_title'] ?? null,
            'web_description' => $validated['web_description'] ?? null,
            'detail_url' => $validated['detail_url'] ?? null,
            'grant_access' => null,
        ]);

        return response()->json([
            'message' => 'Log activity stored successfully',
            'data' => $this->transformLogItem($log->load('child')),
        ], 201);
    }

    public function index(Request $request, string $childId)
    {
        $request->validate([
            'period' => 'nullable|in:,daily,monthly',
            'page' => 'nullable|integer|min:1',
            'limit' => 'nullable|integer|min:1|max:100',
            'month' => 'nullable|integer|min:1|max:12',
            'year' => 'nullable|integer|min:2000|max:2200',
            'date' => 'nullable|integer|min:1|max:31',
        ]);

        $query = $this->baseLogQuery($request, $childId);

        $period = $request->input('period', '');
        if ($period === 'daily') {
            $year = (int) $request->input('year', Carbon::now()->year);
            $month = (int) $request->input('month', Carbon::now()->month);
            $date = (int) $request->input('date', Carbon::now()->day);

            $query->whereYear('created_at', $year)
                ->whereMonth('created_at', $month)
                ->whereDay('created_at', $date);
        }

        if ($period === 'monthly') {
            $year = (int) $request->input('year', Carbon::now()->year);
            $month = (int) $request->input('month', Carbon::now()->month);

            $query->whereYear('created_at', $year)
                ->whereMonth('created_at', $month);
        }

        $page = (int) $request->input('page', 1);
        $limit = (int) $request->input('limit', 10);

        $paginator = $query->orderByDesc('created_at')->paginate($limit, ['*'], 'page', $page);

        return response()->json([
            'message' => 'Log activities fetched successfully',
            'data' => [
                'items' => $paginator->getCollection()->map(fn(LogActivity $log) => $this->transformLogItem($log))->values(),
                'total' => $paginator->total(),
                'page' => $paginator->currentPage(),
                'limit' => $paginator->perPage(),
                'totalPage' => $paginator->lastPage(),
            ],
        ]);
    }

    public function grantAccess(Request $request, string $logId)
    {
        $validated = $request->validate([
            'grantAccess' => 'required',
        ]);

        $grantAccess = filter_var($validated['grantAccess'], FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        if ($grantAccess === null) {
            return response()->json([
                'message' => 'grantAccess must be boolean',
                'data' => null,
            ], 422);
        }

        $log = LogActivity::where('parent_id', $request->user()->id)->findOrFail($logId);
        $log->grant_access = $grantAccess;
        $log->save();

        return response()->json([
            'message' => 'Grant access updated successfully',
            'data' => [
                'logId' => (string) $log->id,
                'grantAccess' => $log->grant_access,
            ],
        ]);
    }

    public function summary(Request $request, string $childId)
    {
        $query = $this->baseLogQuery($request, $childId);
        $logs = $query->get(['id', 'url', 'grant_access']);

        $dangerousUrls = $this->dangerousUrlMap($request->user()->id);

        $safe = 0;
        $dangerous = 0;

        foreach ($logs as $log) {
            if ($log->grant_access === true) {
                $safe++;
                continue;
            }

            $normalizedUrl = $this->normalizeUrl($log->url);
            if ($log->grant_access === false || isset($dangerousUrls[$normalizedUrl])) {
                $dangerous++;
                continue;
            }
        }

        return response()->json([
            'message' => 'Summary fetched successfully',
            'data' => [
                'totalSafeWebsites' => $safe,
                'totalDangerousWebsites' => $dangerous,
                'persentageSafeWebsite' => ($safe + $dangerous) > 0 ? round(($safe / ($safe + $dangerous)) * 100, 2) : 0,
                'persentageDangerousWebsite' => ($safe + $dangerous) > 0 ? round(($dangerous / ($safe + $dangerous)) * 100, 2) : 0,
            ],
        ]);
    }

    public function statisticYear(Request $request, string $childId)
    {
        $year = (int) $request->input('year', Carbon::now()->year);

        $query = $this->baseLogQuery($request, $childId)
            ->whereYear('created_at', $year)
            ->get(['id', 'url', 'grant_access', 'created_at']);

        $dangerousUrls = $this->dangerousUrlMap($request->user()->id);
        $result = [];

        for ($month = 1; $month <= 12; $month++) {
            $result[$month] = [
                'month' => Carbon::create($year, $month, 1)->format('F'),
                'Good' => 0,
                'Bad' => 0,
            ];
        }

        foreach ($query as $log) {
            $month = (int) Carbon::parse($log->created_at)->month;
            $normalizedUrl = $this->normalizeUrl($log->url);

            if ($log->grant_access === true) {
                $result[$month]['Good']++;
            } elseif ($log->grant_access === false || isset($dangerousUrls[$normalizedUrl])) {
                $result[$month]['Bad']++;
            }
        }

        return response()->json([
            'message' => 'Yearly statistic fetched successfully',
            'data' => array_values($result),
        ]);
    }

    public function statisticMonth(Request $request, string $childId)
    {
        $dateInput = (string) $request->input('date', Carbon::now()->format('Y-m'));
        $targetDate = Carbon::createFromFormat('Y-m', $dateInput);

        $query = $this->baseLogQuery($request, $childId)
            ->whereYear('created_at', $targetDate->year)
            ->whereMonth('created_at', $targetDate->month)
            ->get(['id', 'url', 'grant_access']);

        $dangerousUrls = $this->dangerousUrlMap($request->user()->id);

        $good = 0;
        $bad = 0;

        foreach ($query as $log) {
            $normalizedUrl = $this->normalizeUrl($log->url);
            if ($log->grant_access === true) {
                $good++;
            } elseif ($log->grant_access === false || isset($dangerousUrls[$normalizedUrl])) {
                $bad++;
            }
        }

        return response()->json([
            'message' => 'Monthly statistic fetched successfully',
            'data' => [
                ['name' => 'Good', 'value' => $good],
                ['name' => 'Bad', 'value' => $bad],
            ],
        ]);
    }

    private function baseLogQuery(Request $request, string $childId): Builder
    {
        $query = LogActivity::with('child')
            ->where('parent_id', $request->user()->id);

        if (strtoupper($childId) !== 'ALL') {
            $child = Child::where('id', $childId)
                ->where('user_id', $request->user()->id)
                ->firstOrFail();
            $query->where('child_id', $child->id);
        }

        return $query;
    }

    private function dangerousUrlMap(int $userId): array
    {
        $dangerousUrls = ClassifiedUrl::query()
            ->where('final_label', 'bahaya')
            ->where(function (Builder $query) use ($userId) {
                $query->whereNull('user_id')->orWhere('user_id', $userId);
            })
            ->pluck('url')
            ->map(fn(string $url) => $this->normalizeUrl($url))
            ->unique()
            ->values()
            ->all();

        return array_fill_keys($dangerousUrls, true);
    }

    private function normalizeUrl(string $url): string
    {
        $host = parse_url($url, PHP_URL_HOST);
        $value = $host ?: $url;
        $value = str_replace(['http://', 'https://', 'www.'], '', $value);

        return strtolower(trim($value, '/'));
    }

    private function transformLogItem(LogActivity $log): array
    {
        $normalizedUrl = $this->normalizeUrl($log->url);
        $classification = ClassifiedUrl::query()
            ->where(function (Builder $query) use ($normalizedUrl, $log) {
                $query->where('url', $normalizedUrl)
                    ->orWhere('url', $this->normalizeUrl($log->url));
            })
            ->where(function (Builder $query) use ($log) {
                $query->whereNull('user_id')->orWhere('user_id', $log->parent_id);
            })
            ->latest('id')
            ->first();

        return [
            'log_id' => (string) $log->id,
            'childId' => (string) $log->child_id,
            'url' => $log->url,
            'grant_access' => $log->grant_access,
            'createdAt' => $log->created_at?->toISOString(),
            'updatedAt' => $log->updated_at?->toISOString(),
            'classified_url' => $classification ? [
                [
                    'FINAL_label' => $classification->final_label,
                    'title' => $classification->title,
                    'description' => $classification->description,
                    'title_raw' => $classification->title_raw,
                ]
            ] : [],
            'child' => [
                'name' => $log->child?->name ?? 'Unknown',
            ],
        ];
    }
}
