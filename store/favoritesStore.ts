import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: string) => void;
  loadFavorites: () => Promise<void>;
  deleteAllFavorites: () => Promise<void>;
}

const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        set({ favorites: JSON.parse(storedFavorites) });
      }
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  },

  addFavorite: async (product: Product) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, product];
      AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  removeFavorite: async (productId: string) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter((product) => product.id !== productId);
      AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  deleteAllFavorites: async () => {
    try {
      await AsyncStorage.removeItem("favorites");
      set({ favorites: [] });
    } catch (error) {
      console.error("Error al eliminar todos los favoritos:", error);
    }
  }
}));

export default useFavoritesStore;