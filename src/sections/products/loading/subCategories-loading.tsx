import { Box, Stack, Skeleton } from "@mui/material";

export default function SubCategoriesLoading() {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {[...Array(5)].map((_, index) => (
          <Skeleton
            variant="text"
            sx={{
              fontSize: "36px",
              display: "block",
              width: "7rem",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
