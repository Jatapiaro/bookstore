<?php
namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Auth;

use App\Http\Controllers\Api\V1\BaseController;
use App\Http\Resources\Room as RoomResource;
use App\Models\Room;
use App\Repositories\Interfaces\RoomRepoInterface;
use App\Services\RoomService;

use Illuminate\Support\Arr;

class RoomsController extends BaseController {

    public function __construct(
        RoomRepoInterface $repo,
        RoomService $roomService)
    {
        $this->repo = $repo;
        $this->roomService = $roomService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req) {
        $rooms = $this->repo->all();
        return RoomResource::collection($rooms);
    }

    /**
     * Display a listing of the resource.
     *
     * @param integer $room
     * @return \Illuminate\Http\Response
     */
    public function show(Request $req, $room) {
        $room = $this->repo->find($room);
        return new RoomResource($room);
    }

    /**
     * Stores a newly created resource on storage
     *
     * @param  \Illuminate\Http\Request $req
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req) {
        $vb = Room::ValidationBook();
        $data = $req->validate($vb['rules'], $vb['messages']);
        $room = $this->roomService->store($data);
        return new RoomResource($room);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param integer $room
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $room)
    {
        /**
         * Throw the ModelNotFoundException if the
         * desired element does not exists avoiding
         * extra validations
         */
        $prevData = $this->repo->find($room);
        $vb = Room::ValidationBook();
        $data = $req->validate($vb['rules'], $vb['messages']);
        $room = $this->roomService->update($data, $room);
        return new RoomResource($room);
    }

}
