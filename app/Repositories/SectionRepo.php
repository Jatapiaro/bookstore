<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Repositories\Interfaces\SectionRepoInterface;
use App\Repositories\BaseEloquentRepo;
use App\Models\Section;

class SectionRepo extends BaseEloquentRepo implements SectionRepoInterface
{
    public function __construct(Section $entity) {
        $this->model = $entity;
        $this->tableName = strtolower($entity->getTableName());
        $this->fillableAttributes = $entity->getFillableAttributes();
    }
}
