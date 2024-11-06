import { Stack } from "@mui/material";

import TimeSelect from "./time-select";
import AddressSelect from "./address-select";

export default function TimeLocationStep() {
  return (
    <Stack>
      <TimeSelect />
      <AddressSelect />
    </Stack>
  );
}
