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
    </div>
  );
};

export default ProductList;
