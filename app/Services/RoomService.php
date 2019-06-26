<?php
namespace App\Services;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Validator;

use App\Models\Room;

use App\Repositories\Interfaces\RoomRepoInterface;

class RoomService {

    /**
     * Repository
     *
     * @var RoomRepoInteface
     */
    private $repo;

    public function __construct(RoomRepoInterface $repo) {
        $this->repo = $repo;
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
        $vb = Concert::ValidationBook($except, $append);
        $validator = Validator::make($data, $vb['rules'], $vb['messages']);
        if ($validator->fails()) {
            $errors = $validator->errors();
            throw ValidationException::withMessages($errors->toArray());
        }
        return true;
    }
}
