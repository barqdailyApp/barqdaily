import { Box, Stack, Skeleton, Container } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";

export default function HomeFiltersLoading() {
  return (
    <>
      {/* Brands Swiper Skeleton */}
      <Box
        sx={(theme) => ({
          textAlign: "center",
        })}
      >
        <Container>
          <Box
            sx={{ width: "100%", position: "relative", py: SECTION_PADDING }}
          >
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

      {/* Collections List Skeleton (Upper) */}
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

      {/* Category Groups List Skeleton */}
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

      {/* Collections List Skeleton (Lower) */}
      <Box py={SECTION_PADDING}>
        <Container>
          <Stack spacing={4}>
            {[...Array(1)].map((_, collectionIndex) => (
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
    </>
  );
}
