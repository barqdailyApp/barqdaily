import { Box } from "@mui/material";

import { HEADER } from "@/layouts/config-layout";

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <Box
      sx={{
        pt: { xs: `${HEADER.H_MOBILE}px`, md: `${HEADER.H_DESKTOP}px` },
        textAlign: "center",
      }}
    >
      Home Page
    </Box>
  );
}
