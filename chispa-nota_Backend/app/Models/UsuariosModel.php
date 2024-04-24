<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class UsuariosModel extends Model
{
    use HasFactory;
    protected $table = 'usuarios';

    protected $fillable = [ 'nombre_usu','apellido_pa_usu','apellido_ma_usu'];

 
  
}
