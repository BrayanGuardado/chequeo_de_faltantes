import { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { useCategory } from "../../../context/CategoryContext";
import { useProduct } from "../../../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const {
    sendWhatsApp,
    resetSelectedValues,
    getProductsFormCategoryId,
    isSomeProductSelected,
    checkAllProductsFromCategory,
  } = useProduct();

  const { categories } = useCategory();
  const { destinationPhone, updateDestinationPhone } = useApp();
  const [newDestinationPhone, setNewDestinationPhone] = useState<string | null>(
    null,
  );

  const handleActivateEditPhone = () => {
    setNewDestinationPhone(destinationPhone);
  };

  const handleUpdateDestinationPhone = () => {
    if (newDestinationPhone) {
      updateDestinationPhone(newDestinationPhone);
      setNewDestinationPhone(null);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* List */}
      <div className="flex-1 overflow-auto space-y-4 pr-1">
        {categories.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No hay productos registrados
          </p>
        ) : (
          categories.map((c) => {
            const products = getProductsFormCategoryId(c.id);

            if (!products.length) return null;

            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl shadow-sm border p-4"
              >
                {/* Category Header */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-lg text-gray-800">{c.name}</h3>

                  <input
                    type="checkbox"
                    checked={products.every((p) => p.isSelected)}
                    onChange={(e) =>
                      checkAllProductsFromCategory(c.id, e.target.checked)
                    }
                    className="accent-amber-500 w-5 h-5"
                  />
                </div>

                <div className="space-y-2">
                  {products.map((p) => (
                    <div
                      key={p.id}
                      className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-gray-50"
                    >
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button
          disabled={!isSomeProductSelected}
          onClick={resetSelectedValues}
          className="
        py-3 rounded-xl font-semibold
        bg-red-500 text-white
        disabled:bg-gray-300
        active:scale-[0.97]
        transition
      "
        >
          Limpiar
        </button>

        <button
          disabled={!isSomeProductSelected}
          onClick={sendWhatsApp}
          className="
        py-3 rounded-xl font-semibold
        bg-green-500 text-white
        disabled:bg-gray-300
        active:scale-[0.97]
        transition
      "
        >
          Enviar pedido
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-5 max-w-md w-full space-y-4 border">
        <h3 className="text-lg font-semibold text-gray-800">
          {newDestinationPhone !== null ? "Editar número" : "Número destino"}
        </h3>

        {newDestinationPhone !== null ? (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              value={newDestinationPhone}
              onChange={(e) => setNewDestinationPhone(e.target.value)}
              placeholder="Ingresa el número"
              className="
          w-full
          px-4 py-2
          border
          rounded-xl
          outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
        "
            />

            <button
              onClick={handleUpdateDestinationPhone}
              className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          font-medium
          py-2
          rounded-xl
          transition
          active:scale-95
        "
            >
              Guardar
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
            <p className="text-gray-700 font-medium">{destinationPhone}</p>

            <button
              onClick={handleActivateEditPhone}
              className="
          text-blue-600
          hover:text-blue-800
          font-medium
          transition
        "
            >
              Editar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
