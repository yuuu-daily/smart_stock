<?php

namespace App\Http\Controllers\Stock;

use App\Http\Controllers\Controller;
use App\Models\StockLog;
use App\Models\User;
use App\Repositories\StockLogRepository;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;


class StockController extends Controller
{
    public function index()
    {
        $products = Product::all();
        $users = User::join('companies', 'users.company_id', '=', 'companies.id')
            ->where('users.role', 0)
            ->select('users.*', 'companies.name as company_name')
            ->get();
        $logs = StockLogRepository::getLogs();
        return Inertia::render('Stock/StockLogsPage', [
            'products' => $products,
            'logs' => $logs,
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

    public function handleScan(Request $request)
    {
        $validated = $request->validate([
            'barcode' => 'required|string',
            'mode' => 'required|in:0,1',
        ]);

        // 出庫 or 入庫処理
        $book = Product::where('isbn', $validated['barcode'])->first();
        if (!$book) {
            throw ValidationException::withMessages([
                'barcode' => '該当の書籍が見つかりませんでした',
            ]);
        }
        if ($validated['mode'] == 1) {
            // 出庫
            $book->stock = max(0, $book->stock - 1);
        } else {
            // 入庫
            $book->stock += 1;
        }
        $book->save();

        return back()->with('success', '保存しました');
    }

    // StockController.php

    public function addUser(Request $request)
    {
        $commonRules = [
            'user_id' => ['required', 'exists:users,id'],
        ];
        $validated = $request->validate($commonRules);
        StockLog::create([
            'product_id' => 1,
            'user_id' => $validated['user_id'],
            'quantity' => 1,
            'status' => 1,
            'progress' => 2,
            'shipping_at' => '2020-01-01 12:00:00',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        return back()->with('success', 'ユーザーを追加しました');
    }


}
