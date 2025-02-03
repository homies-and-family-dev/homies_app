import React from "react";
import { View, Text, Image, StyleSheet, TouchableHighlight } from "react-native";

interface CategoryItemProps {
  item: {
    id: string;
    name: string;
    image: string;
  };
  selectedCategory: string | null;
  handleSelectCategory: (item: { id: string; name: string; image: string }) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ item, selectedCategory, handleSelectCategory }) => {
  const isSelected = selectedCategory === item.id;

  return (
    <TouchableHighlight
      style={[styles.touchable, isSelected && styles.selectedTouchable]}
      onPress={() => handleSelectCategory(item)}
      underlayColor="#FFD1EB"
    >
      <View style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <Text style={[styles.textCategory, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

// Estilos
const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 8,
    borderRadius: 10,
  },
  selectedTouchable: {
    transform: [{ scale: 1.05 }],
  },
  categoryItem: {
    width: 110,
    height: 110,
    backgroundColor: "#ffffff", 
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,

    // Sombra en iOS
    shadowColor: "#AEAEAE", 
    shadowOffset: { width: 1, height: 1 }, 
    shadowOpacity: 0.20, 
    shadowRadius: 5, 

    // Sombra en Android
    elevation: 3, 
    overflow: "visible",
    padding: 10,
  },
  selectedCategoryItem: {
    backgroundColor: "#FFA4DB",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "cover",
  },
  textCategory: {
    color: "#FFA4DB",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  selectedText: {
    color: "#ffffff",
  },
});

export default React.memo(CategoryItem);
