import { create } from "zustand";
import { User } from "../types/user"; // Deberás crear este tipo
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "./authStore"; // Importar authStore

interface UserState {
  user: User;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const useUserStore = create<UserState>((set, get) => ({
  user: {
    id: "",
    email: "",
    name: "",
    lastName: "",
    // ... otros campos del usuario
  },

  updateUser: async (userData) => {
    try {
      const authUser = useAuthStore.getState().user;
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("No se encontró el token de autenticación");
      }

      if (!authUser?.id) {
        throw new Error("ID de usuario no encontrado en la sesión");
      }

      console.log('Intentando actualizar usuario:', authUser.id);
      console.log('Datos a enviar:', userData);

      const response = await fetch(
        `https://api.homiesburger.com/api/user/${authUser.id}`,
        {
          method: "PUT", // Volvemos a PUT si es lo que espera tu API
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      const responseData = await response.json();
      
      if (!response.ok) {
        console.error('Error en la respuesta:', responseData);
        throw new Error(responseData.message || "Error actualizando usuario");
      }

      // Solo actualizamos el estado si la API respondió exitosamente
      if (responseData.success || response.status === 200) {
        console.log('Actualización exitosa en la API');
        // Actualizamos el estado del usuario con los datos de la respuesta
        set({ user: { ...get().user, ...userData } });
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

export default useUserStore;