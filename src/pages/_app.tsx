import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import root from "@/redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CompareContextProvider } from "@/contexts/CompareContextProvider";
import { WishlistContextProvider } from "@/contexts/WishlistContextProvider";
import { CartContextProvider } from "@/contexts/CartContextProvider";
import { LoadingStateContextProvider } from "@/contexts/LoadingStateContextProvider";
import { ProductsContextProvider } from "@/contexts/ProductsContextProvider";
import { SaveItemContextProvider } from "@/contexts/SaveContextProvider";
import { LoadingPage } from "@/components/LoadingPage";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={root.store}>
      <PersistGate loading={<LoadingPage />} persistor={root.persitor}>
        <LoadingStateContextProvider>
          <CartContextProvider>
            <WishlistContextProvider>
              <CompareContextProvider>
                <ProductsContextProvider>
                  <SaveItemContextProvider>
                    <ToastContainer />
                    <Component {...pageProps} />
                  </SaveItemContextProvider>
                </ProductsContextProvider>
              </CompareContextProvider>
            </WishlistContextProvider>
          </CartContextProvider>
        </LoadingStateContextProvider>
      </PersistGate>
    </Provider>
  );
}
