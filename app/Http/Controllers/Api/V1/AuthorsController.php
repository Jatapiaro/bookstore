<?php
namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Auth;

use App\Http\Controllers\Api\V1\BaseController;
use App\Http\Resources\Author as AuthorResource;
use App\Models\Author;
use App\Repositories\Interfaces\AuthorRepoInterface;
use App\Services\AuthorService;

use Illuminate\Support\Arr;

class AuthorsController extends BaseController {

    public function __construct(
        AuthorRepoInterface $repo,
        AuthorService $authorService)
    {
        $this->repo = $repo;
        $this->authorService = $authorService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req) {
        $authors = $this->repo->all();
        return AuthorResource::collection($authors);
    }

    /**
     * Display a listing of the resource.
     *
     * @param integer $author
     * @return \Illuminate\Http\Response
     */
    public function show(Request $req, $author) {
        $author = $this->repo->find($author);
        return new AuthorResource($author);
    }

    /**
     * Stores a newly created resource on storage
     *
     * @param  \Illuminate\Http\Request $req
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req) {
        $vb = Author::ValidationBook();
        $data = $req->validate($vb['rules'], $vb['messages']);
        $author = $this->authorService->store($data);
        return new AuthorResource($author);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param integer $author
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $author)
    {
        /**
         * Throw the ModelNotFoundException if the
         * desired element does not exists avoiding
         * extra validations
         */
        $prevData = $this->repo->find($author);
        $vb = Author::ValidationBook();
        $data = $req->validate($vb['rules'], $vb['messages']);
        $author = $this->authorService->update($data, $author);
        return new AuthorResource($author);
    }

    /**
     * Deletes an stored item
     *
     * @param  \Illuminate\Http\Request $req
     * @param integer $author
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $req, $author) {
        /**
         * Throw the ModelNotFoundException if the
         * desired element does not exists avoiding
         * extra validations
         */
        $deletedAuthor = $this->repo->find($author);
        $this->repo->delete($author);
        return new AuthorResource($deletedAuthor);
    }

}
