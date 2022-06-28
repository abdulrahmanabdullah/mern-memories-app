import { createContext } from "react";

const ThemeContext = createContext({
  toggleColorMode: () => {},
  toggleDirection: () => {},
});
export default ThemeContext;
