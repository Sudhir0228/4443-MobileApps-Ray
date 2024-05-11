export function parseProductName(productName: string): {
  mainName: string;
  quantity: string;
} {
  const parts = productName.split(/-(.+)/);
  if (parts.length < 2) {
    return { mainName: productName, quantity: "" }; // No dash found
  }

  const mainName = parts[0].trim();
  let quantity = parts[1].trim();

  // Further refinement if needed, here you could adjust based on more specific rules
  // For example, to ensure numbers followed by "lb" or "ct" stick with quantity:
  if (!quantity.match(/^\d+(\.\d+)?(lb|oz|ct)\b/)) {
    // Check for unit presence right after the first split, and adjust accordingly
    const unitMatch = quantity.match(/(\d+(\.\d+)?(lb|oz|ct).*)/);
    if (unitMatch) {
      quantity = unitMatch[0];
    }
  }

  return { mainName, quantity };
}

export function getNameParts(fullName: string | undefined): {
  first: string | undefined;
  last: string | undefined;
} {
  if (!fullName) {
    return { first: undefined, last: undefined };
  }

  const parts = fullName.trim().split(/\s+/); // Splits on one or more spaces
  const first = parts.shift(); // Gets the first element, safely
  const last = parts.length > 0 ? parts.pop() : undefined; // Gets the last element if there are any elements left

  return { first, last };
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function formatTime(timestamp: number) {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12; // Convert hour to 12-hour format
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? 0 + minutes : minutes; // Adding leading zero to minutes if less than 10

  return hours + ":" + minutes + " " + ampm;
}
