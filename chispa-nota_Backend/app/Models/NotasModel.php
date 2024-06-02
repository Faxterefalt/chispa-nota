<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotasModel extends Model
{
    use HasFactory;
    protected $table = 'notas';

    protected $fillable = [
        'descripcion_not', 
        'carpeta_id',
    ];

    public function carpeta()
    {
        return $this->belongsTo(CarpetasModel::class);
    }

}
