import { ImageCategories, ImageColors, ImageOrders, ImageTypes } from "@/src/lib/image-helpers";

export declare interface PixImageServiceResponseType {
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
