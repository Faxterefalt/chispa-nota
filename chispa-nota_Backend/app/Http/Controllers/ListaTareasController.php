<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ListaTareasModel;

class ListaTareasController extends Controller
{
    public function index()
    {
        $listaTareas = ListaTareasModel::all();
        return $listaTareas;
    }

    public function store(Request $request)
    {
        $request->validate([
            'columna_id' => 'required|exists:columnas,id',
            'nombre_list' => 'required|string',
            'descripcion_list' => 'nullable|string',
        ]);

        $listaTarea = new ListaTareasModel();
        $listaTarea->columna_id = $request->columna_id;
        $listaTarea->nombre_list = $request->nombre_list;
        $listaTarea->descripcion_list = $request->descripcion_list;
        $listaTarea->save();

        return response()->json([
            'message' => 'Lista de tareas creada exitosamente'
        ], 201);
    }

    public function show($id)
    {
        $listaTarea = ListaTareasModel::findOrFail($id);
        return $listaTarea;
    }

    public function update(Request $request, $id)
    {
        $listaTarea = ListaTareasModel::findOrFail($id);

        $request->validate([
            'columna_id' => 'required|exists:columnas,id',
            'nombre_list' => 'required|string',
            'descripcion_list' => 'nullable|string',
        ]);

        $listaTarea->columna_id = $request->columna_id;
        $listaTarea->nombre_list = $request->nombre_list;
        $listaTarea->descripcion_list = $request->descripcion_list;
        $listaTarea->save();

        return response()->json([
            'message' => 'Lista de tareas actualizada exitosamente'
        ]);
    }

    public function destroy($id)
    {
        $listaTarea = ListaTareasModel::findOrFail($id);
        $listaTarea->delete();

        return response()->json([
            'message' => 'Lista de tareas eliminada exitosamente'
        ]);
    }
}
