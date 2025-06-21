## Smart Stock (在庫管理システム)

### 概要（Overview）
このプロジェクトは書籍在庫管理を目的としたWebアプリケーションです。  
React + TypeScript + Laravelで構築し、管理者が書籍在庫管理できる機能を提供しています。

【一覧画面】
![一覧画面](/public/images/img.png)

※バーコードスキャナーは、　EYOYO (2Dバーコードスキャナー モデル：EY-039)を使用をし、PCと連携させている。

### 制作目的（Purpose）
- 実務を想定したSPA構成のアーキテクチャ設計の理解力を高めるため
- バックエンドAPIとの非同期通信、認証、状態管理の理解を深めるため

### 使用技術（Tech Stack）
フロントエンド
- React: 19.1.3 / TypeScript 5.8.3 / Vite 6.2.4
- Atomic Design / Storybook / Axios: 1.8.2

バックエンド
- Laravel 12 / MySQL 8.0 / Docker / Redis
- Work OSを使ったAPI認証

インフラ・その他
- Docker Compose

### 主な機能（Main Features）
- ユーザー認証（ログイン / ログアウト）
- 在庫管理（登録・編集・削除）
- バーコード読み取りによる出庫・入庫処理（React側）
