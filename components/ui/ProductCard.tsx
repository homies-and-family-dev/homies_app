import React, { memo } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { formatCurrency } from "@/assets/utils/formatPrice";

interface Product {
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer} activeOpacity={0.8}>
      <View style={styles.container}>
        <Image style={styles.imageContainer} source={{ uri: product.image }} />
        <View style={styles.infoContainer}>
          <Text style={styles.productName} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Estilos
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "44%",
    height: 200,
    shadowColor: "#AEAEAE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  productName: {
    fontSize: 15,
    color: "#FFA4DB",
    fontWeight: "600",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "400",
    color: "#575757",
  },
});

export default memo(ProductCard);