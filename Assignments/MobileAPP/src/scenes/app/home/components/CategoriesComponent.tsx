import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Typography from "src/components/Typography";
import { Category } from "src/models/API";
import colors from "src/theme/colors.theme";

interface CategoriesProps {
  categories: Category[];
  onCategorySelect: (categoryId: number) => void; // This function is called when a category is selected
}

const CategoriesComponent: React.FC<CategoriesProps> = ({
  categories,
  onCategorySelect,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const handlePress = useCallback(
    (categoryId: number) => {
      setActiveCategoryId(categoryId);
      onCategorySelect(categoryId);
    },
    [onCategorySelect]
  );

  return (
    <View>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              activeCategoryId === item._id ? styles.activeCategory : null,
            ]}
            onPress={() => handlePress(item._id)}
          >
            <Typography
              variant="h4"
              style={[
                styles.categoryText,
                {
                  color:
                    activeCategoryId === item._id ? colors.white : colors.black,
                },
              ]}
            >
              {item.name}
            </Typography>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryButton: {
    marginHorizontal: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "lightgray",
    borderRadius: 20,
  },
  activeCategory: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CategoriesComponent;
