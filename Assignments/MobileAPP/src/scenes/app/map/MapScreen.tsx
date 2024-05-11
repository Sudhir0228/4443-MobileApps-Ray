import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

//Store
import { RouteProp } from "@react-navigation/native";
import Screen from "src/components/Screen";
import * as Location from "expo-location";

import {
  AppNavScreenList,
  AppStackParamList,
} from "../navigation/AppNavConstants";
import MapView, { Marker } from "react-native-maps";
import { UserRegion } from "src/types/types";
import { generateUsers } from "src/mockData/mockUserLocations";
import { calculateDistance, formatTime } from "src/utils/utils";
import { NearbyUser, User } from "src/models/API";
import api from "src/utils/api";

const currentUserIcon = require("src/assets/icons/current-user-location.png");
const nearby = require("src/assets/icons/nearby.png");

// Interfaces
interface IMapScreen {
  navigation: StackNavigationProp<
    AppStackParamList,
    AppNavScreenList.MAP_SCREEN
  >;
  route: RouteProp<AppStackParamList, AppNavScreenList.MAP_SCREEN>;
}

const MapScreen = ({ navigation, route }: IMapScreen) => {
  const [errorMsg, setErrorMsg] = useState<string>();
  const [initialUsers, setInitialUsers] = useState<User[]>();
  const [currentUserLocation, setCurrentUserLocation] = useState<UserRegion>();
  const [activeUsers, setActiveUsers] = useState<NearbyUser[]>();

  // API
  const getNearbyUsers = async () => {
    try {
      const res = await api<any, NearbyUser[]>({
        method: "GET",
        path: "users_with_locations",
      });

      const users = res.data as NearbyUser[];
      const now = new Date();

      const activeUsers = users.filter(
        (event) => new Date(event.timestamp) > now
      );
      setActiveUsers(activeUsers);
    } catch (error) {}
  };
  const addLocation = async (lat: number, lon: number) => {
    try {
      const now = new Date();
      now.setHours(now.getHours() + 1);
      const data = {
        username: "",
        longitude: lat,
        lattitude: lon,
        timestamp: now.toISOString(),
      };
      await api<any, any>({
        method: "POST",
        path: "addlocation",
        data: data,
      });
    } catch (error) {}
  };
  const showAlert = (lat: number, lon: number) => {
    Alert.alert(
      "Location Sharing",
      "Would you like to share your location with other users?",
      [
        {
          text: "No",
          onPress: () => console.log("User does not want to share location"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => addLocation(lat, lon),
        },
      ],
      { cancelable: true } // This will allow tapping outside of the alert to dismiss it
    );
  };
  const nearbyUsers = useMemo(() => {
    if (!currentUserLocation) return [];
    if (!activeUsers) return [];
    return activeUsers
      .map((user) => ({
        ...user,
        distance: calculateDistance(
          currentUserLocation.latitude,
          currentUserLocation.longitude,
          user.lat,
          user.lon
        ),
      }))
      .filter((user) => user.distance <= 16.0934)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);
  }, [activeUsers, currentUserLocation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.error("Permission to access location was denied");
        Alert.alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      showAlert(location.coords.latitude, location.coords.longitude);
      setInitialUsers(
        generateUsers(location.coords.latitude, location.coords.longitude, 20)
      );
    })();
  }, []);

  return (
    <Screen safeView={false}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MapView
          style={styles.map}
          initialRegion={currentUserLocation}
          showsUserLocation={true}
        >
          {currentUserLocation && (
            <Marker
              coordinate={{
                latitude: currentUserLocation.latitude,
                longitude: currentUserLocation.longitude,
              }}
              title="Your Location"
              image={currentUserIcon}
            />
          )}
          {nearbyUsers.map((user) => (
            <Marker
              key={user._id}
              coordinate={{
                latitude: user.lat,
                longitude: user.lon,
              }}
              title={`${user.first} ${user.last}`}
              description={`Active until ${formatTime(user.timestamp)}`}
              image={nearby}
            ></Marker>
          ))}
        </MapView>
      </View>
    </Screen>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
