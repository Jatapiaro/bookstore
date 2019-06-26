<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Section;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Section::class, function (Faker $faker, $overrides) {
    return [
        'name' => $faker->name,
        'room_id' => $overrides['room_id']
    ];
});
