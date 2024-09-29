"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Box, Card, Container, IconButton, Stack, styled } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { LocaleType, localesSettings } from "@/i18n/config-locale";

import { Brand } from "@/types/products";
import Iconify from "@/components/iconify";

const StyledButton = styled(IconButton)(({ theme }) => ({
  width: 60,
  height: 60,
  boxShadow: theme.customShadows.card,
  background: "#fff",
  "&:hover": {
    background: "#fafafa",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

interface Props {
  brands: Brand[];
}

export default function BrandsSwiper({ brands }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const { dir } = localesSettings[locale as LocaleType];

  const renderSwiper = (
    <Box px={{ md: 9, lg: 12 }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={2}
        breakpoints={{
          600: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        loop
        autoplay={{ delay: 3000 }}
        navigation={{
          nextEl: ".brands-next",
          prevEl: ".brands-prev",
        }}
      >
        {brands?.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              sx={{
                objectFit: "cover",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              src={item.logo}
              alt={item.name}
              width={120}
              height={120}
              onClick={() => router.push(`brand/${item.id}`)}
              component={Image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );

  const renderButtons = (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        position: "absolute",
        left: 0,
        top: "50%",
        transform: `translateY(-50%)`,
        width: "100%",
      }}
    >
      <StyledButton className="brands-prev">
        <Iconify
          width={25}
          sx={{ transform: dir === "rtl" ? undefined : "scaleX(-1)" }}
          icon="weui:arrow-filled"
        />
      </StyledButton>
      <StyledButton className="brands-next">
        <Iconify
          width={25}
          sx={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}
          icon="weui:arrow-filled"
        />
      </StyledButton>
    </Stack>
  );

  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
        pb: 0,
      })}
    >
      <Container style={{ marginTop: 1 }}>
        <Box sx={{ width: "100%", position: "relative", px: 0.5, py: 4 }}>
          {renderSwiper}
          {renderButtons}
        </Box>
      </Container>
    </Box>
  );
}
