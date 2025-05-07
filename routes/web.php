<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\StockController;


//Route::get('/stock/import', fn () => Inertia::render('Stock/Import'))->name('stock.import.view');
Route::get('/stock/bulk-out', [StockController::class, 'index'])->name('stock.bulk_out');
Route::post('/stock/bulk-out', [StockController::class, 'bulkOut'])->name('stock.bulk_out.submit');

Route::get('/stock/import', fn () => Inertia::render('Stock/ImportPage'))->name('stock.import.view');


