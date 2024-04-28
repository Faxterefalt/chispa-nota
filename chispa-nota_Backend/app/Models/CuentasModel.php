<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuentasModel extends Model
{
    use HasFactory;
    protected $table = 'cuentas';

    protected $fillable = ['nombre_usu','apellido_pa_usu','apellido_ma_usu','email','user','password'];


   
    public function carpetas() {
        return $this->hasMany(Carpeta::class);
    }

    public function recuperacion() {
        return $this->hasMany(Recuperacion::class);
    }
}
