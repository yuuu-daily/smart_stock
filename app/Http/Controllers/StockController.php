<?php

namespace App\Http\Controllers;


use App\Models\StockLog;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class StockController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $users = User::all();
        return Inertia::render('Stock/ImportPage', [
            'products' => $products,
            'users' => $users,
        ]);
    }

    public function bulkOut(Request $request)
    {
        $quantities = $request->input('quantities', []);

        foreach ($quantities as $productId => $quantity) {
            if (!is_numeric($quantity) || $quantity <= 0) {
                continue;
            }

            $product = Product::find($productId);
            if (!$product) continue;

            $deduct = min($quantity, $product->stock);
            $product->stock -= $deduct;
            $product->save();

            StockLog::create([
                'product_id' => $product->id,
                'quantity' => $deduct,
                'type' => 1,
            ]);
        }

        return redirect()->route('stock.bulk_out')->with('message', '一括出庫が完了しました');
    }
}
