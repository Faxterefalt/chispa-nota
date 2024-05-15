<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TareasModel extends Model
{
    use HasFactory;


    public function listaTareas()
    {
        return $this->belongsTo(ListaDeTareas::class);
    }
}
