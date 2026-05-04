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