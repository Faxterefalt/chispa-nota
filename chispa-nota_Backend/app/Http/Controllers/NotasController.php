<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NotasModel;

class NotasController extends Controller
{
    public function index()
    {
        $notas = NotasModel::all();
        return $notas;
    }

    public function store(Request $request)
    {
        $request->validate([
            'carpeta_id' => 'required|exists:carpetas,id',
            'descripcion_not' => 'required|string',
        ]);

        $nota = new NotasModel();
        $nota->carpeta_id = $request->carpeta_id;
        $nota->descripcion_not = $request->descripcion_not;
        $nota->save();

        return response()->json([
            'message' => 'Nota creada exitosamente'
        ], 201);
    }

    public function show($id)
    {
        $nota = NotasModel::findOrFail($id);
        return $nota;
    }

    public function update(Request $request, $id)
    {
        $nota = NotasModel::findOrFail($id);

        $request->validate([
            'carpeta_id' => 'required|exists:carpetas,id',
            'descripcion_not' => 'required|string',
        ]);

        $nota->carpeta_id = $request->carpeta_id;
        $nota->descripcion_not = $request->descripcion_not;
        $nota->save();

        return response()->json([
            'message' => 'Nota actualizada exitosamente'
        ]);
    }

    public function destroy($id)
    {
        $nota = NotasModel::findOrFail($id);
        $nota->delete();

        return response()->json([
            'message' => 'Nota eliminada exitosamente'
        ]);
    }
}
