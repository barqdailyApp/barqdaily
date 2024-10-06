import { Container } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container sx={{ pt: SECTION_PADDING }}>{children}</Container>;
}
