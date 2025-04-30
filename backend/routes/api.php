<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // User routes
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user', [UserController::class, 'update']);
    
    // Content routes
    Route::get('/content', [ContentController::class, 'index']);
    Route::post('/content', [ContentController::class, 'store']);
    Route::get('/content/{content}', [ContentController::class, 'show']);
    Route::put('/content/{content}', [ContentController::class, 'update']);
    Route::delete('/content/{content}', [ContentController::class, 'destroy']);
    Route::post('/content/{content}/like', [ContentController::class, 'like']);
    Route::post('/content/{content}/comments', [ContentController::class, 'addComment']);
});