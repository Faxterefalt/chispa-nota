<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuariosController;
use App\Http\Controllers\CarpetasController;
use App\Http\Controllers\RecuperacionController;
use App\Http\Controllers\CuentasController;
use App\Http\Controllers\PizarrasController;
use App\Http\Controllers\ColumnasController;
use App\Http\Controllers\TareasController;
use App\Http\Controllers\ListaTareasController;
use App\Http\Controllers\NotasController;
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


Route::controller(CuentasController::class)->group(function(){
    Route::get('/cuentas', [CuentasController::class, 'index']);
    Route::post('/cuentas', [CuentasController::class, 'store']);
    Route::post('/cuentas/login', [CuentasController::class, 'login']);
    Route::post('/cuentas/google-login', [CuentasController::class, 'googleLogin']);
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
Route::controller(PizarrasController::class)->group(function(){
   
});

Route::controller(ColumnasController::class)->group(function(){
    Route::get('/columnas', [ColumnasController::class, 'index']);
    Route::post('/columnas', [ColumnasController::class, 'store']);
    Route::get('/columnas/{id}', [ColumnasController::class, 'show']);
    Route::put('/columnas/{id}', [ColumnasController::class, 'update']);
    Route::delete('/columnas/{id}', [ColumnasController::class, 'destroy']);
});


Route::controller(TareasController::class)->group(function(){
    Route::get('/tareas', [TareasController::class, 'index']);
    Route::post('/tareas', [TareasController::class, 'store']);
    Route::get('/tareas/{id}', [TareasController::class, 'show']);
    Route::put('/tareas/{id}', [TareasController::class, 'update']);
    Route::delete('/tareas/{id}', [TareasController::class, 'destroy']);
});


Route::controller(ListaTareasController::class)->group(function(){
    Route::get('/lista_tareas', [ListaTareasController::class, 'index']);
    Route::post('/lista_tareas', [ListaTareasController::class, 'store']);
    Route::get('/lista_tareas/{id}', [ListaTareasController::class, 'show']);
    Route::put('/lista_tareas/{id}', [ListaTareasController::class, 'update']);
    Route::delete('/lista_tareas/{id}', [ListaTareasController::class, 'destroy']);
});


Route::controller(NotasController::class)->group(function(){
    Route::get('/notas', [NotasController::class, 'index']);
    Route::post('/notas', [NotasController::class, 'store']);
    Route::get('/notas/{id}', [NotasController::class, 'show']);
    Route::put('/notas/{id}', [NotasController::class, 'update']);
    Route::delete('/notas/{id}', [NotasController::class, 'destroy']);
});