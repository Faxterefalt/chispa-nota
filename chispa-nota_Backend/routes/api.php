<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\CarpetasController;
use App\Http\Controllers\RecuperacionController;
use App\Http\Controllers\CuentasController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UsuariosController::class)->group(function(){
    Route::get('/usuarios', [UsuariosController::class, 'index']);
    Route::post('/usuarios', [UsuariosController::class, 'store']);
    Route::get('/usuarios/{id}', [UsuariosController::class, 'show']);
    Route::put('/usuarios/{id}', [UsuariosController::class, 'update']);
    Route::delete('/usuarios/{id}', [UsuariosController::class, 'destroy']);
});
Route::controller(CuentasController::class)->group(function(){
    Route::get('/cuentas', [CuentasController::class, 'index']);
    Route::post('/cuentas', [CuentasController::class, 'store']);
    Route::get('/cuentas/{id}', [CuentasController::class, 'show']);
    Route::put('/cuentas/{id}', [CuentasController::class, 'update']);
    Route::delete('/cuentas/{id}', [CuentasController::class, 'destroy']);
});
Route::controller(CarpetasController::class)->group(function(){
    Route::get('/carpetas', [CarpetasController::class, 'index']);
    Route::post('/carpetas', [CarpetasController::class, 'store']);
    Route::get('/carpetas/{id}', [CarpetasController::class, 'show']);
    Route::put('/carpetas/{id}', [CarpetasController::class, 'update']);
    Route::delete('/carpetas/{id}', [CarpetasController::class, 'destroy']);
});
Route::controller(RecuperacionController::class)->group(function(){
    Route::get('/recuperacion', [RecuperacionController::class, 'index']);
    Route::post('/recuperacion', [RecuperacionController::class, 'store']);
    Route::get('/recuperacion/{id}', [RecuperacionController::class, 'show']);
    Route::put('/recuperacion/{id}', [RecuperacionController::class, 'update']);
    Route::delete('/recuperacion/{id}', [RecuperacionController::class, 'destroy']);
});