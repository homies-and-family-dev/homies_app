import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCartStore from "../../store/cartStore";
import useSedeStore from "../../store/sedeStore";
import SedeComponent from "../../components/screens/SedeComponent";
import SedeModal from "../../components/screens/SedeModal";
import {
  deleteIcon,
  minusIcon,
  plusIcon,
  emptyCartIcon,
  clearIcon,
} from "../../assets/icons/icons";
import { formatCurrency } from "../../assets/utils/formatPrice"; // Import the function

const ShoppingCart: React.FC = () => {
  const {
    cartProducts,
    priceTotal,
    fetchCartProducts,
    updateProductQuantity,
    deleteProduct,
    deleteAllProducts,
  } = useCartStore();

  const { setSelectedSede, selectedSede, fetchPrices, productPrices } = useSedeStore();

  const [sedeModalVisible, setSedeModalVisible] = useState(false);

  useEffect(() => {
    fetchCartProducts();
  }, []);

  useEffect(() => {
    if (selectedSede) {
      fetchPrices(selectedSede.name);
    }
  }, [selectedSede]);

  const handleQuantityChange = (index: number, increment: number) => {
    const newQuantity = cartProducts[index].quantity + increment;
    if (newQuantity > 0) {
      updateProductQuantity(index, newQuantity);
    }
  };

  const handleRequestOrder = async () => {
    try {
      await AsyncStorage.setItem("products", JSON.stringify(cartProducts));
      // Navegar a la pantalla de detalles del pedido
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    }
  };

  const handleAddProduct = () => {
    // Navegar a la pantalla de inicio
  };

  const handleSelectSede = (sede: any) => {
    setSelectedSede(sede);
    fetchCartProducts();
  };

  const clearCart = () => {
    deleteAllProducts();
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tu pedido</Text>
        <SedeComponent setSedeModalVisible={setSedeModalVisible} />
      </View>
      {cartProducts.length > 0 ? (
        <>
          <ScrollView style={styles.content}>
            {cartProducts.map((product, index) => (
              <View key={index} style={styles.productCard}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: product.image }} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productPrice}>
                    {formatCurrency(productPrices[product.id] || product.price)}
                  </Text>
                </View>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    onPress={() => deleteProduct(index)}
                  >
                    <SvgXml
                      xml={deleteIcon}
                      width={20}
                      height={24}
                      fill={"#FFA4DB"}
                    />
                  </TouchableOpacity>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(index, -1)}
                      style={styles.botonQuantity}
                    >
                      <SvgXml
                        xml={minusIcon}
                        width="12"
                        height="22"
                        fill="#FFA4DB"
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{product.quantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(index, 1)}
                      style={styles.botonQuantity}
                    >
                      <SvgXml
                        xml={plusIcon}
                        width="12"
                        height="22"
                        fill="#FFA4DB"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.botonDeleteCartContainer}>
            <TouchableOpacity
              onPress={clearCart}
              style={styles.clearCartButton}
            >
              <Text style={styles.clearCartButtonText}>Vaciar Carrito</Text>
              <SvgXml xml={clearIcon} width={20} height={24} fill={"#FFA4DB"} />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyCartContainer}>
          <SvgXml
            xml={emptyCartIcon}
            width={100}
            height={100}
            fill={"#E2E2E2"}
          />
          <Text style={styles.emptyCartText}>Tu carrito está vacío</Text>
        </View>
      )}
      <View style={styles.content__total}>
        <View>
          <Text style={styles.subtotal}>Subtotal</Text>
          <Text style={styles.price}>{formatCurrency(priceTotal)}</Text>
        </View>
        <TouchableOpacity
          onPress={
            cartProducts.length > 0 ? handleRequestOrder : handleAddProduct
          }
          style={styles.requestOrderButton}
        >
          <Text style={styles.requestOrderText}>
            {cartProducts.length > 0 ? "Solicitar Pedido" : "Agregar Producto"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7FC",
    paddingTop: Platform.OS === "ios" ? 60 : 35,
  },
  content: {
    paddingTop: 10,
  },
  titleContainer: {
    backgroundColor: "#FFF7FC",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    paddingVertical: 20,
    fontWeight: "800",
    marginBottom: 10,
    color: "#5C5C5C",
    textAlign: "left",
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  imageContainer: {
    flex: 1,
    maxHeight: 90,
  },
  image: {
    width: "100%",
    height: "100%",
    maxHeight: 80,
    resizeMode: "cover",
    borderRadius: 8,
  },
  textContainer: {
    flex: 2,
    marginLeft: 20,
    justifyContent: "space-around",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5C5C5C",
  },
  productPrice: {
    fontSize: 16,
    color: "#5C5C5C",
  },
  actionsContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  quantity: {
    color: "#000",
    marginHorizontal: 10,
  },
  content__total: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    width: "100%",
    marginBottom: 20,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: "400",
    color: "#5C5C5C",
  },
  botonQuantity: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5C5C5C",
  },
  requestOrderButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFA4DB",
    color: "#FFF",
    paddingVertical: 15,
    borderRadius: 30,
    width: "50%",
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
  },
  requestOrderText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#E2E2E2",
    marginTop: 20,
  },

  botonDeleteCartContainer: {
    alignItems: "center",
    marginVertical: 15,
    width: "100%",
  },
  clearCartButton: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    gap: 20,
    shadowColor: "#AEAEAE",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 1,
  },
  clearCartButtonText: {
    color: "#5C5C5C",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ShoppingCart;