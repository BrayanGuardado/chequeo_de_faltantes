import { useState, type FormEvent } from "react";
import { useCategory } from "../../../context/CategoryContext";

const CategoryForm = () => {
  const [newCategory, setNewCategory] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const { addCategory } = useCategory();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    addCategory({
      id: crypto.randomUUID(),
      name: newCategory,
      isSelected: false,
    });
    setNewCategory("");
  };

  const isInvalid = touched && !newCategory.trim();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full mb-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Nueva categoría</h2>
        <p className="text-sm text-gray-500">
          Organiza tus productos por secciones
        </p>
      </div>

      {/* Input */}
      <div className="space-y-1">
        <input
          type="text"
          placeholder="Ej. Carnes frias"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onBlur={() => setTouched(true)}
          className={`
        w-full
        px-4 py-3
        rounded-xl
        border
        bg-white
        outline-none
        transition-all
        focus:ring-2
        ${
          isInvalid
            ? "border-red-400 ring-red-300"
            : "border-gray-200 focus:ring-amber-400"
        }
      `}
        />

        {isInvalid && (
          <p className="text-red-500 text-sm">Este campo es obligatorio</p>
        )}
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={!newCategory.trim()}
        className={`
      py-3
      rounded-xl
      font-semibold
      text-white
      transition-all
      active:scale-[0.97]
      ${
        newCategory.trim()
          ? "bg-amber-500 hover:bg-amber-600 shadow-md"
          : "bg-gray-300 cursor-not-allowed"
      }
    `}
      >
        Agregar categoría
      </button>
    </form>
  );
};

export default CategoryForm;
