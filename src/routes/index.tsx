import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DetalheDeTarefa } from "../pages/tarefas/DetalheDeTarefa";
import { ListagemDeTarefa } from "../pages/tarefas/ListagemDeTarefa";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Tarefa",
        icon: "people",
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
