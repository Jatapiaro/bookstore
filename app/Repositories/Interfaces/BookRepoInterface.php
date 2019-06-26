<?php
namespace App\Repositories\Interfaces;

interface BookRepoInterface extends RepoInterface
{
    /**
     * Returns all the authors of a book
     * after updated them
     *
     * @param integer $bookID
     * @param integer $authorID
     * @param boolean $status
     * @return collection
     */
    public function authors($bookID, $authorID, $status);
}
