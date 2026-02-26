import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ProductContextProvider } from "./context/ProductContext.tsx";
import { CategoryContextProvider } from "./context/CategoryContext.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppContextProvider>
      <CategoryContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </CategoryContextProvider>
    </AppContextProvider>
  </StrictMode>,
);
