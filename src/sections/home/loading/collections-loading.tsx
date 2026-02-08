import { Box, Stack, Skeleton, Container } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

export default function CollectionsLoading() {
  return (
    <Box py={SECTION_PADDING}>
      <Container>
        <Stack spacing={4}>
          {[...Array(2)].map((_, collectionIndex) => (
            <Box key={collectionIndex}>
              <Stack
                direction="row"
                spacing={3}
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: { xs: 2, sm: 4 } }}
              >
                <Skeleton
                  variant="text"
                  width={200}
                  height={40}
                  sx={{ borderRadius: 1 }}
                />
                <Skeleton
                  variant="text"
                  width={100}
                  height={28}
                  sx={{ borderRadius: 1 }}
                />
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                    xl: "repeat(7, 1fr)",
                  },
                  gap: { xs: 1.5, sm: 2, md: 2.25, lg: 2.5, xl: 3 },
                }}
              >
                {[...Array(7)].map((__, productIndex) => {
                  // Show items based on breakpoint: xs=2, sm=3, md=4, lg=5, xl=7
                  const shouldShow = {
                    xs: productIndex < 2,
                    sm: productIndex < 3,
                    md: productIndex < 4,
                    lg: productIndex < 5,
                    xl: productIndex < 7,
                  };
                  return (
                    <Skeleton
                      key={productIndex}
                      variant="rounded"
                      sx={{
                        aspectRatio: "3/4",
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
    </Box>
  );
}
