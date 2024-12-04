# KaimonoKanri (買い物管理)

## 概要
KaimonoKanriは、購入予定物品の在庫を効率的に管理するためのWebアプリケーションです。
在庫の適正化、購入プロセスの簡素化、データの視覚化を実現し、スマートな在庫管理を支援します。

## 主な機能
- 商品ごとの在庫管理
- 購入予定リスト作成
- Yahoo API連携による商品情報取得
- 在庫アラート通知
- ユーザー設定管理

## 技術スタック
- フロントエンド: Next.js
- バックエンド: Node.js
- データベース: MongoDB
- 開発言語: TypeScript

## 開発環境のセットアップ

### 必要条件
- Node.js (v16以上)
- MongoDB
- Git

### インストール手順
1. リポジトリのクローン
```bash
git clone https://github.com/yourusername/KaimonoKanri.git
cd KaimonoKanri
```

2. 依存パッケージのインストール
```bash
npm install
```

3. 環境変数の設定
```bash
cp .env.example .env
# .envファイルを編集して必要な環境変数を設定
```

4. 開発サーバーの起動
```bash
npm run dev
```

アプリケーションは http://localhost:3000 で起動します。

## 詳細仕様
詳細な仕様については、[ソフトウェア要件仕様書](docs/software_requirements_specification.md)を参照してください。

## ライセンス
MIT

## コントリビューション
プロジェクトへの貢献は大歓迎です。Issue作成やPull Requestをお願いします。
