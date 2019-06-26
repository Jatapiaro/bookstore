<?php
namespace App\Models;

use App\Models\BaseModel;
use App\Models\Section;
use DB;

class Room extends BaseModel
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
        'meters'
    ];

    /**
     * Defines manually the relationship between a Room
     * and his sections
     * @return Collection
     */
    public function customSections() {
        $query = "SELECT s.*
            FROM rooms r
            JOIN sections s
            ON s.room_id = r.id
            WHERE r.id = :id;";
        $query = DB::select(DB::raw($query), ['id' => $this->id]);
        return Section::hydrate($query);
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
            'room.name' => 'required|string',
            'room.meters' => 'required|numeric|between:0,9999.99'
        ];
        $book['messages'] = [
            'room.name.required' => 'El nombre de la sala es requerido',
            'room.name.string' => 'El nombre de la sala debe ser un texto',

            'room.meters.required' => 'Se requieren las dimensiones (metros) de la sala',
            'room.meters.numeric' => 'Los metros de la sala deben ser un número',
            'room.meters.between' => 'Los metros de la sala debe ser un número entre 0 y 9999.99'
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
