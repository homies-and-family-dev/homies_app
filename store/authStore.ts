import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  userToken: string | null;
  user: { id: string; email: string; name: string };
  loadToken: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  userToken: null,
  user: { id: "", email: "", name: "" },

  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        set({ userToken: token });
        await useAuthStore.getState().fetchUserData();
      }
    } catch (error) {
      console.error("Error loading token:", error);
    }
  },

  fetchUserData: async () => {
    const { userToken } = useAuthStore.getState();
    if (!userToken) return;

    try {
      const response = await fetch("https://api.homiesburger.com/api/auth/verify-token", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: { id: data.id, email: data.email, name: data.name } });
      } else {
        await useAuthStore.getState().logout();
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  },

  login: async (token) => {
    set({ userToken: token });
    await AsyncStorage.setItem("userToken", token);
    await useAuthStore.getState().fetchUserData();
  },

  logout: async () => {
    set({ userToken: null, user: { id: "", email: "", name: "" } });
    await AsyncStorage.removeItem("userToken");
  },
}));

export default useAuthStore;
