import { get, post } from "./api-client";
import type { User, Product, ProductsResponse } from "./types";

// localStorage is used for simplicity with DummyJSON, but in real production apps I made
// tokens was stored in httpOnly cookies which i couldn't do with mock api
export async function login(username: string, password: string): Promise<User> {
  const data = await post<User>("/auth/login", {
    username,
    password,
    expiresInMins: 60,
  });

  const { accessToken, refreshToken, ...user } = data;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user));

  return data;
}

export function logout(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

export function getStoredUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("accessToken");
}

export async function getProducts(limit = 10, skip = 0): Promise<ProductsResponse> {
  return get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
}

export async function getProductById(id: number): Promise<Product> {
  return get<Product>(`/products/${id}`);
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  return get<ProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`);
}
