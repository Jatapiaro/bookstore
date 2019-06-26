<?php
namespace App\Models;

use App\Models\BaseModel;

class Author extends BaseModel
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
        'name'
    ];

    /**
     * Defines the ORM relationship between
     * and Author and his Books
     */
    public function authors() {
        return $this->hasMany('App\Models\Book');
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
            'author.name' => 'required|string',
        ];
        $book['messages'] = [
            'author.name.required' => 'El nombre del autor es requerido',
            'author.name.string' => 'El nombre del autor debe ser un texto'
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
