import {
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import imagecab from "@/sections/order-details/view/README.jpg";
import imageman from "@/sections/order-details/view/Mandarin.jpg";
import imagebeef from "@/sections/order-details/view/beef.jpg";
import Image from "next/image";

export function OrderDetailsCard() {
  const images = [
    {
      src: imagecab,
      alt: "No image to show",
      title: "Cabbage",
      weight: "2Kg",
      pricePerKg: "50 YER",
      total: "100 YER",
    },
    {
      src: imageman,
      alt: "No image found",
      title: "Mandarin",
      weight: "3Kg",
      pricePerKg: "40 YER",
      total: "120 YER",
    },
    {
      src: imagebeef,
      alt: "No image found",
      title: "Beef Chuck Stew",
      weight: "12-14ct/lb",
      pricePerKg: "150 YER",
      total: "300 YER",
    },
  ];

  return (
    <Stack spacing={2} pt={2} alignItems="stretch" width="100%">
      {images.map((image, index) => (
        <>
          {index !== 0 ? <Divider flexItem /> : null}

          <Box key={index} px={2}>
            <Stack spacing={1} justifyContent="flex-start">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={60}
                  height={60}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Stack sx={{ flexGrow: 1 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {image.title}
                  </Typography>
                  <Typography variant="caption" fontWeight="350">
                    {image.weight}
                  </Typography>
                </Stack>
                <Typography variant="body2" fontWeight="bold">
                  {image.pricePerKg} /{" "}
                  <Typography
                    component="span"
                    variant="caption"
                    fontWeight="350"
                  >
                    1kg
                  </Typography>
                </Typography>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mt: 1 }}
              >
                <Stack direction="row" spacing={0.5}>
                  <Typography variant="caption">Total:</Typography>
                  <Typography variant="caption" fontWeight="bold">
                    {image.total}
                  </Typography>
                </Stack>
                <Button color="primary" variant="contained">
                  Buy Again
                </Button>
              </Stack>
            </Stack>
          </Box>
        </>
      ))}
    </Stack>
  );
}
