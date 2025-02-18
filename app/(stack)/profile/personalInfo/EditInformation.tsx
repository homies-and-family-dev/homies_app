import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../../../../store/userStore";

const EditInformation = () => {
  const navigation = useNavigation();
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const [name, setName] = useState(user.name.split(' ')[0] || "");
  const [lastName, setLastName] = useState(user.name.split(' ')[1] || "");
  const [isValid, setIsValid] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    validateInputs();
  }, [name, lastName]);

  const validateInputs = () => {
    if (!name.trim() || !lastName.trim()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  const handleSave = async () => {
    if (!isValid) {
      Alert.alert("Error de validación", "Por favor completa todos los campos correctamente.");
      return;
    }

    try {
      const updatedData = {
        name: `${name} ${lastName}`.trim()
      };
      
      const response = await updateUser(updatedData);
      
      if (response) {
        console.log('Respuesta de la API:', response);
        setAlertVisible(true);
      }
    } catch (error) {
      console.error("Error updating user information:", error);
      Alert.alert(
        "Error", 
        "Hubo un problema al actualizar tu información. Por favor, intenta de nuevo."
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.containerHeader}>
          <Text style={styles.text}>Editar Información</Text>
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
              value={name}
              onChangeText={setName}
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
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isValid ? "#FFA4DB" : "#FFD1E8" },
            ]}
            onPress={handleSave}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={alertVisible} transparent={true} animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.alertContainer}>
            <Ionicons name="checkmark-circle-outline" size={64} color="#FFA4DB" />
            <Text style={styles.message}>Tu información ha sido actualizada correctamente.</Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => {
                setAlertVisible(false);
                navigation.goBack();
              }}
            >
              <Text style={styles.alertButtonText}>Aceptar</Text>
            </TouchableOpacity>
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
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContainer: {
    width: "80%",
    paddingHorizontal: 30,
    paddingVertical: 50,
    gap: 15,
    backgroundColor: "#FFF",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    fontSize: 18,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  alertButton: {
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
  alertButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default EditInformation;