<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\RecuperacionModel;

class RecuperacionController extends Controller
{
    public function index()
    {
        $recuperaciones = RecuperacionModel::all();
        return $recuperaciones;
    }

    public function store(Request $request)
    {
        $request->validate([
            'cuenta_id' => 'required|exists:cuentas,id',
            'tipo_recuperacion' => 'required|string',
            'inicio_recuperacion' => 'required|date',
            'vencimiento_recuperacion' => 'required|date',
            'estado' => 'required|boolean',
            'codigo' => 'required|string',
            'registro_acceso' => 'required|date',
            'registro_fallo' => 'required|date',
        ]);

        $recuperacion = new RecuperacionModel();
        $recuperacion->cuenta_id = $request->cuenta_id;
        $recuperacion->tipo_recuperacion = $request->tipo_recuperacion;
        $recuperacion->inicio_recuperacion = $request->inicio_recuperacion;
        $recuperacion->vencimiento_recuperacion = $request->vencimiento_recuperacion;
        $recuperacion->estado = $request->estado;
        $recuperacion->codigo = $request->codigo;
        $recuperacion->registro_acceso = $request->registro_acceso;
        $recuperacion->registro_fallo = $request->registro_fallo;
        $recuperacion->save();

        return response()->json([
            'message' => 'Recuperación creada exitosamente'
        ], 201);
    }

    public function show($id)
    {
        $recuperacion = RecuperacionModel::findOrFail($id);
        return $recuperacion;
    }

    public function update(Request $request, $id)
    {
        $recuperacion = RecuperacionModel::findOrFail($id);

        $request->validate([
            'cuenta_id' => 'required|exists:cuentas,id',
            'tipo_recuperacion' => 'required|string',
            'inicio_recuperacion' => 'required|date',
            'vencimiento_recuperacion' => 'required|date',
            'estado' => 'required|boolean',
            'codigo' => 'required|string',
            'registro_acceso' => 'required|date',
            'registro_fallo' => 'required|date',
        ]);

        $recuperacion->cuenta_id = $request->cuenta_id;
        $recuperacion->tipo_recuperacion = $request->tipo_recuperacion;
        $recuperacion->inicio_recuperacion = $request->inicio_recuperacion;
        $recuperacion->vencimiento_recuperacion = $request->vencimiento_recuperacion;
        $recuperacion->estado = $request->estado;
        $recuperacion->codigo = $request->codigo;
        $recuperacion->registro_acceso = $request->registro_acceso;
        $recuperacion->registro_fallo = $request->registro_fallo;
        $recuperacion->save();

        return response()->json([
            'message' => 'Recuperación actualizada exitosamente'
        ]);
    }

    public function destroy($id)
    {
        $recuperacion = RecuperacionModel::findOrFail($id);
        $recuperacion->delete();

        return response()->json([
            'message' => 'Recuperación eliminada exitosamente'
        ]);
    }
}
