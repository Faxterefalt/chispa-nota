<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CarpetasModel;

class CarpetasController extends Controller
{
    public function index()
    {
        $carpetas = CarpetasModel::all();
        return $carpetas;
    }

    public function store(Request $request)
    {
        $request->validate([
            'cuenta_id' => 'required|exists:cuentas,id',
            'nombre_carp' => 'required|string',
            'descripcion_carp' => 'required|string',
            'fecha_creacion_carp' => 'required|date',
        ]);

        $carpeta = new CarpetasModel();
        $carpeta->cuenta_id = $request->cuenta_id;
        $carpeta->nombre_carp = $request->nombre_carp;
        $carpeta->descripcion_carp = $request->descripcion_carp;
        $carpeta->fecha_creacion_carp = $request->fecha_creacion_carp;
        $carpeta->save();

        return response()->json([
            'message' => 'Carpeta creada exitosamente'
        ], 201);
    }

    public function show($id)
    {
        $carpeta = CarpetasModel::findOrFail($id);
        return $carpeta;
    }
    public function update(Request $request, $id)
    {
        $carpeta = CarpetasModel::findOrFail($id);

        $request->validate([
            'cuenta_id' => 'required|exists:cuentas,id',
            'nombre_carp' => 'required|string',
            'descripcion_carp' => 'required|string',
            'fecha_creacion_carp' => 'required|date',
        ]);

        $carpeta->cuenta_id = $request->cuenta_id;
        $carpeta->nombre_carp = $request->nombre_carp;
        $carpeta->descripcion_carp = $request->descripcion_carp;
        $carpeta->fecha_creacion_carp = $request->fecha_creacion_carp;
        $carpeta->save();

        return response()->json([
            'message' => 'Carpeta actualizada exitosamente'
        ]);
    }

    public function destroy($id)
    {
        $carpeta = CarpetasModel::findOrFail($id);
        $carpeta->delete();

        return response()->json([
            'message' => 'Carpeta eliminada exitosamente'
        ]);
    }
}

