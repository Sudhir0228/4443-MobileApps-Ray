import { Member } from "src/models/API";

const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Ethan",
  "Fiona",
  "George",
  "Hannah",
  "Ian",
  "Julia",
  "Kevin",
  "Linda",
  "Mason",
  "Nora",
  "Oscar",
  "Penny",
  "Quinn",
  "Rachel",
  "Steve",
  "Tina",
];
const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Miller",
  "Davis",
  "Garcia",
  "Rodriguez",
  "Wilson",
  "Martinez",
  "Anderson",
  "Taylor",
  "Thomas",
  "Hernandez",
  "Moore",
  "Martin",
  "Jackson",
  "Thompson",
  "White",
];

export function generateRandomUsers(numUsers: number): Member[] {
  const users: Member[] = [];
  for (let i = 0; i < numUsers; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const user: Member = {
      id: `u${i + 1}`,
      firstName,
      lastName,
    };
    users.push(user);
  }
  return users;
}
