import { StaticImageData } from "next/image";

export interface ItrendingNav {
  name: string | undefined;
}

export interface ItrendingItems {
  id: string;
  category: string;
  type?: string;
  img: StaticImageData;
  title: string;
  discount?: number;
  price: number;
  normalPrice: number;
  rate: number;
  size?: string;
  color?: string;
  inStock?: boolean;
}
