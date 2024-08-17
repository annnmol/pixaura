import { ImageCategories, ImageColors, ImageOrders, ImageTypes } from "@/src/lib/image-helpers";

export interface PixImageServiceResponseType {
  hits: PixImageType[];
  total: number;
  totalHits: number;
}

export interface PixImageType {
  collections: number;
  comments: number;
  downloads: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
}

// export const ImageTypes = ["all", "photo", "illustration", "vector"] as const;

// export const ImageCategories = [
//   "backgrounds",
//   "fashion",
//   "nature",
//   "science",
//   "education",
//   "feelings",
//   "health",
//   "people",
//   "religion",
//   "places",
//   "animals",
//   "industry",
//   "computer",
//   "food",
//   "sports",
//   "transportation",
//   "travel",
//   "buildings",
//   "business",
//   "music",
// ] as const;

// export const ImageColors = [
//   "grayscale",
//   "transparent",
//   "red",
//   "orange",
//   "yellow",
//   "green",
//   "turquoise",
//   "blue",
//   "lilac",
//   "pink",
//   "white",
//   "gray",
//   "black",
//   "brown",
// ] as const;

// export const ImageOrders = ["popular", "latest"] as const;

export interface PixImageFilterType {
  q?: string;
  image_type?: (typeof ImageTypes)[number];
  category?: (typeof ImageCategories)[number];
  colors?: (typeof ImageColors)[number][];
  editors_choice?: boolean;
  safesearch?: boolean;
  order?: (typeof ImageOrders)[number];
  per_page?: number;
}
