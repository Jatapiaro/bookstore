<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Register repos specific for your system
        $this->registerRepos();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register specific repos for this system
     *
     * @return void
     */
    public function registerRepos() {
        // Put your repos in here
        $this->app->bind(
            'App\Repositories\Interfaces\AuthorRepoInterface',
            'App\Repositories\AuthorRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\BookRepoInterface',
            'App\Repositories\BookRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\RoomRepoInterface',
            'App\Repositories\RoomRepo'
        );
        $this->app->bind(
            'App\Repositories\Interfaces\SectionRepoInterface',
            'App\Repositories\SectionRepo'
        );
    }

}
