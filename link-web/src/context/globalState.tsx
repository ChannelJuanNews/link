import { createContext, useContext } from "react";

declare type ColorMode = "light" | "dark";

const STORAGE_NAME = process.env.LOCAL_STORAGE_NAME || "link:state";

interface GlobalStateInterface extends Object {
  mode?: ColorMode;
}

const initalContextValue: GlobalStateInterface =
  typeof window !== "undefined"
    ? window.localStorage.getItem(STORAGE_NAME) === null
      ? { mode: "dark" }
      : window.localStorage.getItem(STORAGE_NAME)
    : { mode: "dark" };

const GlobalContext = createContext(initalContextValue);

export function GlobalContextWrapper({ children }) {
  return (
    <GlobalContext.Provider value={initalContextValue}>
      {" "}
      {children}{" "}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
