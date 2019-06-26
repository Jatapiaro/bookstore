<?php
namespace App\Services;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Validator;

use App\Models\Author;

use App\Repositories\Interfaces\AuthorRepoInterface;

class AuthorService {

    /**
     * Repository
     *
     * @var AuthorRepoInteface
     */
    private $repo;

    public function __construct(AuthorRepoInterface $repo) {
        $this->repo = $repo;
    }

    /**
     * Stores the given item
     *
     * @return App\Models\Author
     */
    public function store($data) {
        $this->validate($data);
        $item = $this->repo->create($data['author']);
        return $item;
    }

    /**
     * Updates the row with id = $author with the $data
     *
     * @param array $data
     * @param integer $author
     * @return App\Models\Concert
     */
    public function update($data, $author) {
        $this->validate($data);
        $item = $this->repo->update($data['author'], $author);
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
        $vb = Author::ValidationBook($except, $append);
        $validator = Validator::make($data, $vb['rules'], $vb['messages']);
        if ($validator->fails()) {
            $errors = $validator->errors();
            throw ValidationException::withMessages($errors->toArray());
        }
        return true;
    }
}
