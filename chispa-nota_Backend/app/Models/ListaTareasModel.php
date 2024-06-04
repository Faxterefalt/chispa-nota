<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListaTareasModel extends Model
{
    use HasFactory;
    protected $table = 'lista_tareas';

    protected $fillable = [  'columna_id',
                             'nombre_list',
                            'descripcion_list',
    ];

    public function columna()
    {
        return $this->belongsTo(ColumnasModel::class);
    }
    public function tareas()
    {
        return $this->hasMany(TareasModel::class);
    }
}
