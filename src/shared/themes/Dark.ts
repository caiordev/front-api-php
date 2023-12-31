import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";

//Criação do tema de dark da aplicação.
export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: "#ffffff",
    },
    secondary: {
      main: cyan[700],
      dark: cyan[800],
      light: cyan[500],
      contrastText: "#ffffff",
    },
    background: {
      default: "#202124",
      paper: "#303134",
    },
  },
  typography: {
    allVariants: { color: "white" },
  },
});
