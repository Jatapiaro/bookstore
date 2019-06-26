<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Repositories\Interfaces\RepoInterface;
use DB;

/**
 * THIS HASN'T BEEN IMPLEMENTED YET
 * IT STILL USING THE DEFAULT ORM BEHAVIOUR
 */
class BaseEloquentRepo implements RepoInterface {

    /**
     * The model for this repo
     *
     * @var Illuminate\Database\Eloquent\Model
     */
    protected $model;
    /**
     * The table name of the given model
     *
     * @var String
     */
    protected $tableName;

    /**
     * Returns all the items on this repo
     *
     * @return collection
     */
    public function all() {
        $query = "SELECT * FROM " . $this->tableName . ";";
        $query = DB::select(DB::raw($query));
        return $this->model->hydrate($query);
    }

    /**
     * Creates the model with the given $data
     *
     * @param array $data
     * @return StdClass
     */
    public function create(array $data) {
        return $this->model->create($data);
    }

    /**
     * Updates the model with the $id with the given $data
     *
     * @param array $data
     * @param integer $id
     * @return boolean
     */
    public function update(array $data, $id) {
        return $this->model->where('id', $id)->update($data);
    }

    /**
     * Deletes the model with the $id
     *
     * @param integer $id
     * @return mixed
     */
    public function delete($id) {
        return $this->model->destroy($id);
    }

    /**
     * Returns the model with the given $id
     *
     * @param integer $id
     * @return StdClass
     */
    public function find($id) {
        $query = "SELECT t.* FROM " . $this->tableName . " t WHERE t.id = :id;";
        $query = DB::select(DB::raw($query), ['id' => $id]);
        if (sizeof($query) == 0) {
            throw new ModelNotFoundException("The element with the {$id} was not found");
        }
        return $this->model->hydrate($query)->first();
    }

    /**
     * Returns the model with the given $content_field
     *
     * @param integer $content_field
     * @param string $name_field
     * @return StdClass
     */
    public function where($name_field, $content_field) {
        return $this->model->where($name_field, $content_field)->get();
    }


    /**
     * Get paged items
     *
     * @param integer $paged Items per page
     * @param string $orderBy Column to sort by
     * @param string $sort Sort direction
     */
    public function paginated($paged = 15, $orderBy = 'id', $sorted = 'asc')
    {
        return $this->model->orderBy($orderBy, $sorted)->paginate($paged);
    }
}
