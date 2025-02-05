import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cartProducts: Product[];
  priceTotal: number;
  fetchCartProducts: () => Promise<void>;
  calculateTotalPrice: (products: Product[]) => void;
  addProductToCart: (product: Product) => Promise<void>;
  updateProductQuantity: (index: number, newQuantity: number) => Promise<void>;
  deleteProduct: (index: number) => Promise<void>;
  deleteAllProducts: () => Promise<void>;
}

const useCartStore = create<CartState>((set, get) => ({
  cartProducts: [],
  priceTotal: 0,

  fetchCartProducts: async () => {
    try {
      const storedProducts = await AsyncStorage.getItem("products");
      if (storedProducts) {
        const parsedProducts = JSON.parse(storedProducts);
        set({ cartProducts: parsedProducts });
        get().calculateTotalPrice(parsedProducts);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  },

  calculateTotalPrice: (products) => {
    const total = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
    set({ priceTotal: total });
  },

  addProductToCart: async (product) => {
    const existingProductIndex = get().cartProducts.findIndex((p) => p.id === product.id);
    let updatedProducts = [...get().cartProducts];

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].quantity += 1;
    } else {
      updatedProducts.push({ ...product, quantity: 1 });
    }

    set({ cartProducts: updatedProducts });
    get().calculateTotalPrice(updatedProducts);
    await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
  },

  updateProductQuantity: async (index, newQuantity) => {
    let updatedProducts = [...get().cartProducts];
    updatedProducts[index].quantity = newQuantity;
    set({ cartProducts: updatedProducts });
    get().calculateTotalPrice(updatedProducts);
    await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
  },

  deleteProduct: async (index) => {
    let updatedProducts = [...get().cartProducts];
    updatedProducts.splice(index, 1);
    set({ cartProducts: updatedProducts });
    get().calculateTotalPrice(updatedProducts);
    await AsyncStorage.setItem("products", JSON.stringify(updatedProducts));
  },

  deleteAllProducts: async () => {
    set({ cartProducts: [], priceTotal: 0 });
    await AsyncStorage.removeItem("products");
  },
}));

export default useCartStore;