<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\UsuariosModel;


class UsuariosController extends Controller
{
    public function index()
    {
        $usuarios = UsuariosModel::all();
        return $usuarios;
    }

    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:usuarios',
            'nombre_usu' => 'required|string',
            'apellido_pa_usu' => 'required|string',
            'apellido_ma_usu' => 'required|string',
        ]);

        $usuario = new UsuariosModel();
        $usuario->email = $request->email;
        $usuario->nombre_usu = $request->nombre_usu;
        $usuario->apellido_pa_usu = $request->apellido_pa_usu;
        $usuario->apellido_ma_usu = $request->apellido_ma_usu;
        $usuario->save();

        return response()->json([
            'message' => 'Usuario creado exitosamente'
        ], 201);
    }

    public function show($id)
    {
        $usuario = UsuariosModel::findOrFail($id);
        return $usuario;
    }

    public function update(Request $request, $id)
    {
        $usuario = UsuariosModel::findOrFail($id);

         $request->validate([
            'email' => 'required|email|unique:usuarios,email,' . $id,
            'nombre_usu' => 'required|string',
            'apellido_pa_usu' => 'required|string',
            'apellido_ma_usu' => 'required|string',
        ]);

        $usuario->email = $request->email;
        $usuario->nombre_usu = $request->nombre_usu;
        $usuario->apellido_pa_usu = $request->apellido_pa_usu;
        $usuario->apellido_ma_usu = $request->apellido_ma_usu;
        $usuario->save();

        return response()->json([
            'message' => 'Usuario actualizado exitosamente'
        ]);
    }

    public function destroy($id)
    {
        $usuario = UsuariosModel::findOrFail($id);
        $usuario->delete();

        return response()->json([
            'message' => 'Usuario eliminado exitosamente'
        ]);
    }
}
