<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChildController;
use App\Http\Controllers\ClassifiedUrlController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ProfileController;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->get('me', [AuthController::class, 'me']);
    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
});

Route::get('classified-url/dangerous-website', [ClassifiedUrlController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::put('profile/{id}', [ProfileController::class, 'update']);

    Route::get('child', [ChildController::class, 'index']);
    Route::post('child', [ChildController::class, 'store']);
    Route::put('child/{id}', [ChildController::class, 'update']);
    Route::delete('child/{id}', [ChildController::class, 'destroy']);

    Route::post('log', [LogController::class, 'store']);
    Route::get('log/summary/{childId}', [LogController::class, 'summary']);
    Route::get('log/statistic-year/{childId}', [LogController::class, 'statisticYear']);
    Route::get('log/statistic-month/{childId}', [LogController::class, 'statisticMonth']);
    Route::put('log/grant-access/{logId}', [LogController::class, 'grantAccess']);
    Route::get('log/{childId}', [LogController::class, 'index']);

    Route::get('classified-url/dangerous-website/{childId}', [ClassifiedUrlController::class, 'forChild']);
});
