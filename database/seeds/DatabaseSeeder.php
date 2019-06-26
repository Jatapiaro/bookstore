<?php

use Illuminate\Database\Seeder;
use App\Models\Room;
use App\Models\Book;
use App\Models\Section;
use App\Models\Author;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        /**
         * Creates the 3 rooms
         */
        $rooms = [];
        for ($i = 'A'; $i <= 'C'; $i++) {
            $meters = ($i == 'C')? 200.0 : 100.0;
            $rooms[] = Room::create([
                'name' => $i,
                'meters' => $meters
            ]);
        }

        /**
         * Using the 3 rooms, create 3 sections
         * for each room
         */
        foreach ($rooms as $room) {
            for ($i = 0; $i < 3; $i++) {
                factory(Section::class, 1)->create(['room_id' => $room->id]);
            }
        }

        /**
         * Define an array with all the authors names
         */
        $authorsNames = [
            'John Green', 'Donna Tartt',
            'Pierre Lemaitre','Rafael Santandreu',
            'Lorenzo Silva','Veronica Roth',
            'Markus Zusak','Silberschatz Abraham',
            'Korth Henry','Sudarshan S.',
            'Ana Maria Iglesias Maqueda',
            'Paloma Martinez Fernandez'
        ];
        foreach ($authorsNames as $authorName) {
            Author::create(['name' => $authorName]);
        }

        /**
         * Seed the books
         */
        $book1 = factory(Book::class, 1)->create([
            'name' => 'Bajo La Misma Estrella',
            'number_of_pages' => 304,
            'section_id' => 1
        ]);
        $book1->first()->authors()->attach([1]);
        $book2 = factory(Book::class, 1)->create([
            'name' => 'Bajo La Misma Estrella',
            'number_of_pages' => 304,
            'section_id' => 2
        ]);
        $book2->first()->authors()->attach([1]);
        $book3 = factory(Book::class, 1)->create([
            'name' => 'El Jilguero',
            'number_of_pages' => 1152,
            'section_id' => 3
        ]);
        $book3->first()->authors()->attach([2]);
        $book4 = factory(Book::class, 1)->create([
            'name' => 'Ciudades De Papel',
            'number_of_pages' => 368,
            'section_id' => 3
        ]);
        $book4->first()->authors()->attach([1]);
        $book5 = factory(Book::class, 1)->create([
            'name' => 'Nos Vemos Allá Arriba',
            'number_of_pages' => 448,
            'section_id' => 4
        ]);
        $book5->first()->authors()->attach([3]);
        $book6 = factory(Book::class, 1)->create([
            'name' => 'Las Gafas De La Felicidad',
            'number_of_pages' => 320,
            'section_id' => 5
        ]);
        $book6->first()->authors()->attach([4]);
        $book7 = factory(Book::class, 1)->create([
            'name' => 'Los Cuerpos Extraños',
            'number_of_pages' => 352,
            'section_id' => 6
        ]);
        $book7->first()->authors()->attach([5]);
        $book8 = factory(Book::class, 1)->create([
            'name' => 'Divergente',
            'number_of_pages' => 464,
            'section_id' => 7
        ]);
        $book8->first()->authors()->attach([6]);
        $book9 = factory(Book::class, 1)->create([
            'name' => 'La Ladrona De Libros',
            'number_of_pages' => 544,
            'section_id' => 7
        ]);
        $book9->first()->authors()->attach([7]);
        $book10 = factory(Book::class, 1)->create([
            'name' => 'Fundamentos de bases de datos',
            'number_of_pages' => 944,
            'section_id' => 9
        ]);
        $book10->first()->authors()->attach([8, 9, 10]);
        $book11 = factory(Book::class, 1)->create([
            'name' => 'Desarrollo de Bases de Datos: casos prácticos desde el análisis a la implementación',
            'number_of_pages' => 494,
            'section_id' => 9
        ]);
        $book11->first()->authors()->attach([11, 12]);
    }
}
