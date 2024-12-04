'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import ProductList from '@/components/ProductList';
import ProductModal from '@/components/ProductModal';
import useProductStore from '@/store/productStore';

export default function Home() {
  const { setSelectedProduct } = useProductStore();

  const handleAddNewProduct = () => {
    setSelectedProduct({} as any); // モーダルを新規作成モードで開く
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">商品一覧</h2>
        <button
          onClick={handleAddNewProduct}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          新規商品を追加
        </button>
      </div>

      <ProductList />
      <ProductModal />
    </div>
  );
}
