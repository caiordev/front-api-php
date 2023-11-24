import {
  Box,
  Button,
  Divider,
  Icon,
  Paper,
  Skeleton,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

interface IFerramentasDeDetalhe {
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  mostrarBotaoVoltar?: boolean;
  mostrarBotaoApagar?: boolean;
  mostrarBotaoSalvar?: boolean;

  mostrarBotaoSalvarCarregando?: boolean;
  mostrarBotaoNovoCarregando?: boolean;
  mostrarBotaoVoltarCarregando?: boolean;
  mostrarBotaoApagarCarregando?: boolean;

  aoClicarEmNovo?: () => void;
  aoClicarEmVoltar?: () => void;
  aoClicarEmApagar?: () => void;
  aoClicarEmSalvar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalhe> = ({
  textoBotaoNovo = "novo",

  mostrarBotaoApagar = true,
  mostrarBotaoNovo = true,
  mostrarBotaoSalvar = true,

  mostrarBotaoVoltar = true,

  aoClicarEmApagar,
  aoClicarEmNovo,
  aoClicarEmSalvar,
  aoClicarEmVoltar,

  mostrarBotaoApagarCarregando = false,
  mostrarBotaoNovoCarregando = false,
  mostrarBotaoSalvarCarregando = false,
  mostrarBotaoVoltarCarregando = false,
}) => {
  //smDown e mdDown trás valores booleanos
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      gap={1}
      alignItems="center"
      component={Paper}
    >
      {mostrarBotaoSalvar && !mostrarBotaoSalvarCarregando && (
        <Button
          variant="contained"
          color="primary"
          disableElevation
          startIcon={<Icon>save</Icon>}
          onClick={aoClicarEmSalvar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Salvar
          </Typography>
        </Button>
      )}

      {mostrarBotaoSalvarCarregando && <Skeleton width={110} height={60} />}

      {mostrarBotaoNovo && !mostrarBotaoNovoCarregando && !smDown && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>add</Icon>}
          onClick={aoClicarEmNovo}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          ></Typography>
          {textoBotaoNovo}
        </Button>
      )}
      {mostrarBotaoNovoCarregando && !smDown && (
        <Skeleton width={110} height={61} />
      )}

      {mostrarBotaoApagar && !mostrarBotaoApagarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>delete</Icon>}
          onClick={aoClicarEmApagar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Apagar
          </Typography>
        </Button>
      )}
      {mostrarBotaoApagarCarregando && <Skeleton width={110} height={61} />}

      {mostrarBotaoVoltar &&
        (mostrarBotaoNovo || mostrarBotaoApagar || mostrarBotaoSalvar) && (
          <Divider variant="middle" orientation="vertical" />
        )}

      {mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando && (
        <Button
          variant="outlined"
          color="primary"
          disableElevation
          startIcon={<Icon>arrow_back</Icon>}
          onClick={aoClicarEmVoltar}
        >
          <Typography
            variant="button"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            overflow="hidden"
          >
            Voltar
          </Typography>
        </Button>
      )}
      {mostrarBotaoVoltarCarregando && <Skeleton width={110} height={61} />}
    </Box>
  );
};
