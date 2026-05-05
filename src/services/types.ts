export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  sku?: string;
  availabilityStatus?: string;
  shippingInformation?: string;
  warrantyInformation?: string;
  returnPolicy?: string;
  reviews?: ProductReview[];
}

export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface ProductCategory {
  slug: string;
  name: string;
  url: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Cart {
  id: number
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

export type UsersResponse = {
  users: User[];
  total: number;
};

export type CartResponse = {
  carts: Cart[];
  total: number;
};