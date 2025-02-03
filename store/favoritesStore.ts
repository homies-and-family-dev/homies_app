import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoritesState {
  favorites: any[];
  addFavorite: (product: any) => void;
  removeFavorite: (productId: string) => void;
  loadFavorites: () => Promise<void>;
}

const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],

  // Cargar favoritos desde AsyncStorage
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

  // Agregar un producto a favoritos
  addFavorite: async (product) => {
    set((state) => {
      const updatedFavorites = [...state.favorites, product];
      AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },

  // Eliminar un producto de favoritos
  removeFavorite: async (productId) => {
    set((state) => {
      const updatedFavorites = state.favorites.filter((product) => product.id !== productId);
      AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { favorites: updatedFavorites };
    });
  },
}));

export default useFavoritesStore;
