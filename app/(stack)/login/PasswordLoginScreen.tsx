import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Modal,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import useStore from "../../../store/authStore";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

type RootStackParamList = {
  PasswordScreen: { email: string };
};

type PasswordScreenRouteProp = RouteProp<RootStackParamList, 'PasswordScreen'>;

interface PasswordScreenProps {
  navigation: any;
}

const PasswordScreen: React.FC<PasswordScreenProps> = ({ navigation }) => {
  const route = useRoute<PasswordScreenRouteProp>();
  const { email } = route.params;
  const [password, setPassword] = useState<string>("");
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ password?: string }>({});
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const login = useStore((state) => state.login);

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setIsValidPassword(text.length >= 8);
  };

  const handleLogin = async () => {
    if (!password) {
      setErrors({ password: "La contraseña es obligatoria" });
      return;
    }

    try {
      const response = await fetch(
        "https://api.homiesburger.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        await login(data.token);
        router.push("/(tabs)"); 
      } else {
        console.log("Login failed:", data);
        setModalMessage("Contraseña incorrecta");
        setIsModalVisible(true);
      }
    } catch (error) {
      console.log("Error during login:", error);
      setModalMessage("Error durante el inicio de sesión. Por favor, inténtelo de nuevo.");
      setIsModalVisible(true);
    }
  };

  const handleRetryPress = () => {
    setIsModalVisible(false);
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Inicia sesión</Text>
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#969696"
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isValidPassword ? "#FFA4DB" : "#FFD1E8" },
            ]}
            onPress={handleLogin}
            disabled={!isValidPassword}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text>¿Olvidaste tu contraseña?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPasswordScreen")}>
          <Text style={styles.forgotPasswordText}>Recupérala aquí</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <MaterialIcons name="error-outline" size={60} color="#969696" style={{ marginBottom: 20 }} />
            <Text style={styles.modalText}>
              {modalMessage}
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleRetryPress}
              >
                <Text style={styles.buttonText}>Reintentar</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF7FC",
    paddingHorizontal: 40,
  },
  containerHeader: {
    paddingTop: 70,
    paddingBottom: 40,
    width: "100%",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  containerInput: {
    marginBottom: 30,
    width: "100%",
  },
  label: {
    marginBottom: 25,
    fontSize: 16,
    color: "#333",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  textInput: {
    flex: 1,
    color: "#000",
    backgroundColor: "transparent",
    fontSize: 16,
  },
  containerButton: {
    marginTop: 20,
    width: "100%",
    alignItems: "flex-start",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    backgroundColor: "#FFA4DB",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  containerFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#FFA4DB",
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalContent: {
    width: "90%", 
    backgroundColor: "#FFF7FC",
    paddingVertical: 30, 
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  modalButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    backgroundColor: "#FFA4DB",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default PasswordScreen;