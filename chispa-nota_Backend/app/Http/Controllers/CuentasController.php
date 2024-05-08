<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CuentasModel;
use Google_Client;
use Google_Service_Oauth2;


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
            'nombre_usu' => 'required|string',
            'apellido_pa_usu' => 'required|string',
            'apellido_ma_usu' => 'required|string',
            'email' => 'required|string|unique:cuentas,email',
            'user' => 'required|string|unique:cuentas,user',
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
            'nombre_usu' => 'required|string',
            'apellido_pa_usu' => 'required|string',
            'apellido_ma_usu' => 'required|string',
            'email' => 'required|string|unique:cuentas,email',
            'user' => 'required|string|unique:cuentas,user',
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
    public function login(Request $request)
    {
        $request->validate([
            'emailOrUser' => 'required|string',
            'password' => 'required|string',
        ]);

        // Aquí deberías verificar si el email o el usuario existen en la base de datos
        $user = CuentasModel::where('email', $request->emailOrUser)
                    ->orWhere('user', $request->emailOrUser)->first();

        // Luego, verificar si la contraseña coincide
        if ($user && $request->password == $user->password) {

            return response()->json([
                'message' => 'Inicio de sesión exitoso'
            ], 200);
        } else {

            return response()->json([
                'error' => 'Credenciales incorrectas. Por favor, inténtalo de nuevo.'
            ], 401);
        }
    }
    
    public function googleLogin(Request $request)
    {
        $client = new Google_Client();
        $client->setClientId('your-google-client-id');
        $client->setClientSecret('your-google-client-secret');
        $client->setRedirectUri('your-redirect-url');
        $client->addScope(Google_Service_Oauth2::USERINFO_EMAIL);

        $token = $client->fetchAccessTokenWithAuthCode($request->code);

        if (isset($token['error'])) {
            return response()->json([
                'error' => 'Error al obtener el token de acceso de Google.'
            ], 401);
        }

        $client->setAccessToken($token['access_token']);

        $oauth = new Google_Service_Oauth2($client);
        $googleInfo = $oauth->userinfo->get();

        $email = $googleInfo->email;
        $name = $googleInfo->name;

        // Aquí puedes buscar al usuario en tu base de datos por el correo electrónico
        // Si no existe, puedes crear una nueva cuenta con la información de Google

        return response()->json([
            'message' => 'Inicio de sesión con Google exitoso'
        ], 200);
    }
}
