<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColumnasModel extends Model
{
    use HasFactory;
    protected $table = 'columnas';

    protected $fillable = [ 'nombre_col','carpeta_id'];

    public function listaTareas()
    {
        return $this->hasMany(LineaTareasModel::class);
    }
    public function carpeta()
    {
        return $this->belongsTo(CarpetasModel::class);
    }
}
