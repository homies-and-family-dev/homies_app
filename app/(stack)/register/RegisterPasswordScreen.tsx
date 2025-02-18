import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useStore from '../../../store/authStore';
import { router } from 'expo-router';

type RootStackParamList = {
  RegisterPasswordScreen: { email: string; firstName: string; lastName: string; birthDate: string };
  TabNavigator: { screen: string; params: { showSuccessAnimation: boolean } };
};

type RegisterPasswordScreenRouteProp = RouteProp<RootStackParamList, 'RegisterPasswordScreen'>;

const RegisterPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RegisterPasswordScreenRouteProp>();
  const { email, firstName, lastName } = route.params;

  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false);

  const isValid = password.length >= 8 && password === confirmPassword;

  const showLengthError = password.length > 0 && password.length < 8;
  const showMatchError =
    confirmPassword.length > 0 && password.length >= 8 && password !== confirmPassword;

  const login = useStore((state) => state.login);

  const handleRegister = async () => {
    if (!isValid) {
      const errorMessage = showLengthError
        ? 'La contraseña debe tener al menos 8 caracteres.'
        : showMatchError
        ? 'Las contraseñas no coinciden.'
        : '';
      Alert.alert('Error de validación', errorMessage);
      return;
    }
  
    const name = `${firstName} ${lastName}`;
    const roleId = 1;
  
    try {
      const response = await fetch('https://api.homiesburger.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, roleId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const loginResponse = await fetch('https://api.homiesburger.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        const loginData = await loginResponse.json();
  
        if (loginResponse.ok) {
          await login(loginData.token);
          router.push("/(tabs)");
        } else {
          Alert.alert('Error de inicio de sesión', loginData.message || 'Algo salió mal al iniciar sesión.');
        }
      } else {
        Alert.alert('Error de registro', data.message || 'Algo salió mal.');
      }
    } catch (error) {
      Alert.alert('Error de red', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Crear contraseña</Text>
          <Text style={styles.emailText}>Correo: <Text style={styles.emailHighlight}>{email}</Text></Text>
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={24} color="#969696" style={styles.icon} />
            <TextInput
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#969696"
              style={styles.textInput}
              secureTextEntry={!isPasswordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#969696"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.label}>Confirmar contraseña</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={24} color="#969696" style={styles.icon} />
            <TextInput
              placeholder="Confirma tu contraseña"
              placeholderTextColor="#969696"
              style={styles.textInput}
              secureTextEntry={!isConfirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
              <Ionicons
                name={isConfirmPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#969696"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>

        {showMatchError && <Text style={styles.errorText}>Las contraseñas no coinciden.</Text>}
        {showLengthError && <Text style={styles.errorText}>La contraseña debe tener al menos 8 caracteres.</Text>}

        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isValid ? "#FFA4DB" : "#FFD1E8" },
            ]}
            onPress={handleRegister}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
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
    padding: 15,
    width: "100%",
    backgroundColor: "#FFF",
    ...Platform.select({
      ios: {
        shadowColor: "#969696",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
    marginTop: 10,
  },
});

export default RegisterPasswordScreen;