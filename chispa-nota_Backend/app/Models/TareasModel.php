<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TareasModel extends Model
{
    use HasFactory;
    protected $table = 'tareas';

    protected $fillable = [
        'lista_tareas_id',
        'nombre_tar',
        'descripcion_tar',
        
    ];

    public function listaTareas()
    {
        return $this->belongsTo(ListaTareasModel::class);
    }
}
