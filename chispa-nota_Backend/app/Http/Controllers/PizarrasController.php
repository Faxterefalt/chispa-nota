<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PizarrasController extends Controller
{
    public function index()
    {
        $pizarras = Pizarra::all();
        return view('pizarras.index', compact('pizarras'));
    }

    public function create()
    {
        return view('pizarras.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required',
            'contenido' => 'required|url', // Validar que sea una URL
        ]);

        $pizarra = new Pizarra();
        $pizarra->titulo = $request->titulo;
        $pizarra->contenido = $request->contenido;
        $pizarra->save();

        return redirect()->route('pizarras.index')
                         ->with('success', 'Pizarra creada con éxito.');
    }

    public function saveImage(Request $request)
    {
        $request->validate([
            'image' => 'required|base64_image', // Validar que sea una imagen base64
        ]);

        $image = $request->image;
        $imageName = time() . '.png'; // Puedes cambiar la extensión según el formato de la imagen

        Storage::disk('public')->put($imageName, base64_decode($image));
        $imageURL = Storage::url($imageName);

        return response()->json(['url' => $imageURL], 200);
    }
}
