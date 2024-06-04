<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePizarrasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pizarras', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->string('contenido'); 
            $table->unsignedBigInteger('cuenta_id'); 
            $table->foreign('cuenta_id')->references('id')->on('cuentas')->onDelete('cascade');    
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
        Schema::dropIfExists('pizarras');
    }
}
