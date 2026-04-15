<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ChildController;
use App\Http\Controllers\Api\ClassifiedUrlController;
use App\Http\Controllers\Api\LogActivityController;
use App\Http\Controllers\Api\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });

    Route::put('/profile/{id}', [ProfileController::class, 'update']);

    Route::apiResource('child', ChildController::class);

    Route::prefix('classified-url')->group(function () {
        Route::get('/dangerous-website', [ClassifiedUrlController::class, 'dangerousWebsite']);
        Route::get('/dangerous-website/{userId}', [ClassifiedUrlController::class, 'dangerousWebsiteByUser']);
    });

    Route::post('/log', [LogActivityController::class, 'store']);
    Route::get('/log/{childId}', [LogActivityController::class, 'index']);
    Route::put('/log/grant-access/{logId}', [LogActivityController::class, 'grantAccess']);
    Route::get('/log/summary/{childId}', [LogActivityController::class, 'summary']);
    Route::get('/log/statistic-year/{childId}', [LogActivityController::class, 'statisticYear']);
    Route::get('/log/statistic-month/{childId}', [LogActivityController::class, 'statisticMonth']);
});
