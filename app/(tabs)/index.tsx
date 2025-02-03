import { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Navbar from "@/components/ui/navbar/Navbar";
import CategoriesCarousel from "@/components/ui/categories/CategoriesCarousel";
import SedeModal from "@/components/screens/SedeModal";
import ProductModal from "@/components/screens/ProductModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCategories } from "@/hooks/api/useCategories";
import useSedeStore from "@/store/sedeStore";
import ProductCard from "@/components/ui/ProductCard";

// Define the Product interface
interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  categoryId: string;
  quantity?: number;
}

export default function HomeScreen() {
  const [isSedeModalVisible, setSedeModalVisible] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isProductModalVisible, setProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Estado global desde Zustand (sede y precios)
  const selectedSede = useSedeStore((state) => state.selectedSede);
  const fetchPrices = useSedeStore((state) => state.fetchPrices);
  const fetchProducts = useSedeStore((state) => state.fetchProducts);
  const loadSelectedSede = useSedeStore((state) => state.loadSelectedSede);
  const products = useSedeStore((state) => state.products);

  // Hooks personalizados para obtener categorías
  const { categories, loading: categoriesLoading } = useCategories();

  useEffect(() => {
    loadSelectedSede();
  }, []);

  useEffect(() => {
    if (selectedSede) {
      fetchPrices(selectedSede.name);
    }
  }, [selectedSede]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtrar productos por categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  return (
    <ScrollView style={styles.container}>
      <Navbar setSedeModalVisible={setSedeModalVisible} />

      <ThemedView style={styles.container}>
        {/* Categorías */}
        <Text style={styles.TitelCategories}>Categorías</Text>
        {categoriesLoading ? (
          <ThemedText>Cargando categorías...</ThemedText>
        ) : (
          <CategoriesCarousel 
            categoriesData={categories} 
            onSelectCategory={(item) => setSelectedCategory(item.id)} 
          />
        )}

        {/* Productos */}
        <View style={styles.productsContainer}>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onPress={() => {
                setSelectedProduct(product);
                setProductModalVisible(true);
              }} 
            />
          ))}
        </View>
      </ThemedView>

      {/* Modal de Sedes */}
      <SedeModal
        visible={isSedeModalVisible}
        onClose={() => setSedeModalVisible(false)}
      />

      {/* Modal de Producto */}
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
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#FFF7FC",
  },
  TitelCategories: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#FFA4DB",
    textAlign: "center",
  },
  productsContainer: {
    marginVertical: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});

