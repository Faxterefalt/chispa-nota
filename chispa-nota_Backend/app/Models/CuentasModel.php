<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuentasModel extends Model
{
    use HasFactory;
    protected $table = 'cuentas';

    protected $fillable = ['usuario_id','login','password','fecha_creacion','fecha_fin'];


    public function usuario() {
        return $this->belongsTo(Usuario::class);
    }
    public function carpetas() {
        return $this->hasMany(Carpeta::class);
    }

    public function recuperacion() {
        return $this->hasMany(Recuperacion::class);
    }
}
