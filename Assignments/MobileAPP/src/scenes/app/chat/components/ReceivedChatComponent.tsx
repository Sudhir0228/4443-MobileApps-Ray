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
import { Message } from "src/models/API";
import colors from "src/theme/colors.theme";
import { parseProductName } from "src/utils/utils";

interface IReceivedChatComponent {
  message: Message;
}

const ReceivedChatComponent: React.FC<IReceivedChatComponent> = ({
  message,
}) => {
  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.initials}>
          <Typography variant="h4">
            {message.sender.firstName?.[0].toUpperCase()}
          </Typography>
        </View>
        <View style={styles.textContainer}>
          <Typography variant="h4">{message.content}</Typography>
        </View>
      </View>
      <View style={styles.nameContainer}>
        <Typography variant="h5">{message.sender.firstName}</Typography>
        <Typography variant="h5">{message.timestamp}</Typography>
      </View>
    </View>
  );
};

export default ReceivedChatComponent;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: colors.transparent,
    marginBottom: 10,
    marginTop: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  textContainer: {
    padding: 24,
    flex: 1,
    gap: 5,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: colors.primary,
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
  nameContainer: {
    flexDirection: "row",
  },
  initials: {
    backgroundColor: colors.border,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
