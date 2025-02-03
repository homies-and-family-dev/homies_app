import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { formatCurrency } from "@/assets/utils/formatPrice";
import {
  minusIcon,
  plusIcon,
  HeartFavoriteIcon,
  HeartFavoriteIconFilled,
  BackArrowIcon,
} from "@/assets/icons/icons";
import useCartStore from "@/store/cartStore";
import useFavoritesStore from "../../store/favoritesStore";

// Hook para manejar favoritos
const useProductFavorite = (product: { id: string; name: string; description: string; price: number; image: string; quantity?: number }) => {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some((fav: { id: string }) => fav.id === product.id));
  }, [product, favorites]);

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
    setIsFavorite(!isFavorite);
  }, [isFavorite, product, addFavorite, removeFavorite]);

  return { isFavorite, toggleFavorite };
};

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description: string ;
    price: number;
    image: string;
    quantity?: number;
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onClose, product }) => {
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const shakeAnim = useState(new Animated.Value(0))[0];

  const { addProductToCart } = useCartStore();
  const { isFavorite, toggleFavorite } = useProductFavorite(product);

  // Calcular el precio total
  const priceTotal = useMemo(() => product.price * quantity, [product.price, quantity]);

  useEffect(() => {
    setQuantity(product.quantity || 1);
  }, [product]);

  const handlePress = async () => {
    try {
      await addProductToCart({ ...product, quantity });
      onClose();
    } catch (error) {
      console.error("Error al añadir el producto al carrito:", error);
    }
  };

  const handleQuantityChange = (type: "plus" | "minus") => {
    if (type === "plus") {
      setQuantity((prev: number) => prev + 1);
    } else if (type === "minus" && quantity > 1) {
      setQuantity((prev: number) => prev - 1);
    }
  };

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
              <View style={styles.contentContainer}>
                <View>
                  <View style={styles.contain__image}>
                    <View style={styles.contentIcons}>
                      <TouchableOpacity onPress={onClose}>
                        <SvgXml xml={BackArrowIcon} width="25" height="25" fill="#FFA4DB" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={toggleFavorite}>
                        <SvgXml
                          xml={isFavorite ? HeartFavoriteIconFilled : HeartFavoriteIcon}
                          width="25"
                          height="25"
                          fill="#FFA4DB"
                        />
                      </TouchableOpacity>
                    </View>
                    <Image style={styles.image} source={{ uri: product.image }} />
                  </View>
                  <View style={styles.detailsContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productRecipe}>{product.description}</Text>
                    <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
                  </View>
                </View>

                <View style={styles.container__button}>
                  <View style={styles.container__quantity}>
                    <TouchableOpacity onPress={() => handleQuantityChange("minus")} style={styles.botonQuantity}>
                      <SvgXml xml={minusIcon} width="22" height="22" fill="#FFA4DB" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{quantity}</Text>
                    <TouchableOpacity onPress={() => handleQuantityChange("plus")} style={styles.botonQuantity}>
                      <SvgXml xml={plusIcon} width="22" height="22" fill="#FFA4DB" />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={handlePress} style={styles.boton}>
                    <Text style={styles.texto}>Agregar {formatCurrency(priceTotal)}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Estilos
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  container: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    height: "90%",
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 0,
  },
  contain__image: {
    backgroundColor: "#FFCCEB",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  contentIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 30,
  },
  productName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#FFA4DB",
    marginBottom: 15,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5C5C5C",
    marginTop: 20,
  },
  productRecipe: {
    fontSize: 16,
    fontWeight: "300",
    color: "#6D6D6D",
    marginTop: 3,
  },
  container__button: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  container__quantity: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "40%",
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  botonQuantity: {
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  quantity: {
    fontSize: 18,
  },
  boton: {
    alignItems: "center",
    backgroundColor: "#FFA4DB",
    paddingVertical: 15,
    borderRadius: 30,
    width: "50%",
    elevation: 3,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  texto: {
    color: "#fff",
    fontSize: 18,
  },
});

export default React.memo(ProductModal);
