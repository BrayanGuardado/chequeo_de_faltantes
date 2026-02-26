import { useState, type FormEvent } from "react";
import { useProduct } from "../../../context/ProductContext";
import { useCategory } from "../../../context/CategoryContext";

const ProductForm = () => {
  const { addProduct } = useProduct();
  const { categories } = useCategory();

  const [newProduct, setNewProduct] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [touched, setTouched] = useState(false);

  const isInvalid = touched && !newProduct.trim();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);

    if (!newProduct.trim() || !categoryId) return;

    addProduct({
      id: crypto.randomUUID(),
      name: newProduct.trim(),
      isSelected: false,
      category_id: categoryId,
    });

    setNewProduct("");
    setCategoryId("");
    setTouched(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">Nuevo producto</h2>
        <p className="text-sm text-gray-500">
          Agrega productos a una categoría
        </p>
      </div>

      {/* Product Input */}
      <div className="space-y-1">
        <input
          type="text"
          placeholder="Ej. Café americano"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
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

      {/* Category Select */}
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="
      px-4 py-3
      rounded-xl
      border border-gray-200
      bg-white
      shadow-sm
      outline-none
      focus:ring-2
      focus:ring-amber-400
    "
      >
        <option value="">Seleccionar categoría</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Button */}
      <button
        type="submit"
        disabled={!newProduct.trim() || !categoryId}
        className={`
      py-3
      rounded-xl
      font-semibold
      text-white
      transition-all
      active:scale-[0.97]
      ${
        newProduct.trim() && categoryId
          ? "bg-amber-500 hover:bg-amber-600 shadow-md"
          : "bg-gray-300 cursor-not-allowed"
      }
    `}
      >
        Agregar producto
      </button>
    </form>
  );
};

export default ProductForm;
