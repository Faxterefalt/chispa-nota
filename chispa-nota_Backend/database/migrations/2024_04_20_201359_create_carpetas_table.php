<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarpetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carpetas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cuenta_id'); 
            $table->foreign('cuenta_id')->references('id')->on('cuentas')->onDelete('cascade');    
            $table->string('nombre_carp');
            $table->string('descripcion_carp');
            $table->date('fecha_creacion_carp');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carpetas');
    }
}
