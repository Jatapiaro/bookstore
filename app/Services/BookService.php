<?php
namespace App\Services;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Validator;

use App\Models\Book;

use App\Repositories\Interfaces\BookRepoInterface;

class BookService {

    /**
     * Repository
     *
     * @var BookRepoInteface
     */
    private $repo;

    public function __construct(BookRepoInterface $repo) {
        $this->repo = $repo;
    }

    /**
     * Stores the given item
     *
     * @return App\Models\Book
     */
    public function store($data) {
        $this->validate($data);
        $item = $this->repo->create($data['book']);
        return $item;
    }

    /**
     * Updates the row with id = $book with the $data
     *
     * @param array $data
     * @param integer $book
     * @return App\Models\Book
     */
    public function update($data, $book) {
        $this->validate($data);
        $item = $this->repo->update($data['book'], $book);
        return $item;
    }

    /**
     * Validate the given data using the validation book of the model
     *
     * @param array $data
     * @param array $except
     * @param array $append
     * @return boolean
     */
    public function validate($data, $except = [], $append = []) {
        $vb = Book::ValidationBook($except, $append);
        $validator = Validator::make($data, $vb['rules'], $vb['messages']);
        if ($validator->fails()) {
            $errors = $validator->errors();
            throw ValidationException::withMessages($errors->toArray());
        }
        return true;
    }
}
