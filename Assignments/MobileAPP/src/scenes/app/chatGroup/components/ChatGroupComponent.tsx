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
import { GroupChat } from "src/models/API";
import colors from "src/theme/colors.theme";
import { parseProductName } from "src/utils/utils";

interface CandyCardComponentProps {
  groupChat: GroupChat;
  onPress: () => void;
}

const ChatGroupComponent: React.FC<CandyCardComponentProps> = ({
  groupChat,
  onPress,
}) => {
  const initials = groupChat.name?.[0].toUpperCase();
  return (
    <View>
      <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
        <View style={styles.initials}>
          <Typography variant="h3">{initials}</Typography>
        </View>
        <View style={styles.textContainer}>
          <View>
            <Typography variant="h3" style={styles.title}>
              {groupChat.name}
            </Typography>
            <Typography variant="h5">{groupChat.lastUpdated}</Typography>
          </View>
          {groupChat.latestMessage?.content && (
            <Typography variant="h3" style={styles.price}>
              {groupChat.latestMessage?.content}
            </Typography>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};

export default ChatGroupComponent;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    overflow: "hidden",
    marginBottom: 10,
    elevation: 3,
    marginTop: 10,
    gap: 24,
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
    justifyContent: "center",
  },
  nameDateContainer: {
    padding: 10,
    flex: 1,
    gap: 5,
    justifyContent: "space-between",
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
