import { Types } from 'mongoose';
import { IProduct } from '@/models/Product';

type SeedProduct = Omit<IProduct, 'createdAt' | 'updatedAt'>;

export const seedProducts: SeedProduct[] = [
  {
    _id: new Types.ObjectId(),
    name: "キッチンペーパー 4ロール",
    category: "日用品",
    description: "吸水性の高い2枚重ねのキッチンペーパー。料理や掃除に最適。",
    imageUrl: "https://example.com/images/kitchen-paper.jpg",
    barcode: "4901234567890",
    purchaseUrl: "https://example.com/shop/kitchen-paper",
    currentStock: 8,
    minimumStock: 4,
    orderLotSize: 6,
    leadTime: 2,
    status: "in_stock",
    supplier: {
      name: "日用品卸売センター",
      contact: "supplier1@example.com"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "食器用洗剤 800ml",
    category: "洗剤",
    description: "手肌にやさしい濃縮タイプの食器用洗剤。泡立ちが良く、油汚れもスッキリ。",
    imageUrl: "https://example.com/images/dish-soap.jpg",
    barcode: "4901234567891",
    currentStock: 3,
    minimumStock: 5,
    orderLotSize: 4,
    leadTime: 3,
    status: "need_purchase",
    supplier: {
      name: "クリーンケア商事",
      contact: "supplier2@example.com"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "トイレットペーパー 12ロール",
    category: "日用品",
    description: "ソフトな肌触りの3枚重ねトイレットペーパー。バルク包装。",
    imageUrl: "https://example.com/images/toilet-paper.jpg",
    barcode: "4901234567892",
    currentStock: 10,
    minimumStock: 6,
    orderLotSize: 5,
    leadTime: 2,
    status: "in_stock",
    supplier: {
      name: "日用品卸売センター",
      contact: "supplier1@example.com"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "ゴミ袋 45L 50枚入り",
    category: "日用品",
    description: "丈夫で破れにくい半透明のゴミ袋。結びやすい持ち手付き。",
    imageUrl: "https://example.com/images/garbage-bags.jpg",
    barcode: "4901234567893",
    currentStock: 4,
    minimumStock: 4,
    orderLotSize: 3,
    leadTime: 1,
    status: "in_stock",
    supplier: {
      name: "パッケージング・プロ"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "除菌スプレー 400ml",
    category: "洗剤",
    description: "99.9%の除菌効果。キッチンやトイレの衛生管理に。",
    imageUrl: "https://example.com/images/sanitizer.jpg",
    barcode: "4901234567894",
    purchaseUrl: "https://example.com/shop/sanitizer",
    currentStock: 2,
    minimumStock: 6,
    orderLotSize: 6,
    leadTime: 4,
    status: "need_purchase",
    supplier: {
      name: "クリーンケア商事",
      contact: "supplier2@example.com"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "掃除機用紙パック 5枚入",
    category: "清掃用品",
    description: "高性能フィルター採用の掃除機用紙パック。ハウスダストをしっかりキャッチ。",
    imageUrl: "https://example.com/images/vacuum-bags.jpg",
    barcode: "4901234567895",
    currentStock: 7,
    minimumStock: 3,
    orderLotSize: 2,
    leadTime: 3,
    status: "in_stock",
    supplier: {
      name: "クリーンケア商事"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "台所用スポンジ 3個セット",
    category: "清掃用品",
    description: "研磨剤不使用で食器にやさしい。抗菌加工済み。",
    imageUrl: "https://example.com/images/sponge.jpg",
    barcode: "4901234567896",
    currentStock: 12,
    minimumStock: 5,
    orderLotSize: 4,
    leadTime: 2,
    status: "in_stock",
    supplier: {
      name: "日用品卸売センター",
      contact: "supplier1@example.com"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "浴室用洗剤 500ml",
    category: "洗剤",
    description: "カビ予防効果のある浴室用洗剤。泡タイプで壁面にもしっかり付着。",
    imageUrl: "https://example.com/images/bath-cleaner.jpg",
    barcode: "4901234567897",
    purchaseUrl: "https://example.com/shop/bath-cleaner",
    currentStock: 5,
    minimumStock: 4,
    orderLotSize: 3,
    leadTime: 2,
    status: "in_stock",
    supplier: {
      name: "クリーンケア商事",
      contact: "supplier2@example.com"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "床用ワイパーシート 30枚入",
    category: "清掃用品",
    description: "静電気の力でホコリをキャッチ。フローリングに最適。",
    imageUrl: "https://example.com/images/floor-wiper.jpg",
    barcode: "4901234567898",
    currentStock: 1,
    minimumStock: 3,
    orderLotSize: 4,
    leadTime: 2,
    status: "need_purchase",
    supplier: {
      name: "クリーンケア商事"
    }
  },
  {
    _id: new Types.ObjectId(),
    name: "消臭剤 400ml",
    category: "日用品",
    description: "長時間持続する消臭効果。部屋干し臭にも効果的。",
    imageUrl: "https://example.com/images/deodorizer.jpg",
    barcode: "4901234567899",
    purchaseUrl: "https://example.com/shop/deodorizer",
    currentStock: 6,
    minimumStock: 4,
    orderLotSize: 3,
    leadTime: 3,
    status: "in_stock",
    supplier: {
      name: "日用品卸売センター",
      contact: "supplier1@example.com"
    }
  }
];
