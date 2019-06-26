<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        \JavaScript::put([
            'appName' => 'Bookstore',
            'baseUrl' => config('app.url'),
		]);
        return view('welcome');
    }
}
