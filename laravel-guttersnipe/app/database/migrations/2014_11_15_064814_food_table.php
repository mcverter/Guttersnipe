<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FoodTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{

        Schema::drop('users');

        Schema::create('users', function($table){
            $table->increments('id');
            $table->integer('meat');
            $table->integer('grains');
            $table->integer('produce');
            $table->integer('dairy');
            $table->integer('foodtype');
        });
        #FoodCategories[meat, dairy, bread, packaged, produce, vegetarian/vegan]
        # Dairy set (‘CHEESE', 'MILK', 'GOAT', 'CREAM')
        # Meat ENUM('EGGS', 'COW', 'PIG', 'SEAFOOD', 'BIRD', 'ANIMAL')
        # GRAIN
        # BREAD ENUM('GF', 'BREAD', 'PASTRIES')
        # FOODTYPES
#        visible ENUM('NO', 'YES') NOT NULL

		//
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
