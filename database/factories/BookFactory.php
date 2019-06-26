<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Book;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker, $overrides) {
    return [
        'name' => (!isset($overrides['name']))? $faker->name : $overrides['name'],
        'number_of_pages' => (!isset($overrides['number_of_pages']))? $faker->randomDigitNotNull : $overrides['number_of_pages'],
        'release_date' => $faker->date($format = 'Y-m-d', $max = 'now'),
        'section_id' => (!isset($overrides['section_id']))? null : $overrides['section_id']
    ];
});
