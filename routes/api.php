<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController ;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryListResource;
use App\Models\Category;
use App\Http\Resources\UserResource;
use App\Http\Resources\UserCollection;
use App\Models\User;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Route::get('test',function(){   Return 'success';    });

    Route::apiResource('users', CategoryController::class);
    Route::apiResource('categorys', CategoryController::class);
    
    Route::get('/deleteuser/{id}', [AuthController::class, 'destroy']);
    Route::get('/showuser/{id}', [AuthController::class, 'show']);
    Route::post('/stores', [AuthController::class,'store']);
    Route::get('/index', [AuthController::class,'index']);
   // Route::get('/index2', [AuthController::class,'index2']);
   Route::post('/login', [AuthController::class, 'login']);
   Route::post('/stores', [AuthController::class,'store']);