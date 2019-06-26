<?php
namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;

use App\Http\Controllers\Api\V1\BaseController;
use App\Http\Resources\Book as BookResource;
use App\Models\Book;
use App\Repositories\Interfaces\BookRepoInterface;
use App\Services\BookService;

use Illuminate\Support\Arr;

class BooksController extends BaseController {

    public function __construct(
        BookRepoInterface $repo,
        BookService $bookService)
    {
        $this->repo = $repo;
        $this->bookService = $bookService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req) {
        $books = $this->repo->all();
        return BookResource::collection($books);
    }

    /**
     * Display the resource with id = $book
     *
     * @param integer $book
     * @return \Illuminate\Http\Response
     */
    public function show(Request $req, $book) {
        $book = $this->repo->find($book);
        return new BookResource($book);
    }

    /**
     * Stores a newly created resource on storage
     *
     * @param  \Illuminate\Http\Request $req
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req) {
        $vb = Book::ValidationBook();
        $data = $req->validate($vb['rules'], $vb['messages']);
        $book = $this->bookService->store($data);
        return new BookResource($book);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param integer $book
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $book)
    {
        /**
         * Throw the ModelNotFoundException if the
         * desired element does not exists avoiding
         * extra validations
         */
        $prevData = $this->repo->find($book);
        $vb = Book::ValidationBook();
        $data = $req->validate($vb['rules'], $vb['messages']);
        $book = $this->bookService->update($data, $book);
        return new BookResource($book);
    }

    /**
     * Deletes an stored item
     *
     * @param  \Illuminate\Http\Request $req
     * @param integer $book
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $req, $book) {
        /**
         * Throw the ModelNotFoundException if the
         * desired element does not exists avoiding
         * extra validations
         */
        $deletedBook = $this->repo->find($book);
        $this->repo->delete($book);
        return new BookResource($deletedBook);
    }

}
