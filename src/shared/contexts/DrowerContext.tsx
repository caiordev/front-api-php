import { createContext, useCallback, useContext, useState } from "react";

// Definindo as interfaces para os dados do contexto do menu lateral e as opções do menu lateral
interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IDrawerOption[];
  toggleDrawerOpen: () => void;
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

// Criando o contexto do menu lateral
const DrawerContext = createContext({} as IDrawerContextData);

// Função para consumir o contexto do menu lateral
export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

// Definindo a interface para o componente do provedor de menu lateral
interface IAppDrawerProviderProps {
  children: React.ReactNode;
}

// Componente do provedor de menu lateral
export const AppDreawerProvider: React.FC<IAppDrawerProviderProps> = ({
  children,
}) => {
  // Estado para armazenar se o menu lateral está aberto
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // Estado para armazenar as opções do menu lateral
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  // Função para alternar se o menu lateral está aberto
  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  // Função para definir as opções do menu lateral
  const handleSetDrawerOptions = useCallback(
    (newDrawerOptions: IDrawerOption[]) => {
      setDrawerOptions(newDrawerOptions);
    },
    []
  );

  // Retornando o provedor de menu lateral com o estado e as funções para manipular o estado
  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
