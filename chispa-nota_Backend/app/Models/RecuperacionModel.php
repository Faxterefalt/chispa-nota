<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecuperacionModel extends Model
{
    use HasFactory;
    protected $table = 'recuperacions';

    protected $fillable = [ 'cuenta_id','tipo_recuperacion','inicio_recuperacion'
    ,'vencimiento_recuperacion','estado','codigo','registro_acceso'
    ,'registro_fallo','estado'];
    public function cuenta()
    {
        return $this->belongsTo(CuentasModel::class);
    }
    
}
