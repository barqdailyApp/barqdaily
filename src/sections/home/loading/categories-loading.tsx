import { Box, Stack, Skeleton, Container } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

export default function CategoriesLoading() {
  return (
    <Container
      sx={{
        width: "100%",
        position: "relative",
        pb: SECTION_PADDING,
      }}
    >
      <Stack spacing={3}>
        {[...Array(2)].map((_, groupIndex) => (
          <Box key={groupIndex}>
            <Skeleton
              variant="text"
              width={150}
              height={28}
              sx={{ mb: 2, borderRadius: 1 }}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(4, 115px)",
                  sm: "repeat(5, 115px)",
                  md: "repeat(7, 115px)",
                  lg: "repeat(9, 115px)",
                  xl: "repeat(12, 115px)",
                },
                gap: 1,
              }}
            >
              {[...Array(12)].map((__, categoryIndex) => {
                // Show items based on breakpoint: xs=4, sm=5, md=7, lg=9, xl=12
                const shouldShow = {
                  xs: categoryIndex < 4,
                  sm: categoryIndex < 5,
                  md: categoryIndex < 7,
                  lg: categoryIndex < 9,
                  xl: categoryIndex < 12,
                };
                return (
                  <Skeleton
                    key={categoryIndex}
                    variant="rounded"
                    sx={{
                      width: 115,
                      aspectRatio: "9/10",
                      height: "auto",
                      display: {
                        xs: shouldShow.xs ? "block" : "none",
                        sm: shouldShow.sm ? "block" : "none",
                        md: shouldShow.md ? "block" : "none",
                        lg: shouldShow.lg ? "block" : "none",
                        xl: shouldShow.xl ? "block" : "none",
                      },
                    }}
                  />
                );
              })}
            </Box>
          </Box>
        ))}
      </Stack>
    </Container>
  );
}
