<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ColumnasModel;

class ColumnasController extends Controller
{
    public function index()
    {
        $columnas = ColumnasModel::all();
        return $columnas;
    }

    public function store(Request $request)
    {
        $request->validate([
            'carpeta_id' => 'required|exists:carpetas,id',
            'nombre_col' => 'required|string',
        ]);

        $columna = new ColumnasModel();
        $columna->carpeta_id = $request->carpeta_id;
        $columna->nombre_col = $request->nombre_col;
        $columna->save();

        return response()->json([
            'message' => 'Columna creada exitosamente'
        ], 201);
    }

    public function show($id)
    {
        $columna = ColumnasModel::findOrFail($id);
        return $columna;
    }

    public function update(Request $request, $id)
    {
        $columna = ColumnasModel::findOrFail($id);

        $request->validate([
            'carpeta_id' => 'required|exists:carpetas,id',
            'nombre_col' => 'required|string',
        ]);

        $columna->carpeta_id = $request->carpeta_id;
        $columna->nombre_col = $request->nombre_col;
        $columna->save();

        return response()->json([
            'message' => 'Columna actualizada exitosamente'
        ]);
    }

    public function destroy($id)
    {
        $columna = ColumnasModel::findOrFail($id);
        $columna->delete();

        return response()->json([
            'message' => 'Columna eliminada exitosamente'
        ]);
    }
}
