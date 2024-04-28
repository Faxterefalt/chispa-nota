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
            'user' => 'required|string',
            'password' => 'required|string',
        ]);

        $cuenta = new CuentasModel();
        $cuenta->nombre_usu = $request->nombre_usu;
        $cuenta->apellido_pa_usu = $request->apellido_pa_usu;
        $cuenta->apellido_ma_usu = $request->apellido_ma_usu;
        $cuenta->email = $request->email;
        $cuenta->user = $request->user;
        $cuenta->password = $request->password;
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
            'user' => 'required|string',
            'password' => 'required|string',

        ]);

        $cuenta->nombre_usu = $request->nombre_usu;
        $cuenta->apellido_pa_usu = $request->apellido_pa_usu;
        $cuenta->apellido_ma_usu = $request->apellido_ma_usu;
        $cuenta->email = $request->email;
        $cuenta->user = $request->user;
        $cuenta->password = $request->password;
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
