<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Repositories\Interfaces\BookRepoInterface;
use App\Repositories\BaseEloquentRepo;
use App\Models\Book;

class BookRepo extends BaseEloquentRepo implements BookRepoInterface
{
    public function __construct(Book $entity) {
        $this->model = $entity;
        $this->tableName = $entity->getTableName();
        $this->fillableAttributes = $entity->getFillableAttributes();
    }
}
