"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Box, Card, Stack, styled, Container, IconButton } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";
import { LocaleType, localesSettings } from "@/i18n/config-locale";

import Iconify from "@/components/iconify";

import { Brand } from "@/types/products";

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
  const [slidesPerView, setSlidesPerView] = useState(3);
  const shouldShowArrows = brands.length > slidesPerView;

  const renderSwiper = (
    <Box px={shouldShowArrows ? { md: 9 } : 0}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          320: {
            slidesPerView: 3,
          },
          700: {
            slidesPerView: 5,
          },
          1000: {
            slidesPerView: 7,
          },
          1200: {
            slidesPerView: 9,
          },
        }}
        loop={shouldShowArrows}
        autoplay={{ delay: 3000 }}
        navigation={{
          nextEl: ".brands-next",
          prevEl: ".brands-prev",
        }}
        onInit={(swiper) => {
          const current =
            typeof swiper.params.slidesPerView === "number"
              ? swiper.params.slidesPerView
              : 2;
          setSlidesPerView(current);
        }}
        onBreakpoint={(_, breakpointParams) => {
          const current =
            typeof breakpointParams.slidesPerView === "number"
              ? breakpointParams.slidesPerView
              : 2;
          setSlidesPerView(current);
        }}
      >
        {brands?.map((item, index) => (
          <SwiperSlide key={index} style={{ paddingBlock: ".75rem" }}>
            <Card
              sx={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
                cursor: "pointer",
              }}
              src={item.logo}
              alt={item.name}
              width={400}
              height={400}
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
      sx={{
        textAlign: "center",
      }}
    >
      <Container>
        <Box sx={{ width: "100%", position: "relative", mb: SECTION_PADDING }}>
          {renderSwiper}
          {shouldShowArrows ? renderButtons : null}
        </Box>
      </Container>
    </Box>
  );
}
