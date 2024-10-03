import { Container } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
