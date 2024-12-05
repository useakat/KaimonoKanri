import { useEffect } from 'react';
import useProductStore from '../store/productStore';
import { ExclamationCircleIcon, ShoppingCartIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { IProduct } from '../models/Product';
import { Types } from 'mongoose';

const statusIcons: Record<IProduct['status'], JSX.Element> = {
  in_stock: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
  need_purchase: <ExclamationCircleIcon className="h-5 w-5 text-red-500" />,
  ordered: <ShoppingCartIcon className="h-5 w-5 text-blue-500" />,
};

const statusLabels: Record<IProduct['status'], string> = {
  in_stock: '在庫あり',
  need_purchase: '要購入',
  ordered: '注文済み',
};

export default function ProductList() {
  const { 
    products, 
    loading, 
    error, 
    filters,
    fetchProducts,
    setFilters,
    setSelectedProduct 
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const uniqueCategories: string[] = Array.from(new Set(products.map((p: IProduct) => p.category)));

  return (
    <div className="space-y-4">
      {/* フィルターセクション */}
      <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow">
        <input
          type="text"
          placeholder="商品を検索..."
          className="flex-1 min-w-[200px] px-4 py-2 border rounded-md text-black"
          value={filters.search || ''}
          onChange={(e) => setFilters({ search: e.target.value })}
        />
        <select
          className="px-4 py-2 border rounded-md bg-white text-black"
          value={filters.status || ''}
          onChange={(e) => setFilters({ status: e.target.value || null })}
        >
          <option value="">すべてのステータス</option>
          <option value="in_stock">在庫あり</option>
          <option value="need_purchase">要購入</option>
          <option value="ordered">注文済み</option>
        </select>
        <select
          className="px-4 py-2 border rounded-md bg-white text-black"
          value={filters.category || ''}
          onChange={(e) => setFilters({ category: e.target.value || null })}
        >
          <option value="">すべてのカテゴリー</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* 商品リスト */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {(products as (IProduct & { _id: Types.ObjectId })[]).map((product) => (
          <div
            key={product._id.toString()}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="relative aspect-video mb-4">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={`${product.name}の商品画像 - ${product.category}カテゴリー`}
                  className="absolute inset-0 w-full h-full object-cover rounded-md text-black"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-black">No image</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                <span className="flex items-center gap-1">
                  {statusIcons[product.status]}
                  <span className="text-sm text-gray-600">
                    {statusLabels[product.status]}
                  </span>
                </span>
              </div>
              <p className="text-sm text-gray-600">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">
                  在庫: {product.currentStock} / {product.minimumStock}
                </span>
                {product.purchaseUrl && (
                  <a
                    href={product.purchaseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    購入リンク
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          商品が見つかりませんでした
        </div>
      )}
    </div>
  );
}
