<?php
namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;

use App\Http\Controllers\Api\V1\BaseController;
use App\Http\Resources\Section as SectionResource;
use App\Models\Section;
use App\Repositories\Interfaces\SectionRepoInterface;
use App\Services\SectionService;

use Illuminate\Support\Arr;

class SectionsController extends BaseController {

    public function __construct(
        SectionRepoInterface $repo,
        SectionService $sectionService)
    {
        $this->repo = $repo;
        $this->sectionService = $sectionService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req) {
        $sections = $this->repo->all();
        return SectionResource::collection($sections);
    }

    /**
     * Display the resource with id = $section
     *
     * @param integer $section
     * @return \Illuminate\Http\Response
     */
    public function show(Request $req, $section) {
        $section = $this->repo->find($section);
        return new SectionResource($section);
    }

    /**
     * Stores a newly created resource on storage
     *
     * @param  \Illuminate\Http\Request $req
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req) {
        $vb = Section::ValidationBook();
        $data = $req->validate($vb['rules'], $vb['messages']);
        $section = $this->sectionService->store($data);
        return new SectionResource($section);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param integer $section
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $section)
    {
        /**
         * Throw the ModelNotFoundException if the
         * desired element does not exists avoiding
         * extra validations
         */
        $prevData = $this->repo->find($section);
        $vb = Section::ValidationBook();
        $data = $req->validate($vb['rules'], $vb['messages']);
        $section = $this->sectionService->update($data, $section);
        return new SectionResource($section);
    }

    /**
     * Deletes an stored item
     *
     * @param  \Illuminate\Http\Request $req
     * @param integer $section
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $req, $section) {
        /**
         * Throw the ModelNotFoundException if the
         * desired element does not exists avoiding
         * extra validations
         */
        $deletedSection = $this->repo->find($section);
        $this->repo->delete($section);
        return new SectionResource($deletedSection);
    }

}
