export interface ResponseData {
  limit: number;
  skip: number;
  total: number;
  products: ProductsData[];
}

export interface ProductsData {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
