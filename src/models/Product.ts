import mongoose from 'mongoose';
import type { Document, Model } from 'mongoose';

export interface IProduct {
  _id?: mongoose.Types.ObjectId;
  name: string;
  category: string;
  description?: string;
  imageUrl?: string;
  barcode?: string | null;
  purchaseUrl?: string;
  currentStock: number;
  minimumStock: number;
  orderLotSize: number;
  leadTime: number;
  status: 'in_stock' | 'need_purchase' | 'ordered';
  supplier: {
    name: string;
    contact?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

interface IProductDocument extends Document, Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'> {}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '商品名は必須です'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'カテゴリーは必須です'],
    trim: true
  },
  description: {
    type: String
  },
  imageUrl: {
    type: String
  },
  barcode: {
    type: String,
    unique: true,
    sparse: true,
    set: (v: string) => v === '' ? null : v
  },
  purchaseUrl: String,
  currentStock: {
    type: Number,
    required: [true, '現在の在庫数は必須です'],
    min: [0, '在庫数は0以上である必要があります']
  },
  minimumStock: {
    type: Number,
    required: [true, '最小在庫数は必須です'],
    min: [0, '最小在庫数は0以上である必要があります']
  },
  orderLotSize: {
    type: Number,
    required: [true, '発注ロットサイズは必須です'],
    min: [1, '発注ロットサイズは1以上である必要があります']
  },
  leadTime: {
    type: Number,
    required: [true, '納期日数は必須です'],
    min: [0, '納期日数は0以上である必要があります']
  },
  status: {
    type: String,
    enum: ['in_stock', 'need_purchase', 'ordered'],
    required: [true, 'ステータスは必須です'],
    default: 'in_stock'
  },
  supplier: {
    name: {
      type: String,
      required: [true, '仕入先名は必須です']
    },
    contact: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 在庫状態を自動的に更新するミドルウェア
ProductSchema.pre('save', function(this: IProductDocument, next: () => void) {
  if (this.currentStock <= this.minimumStock) {
    this.status = 'need_purchase';
  } else {
    this.status = 'in_stock';
  }
  next();
});

// インデックスの設定
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ barcode: 1 });

// Try to get existing model or create new one
let ProductModel: Model<IProductDocument>;
try {
  ProductModel = mongoose.model<IProductDocument>('Product');
} catch {
  ProductModel = mongoose.model<IProductDocument>('Product', ProductSchema);
}

export default ProductModel;
