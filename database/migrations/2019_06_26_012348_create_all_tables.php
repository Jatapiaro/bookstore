<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAllTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->float('meters', 6, 2);
            $table->timestamps();
        });

        Schema::create('sections', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->unsignedBigInteger('room_id')
                ->unsigned();
            $table->foreign('room_id')
                ->references('id')
                ->on('rooms')
                ->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('books', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->integer('number_of_pages');
            $table->date('release_date');
            $table->unsignedBigInteger('section_id')
                ->unsigned()
                ->nullable();
            $table->foreign('section_id')
                ->references('id')
                ->on('sections')
                ->onDelete('set null');
            $table->timestamps();
        });

        Schema::create('authors', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('author_book', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->unsignedBigInteger('book_id')
                ->unsigned();
            $table->foreign('book_id')
                ->references('id')
                ->on('books')
                ->onDelete('cascade');

            $table->unsignedBigInteger('author_id')
                ->unsigned();
            $table->foreign('author_id')
                ->references('id')
                ->on('authors')
                ->onDelete('cascade');
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
        Schema::dropIfExists('book_author');
        Schema::dropIfExists('authors');
        Schema::dropIfExists('books');
        Schema::dropIfExists('sections');
        Schema::dropIfExists('rooms');
    }
}
