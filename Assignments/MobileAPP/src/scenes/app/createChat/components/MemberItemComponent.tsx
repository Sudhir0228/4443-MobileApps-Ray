import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import Checkbox from "expo-checkbox";
import Typography from "src/components/Typography";
import { Member } from "src/models/API";
import colors from "src/theme/colors.theme";
import { parseProductName } from "src/utils/utils";

interface IMemberItemComponent {
  member: Member;
  isSelected: boolean;
  onPress: () => void;
}

const MemberItemComponent: React.FC<IMemberItemComponent> = ({
  member,
  isSelected,
  onPress,
}) => {
  const [checked, setChecked] = React.useState(isSelected);
  const onPressHandler = () => {
    setChecked(!checked);
    onPress();
  };
  return (
    <View>
      <TouchableOpacity style={styles.cardContainer} onPress={onPressHandler}>
        <View style={styles.textContainer}>
          <Typography variant="h3" style={styles.title}>
            {member.firstName}
          </Typography>
        </View>
        <Checkbox
          value={checked}
          color={checked ? colors.primary : undefined}
        />
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};

export default MemberItemComponent;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 10,
    elevation: 3,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
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
  avatar: {
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
