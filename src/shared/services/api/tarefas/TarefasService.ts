import { Api } from "../axios-config";

export interface IListagemTarefa {
  id: number;
  titulo: string;
  descricao: string;
  status?: boolean;
}

export interface IDetalheTarefa {
  id?: number;
  titulo: string;
  descricao: string;
  status?: boolean;
}

//Todos os métodos para o acesso da api pelo axios.
const getAll = async (): Promise<IListagemTarefa[] | Error> => {
  try {
    const { data } = await Api.get("/tarefa");
    if (data) {
      return data;
    }
    return new Error("Error ao listar os registros.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao listar os registros."
    );
  }
};

const getById = async (id: number): Promise<IDetalheTarefa | Error> => {
  try {
    const { data } = await Api.get(`/tarefa/${id}`);
    if (data) {
      return data;
    }
    return new Error("Erro ao consultar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao consultar o registro."
    );
  }
};

const create = async (
  dados: Omit<IDetalheTarefa, "id">
): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheTarefa>("/tarefa", dados);
    if (data) {
      return Number(data.id);
    }
    return new Error("Erro ao criar o registro.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateById = async (
  id: number,
  dados: IDetalheTarefa
): Promise<void | Error> => {
  try {
    await Api.put(`/tarefa/${id}`, dados);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/tarefa/${id}`);
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro ao criar o registro."
    );
  }
};

const updateStatus = async (
  id: number,
  status: boolean
): Promise<void | Error> => {
  try {
    await Api.put(`/tarefa/${id}/status`, { status });
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message ||
        "Erro ao atualizar o status da tarefa."
    );
  }
};

export const TarefaService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
  updateStatus,
};
