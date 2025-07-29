<?php

use App\Http\Controllers\SigninController;
use App\Http\Controllers\SignupController;
use Illuminate\Container\Attributes\Auth as AttributesAuth;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;

// index page router
Route::get('/', function () {
    return view('main');
})->middleware('auth');


// pages routers
Route::get('/activities', function () {
    return view('activities');
})->middleware('auth');

Route::get('/grades', function () {
    return view('grades');
})->middleware('auth');

Route::get('/parents', function () {
    return view('parents');
})->middleware('auth');

// Remove the old /students route and add resourceful routes for students
Route::middleware('auth')->group(function () {
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::delete('/students/{id}', [StudentController::class, 'destroy'])->name('students.destroy');
    Route::get('/students/{id}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::put('/students/{id}', [StudentController::class, 'update'])->name('students.update');
});

// Subject routes
Route::middleware('auth')->group(function () {
    Route::get('/subjects', [SubjectController::class, 'index'])->name('subjects.index');
    Route::post('/subjects', [SubjectController::class, 'store'])->name('subjects.store');
    Route::delete('/subjects/{id}', [SubjectController::class, 'destroy'])->name('subjects.destroy');
    Route::get('/subjects/{id}/edit', [SubjectController::class, 'edit'])->name('subjects.edit');
    Route::put('/subjects/{id}', [SubjectController::class, 'update'])->name('subjects.update');
});

Route::get('/teachers', function () {
    return view('teachers');
})->middleware('auth');



//authintication



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