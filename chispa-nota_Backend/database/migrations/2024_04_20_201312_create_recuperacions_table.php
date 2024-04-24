<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecuperacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recuperacions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cuenta_id');
            $table->foreign('cuenta_id')->references('id')->on('cuentas')->onDelete('cascade');        
            $table->string('tipo_recuperacion');
            $table->date('inicio_recuperacion');
            $table->date('vencimiento_recuperacion');
            $table->boolean('estado');
            $table->string('codigo');
            $table->date('registro_acceso');
            $table->date('registro_fallo');
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
        Schema::dropIfExists('recuperacions');
    }
}
