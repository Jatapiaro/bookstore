<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Repositories\Interfaces\AuthorRepoInterface;
use App\Repositories\BaseEloquentRepo;
use App\Models\Author;

class AuthorRepo extends BaseEloquentRepo implements AuthorRepoInterface
{
    public function __construct(Author $entity) {
        $this->model = $entity;
        $this->tableName = strtolower($entity->getTableName());
        $this->fillableAttributes = $entity->getFillableAttributes();
    }
}
