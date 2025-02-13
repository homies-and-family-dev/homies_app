import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons"; 
import { Link } from 'expo-router';
import { useRouter, useLocalSearchParams } from 'expo-router';

type RootStackParamList = {
  RegisterFormScreen: { email: string };
  LoginScreen: { email: string };
  EmailLoginScreen: { email: string };
};

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState<string>("");
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (params?.email) {
      const emailParam = params.email as string;
      setEmail(emailParam);
      setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailParam));
    }
  }, [params]);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text));
  };

  const handleContinuePress = async () => {
    try {
      const response = await fetch("https://api.homiesburger.com/api/user-email/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.exists) {
        setIsModalVisible(true);
      } else {
        router.push({
          pathname: "/register/RegisterFormScreen",
          params: { email }
        });
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  const handleLoginPress = () => {
    setIsModalVisible(false);
    router.push({
      pathname: "/login/EmailLoginScreen",
      params: { email }
    });
  };

  const handleRetryPress = () => {
    setIsModalVisible(false);
    setEmail("");
    setIsValidEmail(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Crear cuenta</Text>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Correo</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={24}
              color="#969696"
              style={styles.icon}
            />
            <TextInput
              placeholder="Ingresa tu correo electrónico"
              placeholderTextColor="#969696"
              style={styles.textInput}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={handleEmailChange}
            />
          </View>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isValidEmail ? "#FFA4DB" : "#FFD1E8" },
            ]}
            onPress={handleContinuePress}
            disabled={!isValidEmail}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerFooter}>
        <Text>¿Ya tienes cuenta?</Text>
        <Link href="/(stack)/login/EmailLoginScreen" asChild>
          <Text style={styles.registerText}>Inicia sesión</Text>
        </Link>
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
              Ya existe una cuenta asociada a {email}, ¿desea iniciar sesión con este correo?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButtonAlt}
                onPress={handleLoginPress}
              >
                <Text style={styles.modalButtonAltText}>Iniciar sesión</Text>
              </TouchableOpacity>
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
    paddingVertical: Platform.OS === "ios" ? 15 : 5,
    paddingHorizontal: 15,
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
  icon: {
    marginRight: 10,
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
  containerFooter: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    padding: 20,
    marginBottom: 30,
  },
  registerText: {
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
  modalButtonAlt: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 30,
    width: "100%",
    backgroundColor: "#FFF",
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
  modalButtonAltText: {
    color: "#FFA4DB",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterScreen;