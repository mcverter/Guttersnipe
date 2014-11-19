<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/



Route::group(array('prefix'=>'/api'), function(){
    Route::post('login/auth', 'AuthController@Login');
    Route::post('login/destroy', 'AuthController@Logout');
});

Route::get('admin',function()
{
    return View::make('admin');
});
Route::get('/', function()
{
    return View::make('index');
});
