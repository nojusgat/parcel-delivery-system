import axios from "axios";
import { getUserInfo, saveUserInfo } from "./storage";

const api = axios.create({
  baseURL: "https://parcel-delivery-system-ng.herokuapp.com/api",
});

export const login = async (username: string, password: string) => {
  return await api.post("/auth/login", {
    username,
    password,
  });
};

export const register = async (
  username: string,
  password: string,
  email: string
) => {
  return await api.post("/auth/register", {
    username,
    password,
    email,
  });
};

export const logout = async () => {
  const token = getUserInfo()?.token;
  saveUserInfo(null);
  if (!token) return;

  await api.get("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfile = async () => {
  const token = getUserInfo()?.token;
  if (!token) return null;

  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    saveUserInfo(null);
    return null;
  }

  return res;
};

export const getCarPersonal = async () => {
  const token = getUserInfo()?.token;
  const carId = getUserInfo()?.courier?.carId;

  if (!carId || !token) return null;

  const res = await api.get(`/cars/${carId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    saveUserInfo(null);
    return null;
  }

  return res;
};

export const getCar = async (carId: number) => {
  const token = getUserInfo()?.token;
  const res = await api.get(`/cars/${carId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    saveUserInfo(null);
    return null;
  }

  return res;
};

export const getParcels = async (page: number, perPage: number = 10) => {
  const token = getUserInfo()?.token;
  const res = await api.get(`/parcels?page=${page}&size=${perPage}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    saveUserInfo(null);
    return null;
  }

  return res;
}

export const getParcel = async (parcelId: string) => {
  const token = getUserInfo()?.token;
  const res = await api.get(`/parcels/${parcelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    saveUserInfo(null);
    return null;
  }

  return res;
}

export const updateParcel = async (parcelId: string, data: any) => {
  const token = getUserInfo()?.token;
  const res = await api.put(`/parcels/${parcelId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    saveUserInfo(null);
    return null;
  }

  return res;
}

export const getCoordinates = async (address: string) => {
  const res = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${address}&format=json`
  );

  return res;
};