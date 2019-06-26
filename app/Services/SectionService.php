<?php
namespace App\Services;

use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Validator;

use App\Models\Section;

use App\Repositories\Interfaces\SectionRepoInterface;

class SectionService {

    /**
     * Repository
     *
     * @var SectionRepoInteface
     */
    private $repo;

    public function __construct(SectionRepoInterface $repo) {
        $this->repo = $repo;
    }

    /**
     * Stores the given item
     *
     * @return App\Models\Section
     */
    public function store($data) {
        $this->validate($data);
        $item = $this->repo->create($data['section']);
        return $item;
    }

    /**
     * Updates the row with id = $section with the $data
     *
     * @param array $data
     * @param integer $section
     * @return App\Models\Section
     */
    public function update($data, $section) {
        $this->validate($data);
        $item = $this->repo->update($data['section'], $section);
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
        $vb = Section::ValidationBook($except, $append);
        $validator = Validator::make($data, $vb['rules'], $vb['messages']);
        if ($validator->fails()) {
            $errors = $validator->errors();
            throw ValidationException::withMessages($errors->toArray());
        }
        return true;
    }
}
