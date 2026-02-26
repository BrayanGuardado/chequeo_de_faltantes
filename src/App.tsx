import { useState } from "react";

import Option from "./components/ui/Option";
import type { SelectMode } from "./types/app";
import ProductForm from "./components/features/products/ProductForm";
import ProductList from "./components/features/products/ProductList";
import Category from "./pages/Category";
import { useApp } from "./context/AppContext";

const SELECT_ELEMENT: { value: SelectMode; label: string }[] = [
  { value: "addProduct", label: "Agregar producto" },
  { value: "addCategory", label: "Agregar categoria" },
  { value: "list", label: "Lista de productos" },
];

const App = () => {
  const { destinationPhone, saveDestinationPhone } = useApp();
  const [mode, setMode] = useState<SelectMode>("list");
  const handleChangeMode = (value: SelectMode) => {
    setMode(value);
  };

  const [phone, setPhone] = useState<string>("");

  const componentToRender = {
    addProduct: <ProductForm />,
    addCategory: <Category />,
    list: <ProductList />,
  }[mode];

  const handleSavePhone = () => {
    if (!phone.trim()) return;
    saveDestinationPhone("+52" + phone);
  };

  if (!destinationPhone)
    return (
      <div className="min-h-full flex items-center justify-center p-4">
        <div
          className="
        w-full
        max-w-2xl
        bg-white
        rounded-3xl
        shadow-xl
        p-8
        space-y-6
      "
        >
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-800">
              Número destino de WhatsApp
            </h2>

            <p className="text-gray-500">
              Ingresa el número donde se enviará la lista. Podrás modificarlo
              posteriormente.
            </p>
          </div>

          {/* Input */}
          <div className="flex items-center gap-3">
            <span
              className="
            bg-amber-100
            text-amber-700
            font-semibold
            px-4 py-3
            rounded-xl
          "
            >
              +52
            </span>

            <input
              type="text"
              placeholder="3312345678"
              onChange={(e) => setPhone(e.target.value)}
              className="
              flex-1
              border border-gray-300
              rounded-xl
              px-4 py-3
              text-lg
              outline-none
              focus:ring-2
              focus:ring-amber-400
              focus:border-amber-400
              transition-all
            "
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSavePhone}
            className="
            w-full
            bg-amber-500
            hover:bg-amber-600
            text-white
            font-semibold
            py-3
            rounded-xl
            shadow-md
            active:scale-[0.97]
            transition-all
          "
          >
            Guardar número
          </button>
        </div>
      </div>
    );

  return (
    <div className="h-screen bg-gray-100 p-4 flex flex-col gap-4 overflow-hidden">
      {/* Top Bar */}
      <div className="w-full max-w-md">
        <div className="relative">
          <select
            value={mode}
            onChange={(e) => handleChangeMode(e.target.value as SelectMode)}
            className="
            w-full
            appearance-none
            px-5 py-3
            pr-12
            rounded-2xl
            bg-white
            border border-gray-200
            text-gray-800
            font-semibold
            shadow-sm
            outline-none
            transition-all duration-200
            focus:border-amber-500
            focus:ring-2 focus:ring-amber-500/30
            hover:shadow-md
            cursor-pointer
          "
          >
            {SELECT_ELEMENT.map(({ label, value }) => (
              <Option key={value} label={label} value={value} />
            ))}
          </select>

          {/* Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="
        flex-1
        min-h-0
        bg-white
        rounded-3xl
        shadow-lg
        p-4
        overflow-hidden
        border border-gray-100
      "
      >
        {componentToRender}
      </div>
    </div>
  );
};

export default App;
