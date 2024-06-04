<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TareasModel;
class TareasController extends Controller
{
    public function index()
    {
        $tareas = TareasModel::all();
        return $tareas;
    }

    public function store(Request $request)
    {
        $request->validate([
            'lista_tareas_id' => 'required|exists:lista_tareas,id',
            'nombre_tar' => 'required|string',
            'descripcion_tar' => 'nullable|string',
        ]);

        $tarea = new TareasModel();
        $tarea->lista_tareas_id = $request->lista_tareas_id;
        $tarea->nombre_tar = $request->nombre_tar;
        $tarea->descripcion_tar = $request->descripcion_tar;
        $tarea->save();

        return response()->json([
            'message' => 'Tarea creada exitosamente'
        ], 201);
    }

    public function show($id)
    {
        $tarea = TareasModel::findOrFail($id);
        return $tarea;
    }

    public function update(Request $request, $id)
    {
        $tarea = TareasModel::findOrFail($id);

        $request->validate([
            'lista_tareas_id' => 'required|exists:lista_tareas,id',
            'nombre_tar' => 'required|string',
            'descripcion_tar' => 'nullable|string',
        ]);

        $tarea->lista_tareas_id = $request->lista_tareas_id;
        $tarea->nombre_tar = $request->nombre_tar;
        $tarea->descripcion_tar = $request->descripcion_tar;
        $tarea->save();

        return response()->json([
            'message' => 'Tarea actualizada exitosamente'
        ]);
    }

    public function destroy($id)
    {
        $tarea = TareasModel::findOrFail($id);
        $tarea->delete();

        return response()->json([
            'message' => 'Tarea eliminada exitosamente'
        ]);
    }
}
