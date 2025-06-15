<?php

namespace App\Repositories;

use Illuminate\Support\Facades\Session;

abstract class BaseRepository {

//    protected static function getTargetAwardSeries($id = null)
//    {
//        if ($id === null) {
//            $condition = " AND s.series_number = ?";
//            $award = Session::get('award');
//            $params = [$award["id"], $award["series_number"]];
//        } else {
//            $condition = "";
//            $params = [$id];
//        }
//        return [$condition, $params];
//    }
}
