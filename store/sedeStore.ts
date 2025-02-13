import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  quantity: number;
  image: string;
}

interface SedeState {
  selectedSede: { name: string };
  productPrices: Record<string, number>;
  productIdsWithPrices: string[];
  products: Product[];
  setSelectedSede: (sede: any) => void;
  fetchPrices: (sedeId: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
  loadSelectedSede: () => Promise<void>;
  saveSelectedSede: (sede: any) => Promise<void>;
}

const useSedeStore = create<SedeState>((set, get) => ({
  selectedSede: { name: "Seleccione sede" },
  productPrices: {},
  productIdsWithPrices: [],
  products: [],

  fetchPrices: async (sedeId) => {
    try {
      const response = await fetch("https://api.homiesburger.com/api/location-price");
      const data = await response.json();
      const filteredPrices = data.filter((price: { locationId: string; productId: string; price: number }) => price.locationId === sedeId);
      const prices = filteredPrices.reduce((acc: Record<string, number>, price: { locationId: string; productId: string; price: number }) => {
        acc[price.productId] = price.price;
        return acc;
      }, {});
      const productIdsWithPrices = filteredPrices.map((price: { locationId: string; productId: string; price: number }) => price.productId);
      set({ productPrices: prices, productIdsWithPrices });

      // Actualizar los productos con los precios
      const products = get().products.map((product) => ({
        ...product,
        price: prices[product.id] || product.price,
      }));
      set({ products });
    } catch (error) {
      console.error("Error fetching prices:", error);
    }
  },

  fetchProducts: async () => {
    try {
      const response = await fetch("https://api.homiesburger.com/api/product");
      const data = await response.json();

      // Agregar cantidad inicial a cada producto y asignar precios si están disponibles
      const productsWithQuantity = data.map((product: any) => ({
        ...product,
        quantity: 1,
        price: get().productPrices[product.id] || product.price,
        image: product.image,
      }));

      set({ products: productsWithQuantity });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  loadSelectedSede: async () => {
    const sede = await AsyncStorage.getItem('selectedSede');
    if (sede) {
      const parsedSede = JSON.parse(sede);
      set({ selectedSede: parsedSede });
      await get().fetchPrices(parsedSede.id);
    }
  },

  saveSelectedSede: async (sede: any) => {
    await AsyncStorage.setItem('selectedSede', JSON.stringify(sede));
  },

  setSelectedSede: (sede) => {
    set({ selectedSede: sede });
    get().fetchPrices(sede.id);
    get().saveSelectedSede(sede);
  },
}));

export default useSedeStore;