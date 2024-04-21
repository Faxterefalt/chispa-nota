<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class UsuariosModel extends Model
{
    use HasFactory;
    protected $table = 'usuarios';

    protected $fillable = [ 'email','nombre_usu','apellido_pa_usu','apellido_ma_usu'];

    public function cuentas() {
        return $this->hasMany(Cuenta::class);
    }
    public function recuperaciones() {
        return $this->hasManyThrough(Recuperacion::class, Cuenta::class);
    }
}
