import { Controller, useFormContext } from "react-hook-form";

import { TimePicker } from "@mui/x-date-pickers";
// ----------------------------------------------------------------------

type Props = {
  name: string;
  helperText?: string;
  label?: string;
  value?: string;
};

export default function RHFTime({ name, label, value, helperText }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          label={label}
          value={new Date(field.value)}
          onChange={(newValue) => {
            field.onChange(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message,
            },
          }}
        />
      )}
    />
  );
}
