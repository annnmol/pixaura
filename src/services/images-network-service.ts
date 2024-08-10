import { http } from "@/src/lib/network";

let SERVER_BASE_URL =
  (process.env?.EXPO_PUBLIC_SERVER_URL! as string) ??
  "https://pixabay.com/api/";
// SERVER_BASE_URL = SERVER_BASE_URL + "api/v1";
const API_KEY = (process.env?.EXPO_PUBLIC_API_KEY! as string) ?? "1234";

export class ImagesNetworkService {

  static searchImages() {
    // return http.get(`${SERVER_BASE_URL}${Endpoints.GET_ALL_FLIGHTS}`);
    return http.get(
      `https://pixabay.com/api/?key=45372168-dcb5d72298f85a485a1a06923&q=yellow+flowers&image_type=photo&pretty=true`
    );
  }
}

class Endpoints {
  public static SEARCH_IMAGES = "/378e02e8e732bb1ac55b";
}
