import { Box, Skeleton, Container } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

export default function BrandsLoading() {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Container>
        <Box sx={{ width: "100%", position: "relative", py: SECTION_PADDING }}>
          <Box px={{ md: 9, lg: 12 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 120px)",
                  sm: "repeat(3, 120px)",
                  md: "repeat(5, 120px)",
                  lg: "repeat(6, 120px)",
                },
                gap: { xs: 2, sm: 2.5, md: 5, lg: 6.25 },
                justifyContent: "center",
              }}
            >
              {[...Array(6)].map((_, index) => {
                // Show items based on breakpoint: xs=2, sm=3, md=5, lg=6
                const shouldShow = {
                  xs: index < 2,
                  sm: index < 3,
                  md: index < 5,
                  lg: index < 6,
                };
                return (
                  <Skeleton
                    key={index}
                    variant="rounded"
                    sx={{
                      width: 120,
                      aspectRatio: "1/1",
                      height: "auto",
                      display: {
                        xs: shouldShow.xs ? "block" : "none",
                        sm: shouldShow.sm ? "block" : "none",
                        md: shouldShow.md ? "block" : "none",
                        lg: shouldShow.lg ? "block" : "none",
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
