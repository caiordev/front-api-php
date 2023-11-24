import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DetalheDeTarefa } from "../pages/tarefas/DetalheDeTarefa";
import { ListagemDeTarefa } from "../pages/tarefas/ListagemDeTarefa";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();
  //O contexto do menu lateral serve para que ele possa ser alterado aqui
  //ajudando na organização, pois criando a rota, já podemos definir ela no menu lateral caso precise.
  useEffect(() => {
    setDrawerOptions([
      {
        label: "Tarefa",
        icon: "format_list_bulleted",
        path: "/tarefas",
      },
    ]);
  }, []);
  return (
    <Routes>
      <Route path="/tarefas" element={<ListagemDeTarefa />} />
      <Route path="/tarefas/detalhe/:id" element={<DetalheDeTarefa />} />

      <Route path="*" element={<Navigate to="/tarefas" />} />
    </Routes>
  );
};
