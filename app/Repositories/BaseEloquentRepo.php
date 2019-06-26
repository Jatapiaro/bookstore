<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Repositories\Interfaces\RepoInterface;
use DB;

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
     * An array with all the fillable elements of a model
     */
    protected $fillableAttributes;

    /**
     * Returns all the items on this repo
     *
     * @return collection
     */
    public function all() {
        $this->buildInsertQuery();
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
        return $this->buildInsertQuery($data);
    }

    /**
     * Insert the given data
     * This method creates a method that can be used by any model
     * Using the $fillable array of a model it will create
     * an insert string like 'INSERT INTO table (the, cols) values (?, ?)'
     * Then, with the passed data it will generate the array with data to be inserted
     * @param array $data
     * @return StdClass
     */
    private function buildInsertQuery(array $data) {
        /**
         * The insert needs a string of (?, ?) to indicate the
         * values to insert
         */
        $questionMarks = [];
        for ($i = 0; $i < sizeof($this->fillableAttributes); $i++) {
            $questionMarks[] = '?';
        }
        /*
        * We generate the string containing the fillable columns
        * (col1, col2, ...colN) to be inserted
        */
        $columns = implode(",", $this->fillableAttributes);
        /**
         * We join all the neccesary '?' in a string like (?, ?, .. ?)
         */
        $questionMarks = implode(",", $questionMarks);
        $query = "INSERT INTO ";
        $query .= $this->tableName;
        $query .= " (" . $columns . ") values (";
        $query .= $questionMarks;
        $query .= ');';

        /**
         * Then we build the array with the data
         * to be inserted
         */
        $insert = [];
        foreach ($this->fillableAttributes as $attr) {
            $insert[] = (isset($data[$attr]))? $data[$attr] : NULL;
        }
        /**
         * Insert only return a boolean
         */
        $result = DB::insert(
            $query,
            $insert
        );
        /*
        * We get the last inserted ID and passed it
        * to our previosly implented function
        */
        return $this->find(DB::getPdo()->lastInsertId());
    }

    /**
     * Updates the model with the $id with the given $data
     *
     * @param array $data
     * @param integer $id
     * @return boolean
     */
    public function update(array $data, $id) {
        return $this->buildUpdateQuery($data, $id);
    }

    /**
     * Updates the data of a given element
     * This will generate a query like:
     * UPDATE table SET col = ?, ... colN = ? WHERE id = ?;
     * @param array $data
     * @param integer $id
     * @return StdClass
     */
    private function buildUpdateQuery(array $data, $id) {

        $columnsToSet = [];
        $set = [];
        foreach ($this->fillableAttributes as $attr) {
            $columnsToSet[] = $attr . ' = ?';
            $set[] = (isset($data[$attr]))? $data[$attr] : NULL;
        }
        $set[] = $id;
        $columnsToSet = implode(", ", $columnsToSet);

        $query = 'UPDATE ';
        $query .= $this->tableName . " SET ";
        $query .= $columnsToSet;
        $query .= " WHERE id = ?;";

        $result = DB::update($query, $set);
        return $this->find($id);

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
