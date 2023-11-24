// Importando os hooks e componentes necessários do React e Material-UI
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";

import { DarkTheme, LightTheme } from "../themes";

// Definindo a interface para o contexto do tema
interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

// Criando o contexto do tema
const ThemeContext = createContext({} as IThemeContextData);
// Função para consumir o contexto do tema
export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

// Definindo a interface para o componente do provedor de tema
interface IAppThemeProviderProps {
  children: React.ReactNode;
}

// Componente do provedor de tema
export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({
  children,
}) => {
  // Estado para armazenar o nome do tema atual
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  // Função para alternar o tema
  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) =>
      oldThemeName === "light" ? "dark" : "light"
    );
  }, []);

  // Memorizando o tema atual
  const theme = useMemo(() => {
    if (themeName === "light") return LightTheme;
    return DarkTheme;
  }, [themeName]);

  // Retornando o provedor de tema com o tema atual e a função para alternar o tema
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
