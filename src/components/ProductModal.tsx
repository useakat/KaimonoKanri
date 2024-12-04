import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import useProductStore from '@/store/productStore';
import { IProduct } from '@/models/Product';

type ProductFormData = Omit<IProduct, '_id' | 'createdAt' | 'updatedAt'>;

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, createProduct, updateProduct } = useProductStore();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>();

  useEffect(() => {
    if (selectedProduct) {
      reset(selectedProduct);
    } else {
      reset({
        name: '',
        category: '',
        description: '',
        imageUrl: '',
        barcode: '',
        purchaseUrl: '',
        currentStock: 0,
        minimumStock: 0,
        orderLotSize: 1,
        leadTime: 0,
        status: 'in_stock',
        supplier: {
          name: '',
          contact: ''
        }
      });
    }
  }, [selectedProduct, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (selectedProduct) {
        await updateProduct(selectedProduct._id, data);
      } else {
        await createProduct(data);
      }
      setSelectedProduct(null);
    } catch (error) {
      console.error('Failed to save product:', error);
    }
  };

  return (
    <Transition.Root show={selectedProduct !== null} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setSelectedProduct(null)}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mb-4">
                  {selectedProduct ? '商品を編集' : '新規商品を追加'}
                </Dialog.Title>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">商品名</label>
                    <input
                      type="text"
                      {...register('name', { required: '商品名は必須です' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">カテゴリー</label>
                    <input
                      type="text"
                      {...register('category', { required: 'カテゴリーは必須です' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">商品説明</label>
                    <textarea
                      {...register('description', { required: '商品説明は必須です' })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">画像URL</label>
                    <input
                      type="url"
                      {...register('imageUrl', { required: '画像URLは必須です' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.imageUrl && (
                      <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">現在の在庫数</label>
                      <input
                        type="number"
                        {...register('currentStock', { 
                          required: '在庫数は必須です',
                          min: { value: 0, message: '0以上の数値を入力してください' }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      {errors.currentStock && (
                        <p className="mt-1 text-sm text-red-600">{errors.currentStock.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">最小在庫数</label>
                      <input
                        type="number"
                        {...register('minimumStock', {
                          required: '最小在庫数は必須です',
                          min: { value: 0, message: '0以上の数値を入力してください' }
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      {errors.minimumStock && (
                        <p className="mt-1 text-sm text-red-600">{errors.minimumStock.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">仕入先名</label>
                    <input
                      type="text"
                      {...register('supplier.name', { required: '仕入先名は必須です' })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.supplier?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.supplier.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">購入URL</label>
                    <input
                      type="url"
                      {...register('purchaseUrl')}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                  >
                    {selectedProduct ? '更新' : '作成'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                    onClick={() => setSelectedProduct(null)}
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
