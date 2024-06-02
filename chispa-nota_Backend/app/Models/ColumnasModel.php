<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColumnasModel extends Model
{
    use HasFactory;
    protected $table = 'columnas';

    protected $fillable = [ 'nombre_col'];

    public function listaTareas()
    {
        return $this->hasMany(LineaDeTarea::class);
    }
    public function carpeta()
    {
        return $this->belongsTo(Carpeta::class);
    }
}
