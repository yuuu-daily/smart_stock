<?php

namespace App\Repositories;

use App\Models\AwardSeries;
use App\Models\Opus;
use App\Models\UserJudge;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use PhpParser\Node\Expr\Throw_;

class StockLogRepository extends BaseRepository
{
    static function getLogs()
    {
        $sql = <<< EOS
SELECT
	s.id, p.title, s.quantity, s.shipping_at, s.status, s.progress,
	u.name AS name, u.email, u.phone_number, u.address_1, u.address_2,
	c.name AS company_name
FROM
	stock_logs AS s
	INNER JOIN users AS u ON u.id = s.user_id
	INNER JOIN companies AS c ON c.id = u.company_id
	INNER JOIN products AS p ON p.id = s.product_id
EOS;
        $results = DB::connection()->select($sql, []);
        return $results;
    }
}
