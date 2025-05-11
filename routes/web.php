<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\StockController;
use App\Http\Controllers\Auth\WorkOSCallbackController;
use WorkOS\SSO;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

//Route::get('/stock/import', fn () => Inertia::render('Stock/Import'))->name('stock.import.view');
Route::get('/stock/bulk-out', [StockController::class, 'index'])->name('stock.bulk_out');
Route::post('/stock/bulk-out', [StockController::class, 'bulkOut'])->name('stock.bulk_out.submit');

//Route::get('/stock/import', fn () => Inertia::render('Stock/ImportPage'))->name('stock.import.view');
Route::get('/stock/import', [StockController::class, 'index'])->name('stock.import.view');


Route::get('/', function () {
    return view('welcome');
});


