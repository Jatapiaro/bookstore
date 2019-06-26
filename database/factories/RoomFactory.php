<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Room;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Room::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'meters' => $faker->randomFloat($nbMaxDecimals = 2, $min = 1, $max = 4)
    ];
});
