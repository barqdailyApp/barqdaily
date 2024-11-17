import { Container } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container sx={{ pt: 3 }}>{children}</Container>;
}
