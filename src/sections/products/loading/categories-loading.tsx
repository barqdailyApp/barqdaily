import { Box, Stack, Divider, Skeleton } from "@mui/material";

export default function CategoriesLoading() {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {[...Array(8)].map((_, index) => (
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem", display: "block", width: "5rem" }}
          />
        ))}
      </Stack>
      <Divider />
    </Box>
  );
}
