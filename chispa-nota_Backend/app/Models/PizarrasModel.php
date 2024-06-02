<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PizarrasModel extends Model
{
    use HasFactory;
    protected $table = 'pizarras';

    protected $fillable = [
        'titulo',
        'contenido',
        'cuenta_id',
    ];

    public function cuenta() {
        return $this->belongsTo(CuentasModel::class);
    }
}
