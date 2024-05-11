// apiHelper.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "src/constants/config";

// Define a generic interface for our API function
export interface ApiRequest<T> {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  data?: T;
  params?: T;
}

async function api<T, R>(config: ApiRequest<T>): Promise<AxiosResponse<R>> {
  const { method, path, data, params } = config;
  console.log("api", data);
  const axiosConfig: AxiosRequestConfig = {
    url: `${BASE_URL}/${path}`,
    method: method,
    data: data,
    params: params,
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error) {
    console.log("Error in API", error);
    throw error;
  }
}

export default api;
