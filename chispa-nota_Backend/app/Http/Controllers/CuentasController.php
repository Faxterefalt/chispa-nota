<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CuentasModel;

class CuentasController extends Controller
{
    public function index()
    {
        $cuentas = CuentasModel::all();
        return $cuentas;
    }

    public function store(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
            'fecha_creacion' => 'required|date',
            'fecha_fin' => 'required|date',
        ]);

        $cuenta = new CuentasModel();
        $cuenta->nombre_usu = $request->nombre_usu;
        $cuenta->apellido_pa_usu = $request->apellido_pa_usu;
        $cuenta->apellido_ma_usu = $request->apellido_ma_usu;
        $cuenta->email = $request->email;
        $cuenta->login = $request->login;
        $cuenta->password = $request->password;
        $cuenta->fecha_creacion = $request->fecha_creacion;
        $cuenta->fecha_fin = $request->fecha_fin;
        $cuenta->save();

        return response()->json([
            'message' => 'Cuenta creada exitosamente'
        ], 201);
    }

    public function show($id)
    {
        $cuenta = CuentasModel::findOrFail($id);
        return $cuenta;
    }

    public function update(Request $request, $id)
    {
        $cuenta = CuentasModel::findOrFail($id);

        $request->validate([
            'login' => 'required|string',
            'password' => 'required|string',
            'fecha_creacion' => 'required|date',
            'fecha_fin' => 'required|date',
        ]);

        $cuenta->nombre_usu = $request->nombre_usu;
        $cuenta->apellido_pa_usu = $request->apellido_pa_usu;
        $cuenta->apellido_ma_usu = $request->apellido_ma_usu;
        $cuenta->email = $request->email;
        $cuenta->login = $request->login;
        $cuenta->password = $request->password;
        $cuenta->fecha_creacion = $request->fecha_creacion;
        $cuenta->fecha_fin = $request->fecha_fin;
        $cuenta->save();

        return response()->json([
            'message' => 'Cuenta actualizada exitosamente'
        ]);
    }

    public function destroy($id)
    {
        $cuenta = CuentasModel::findOrFail($id);
        $cuenta->delete();

        return response()->json([
            'message' => 'Cuenta eliminada exitosamente'
        ]);
    }
}
