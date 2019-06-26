<?php

use Illuminate\Database\Seeder;
use App\Models\Room;
use App\Models\Section;
use App\Models\Book;
use App\Models\Author;

class DatabaseTestSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $rooms = factory(Room::class, 3)->create();
        foreach ($rooms as $room) {
            for ($i = 0; $i < 3; $i++) {
                factory(Section::class, 1)->create(['room_id' => $room->id]);
            }
        }
        $books = factory(Book::class, 3)->create();
        $authors = factory(Author::class, 3)->create();
    }
}
