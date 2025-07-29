<?php

use App\Http\Controllers\SigninController;
use App\Http\Controllers\SignupController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;

// Home page route
Route::get('/', function () {
    return view('main');
})->middleware('auth');

// Authentication routes

// Sign in
Route::post('signin' , SigninController::class)->name('signin.attempt');

Route::get('signin', function() {
    return view('auth.signin');
})
->middleware('throttle:5,1')
->name('signin');

// Sign up
Route::post('signup' , SignupController::class)->name('signup.store');

Route::get('signup', function() {
    return view('auth.signup');
})->name('signup');

// Sign Out
Route::post('signout' , function(){
    Auth::guard('web')->logout();
    
    Session::invalidate();
    Session::regenerateToken();

    return redirect('/signin');
})->name('signout');

Route::get('/login', function() {
    return redirect()->route('signin');
})->name('login');