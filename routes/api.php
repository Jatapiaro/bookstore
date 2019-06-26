<?php
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group(
    [
        'prefix' => 'v1',
        'namespace' => '\App\Http\Controllers\Api\V1',
        'as' => 'api.v1.'
    ],
function()
{
    /*
    * Rooms
    */
    Route::apiResource('rooms', 'RoomsController');
});
