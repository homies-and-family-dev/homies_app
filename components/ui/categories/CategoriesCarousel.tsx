import React, { useState, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import CategoryItem from "@/components/ui/categories/CategoryItem";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface CategoriesCarouselProps {
  categoriesData: Category[];
  onSelectCategory: (item: Category) => void;
}

const CategoriesCarousel: React.FC<CategoriesCarouselProps> = ({ categoriesData, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSelectCategory = useCallback(
    (item: Category) => {
      setSelectedCategory(item.id);
      onSelectCategory(item);
    },
    [onSelectCategory]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoriesData}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            selectedCategory={selectedCategory}
            handleSelectCategory={handleSelectCategory}
          />
        )}
        initialNumToRender={5}
        getItemLayout={(data, index) => ({
          length: 110,
          offset: 110 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7FC",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  flatListContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
});

export default React.memo(CategoriesCarousel);
