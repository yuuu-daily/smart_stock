<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\StockController;
use App\Http\Controllers\Auth\WorkOSCallbackController;
use App\Http\Controllers\DashboardController;
use WorkOS\SSO;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/callback', [WorkOSCallbackController::class, 'handle']);

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
//    Route::get('barcode-test', function () {
//        return Inertia::render('SimpleBarcodePage');
//    });
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/stock/scan-barcode', [StockController::class, 'handleScan']);

});
//Route::get('dashboard', function () {
//    return Inertia::render('dashboard');
//})->name('dashboard');

//Route::get('/stock/import', fn () => Inertia::render('Stock/Import'))->name('stock.import.view');
Route::get('/stock/bulk-out', [StockController::class, 'index'])->name('stock.bulk_out');
Route::post('/stock/bulk-out', [StockController::class, 'bulkOut'])->name('stock.bulk_out.submit');

//Route::get('/stock/import', fn () => Inertia::render('Stock/ImportPage'))->name('stock.import.view');
Route::get('/stock/import', [StockController::class, 'index'])->name('stock.import.view');


Route::get('/', function () {
    return redirect()->route('login');
});


