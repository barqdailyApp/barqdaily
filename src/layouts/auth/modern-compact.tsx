import Box from "@mui/material/Box";

import Logo from "@/components/logo";

import CompactLayout from "../compact";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthModernCompactLayout({ children }: Props) {
  return (
    <CompactLayout>
      <Box
        component="main"
        sx={{
          pt: 8,
          px: { xs: 2, md: 0 },
        }}
      >
        <Box
          sx={{
            py: 5,
            px: 3,
            marginInline: "auto",
            width: 540,
            maxWidth: "100%",
          }}
        >
          <Box textAlign="center" mb={3}>
            <Logo />
          </Box>
          {children}
        </Box>
      </Box>
    </CompactLayout>
  );
}
