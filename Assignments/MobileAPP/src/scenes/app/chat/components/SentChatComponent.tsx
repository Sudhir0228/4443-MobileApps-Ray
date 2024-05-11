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

interface ISentChatComponent {
  message: Message;
}

const SentChatComponent: React.FC<ISentChatComponent> = ({ message }) => {
  return (
    <View style={{ justifyContent: "flex-end", flex: 1 }}>
      <View style={{ alignItems: "flex-end" }}>
        <View style={styles.cardContainer}>
          <View style={styles.textContainer}>
            <Typography variant="h4">{message.content}</Typography>
          </View>
        </View>
        <Typography variant="h5">{message.timestamp}</Typography>
      </View>
    </View>
  );
};

export default SentChatComponent;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: colors.transparent,
    marginBottom: 10,
    marginTop: 10,
    marginStart: 100,
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
    backgroundColor: colors.border,
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
  initials: {
    backgroundColor: colors.border,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
