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
    /* Authors */
    Route::apiResource('authors', 'AuthorsController');
    /* Books */
    Route::apiResource('books', 'BooksController');
    Route::post('books/{book}/authors/{author}', 'BooksController@authors')
        ->name('books.authors');
    /* Rooms */
    Route::apiResource('rooms', 'RoomsController');
    /* Sections */
    Route::apiResource('sections', 'SectionsController');
});
