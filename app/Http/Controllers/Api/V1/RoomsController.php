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
     * @return \Illuminate\Http\Response
     */
    public function show(Request $req, $room) {
        $room = $this->repo->find($room);
        return new RoomResource($room);
    }

}
