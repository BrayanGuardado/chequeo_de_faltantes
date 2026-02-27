import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "../types/product";
import { getProducts, saveProducts } from "../localeStorage/lsProducts";
import { useCategory } from "./CategoryContext";
import { useApp } from "./AppContext";

type ProductContextType = {
  products: Product[];
  isEmptyProducts: boolean;
  isSomeProductSelected: boolean;

  getProductName: (id: string) => string;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  deleteAllProductsFromCategories: (categoryId: string) => void;
  resetSelectedValues: () => void;
  sendWhatsApp: () => void;
  getProductsFormCategoryId: (id: string) => Product[];
  checkProduct: (id: string, selected: boolean) => void;
  checkAllProductsFromCategory: (categoryId: string, checked: boolean) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { resetCategoriesSelected, checkCategory, categories } = useCategory();
  const { destinationPhone } = useApp();
  const [products, setProducts] = useState<Product[]>(() => getProducts());

  useEffect(() => {
    saveProducts(products);
  }, [products]);

  function getProductName(id: string) {
    const product = products.find((p) => p.id === id);
    if (!product) throw new Error("No se encontro el producto");
    return product.name;
  }

  function addProduct(product: Product): void {
    setProducts((prev) => [...prev, product]);
  }

  function deleteProduct(id: string): void {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function deleteAllProductsFromCategories(categoryId: string) {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.category_id !== categoryId),
    );
    console.log(JSON.stringify(products));
  }

  function resetSelectedValues() {
    resetCategoriesSelected();
    setProducts((prev) =>
      prev.map((p) => (p.isSelected ? { ...p, isSelected: false } : p)),
    );
  }

  function checkAllProductsFromCategory(categoryId: string, checked: boolean) {
    checkCategory(categoryId, checked);
    setProducts((prev) =>
      prev.map((p) =>
        p.category_id === categoryId ? { ...p, isSelected: checked } : p,
      ),
    );
  }

  function checkProduct(id: string, selected: boolean) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isSelected: selected } : p)),
    );
  }

  const getProductsFormCategoryId = (id: string): Product[] => {
    const findProducts = products.filter((p) => p.category_id === id);
    return findProducts || [];
  };

  function sendWhatsApp() {
    const list = categories
      .map((c) => {
        const productsList = products
          .filter((p) => p.category_id === c.id && p.isSelected)
          .map((p) => `• ${p.name}`)
          .join("\n");

        if (!productsList) return null;

        return [`*${c.name.toUpperCase()}*`, productsList].join("\n");
      })
      .filter(Boolean)
      .join("\n\n");

    resetSelectedValues();
    resetCategoriesSelected();

    const url = `https://wa.me/${destinationPhone}?text=${encodeURIComponent(list)}`;
    window.open(url, "_blank");
  }

  const isEmptyProducts = products.length === 0;
  const isSomeProductSelected = products.some((p) => p.isSelected);

  return (
    <ProductContext.Provider
      value={{
        products,
        isEmptyProducts,
        isSomeProductSelected,

        getProductName,
        addProduct,
        deleteProduct,
        deleteAllProductsFromCategories,
        resetSelectedValues,
        sendWhatsApp,
        getProductsFormCategoryId,
        checkProduct,
        checkAllProductsFromCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("No se puede usar esto aqui");
  return ctx;
};
