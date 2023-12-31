import {
  Icon,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { useDrawerContext } from "../contexts";

//interface para o componente básico de página.
interface IlayoutBaseDePaginaProps {
  children?: React.ReactNode;
  titulo: string;
  barraDeFerramentas?: ReactNode;
}

export const LayoutBaseDePagina: React.FC<IlayoutBaseDePaginaProps> = ({
  children,
  titulo,
  barraDeFerramentas,
}) => {
  //breakpoints para ser feito a responsividade.
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  //Layout Base.
  return (
    <Box height="100%" display="flex" flexDirection="column" gap={1}>
      <Box
        padding={1}
        height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)}
        display="flex"
        alignItems="center"
        gap={1}
      >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}
        <Typography
          variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {titulo}
        </Typography>
      </Box>

      {barraDeFerramentas && <Box>{barraDeFerramentas}</Box>}

      <Box flex={1} overflow="auto">
        {children}
      </Box>
    </Box>
  );
};
