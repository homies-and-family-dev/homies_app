import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const OrdersScreen = () => {
  const [selectedButton, setSelectedButton] = useState("En curso");
  const orders = []; // Aquí deberías obtener los pedidos del estado o de una API

  const renderEmptyMessage = () => {
    const message =
      selectedButton === "En curso"
        ? "No hay pedidos en curso"
        : "No has completado ningún pedido";
    const iconName = selectedButton === "En curso" ? "hourglass-empty" : "check-circle";
    return (
      <View style={styles.emptyContainer}>
        <Icon name={iconName} size={100} color="#E2E2E2" />
        <Text style={styles.emptyText}>{message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>Historial de pedidos</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "En curso" && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton("En curso")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "En curso" && styles.selectedButtonText,
            ]}
          >
            En curso
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "Finalizados" && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton("Finalizados")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedButton === "Finalizados" && styles.selectedButtonText,
            ]}
          >
            Finalizados
          </Text>
        </TouchableOpacity>
      </View>
      {orders.length === 0 ? (
        renderEmptyMessage()
      ) : (
        // Aquí deberías renderizar la lista de pedidos
        <View>
          <Text>Lista de pedidos</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFF7FC",
    padding: 25,
    paddingHorizontal: 40,
  },
  containerTitle: {
    marginBottom: 40,
    alignItems: "flex-start",
  },
  textTitle: {
    fontSize: 24,
    color: "#40383C",
    fontWeight: "700",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    backgroundColor: "#FFF7FC",
    padding: 10,
    borderRadius: 2,
    borderBottomWidth: 3,
    borderColor: "#FFF7FC",
    marginHorizontal: 5,
  },
  selectedButton: {
    borderColor: "#FFA4DB",
  },
  buttonText: {
    fontSize: 18,
    color: "#40383C",
    textAlign: "center",
  },
  selectedButtonText: {
    color: "#FFA4DB",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#E2E2E2",
    marginTop: 20,
  },
});

export default OrdersScreen;