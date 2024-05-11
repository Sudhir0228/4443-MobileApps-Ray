import { User } from "src/models/API";

// Base coordinates
const baseLatitude = 37.785834;
const baseLongitude = -122.406417;

function generateRandomLocation(
  baseLat: number,
  baseLon: number,
  miles: number = 4
): { latitude: number; longitude: number } {
  const degreesPerMile = 1 / 69; // Approximate conversion factor from miles to degrees
  return {
    latitude: baseLat + (Math.random() - 0.5) * 2 * degreesPerMile * miles,
    longitude: baseLon + (Math.random() - 0.5) * 2 * degreesPerMile * miles,
  };
}

export function generateUsers(
  baseLat: number,
  baseLon: number,
  numUsers: number
): User[] {
  const users: User[] = [];
  for (let i = 0; i < numUsers; i++) {
    const userLocation = generateRandomLocation(baseLat, baseLon);
    const id = `66159bda31eaacecfdc594${i.toString().padStart(2, "0")}`;
    const user: User = {
      id: id,
      _id: id,
      first: `User${i + 1}`,
      last: "Test",
      email: `user${i + 1}@test.com`,
      location: [userLocation],
    };
    users.push(user);
  }
  return users;
}
