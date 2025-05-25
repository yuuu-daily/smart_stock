<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use WorkOS\UserManagement;
class WorkOSCallbackController extends Controller
{
    public function handle(Request $request)
    {
        $code = $request->query('code');

        if (!is_string($code)) {
            Log::warning('WorkOS callback: Missing or invalid SSO code');
            abort(400, 'Missing or invalid SSO code');
        }

        Log::debug('WorkOS callback: Received code', ['code' => $code]);

        try {
            $clientId = config('services.workos.client_id');
            $secret = config('services.workos.secret');
            $cookiePassword = config('services.workos.cookie_password');
            $ip = $request->ip();
            $userAgent = $request->userAgent();

//            Log::debug('WorkOS config loaded', [
//                'client_id' => $clientId,
//                'ip' => $ip,
//                'user_agent' => $userAgent,
//                'cookie_password_set' => !empty($cookiePassword),
//            ]);

            $secret = config('services.workos.secret');
            $userManagement = new UserManagement($secret);

            $authenticateResponse = $userManagement->authenticateWithCode(
                $clientId,
                $code,
                $ip,
                $userAgent
            );

            Log::debug('WorkOS authentication response received', [
                'user' => $authenticateResponse->user,
            ]);

            $user = $authenticateResponse->user;

            if (!$user) {
                Log::error('Missing user in authentication response');
                abort(400, 'Missing user data from WorkOS.');
            }

            $userEmail = $user->email;
            $userName = trim($user->firstName . ' ' . $user->lastName);

            Log::debug('Resolved WorkOS user', [
                'email' => $userEmail,
                'name' => $userName,
            ]);

            // ユーザー作成または取得
            $appUser = User::firstOrCreate(
                ['email' => $userEmail],
                [
                    'name' => $userName,
                    'password' => bcrypt(Str::random(32)),
                    'workos_id' => $user->id ?? '', // null対策もすると安全
                    'avatar' => $user->profilePictureUrl ?? '', // 必要なら
                ]
            );

            Log::info('User authenticated via WorkOS', ['user_id' => $appUser->id]);

            // Laravelでログイン
            Auth::login($appUser);
            Log::debug('Laravel login completed', ['user_id' => $appUser->id]);

            return redirect()->route('dashboard');

        } catch (\WorkOS\Exception\WorkOSException $e) {
            Log::error('WorkOS authentication failed', ['error' => $e->getMessage()]);
            abort(400, 'WorkOS authentication failed.');
        } catch (\Throwable $t) {
            Log::critical('Unexpected error during WorkOS login', ['error' => $t->getMessage()]);
            abort(500, 'Internal server error');
        }
    }

    /**
     * WorkOS + Laravel のログアウト処理
     */
    public function logout(Request $request)
    {
        // Laravel セッションを終了
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // WorkOS セッショントークン取得（ログイン時に保存した sealedSession）
        $workosSession = $request->cookie('wos-session');

        if (!$workosSession) {
            Log::warning('wos-session cookie not found');
            return redirect('/');
        }

        // WorkOS Logout API 呼び出し
        $response = Http::withToken(config('services.workos.api_key'))
            ->post('https://api.workos.com/user_management/logout', [
                'logout_redirect_url' => config('app.url'), // ログアウト後に戻る先
                'session_token' => $workosSession,
            ]);

        if ($response->failed()) {
            Log::error('WorkOS logout failed', ['body' => $response->body()]);
            return redirect('/'); // 失敗時はトップへ
        }

        $logoutUrl = $response->json()['logout_url'] ?? '/';
        return redirect($logoutUrl);
    }


}
