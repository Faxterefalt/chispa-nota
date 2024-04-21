<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarpetasModel extends Model
{
    use HasFactory;
    protected $table = 'usuarios';

    protected $fillable = [ 'nombre_carp','descripcion_carp','fecha_creacion_carp'];
    public function cuenta() {
        return $this->belongsTo(Cuenta::class);
    }
}
