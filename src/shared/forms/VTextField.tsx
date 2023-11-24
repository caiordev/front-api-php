/* eslint-disable react-hooks/exhaustive-deps */
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TVTextFieldProps = TextFieldProps & {
  name: string;
};

//Juntando o unform com o textField do materialUI, fazendo um textfield customizado.
export const VTextField: React.FC<TVTextFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [value, setValue] = useState(defaultValue || "");

  //garante o contexto do formulário.
  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  //passamos todos os métodos do textfield para o customizado.
  return (
    <TextField
      {...rest}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={() => (error ? clearError() : undefined)}
    />
  );
};
