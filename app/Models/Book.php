<?php
namespace App\Models;

use App\Models\BaseModel;
use App\Models\Section;
use App\Models\Author;

use DB;

class Book extends BaseModel
{

    /**
     * The attributes that should be mutated to dates.
     *
     * @var  array
     */
    protected $dates = [
        'release_date'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var  array
     */
    protected $fillable = [
        'name',
        'number_of_pages',
        'release_date',
        'section_id'
    ];

    /**
     * Defines manually the relationship between this Book
     * and his section
     * @return Section
     */
    public function customSection() {
        $query = "SELECT s.*
            FROM books b
            JOIN sections s
            ON s.id = b.section_id
            WHERE b.id = :id;";
        $query = DB::select(DB::raw($query), ['id' => $this->id]);
        return Section::hydrate($query)->first();
    }

    /**
     * Defines manually the relationship
     * between the book and his authors
     *
     * @return Collection
     */
    public function customAuthors() {
        $query = "SELECT a.*
            FROM authors a, books b, author_book ab
            WHERE b.id = ab.book_id
            AND a.id = ab.author_id
            AND b.id = :id;";
        $query = DB::select(DB::raw($query), ['id' => $this->id]);
        return Author::hydrate($query);
    }

    /**
     * Defined the ORM relationship between
     * this Book and his authors
     */
    public function authors() {
        return $this->belongsToMany('App\Models\Author');
    }

    /**
     * Returns an array that contains two indexes:
     * 'rules' for the validation
     * 'messages' messages given by the validation
     *
     * @return array
     **/
    public static function ValidationBook($except = [], $append = [])
    {
        $book = ['rules' => [], 'messages' => []];
        $book['rules'] = [
            'book.name' => 'required|string',
            'book.number_of_pages' => 'required|integer',
            'book.release_date' => 'required|date',
            'book.section_id' => 'nullable|exists:sections,id'
        ];
        $book['messages'] = [
            'book.name.required' => 'Se requiere el nombre del libro',
            'book.name.string' => 'El nombre del libro debe ser un texto',

            'book.number_of_pages.required' => 'Se requiere el número de páginas',
            'book.number_of_pages.integer' => 'El número de páginas debe ser un número entero',

            'book.release_date.required' => 'Se requiere la fecha de salida del libro',
            'book.release_date.date' => 'La fecha de salida debe ser una fecha válida',

            'book.section_id.exists' => 'La sección en la que se encuentra el libro debe ser una sección válida'
        ];
        if (!empty($except)) {
            $except = array_flip($except);
            $book['rules'] = array_diff_key($book['rules'], $except);
        }
        if (!empty($append)) {
            $book = array_merge_recursive($book, $append);
        }
        return $book;
    }

}
