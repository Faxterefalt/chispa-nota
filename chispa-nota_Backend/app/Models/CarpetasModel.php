<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarpetasModel extends Model
{
    use HasFactory;
    protected $table = 'carpetas';

    protected $fillable = [ 'cuenta_id',
                            'nombre_carp',
                            'descripcion_carp',
                            'fecha_creacion_carp',
                        ];

    public function columnas()
    {
        return $this->hasMany(ColumnasModel::class);
    }
    public function cuenta() {
        return $this->belongsTo(CuentasModel::class);
    }
}
