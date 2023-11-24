/* eslint-disable no-restricted-globals */

import { Checkbox, Icon, IconButton, Paper } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import {
  IListagemTarefa,
  TarefaService,
} from "../../shared/services/api/tarefas/TarefasService";

// Componente para listagem de tarefas
export const ListagemDeTarefa: React.FC = () => {
  // Obtendo os parâmetros de busca da URL
  const [searchParams, setSearchParams] = useSearchParams();
  // Função para navegar para outra rota
  const navigate = useNavigate();

  // Estado para armazenar as linhas da tabela
  const [rows, setRows] = useState<IListagemTarefa[]>([]);

  const [totalCount, setTotalCount] = useState(0);
  // Estado para armazenar se o formulário está carregando
  const [isLoading, setIsLoading] = useState(true);
  // Estado para armazenar o status da tarefa
  const [status, setStatus] = useState(null);

  // Efeito para buscar as tarefas quando os parâmetros de busca mudarem
  useEffect(() => {
    setIsLoading(true);

    TarefaService.getAll().then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
      } else {
        const filteredRows = result.filter(
          (tarefa) => Boolean(tarefa.status) !== true
        );
        console.log(filteredRows);
        setRows(filteredRows);
      }
    });
  }, [status]);

  // Função para deletar uma tarefa
  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      TarefaService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => {
            return [...oldRows.filter((oldRow) => oldRow.id !== id)];
          });
          alert("Registro apagado com sucesso");
        }
      });
    }
  };

  // Função para alterar o status de uma tarefa e definir se foi realizada ou não.
  const handleCheckboxChange = (event: any, id: number) => {
    const newStatus = event.target.checked;

    TarefaService.updateStatus(id, newStatus).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        setStatus(newStatus);
        setRows((oldRows) => {
          return oldRows.map((row) =>
            row.id === id ? { ...row, status: newStatus } : row
          );
        });
      }
    });
  };

  return (
    <LayoutBaseDePagina
      titulo="Tarefas"
      barraDeFerramentas={
        <FerramentasDaListagem
          textoBotaoNovo="Nova"
          aoClicarEmNovo={() => navigate("/tarefas/detalhe/nova")}
        />
      }
    >
      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ m: 1, width: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Titulo</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size="small" onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => navigate(`/tarefas/detalhe/${row.id}`)}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.titulo}</TableCell>
                <TableCell>{row.descricao}</TableCell>
                <TableCell>
                  <Checkbox
                    value={status}
                    checked={row.status}
                    onChange={(event: any) =>
                      handleCheckboxChange(event, row.id)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
