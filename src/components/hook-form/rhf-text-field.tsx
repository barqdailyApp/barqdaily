import { Controller, useFormContext } from "react-hook-form";

import TextField, { TextFieldProps } from "@mui/material/TextField";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  maxLength?: number;
};

export default function RHFTextField({
  name,
  helperText,
  type,
  maxLength,
  ...other
}: Props) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (maxLength && field.value?.length > maxLength)
          setValue(name, field.value.slice(0, maxLength));

        return (
          <TextField
            {...field}
            fullWidth
            type={type}
            value={type === "number" && field.value === 0 ? "" : field.value}
            onChange={(event) => {
              if (type === "number") {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
          />
        );
      }}
    />
  );
}
