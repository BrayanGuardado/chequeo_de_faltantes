import { useCategory } from "../../../context/CategoryContext";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const { categories } = useCategory();

  if (categories.length === 0)
    return (
      <p className="text-center text-gray-400 mt-10">
        No hay categorías registradas
      </p>
    );

  return (
    <div className="flex flex-col gap-3 overflow-auto pr-1">
      {categories.map((c) => (
        <CategoryCard category={c} key={c.id} />
      ))}
    </div>
  );
};

export default CategoryList;
