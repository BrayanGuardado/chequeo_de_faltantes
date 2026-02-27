import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Category } from "../types/categories";
import { getCategories, saveCategories } from "../localeStorage/lsCategories";

type CategoryContextType = {
  categories: Category[];

  getCategoryName: (id: string) => string;
  addCategory: (category: Category) => void;
  deleteCategory: (
    id: string,
    deleteAllProductsFromCategories: (categoryId: string) => void,
  ) => void;
  resetCategoriesSelected: () => void;
  checkCategory: (categoryId: string, checked: boolean) => void;
};

const AppContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [categories, setCategories] = useState<Category[]>(() =>
    getCategories(),
  );

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  function getCategoryName(id: string) {
    const category = categories.find((p) => p.id === id);
    if (!category) throw new Error("No se encontro la categoria");
    return category.name;
  }

  function addCategory(category: Category): void {
    setCategories((prev) => [...prev, category]);
  }

  function deleteCategory(
    id: string,
    deleteAllProductsFromCategories: (categoryId: string) => void,
  ): void {
    setCategories((prev) => prev.filter((p) => p.id !== id));
    deleteAllProductsFromCategories(id);
  }

  function resetCategoriesSelected() {
    setCategories((prev) =>
      prev.map((c) => {
        return { ...c, isSelected: false };
      }),
    );
  }

  function checkCategory(categoryId: string, checked: boolean) {
    setCategories((prevCategories) =>
      prevCategories.map((c) =>
        c.id === categoryId ? { ...c, isSelected: checked } : c,
      ),
    );
  }

  return (
    <AppContext.Provider
      value={{
        categories,

        getCategoryName,
        addCategory,
        deleteCategory,
        checkCategory,
        resetCategoriesSelected,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCategory = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("No se puede usar esto aqui");
  return ctx;
};
