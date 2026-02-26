import type { Product } from "../types/product";

export function getProducts(): Product[] {
  const savedProducts = localStorage.getItem("products");

  if (!savedProducts) return [];

  try {
    return JSON.parse(savedProducts);
  } catch {
    return [];
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem("products", JSON.stringify(products));
}
