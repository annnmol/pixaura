import { http } from "@/src/lib/network";

let SERVER_BASE_URL =
  (process.env?.EXPO_PUBLIC_FLIGHT_SERVER_URL! as string) ??
  "https://api.npoint.io";

// SERVER_BASE_URL = SERVER_BASE_URL + "api/v1";

export class DummyNetworkService {
  static getAllFlights() {
    // return http.get(`${SERVER_BASE_URL}${Endpoints.GET_ALL_FLIGHTS}`);
    return http.get(`https://randomuser.me/api/`);
  }
}

class Endpoints {
  public static GET_ALL_FLIGHTS = "/378e02e8e732bb1ac55b";
}
