<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Repositories\Interfaces\RoomRepoInterface;
use App\Repositories\BaseEloquentRepo;
use App\Models\Room;

class RoomRepo extends BaseEloquentRepo implements RoomRepoInterface
{
    public function __construct(Room $entity) {
        $this->model = $entity;
        $this->tableName = $entity->getTableName();
    }
}
