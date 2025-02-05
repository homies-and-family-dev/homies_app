import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { SvgXml } from "react-native-svg";
import useFavoritesStore from "../../store/favoritesStore";
import useCartStore from "../../store/cartStore";
import { formatCurrency } from "../../assets/utils/formatPrice";
import {
  deleteIcon,
  noHeartIcon,
  clearIcon,
} from "../../assets/icons/icons";
import ProductModal from "../../components/screens/ProductModal";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  quantity?: number;
}

const FavoriteScreen: React.FC = () => {
  const { favorites, removeFavorite, deleteAllFavorites } = useFavoritesStore();
  const { addProductToCart } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalVisible, setProductModalVisible] = useState(false);

  const handleAddToCart = async (product: Product) => {
    try {
      await addProductToCart({ ...product, quantity: 1 });
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleRemoveFavorite = (productId: string) => {
    removeFavorite(productId);
  };

  const handleClearFavorites = () => {
    deleteAllFavorites();
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setProductModalVisible(true);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => handleProductSelect(item)} style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={() => handleRemoveFavorite(item.id)}
          style={styles.deleteButton}
        >
          <SvgXml xml={deleteIcon} width={20} height={24} fill={"#FFA4DB"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addButton}
        >
          <Text style={styles.buttonText}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Favoritos</Text>
      </View>
      {favorites.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <SvgXml xml={noHeartIcon} width={130} height={130} />
          <Text style={styles.emptyCartText}>
            No tienes productos favoritos
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.botonDeleteCartContainer}>
            <TouchableOpacity
              onPress={handleClearFavorites}
              style={styles.clearCartButton}
            >
              <Text style={styles.clearCartButtonText}>Vaciar Favoritos</Text>
              <SvgXml xml={clearIcon} width={20} height={24} fill={"#FFA4DB"} />
            </TouchableOpacity>
          </View>
        </>
      )}
      {selectedProduct && (
        <ProductModal
          visible={isProductModalVisible}
          onClose={() => setProductModalVisible(false)}
          product={{ 
            ...selectedProduct, 
            description: selectedProduct.description || "Sin descripción disponible" 
         }}
  />
)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7FC",
    paddingTop: Platform.OS === "ios" ? 60 : 35,
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
    color: "#5C5C5C",
    textAlign: "left",
    paddingHorizontal: 20,
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
    flex: 1.5,
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
    flex: 2,
  },
  deleteButton: {
    backgroundColor: "#FFF",
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#FFA4DB",
    color: "#FFF",
    padding: 15,
    borderRadius: 30,
    elevation: 3,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 20,
    color: "#E2E2E2",
    marginTop: 20,
  },
  botonDeleteCartContainer: {
    alignItems: "center",
    marginBottom: 20,
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
    shadowOpacity: 0.1,
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

export default FavoriteScreen;