import { create } from 'zustand';
import { IProduct } from '@/models/Product';

interface ProductState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  selectedProduct: IProduct | null;
  filters: {
    category: string | null;
    status: string | null;
    search: string | null;
  };
  
  // Actions
  fetchProducts: () => Promise<void>;
  createProduct: (product: Partial<Omit<IProduct, '_id'>>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Omit<IProduct, '_id'>>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setSelectedProduct: (product: IProduct | null) => void;
  setFilters: (filters: Partial<ProductState['filters']>) => void;
}

const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  selectedProduct: null,
  filters: {
    category: null,
    status: null,
    search: null,
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const searchParams = new URLSearchParams();
      
      if (filters.category) searchParams.append('category', filters.category);
      if (filters.status) searchParams.append('status', filters.status);
      if (filters.search) searchParams.append('search', filters.search);

      const response = await fetch(`/api/products?${searchParams.toString()}`);
      if (!response.ok) throw new Error('商品の取得に失敗しました');
      
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '予期せぬエラーが発生しました', loading: false });
    }
  },

  createProduct: async (product) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '商品の作成に失敗しました');
      }

      const newProduct = await response.json();
      set(state => ({
        products: [newProduct, ...state.products],
        loading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '予期せぬエラーが発生しました', loading: false });
    }
  },

  updateProduct: async (id, product) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '商品の更新に失敗しました');
      }

      const updatedProduct = await response.json();
      set(state => ({
        products: state.products.map(p => 
          p._id.toString() === id ? updatedProduct : p
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '予期せぬエラーが発生しました', loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || '商品の削除に失敗しました');
      }

      set(state => ({
        products: state.products.filter(p => p._id.toString() !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : '予期せぬエラーが発生しました', loading: false });
    }
  },

  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },

  setFilters: (filters) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    }));
    get().fetchProducts();
  },
}));

export default useProductStore;
