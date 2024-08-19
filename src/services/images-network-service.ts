import { http } from "@/src/lib/network";
import { formatUrlParams } from "../lib/helpers";

let SERVER_BASE_URL =
  (process.env?.EXPO_PUBLIC_SERVER_URL! as string) ??
  "https://pixabay.com/api/";
const API_KEY = (process.env?.EXPO_PUBLIC_API_KEY! as string) ?? "1234";
SERVER_BASE_URL = SERVER_BASE_URL + `?key=${API_KEY}&per_page=10&`;

export class ImagesNetworkService {
  static async searchImages(params: any) {
    const url = SERVER_BASE_URL + formatUrlParams(params, ["q"]);
    
    //return as a promise
    return http.get(url);
  }

  static async getImage(id: string) {
    const url = SERVER_BASE_URL + `&id=${id}`;
    return http.get(url);
  }

  static async getGithubUser(id: string) {
    const url = "https://api.github.com/users/" + `${id}`;
    return http.get(url);
  }
}

class Endpoints {
  public static SEARCH_IMAGES = "/378e02e8e732bb1ac55b";
}
