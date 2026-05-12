<?php

namespace App\Http\Controllers;

use App\Models\Child;
use App\Models\DangerousWebsite;
use App\Models\Log;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LogController extends Controller
{
    public function index(Request $request, string $childId)
    {
        $query = $this->baseQuery($request, $childId);

        $period = $request->query('period', '');
        $year = (int) $request->query('year', 0);
        $month = (int) $request->query('month', 0);
        $date = (int) $request->query('date', 0);

        if ($period === 'daily' && $year && $month && $date) {
            $query->whereDate('created_at', Carbon::create($year, $month, $date)->toDateString());
        } elseif ($period === 'monthly' && $year && $month) {
            $query->whereYear('created_at', $year)->whereMonth('created_at', $month);
        }

        $page = max(1, (int) $request->query('page', 1));
        $limit = max(1, (int) $request->query('limit', 10));

        $total = $query->count();

        $items = $query
            ->orderByDesc('created_at')
            ->skip(($page - 1) * $limit)
            ->take($limit)
            ->get();

        $formattedItems = $items->map(function (Log $log) {
            return $this->formatLogItem($log);
        });

        return response()->json([
            'message' => 'Log activity fetched',
            'data' => [
                'items' => $formattedItems,
                'total' => $total,
                'page' => $page,
                'limit' => $limit,
                'totalPage' => (int) ceil($total / $limit),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'childId' => 'required|integer',
            'url' => 'required|string',
            'web_title' => 'nullable|string',
            'web_description' => 'nullable|string',
            'detail_url' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator);
        }

        $user = $request->user();
        $child = Child::where('id', $request->input('childId'))
            ->where('parent_id', $user->id)
            ->first();

        if (!$child) {
            return response()->json([
                'message' => 'Child not found',
            ], 404);
        }

        $normalizedHost = $this->normalizeHost($request->input('url'));
        $isDangerous = DangerousWebsite::where('url', $normalizedHost)->exists();
        $finalLabel = $isDangerous ? 'bahaya' : 'aman';

        $log = Log::create([
            'parent_id' => $user->id,
            'child_id' => $child->id,
            'url' => $request->input('url'),
            'web_title' => $request->input('web_title'),
            'web_description' => $request->input('web_description'),
            'detail_url' => $request->input('detail_url'),
            'classified_final_label' => $finalLabel,
        ]);

        return response()->json([
            'message' => 'Log created',
            'data' => $this->formatLogItem($log),
        ], 201);
    }

    public function grantAccess(Request $request, string $logId)
    {
        $validator = Validator::make($request->all(), [
            'grantAccess' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator);
        }

        $grantAccess = filter_var($request->input('grantAccess'), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);

        if ($grantAccess === null) {
            return response()->json([
                'message' => 'grantAccess must be true or false',
            ], 422);
        }

        $log = Log::where('log_id', $logId)
            ->where('parent_id', $request->user()->id)
            ->first();

        if (!$log) {
            return response()->json([
                'message' => 'Log not found',
            ], 404);
        }

        $log->grant_access = $grantAccess;
        $log->save();

        return response()->json([
            'message' => 'Grant access updated',
            'data' => [
                'grantAccess' => $log->grant_access,
            ],
        ]);
    }

    public function summary(Request $request, string $childId)
    {
        $logs = $this->baseQuery($request, $childId)->get();

        $totals = $this->countGoodBad($logs);

        return response()->json([
            'message' => 'Summary fetched',
            'data' => [
                'totalSafeWebsites' => $totals['good'],
                'totalDangerousWebsites' => $totals['bad'],
            ],
        ]);
    }

    public function statisticYear(Request $request, string $childId)
    {
        $year = (int) $request->query('year', Carbon::now()->year);
        $logs = $this->baseQuery($request, $childId)
            ->whereYear('created_at', $year)
            ->get();

        $summaryByMonth = [];
        for ($month = 1; $month <= 12; $month++) {
            $summaryByMonth[$month] = ['good' => 0, 'bad' => 0];
        }

        foreach ($logs as $log) {
            $status = $this->resolveStatus($log);
            $month = $log->created_at?->month ?? null;

            if ($month && $status === 'good') {
                $summaryByMonth[$month]['good']++;
            } elseif ($month && $status === 'bad') {
                $summaryByMonth[$month]['bad']++;
            }
        }

        $data = [];
        foreach ($summaryByMonth as $month => $counts) {
            $data[] = [
                'month' => Carbon::create()->month($month)->format('F'),
                'Good' => $counts['good'],
                'Bad' => $counts['bad'],
            ];
        }

        return response()->json([
            'message' => 'Statistic year fetched',
            'data' => $data,
        ]);
    }

    public function statisticMonth(Request $request, string $childId)
    {
        $date = $request->query('date');

        if ($date && preg_match('/^(\d{4})-(\d{2})/', $date, $matches)) {
            $year = (int) $matches[1];
            $month = (int) $matches[2];
        } else {
            $year = Carbon::now()->year;
            $month = Carbon::now()->month;
        }

        $logs = $this->baseQuery($request, $childId)
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->get();

        $daysInMonth = Carbon::create($year, $month, 1)->daysInMonth;
        $summaryByDay = [];

        for ($day = 1; $day <= $daysInMonth; $day++) {
            $summaryByDay[$day] = ['good' => 0, 'bad' => 0];
        }

        foreach ($logs as $log) {
            $status = $this->resolveStatus($log);
            $day = $log->created_at?->day ?? null;

            if ($day && $status === 'good') {
                $summaryByDay[$day]['good']++;
            } elseif ($day && $status === 'bad') {
                $summaryByDay[$day]['bad']++;
            }
        }

        return response()->json([
            'message' => 'Statistic month fetched',
            'data' => array_map(function (array $counts, int $day) {
                return [
                    'day' => (string) $day,
                    'Good' => $counts['good'],
                    'Bad' => $counts['bad'],
                ];
            }, $summaryByDay, array_keys($summaryByDay)),
        ]);
    }

    private function baseQuery(Request $request, string $childId)
    {
        $query = Log::query()
            ->with('child')
            ->where('parent_id', $request->user()->id);

        if (strtoupper($childId) !== 'ALL') {
            $query->where('child_id', $childId);
        }

        return $query;
    }

    private function formatLogItem(Log $log): array
    {
        return [
            'log_id' => $log->log_id,
            'childId' => (string) $log->child_id,
            'url' => $log->url,
            'grant_access' => $log->grant_access,
            'createdAt' => $log->created_at?->toIso8601String(),
            'updatedAt' => $log->updated_at?->toIso8601String(),
            'classified_url' => [
                [
                    'FINAL_label' => $log->classified_final_label,
                    'title' => $log->classified_title,
                    'description' => $log->classified_description,
                    'title_raw' => $log->classified_title_raw,
                ],
            ],
            'child' => [
                'name' => $log->child?->name,
            ],
        ];
    }

    private function resolveStatus($log): ?string
    {
        if ($log->grant_access === true) {
            return 'good';
        }

        if ($log->grant_access === false) {
            return 'bad';
        }

        if ($log->classified_final_label === 'aman') {
            return 'good';
        }

        if ($log->classified_final_label === 'bahaya') {
            return 'bad';
        }

        return null;
    }

    private function countGoodBad($logs): array
    {
        $good = 0;
        $bad = 0;

        foreach ($logs as $log) {
            $status = $this->resolveStatus($log);

            if ($status === 'good') {
                $good++;
            } elseif ($status === 'bad') {
                $bad++;
            }
        }

        return [
            'good' => $good,
            'bad' => $bad,
        ];
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
