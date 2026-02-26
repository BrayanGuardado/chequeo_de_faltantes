import type { Category } from "../../../types/categories";

const CategoryCard = ({ category }: { category: Category }) => {
  const { id, name } = category;

  const handleDelete = () => {}; //Pendiente

  return (
    <div
      className="
        flex items-center justify-between
        px-4 py-3
        bg-white
        rounded-2xl
        border border-gray-200
        shadow-sm
        transition-all
        hover:shadow-md
        hover:border-amber-300
        group
      "
    >
      <p className="font-medium text-gray-800">{name}</p>

      <button
        onClick={handleDelete}
        className="
          text-red-500
          opacity-60
          group-hover:opacity-100
          hover:scale-110
          transition
        "
      >
        🗑️
      </button>
    </div>
  );
};

export default CategoryCard;
