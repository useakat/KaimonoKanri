# 購入物品在庫管理Webアプリケーション 詳細仕様書
(KaimonoKanri - Inventory Management System)

## 1. はじめに

### 1.1 目的
本文書は、購入予定物品の在庫管理Webアプリケーションの詳細な仕様を定義します。このアプリケーションは、在庫管理の効率化、購入プロセスの簡素化、データの視覚化を実現することを目的としています。

### 1.2 対象読者
- 開発チーム
- プロジェクトマネージャー
- システム管理者
- エンドユーザー

### 1.3 システム概要
KaimonoKanriは、Next.jsを用いたモダンなWebアプリケーションとして実装され、MongoDBをバックエンドデータベースとして使用します。

## 2. 機能要件

### 2.1 在庫管理機能
#### 2.1.1 在庫状況管理
- 商品ごとの現在の在庫数表示
- 適正在庫下限値の設定と管理
- 在庫状態フラグ管理
  - 在庫あり（在庫数 > 適正在庫下限）
  - 要購入（在庫数 ≤ 適正在庫下限）
  - 注文済み（発注済み商品）

#### 2.1.2 在庫監視
- リアルタイムの在庫状況モニタリング
- 在庫下限アラート機能
- 在庫推移の統計データ表示

### 2.2 購入管理機能
#### 2.2.1 購入リスト管理
- 要購入商品の一覧表示
- 購入予定日管理

#### 2.2.2 購入リンク管理
- 商品購入URLの登録
- ワンクリックでの購入ページアクセス
- 購入履歴の記録

### 2.3 商品情報管理
#### 2.3.1 基本情報
- 商品ID（自動生成）
- 商品名
- 商品カテゴリ
- 商品説明
- 商品画像
- バーコード情報
- 購入先情報

#### 2.3.2 在庫情報
- 現在の在庫数
- 適正在庫下限
- 発注ロット数
- 標準納期

### 2.4 外部連携機能
#### 2.4.1 Yahoo API連携
- 商品情報の自動取得
  - 商品名
  - 商品画像
  - 価格情報
  - 商品説明
- バーコードによる商品検索

### 2.5 通知システム
#### 2.5.1 アラート機能
- 在庫下限到達通知

#### 2.5.2 フラグ管理
- 状態遷移の自動化
- 手動での状態変更機能
- 履歴管理

### 2.6 ユーザー管理
#### 2.6.1 ユーザー情報
- ユーザー名
- メールアドレス
- パスワード（暗号化）
- 位置情報
- 権限レベル

#### 2.6.2 設定管理
- 通知設定
- 表示設定

## 3. データベース設計

### 3.1 コレクション構造（MongoDB）

#### 3.1.1 products（商品コレクション）
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  description: String,
  imageUrl: String,
  barcode: String,
  purchaseUrl: String,
  currentStock: Number,
  minimumStock: Number,
  orderLotSize: Number,
  leadTime: Number,
  status: String,
  supplier: {
    name: String,
    contact: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 3.1.2 inventory_logs（在庫ログコレクション）
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  type: String,
  quantity: Number,
  previousStock: Number,
  newStock: Number,
  timestamp: Date,
  userId: ObjectId
}
```

#### 3.1.3 users（ユーザーコレクション）
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  passwordHash: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  preferences: {
    notifications: Boolean,
    language: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

#### 3.1.4 purchase_orders（発注コレクション）
```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  quantity: Number,
  status: String,
  orderedAt: Date,
  expectedDelivery: Date,
  userId: ObjectId
}
```

## 4. UI/UX仕様

### 4.1 画面構成
#### 4.1.1 メイン画面
- ダッシュボード
  - 在庫状況サマリー
  - アラート表示
  - クイックアクションボタン

#### 4.1.2 在庫一覧画面
- フィルター機能
  - カテゴリ別
  - ステータス別
  - 在庫状況別
- ソート機能
- 検索機能

#### 4.1.3 商品詳細画面
- 商品情報表示
- 在庫推移グラフ
- アクションボタン
  - 在庫数調整
  - 発注
  - 編集

### 4.2 レスポンシブデザイン仕様
- ブレークポイント
  - モバイル: 〜767px
  - タブレット: 768px〜1023px
  - デスクトップ: 1024px〜
- モバイルファースト設計
- タッチインターフェース対応

## 5. 技術仕様

### 5.1 開発環境
- フロントエンド: Next.js
- バックエンド: Node.js
- データベース: MongoDB
- 開発言語: TypeScript

### 5.2 必要なライブラリ/フレームワーク
- React
- Next.js
- MongoDB Driver
- Mongoose
- Axios
- TailwindCSS
- Jest（テスト）

### 5.3 API仕様
#### 5.3.1 内部API
- RESTful API設計
- エンドポイント命名規則
  - /api/v1/[リソース名]
- 認証: JWT

#### 5.3.2 外部API
- Yahoo商品検索API
  - レート制限対応
  - エラーハンドリング
  - キャッシュ戦略

## 6. セキュリティ要件

### 6.1 認証・認可
- JWTベースの認証
- ロールベースのアクセス制御
- セッション管理

### 6.2 データ保護
- パスワードのハッシュ化
- HTTPS通信
- XSS対策
- CSRF対策

## 7. 非機能要件

### 7.1 パフォーマンス
- ページロード時間: 3秒以内
- API応答時間: 1秒以内
- 同時接続ユーザー数: 5人程度

### 7.2 可用性
- システム稼働率: 99.9%
- バックアップ頻度: 日次

### 7.3 スケーラビリティ
- 水平スケーリング対応
- キャッシュ戦略
- データベースインデックス最適化

## 8. 開発・運用フロー

### 8.1 開発プロセス
- Gitフローに基づくバージョン管理
- コードレビュー必須
- 自動テスト実行

### 8.2 デプロイメント
- CI/CDパイプライン構築
- ステージング環境での検証
- ブルー/グリーンデプロイメント

### 8.3 監視・運用
- ログ収集・分析
- パフォーマンスモニタリング
- セキュリティ監視

## 9. 今後の拡張性

### 9.1 将来的な機能追加
- モバイルアプリ開発
