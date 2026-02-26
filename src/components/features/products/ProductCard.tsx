import type { ChangeEvent } from "react";
import { useProduct } from "../../../context/ProductContext";
import type { Product } from "../../../types/product";

const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, isSelected } = product;
  const { deleteProduct, checkProduct } = useProduct();

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    checkProduct(id, e.target.checked);
  };

  const handleContainerClick = () => {
    checkProduct(id, !isSelected);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteProduct(id);
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`
    flex items-center justify-between
    px-4 py-3
    rounded-2xl
    border
    cursor-pointer
    transition-all duration-200
    group
    ${
      isSelected
        ? "bg-amber-50 border-amber-400 shadow-sm"
        : "bg-white border-gray-200 hover:border-amber-300 hover:shadow-md"
    }
  `}
    >
      <span className="font-medium text-gray-800">{name}</span>

      <div className="flex items-center gap-4">
        <button
          onClick={handleDelete}
          className="
        opacity-60
        group-hover:opacity-100
        text-red-500
        hover:scale-110
        transition
      "
        >
          🗑️
        </button>

        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckbox}
          onClick={(e) => e.stopPropagation()}
          className="
        w-5 h-5
        accent-amber-500
        cursor-pointer
      "
        />
      </div>
    </div>
  );
};

export default ProductCard;
