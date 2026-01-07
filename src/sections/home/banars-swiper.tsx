"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import { Box, Stack, styled, Container, IconButton } from "@mui/material";

import { SECTION_PADDING } from "@/layouts/config-layout";
import { LocaleType, localesSettings } from "@/i18n/config-locale";

import Iconify from "@/components/iconify";

import { Banar } from "@/types/banars";

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
  banars: Banar[];
}

export default function BanarsSwiper({ banars }: Props) {
  const locale = useLocale();
  const { dir } = localesSettings[locale as LocaleType];

  const renderSwiper = (
    <Box px={{ md: 9, lg: 12 }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        autoplay={{ delay: 3000 }}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        style={{ borderRadius: "10px" }}
      >
        {banars?.map((item, index) => (
          <SwiperSlide key={index} style={{ overflow: "hidden" }}>
            <Image
              src={item.banar}
              alt=" "
              width={1920}
              height={500}
              style={{ borderRadius: "10px" }}
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
      <StyledButton className="hero-prev">
        <Iconify
          width={25}
          sx={{ transform: dir === "rtl" ? undefined : "scaleX(-1)" }}
          icon="weui:arrow-filled"
        />
      </StyledButton>
      <StyledButton className="hero-next">
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
        background: theme.palette.background.neutral,
      })}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            width: "100%",
            position: "relative",
            py: SECTION_PADDING,
          }}
        >
          {renderSwiper}
          {renderButtons}
        </Box>
      </Container>
    </Box>
  );
}
