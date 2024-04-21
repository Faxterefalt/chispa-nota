<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CuentasModel extends Model
{
    use HasFactory;
    protected $table = 'usuarios';

    protected $fillable = [ 'login','password','fecha_creacion','fecha_fin'];


    public function usuario() {
        return $this->belongsTo(Usuario::class);
    }
    public function carpetas() {
        return $this->hasMany(Carpeta::class);
    }

    public function recuperacion() {
        return $this->hasOne(Recuperacion::class);
    }
}
