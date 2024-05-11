import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import Typography from "src/components/Typography";
import colors from "src/theme/colors.theme";
import { parseProductName } from "src/utils/utils";

interface CandyCardComponentProps {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  onPress: () => void;
}

const thumbnail =
  require("src/assets/images/shop_thumbnail.jpeg") as ImageSourcePropType;

const CandyCardComponent: React.FC<CandyCardComponentProps> = ({
  name,
  price,
  description,
  imageUrl,
  onPress,
}) => {
  const source = imageUrl ? { uri: imageUrl } : thumbnail;
  const { mainName, quantity } = parseProductName(name);
  return (
    <View>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <Image source={source} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Typography variant="h4" style={styles.title}>
            {mainName}
          </Typography>
          {quantity && (
            <Typography variant="h5" numberOfLines={2}>
              {quantity.trim()}
            </Typography>
          )}
          <Typography variant="h3" style={styles.price}>
            {price}
          </Typography>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
    elevation: 3,
    marginTop: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  textContainer: {
    padding: 10,
    flex: 1,
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: colors.border,
    opacity: 0.5,
  },
});

export default CandyCardComponent;
