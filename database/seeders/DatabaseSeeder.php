<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $debug = env('APP_DEBUG', false);
        if ($debug) {
            $cnt = 50;
            $this->CreateUsers($cnt);
        }
        $this->CreateSeeds($debug);
    }

    private function CreateUsers($cnt)
    {
        DB::unprepared("TRUNCATE TABLE users");
        User::factory($cnt)->create();
        $data = [
            ["admin@sample.jp", "全体管理者", 999, "ゼンタイカンリシャ"],
            ["user1@sample.jp", "村山 智也", 99, "むらやまともや"],
            ["user2@sample.jp", "喜嶋 直樹", 9, "キタジマナオキ"],
            ["user3@sample.jp", "斉藤 花子", 0, "サイトウハナコ"],
            ["user4@sample.jp", "田辺 裕太", 0, "タナベユウタ"],
            ["user5@sample.jp", "木村 あすか", 0, "キムラアスカ"],
            ["user6@sample.jp", "石田 春香", 0, "イシダハルカ"],
            ["user7@sample.jp", "山岸 結衣", 0, "ヤマギシユイ"],
            ["user8@sample.jp", "青田 陽一", 0, "アオタヨウイチ"],
            ["user9@sample.jp", "工藤 さゆり", 0, "クドウサユリ"],
            ["user10@sample.jp", "加納 直人", 0, "カノウナオト"],
            ["user11@sample.jp", "井上 里佳", 0, "イノウエリカ"],
            ["user12@sample.jp", "大垣 治", 0, "オオガキオサム"],
            ["user13@sample.jp", "渚 里佳", 0, "ナギサリカ"],
            ["user14@sample.jp", "山本 舞 ", 0, "ヤマモトマイ"],
            ["user15@sample.jp", "伊藤 翔太", 0, "イトウショウタ"],
            ["user16@sample.jp", "田中 太郎", 0, "タナカタロウ"],
            ["user17@sample.jp", "松本 淳", 0, "マツモトジュン"],
            ["user18@sample.jp", "宮沢 翼", 0, "ミヤザワツバサ"],
            ["user19@sample.jp", "渡辺 七夏", 99, "オオガキミカコ"],
            ["user20@sample.jp", "加納 直人", 99, "フジモトカオリ"],
            ["user21@sample.jp", "小泉 和也", 99, "ササダアツシ"],
            ["user22@sample.jp", "桐山 拓真", 99, "タナカユミコ"],
            ["user23@sample.jp", "田辺 洋介", 99, "クドウサトミ"],
            ["user24@sample.jp", "桐山 英樹", 99, "ササキオサム"],
            ["user25@sample.jp", "小林 里佳", 99, "ハラダソウタロウ"],
            ["user26@sample.jp", "青田 直人", 99, "タナカヒロシ"],
            ["user27@sample.jp", "斉藤 稔", 99, "マツモトミカコ"],
            ["user28@sample.jp", "中津川 晃", 99, "カノウアツシ"],
            ["user29@sample.jp", "加納 香織", 99, "サカモトナオコ"],
            ["user30@sample.jp", "浜田 あすか", 99, "エコダヨウコ"],
        ];
        $id = 1;
        foreach ($data as $d) {
            $user = User::find($id);
            $user->email = $d[0] ? $d[0] : "user" . $id . "@sample.jp";
            if ($d[1]) $user->name = $d[1];
            $user->role = $d[2];
            if ($d[3]) $user->name_kana = $d[3];
            $user->save();
            $id++;
        }
    }

    private function CreateSeeds($debug)
    {
//        if ($debug) {
//            $paths = [
//                'database/sql/seeds.sql',
//            ];
//        } else {
//            $paths = [
//                'database/sql/init/categories.sql',
//                'database/sql/init/companies.sql',
//                'database/sql/init/course_lecturers.sql',
//                'database/sql/init/courses.sql',
//                'database/sql/init/juku_courses.sql',
//                'database/sql/init/jukus.sql',
//                'database/sql/init/users.sql',
//                'database/sql/init/user_courses.sql',
//                'database/sql/init/user_courses_audits.sql',
//            ];
//        }
        $paths = [
            'database/sql/init/products.sql',
//            'database/sql/init/companies.sql',
//            'database/sql/init/courses.sql',
//            'database/sql/init/jukus.sql',
//            'database/sql/init/users.sql',
        ];
//
        foreach ($paths as $path) {
            DB::unprepared(file_get_contents($path));
        }
    }
}
