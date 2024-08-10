import { unstable_batchedUpdates } from "react-native";
import { router } from 'expo-router';

//custom imports
import { useAppStore } from "@/src/store";

/* eslint-disable no-debugger */
export const DEFAULT_HEADERS = { "Content-Type": "application/json" };

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

const addLoginHeaders = async (config: RequestInit): Promise<RequestInit> => {
  //getting the token from storage

  const data = useAppStore.getState().authSession;

  if (data) {
    const token = data?.token;
    const domain = data?.data?.geta_host;

    if (token && token.length > 0) {
      if (!config.headers) config.headers = {};
      (config.headers as any)["Authorization"] = token;
    }
    if (domain && domain.length > 0) {
      if (!config.headers) config.headers = {};
      (config.headers as any)["geta-host"] = domain;
    }
  } else {
    if (config.headers) {
      //@ts-ignore
      delete config.headers?.["Authorization"];
      //@ts-ignore
      delete config.headers?.["geta-host"];
    }
  }

  return config;
};

class Network {
  constructor() {}

  private async request<T>(url: string, config: RequestInit): Promise<T> {
    config = await addLoginHeaders(config);

    const response = await fetch(url, config);

    if (!response.ok) {
      // Handle unauthorized access
      if (response.status === UNAUTHORIZED) {
        unstable_batchedUpdates(() => {
          useAppStore.getState().setAuthSession(null);
          // router.replace('/auth/login'); // Redirect to login page
        });
      }
      // Handle forbidden access
      if (response.status === FORBIDDEN) {
        console.warn("Forbidden access");
        // router.replace('/forbidden'); // Redirect to forbidden page
      }
      throw new Error(`HTTP error! status: ${response.status}, url: ${url}`);
    }

    return response.json();
  }

  public async get<T>(url: string, headers = DEFAULT_HEADERS): Promise<T> {
    const config: RequestInit = {
      headers,
      credentials: "include",
    };
    return this.request<T>(url, config);
  }

  public async post<T>(
    url: string,
    body: any,
    headers = DEFAULT_HEADERS
  ): Promise<T> {
    const config: RequestInit = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    };
    return this.request<T>(url, config);
  }

  public async put<T>(
    url: string,
    body: any,
    headers = DEFAULT_HEADERS
  ): Promise<T> {
    const config: RequestInit = {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    };
    return this.request<T>(url, config);
  }

  public async patch<T>(
    url: string,
    body: any,
    headers = DEFAULT_HEADERS
  ): Promise<T> {
    const config: RequestInit = {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    };
    return this.request<T>(url, config);
  }

  public async delete<T>(url: string, headers = DEFAULT_HEADERS): Promise<T> {
    const config: RequestInit = {
      method: "DELETE",
      headers,
      credentials: "include",
    };
    return this.request<T>(url, config);
  }
}

export const http = new Network();
