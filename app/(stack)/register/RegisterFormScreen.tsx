import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';

type RootStackParamList = {
  RegisterFormScreen: { email: string };
  RegisterPasswordScreen: { firstName: string; lastName: string; birthDate: string; email: string };
  LoginScreen: undefined;
};

const RegisterForm = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = params.email as string;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    validateInputs();
  }, [firstName, lastName, birthDate]);

  const validateInputs = () => {
    if (!firstName.trim() || !lastName.trim() || !birthDate.trim()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleRegister = () => {
    if (!isValid) {
      Alert.alert("Error de validación", "Por favor completa todos los campos correctamente.");
      return;
    }

    router.push({
      pathname: "/(stack)/register/RegisterPasswordScreen",
      params: { firstName, lastName, birthDate, email }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Registrate</Text>
          <Text style={styles.emailText}>Correo: <Text style={styles.emailHighlight}>{email}</Text></Text>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Nombres</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#969696"
              style={styles.icon}
            />
            <TextInput
              placeholder="Ingresa tu nombre"
              placeholderTextColor="#969696"
              style={styles.textInput}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Apellido</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#969696"
              style={styles.icon}
            />
            <TextInput
              placeholder="Ingresa tu apellido"
              placeholderTextColor="#969696"
              style={styles.textInput}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Fecha de nacimiento</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="calendar-outline"
              size={24}
              color="#969696"
              style={styles.icon}
            />
            <TextInput
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#969696"
              style={styles.textInput}
              value={birthDate}
              onChangeText={setBirthDate}
            />
          </View>
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isValid ? "#FFA4DB" : "#FFD1E8" },
            ]}
            onPress={handleRegister}
            disabled={!isValid}
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
    paddingTop: 30,
    paddingBottom: 40,
    width: "100%",
    alignItems: "flex-start",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  emailText: {
    fontSize: 16,
    color: "#333",
    marginTop: 20,
  },
  emailHighlight: {
    color: "#969696",
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
        shadowColor: "#969696",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
        shadowColor: "#969696",
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
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
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
});

export default RegisterForm;