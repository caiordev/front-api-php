/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerramentasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { TarefaService } from "../../shared/services/api/tarefas/TarefasService";
import * as yup from "yup";
import { IVFormErrors } from "../../shared/forms/IVFormErrors";
import { VForm, VTextField, useVForm } from "../../shared/forms";

//Definindo a interfacce para os dados do formulário.
interface IFormData {
  titulo: string;
  descricao: string;
}

//Definindo o esquema de validação para os dados do formulário.
const formValidationSchema: yup.ObjectSchema<IFormData> = yup.object({
  titulo: yup.string().required(),
  descricao: yup.string().required(),
});

export const DetalheDeTarefa: React.FC = () => {
  //Obtendo o ID da tarefa através dos parâmetros da rota.
  const { id = "nova" } = useParams<"id">();
  //Funcão para navegar para outra rota.
  const navigate = useNavigate();

  //obtendo as funções e referência do formulário.
  const { formRef, save } = useVForm();

  // Estado para armazenar se o formulário está carregando

  const [isLoading, setIsLoading] = useState(false);
  // Estado para armazenar o nome da tarefa
  const [nome, setNome] = useState("");
  // Efeito para buscar os detalhes da tarefa quando o ID mudar
  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);

      TarefaService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/tarefas");
        } else {
          console.log(result);

          formRef.current?.setData(result);
        }
      });
    } else {
    }
  }, [id]);

  // Função para salvar os dados do formulário
  const handleSave = (dados: IFormData) => {
    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === "nova") {
          TarefaService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              navigate("/tarefas");
            }
          });
        } else {
          TarefaService.updateById(Number(id), {
            id: Number(id),
            ...dadosValidados,
          }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              navigate("/tarefas");
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};
        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  // Função para deletar a tarefa
  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      TarefaService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso");
          navigate("/tarefas");
        }
      });
    }
  };

  // Renderizando o componente
  return (
    <LayoutBaseDePagina
      titulo={id === "nova" ? "Nova Pessoa" : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={() => {
            formRef.current?.submitForm();
          }}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => {
            navigate("/tarefas/detalhe/nova");
          }}
          aoClicarEmVoltar={() => {
            navigate("/tarefas");
          }}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          <Grid container direction="column" padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant="indeterminate" />
              </Grid>
            )}
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Titulo"
                  name="titulo"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={8} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Descrição"
                  name="descricao"
                  disabled={isLoading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
