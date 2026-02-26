import type { Category } from "../types/categories";

export function getCategories(): Category[] {
  const savedProducts = localStorage.getItem("categories");

  if (!savedProducts) return [];

  try {
    return JSON.parse(savedProducts);
  } catch {
    return [];
  }
}

export function saveCategories(categories: Category[]): void {
  localStorage.setItem("categories", JSON.stringify(categories));
}
