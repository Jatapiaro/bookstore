<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

use App\Repositories\Interfaces\BookRepoInterface;
use App\Repositories\BaseEloquentRepo;
use App\Models\Book;

use DB;

class BookRepo extends BaseEloquentRepo implements BookRepoInterface
{
    public function __construct(Book $entity) {
        $this->model = $entity;
        $this->tableName = $entity->getTableName();
        $this->fillableAttributes = $entity->getFillableAttributes();
    }

    /**
     * Returns all the authors of a book
     * after updated them
     *
     * @param integer $bookID
     * @param integer $authorID
     * @param boolean $status
     * @return collection
     */
    public function authors($bookID, $authorID, $status) {
        if ($status) {
            $this->attachAuthor($bookID, $authorID);
        } else {
            $this->deattachAuthor($bookID, $authorID);
        }
    }

    /**
     * Attach an author to the book
     *
     * @param integer $bookID
     * @param integer $authorID
     */
    private function attachAuthor($bookID, $authorID) {
        /**
         * If the relationship exists
         * Stop the execution
         */
        if ($this->relationShipExists($bookID, $authorID)) {
            return;
        }
        $query = "INSERT INTO author_book (book_id, author_id) VALUES (?, ?);";
        $data = [$bookID, $authorID];
        $result = DB::insert(
            $query,
            $data
        );
    }

    private function relationShipExists($bookID, $authorID) {
        $query = "SELECT * from author_book WHERE book_id = ? AND author_id = ?;";
        $data = [$bookID, $authorID];
        $query = DB::select(
            DB::raw($query),
            $data
        );
        /**
         * If the query results are 0 results then do the insertion
         */
        return (sizeof($query) == 0)? false : true;
    }

    /**
     * Deattach an author from the book
     *
     * @param integer $bookID
     * @param integer $authorID
     */
    private function deattachAuthor($bookID, $authorID) {
        $query = "DELETE FROM author_book WHERE book_id = ? AND author_id = ?;";
        $data = [$bookID, $authorID];
        $result = DB::delete(
            $query,
            $data
        );
    }

}
