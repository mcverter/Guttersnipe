<?php


/*

Bitwise static representation of Food types,
for usage in database and throughout application
*/

define("BINARY_ONE", 0b1);

/* Dairy */
define("DAIRY_CHEESE", BINARY_ONE << 0);
define("DAIRY_MILK", BINARY_ONE << 1);
define("DAIRY_GOAT", BINARY_ONE << 2);
define("DAIRY_CREAM", BINARY_ONE << 3);

/* Protein */
define("PROTEIN_EGGS", BINARY_ONE << 0);
define("PROTEIN_COW", BINARY_ONE << 1);
define("PROTEIN_SEAFOOD", BINARY_ONE << 2);
define("PROTEIN_BIRD", BINARY_ONE << 3);
define("PROTEIN_ANIMAL", BINARY_ONE << 4);
define("PROTEIN_NUTS", BINARY_ONE << 5);
define("PROTEIN_BEANS", BINARY_ONE << 6);



/* GRAIN */
define("GRAIN_BREAD", BINARY_ONE << 0);
define("GRAIN_PASTRIES", BINARY_ONE << 1);
define("GRAIN_GRAINS", BINARY_ONE << 2);
define("GRAIN_GF", BINARY_ONE << 3);

/* Produce */
define("PRODUCE_FRUIT", BINARY_ONE << 0);
define("PRODUCE_JUICE", BINARY_ONE << 1);
define("PRODUCE_VEGETABLES", BINARY_ONE << 2);
define("PRODUCE_HERBS", BINARY_ONE << 3);

/*FOOD TYPE */
define("FOODTYPE_PACKAGED", BINARY_ONE << 0);
define("FOODTYPE_VEGETARIAN", BINARY_ONE << 1);
define("FOODTYPE_VEGAN", BINARY_ONE << 2);

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFoodTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

        Schema::create('food', function(Blueprint $table)
        {
            $table->increments('id');

            $table->mediumInteger('dairy');
            $table->mediumInteger('protein');
            $table->mediumInteger('grain');
            $table->mediumInteger('produce');
            $table->mediumInteger('type');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('food');
	}

}
