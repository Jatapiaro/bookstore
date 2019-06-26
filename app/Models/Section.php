<?php
namespace App\Models;

use App\Models\BaseModel;
use App\Models\Room;
use App\Models\Book;

use DB;

class Section extends BaseModel
{

    /**
     * The attributes that should be mutated to dates.
     *
     * @var  array
     */
    protected $dates = [];

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
        'room_id'
    ];

    /**
     * Defines manually the relationship between this Section
     * and his room
     * @return Room
     */
    public function customRoom() {
        $query = "SELECT r.*
            FROM Sections s
            JOIN rooms r
            ON r.id = s.room_id
            WHERE s.id = :id;";
        $query = DB::select(DB::raw($query), ['id' => $this->id]);
        return Room::hydrate($query)->first();
    }

    /**
     * Defines manually the relationship between this Section
     * and his books
     * @return Collection
     */
    public function customBooks() {
        $query = "SELECT b.*
            FROM sections s
            JOIN books b
            ON b.section_id = s.id
            WHERE s.id = :id;";
        $query = DB::select(DB::raw($query), ['id' => $this->id]);
        return Book::hydrate($query);
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
            'section.name' => 'required|string',
            'section.room_id' => 'required|exists:rooms,id'
        ];
        $book['messages'] = [
            'section.name.required' => 'El nombre de la sección es requerido',
            'section.name.string' => 'El nombre de la sección debe ser un texto',

            'section.room_id.required' => 'Se requiere el ID del cuarto al que pertenece la sección',
            'section.room_id.exists' => 'El ID del cuarto debe ser un ID válido'
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
