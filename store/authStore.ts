import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/user"; // Asegúrate de tener este tipo definido

interface AuthState {
  userToken: string | null;
  user: User;
  loadToken: () => Promise<void>;
  fetchUserData: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  userToken: null,
  user: { id: "", email: "", name: "", lastName: "" },

  loadToken: async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        set({ userToken: token });
        await get().fetchUserData();
      }
    } catch (error) {
      console.error("Error loading token:", error);
    }
  },

  fetchUserData: async () => {
    const { userToken } = get();
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
        set({ user: { id: data.id, email: data.email, name: data.name, lastName: data.lastName } });
      } else {
        await get().logout();
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  },

  login: async (token) => {
    set({ userToken: token });
    await AsyncStorage.setItem("userToken", token);
    await get().fetchUserData();
  },

  logout: async () => {
    set({ userToken: null, user: { id: "", email: "", name: "", lastName: "" } });
    await AsyncStorage.removeItem("userToken");
  },

  updateUser: async (userData) => {
    try {
      const { user, userToken } = get();

      if (!userToken) {
        throw new Error("No se encontró el token de autenticación");
      }

      if (!user?.id) {
        throw new Error("ID de usuario no encontrado en la sesión");
      }

      console.log('Intentando actualizar usuario:', user.id);
      console.log('Datos a enviar:', userData);

      const response = await fetch(
        `https://api.homiesburger.com/api/user/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(userData),
        }
      );

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Error en la respuesta:', responseData);
        throw new Error(responseData.message || "Error actualizando usuario");
      }

      if (responseData.success || response.status === 200) {
        console.log('Actualización exitosa en la API');
        set({ user: { ...user, ...userData } });
        return responseData;
      } else {
        throw new Error("La actualización no fue confirmada por el servidor");
      }

    } catch (error) {
      console.error("Error en la actualización:", error);
      throw error;
    }
  },
}));

export default useAuthStore;