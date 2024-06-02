<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateListaTareasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lista_tareas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('columna_id');
            $table->foreign('columna_id')->references('id')->on('columnas')->onDelete('cascade');
            $table->string('nombre_list');
            $table->text('descripcion_list')->nullable();
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
        Schema::dropIfExists('lista_tareas');
    }
}
