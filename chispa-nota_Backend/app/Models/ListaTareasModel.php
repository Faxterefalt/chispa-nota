<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListaTareasModel extends Model
{
    use HasFactory;
    protected $table = 'lista_tareas';

    protected $fillable = [ 'nombre_col','nombre_list','descripcion_list'];

    public function columna()
    {
        return $this->belongsTo(Columna::class);
    }
    public function tareas()
    {
        return $this->hasMany(Tarea::class);
    }
}
