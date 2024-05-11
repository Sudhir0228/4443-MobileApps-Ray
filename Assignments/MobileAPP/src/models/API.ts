export interface User {
  id: string;
  _id: string;
  first: string;
  last: string;
  email: string;
  username: string;
  location: { latitude: number; longitude: number }[];
  distance?: number;
}

export interface Candy {
  _id: number;
  id: string;
  name: string;
  prod_url: string;
  img_url: string;
  price: number;
  desc: string;
  categorys: number[];
  img_path: string;
}
export interface MenuItem {
  name: string;
  price: number;
}

export interface Category {
  _id: number;
  name: string;
}

export interface NearbyUser {
  first: string;
  last: string;
  user: string;
  _id: string;
  lat: number;
  lon: number;
  timestamp: number;
}

export type Message = {
  id: string;
  sender: Member;
  content: string;
  timestamp: string;
};

export type GroupChat = {
  id: string;
  name: string;
  members: Member[];
  latestMessage?: Message;
  messages?: Message[];
  lastUpdated?: string;
};

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
};
