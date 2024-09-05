import axios from "axios";
import { instance } from "./axios";

export async function getPlaceNameByOSM(latitude: number, longitude: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

  try {
    const response = await axios.get(url);
    const { city, town } = response.data.address;
    return `${city} ${town}`;
  } catch (error) {
    console.error("Error fetching place name:", error);
    return "";
  }
}
export async function getPlace(address: string | number | boolean) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

  try {
    const response = await axios.get(url);
    const box = { x: response.data[0].lat, y: response.data[0].lon };
    return box;
  } catch (error) {
    console.error("Error fetching place name:", error);
    return "";
  }
}
