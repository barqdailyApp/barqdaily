"use client";

import { useLocale } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Box, Container, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { LocaleType, localesSettings } from "@/i18n/config-locale";

import Image from "@/components/image";

import { Banar } from "@/types/banars";

interface Props {
  banars: Banar[];
}

export default function BanarsSwiper({ banars }: Props) {
  const locale = useLocale();
  const { dir } = localesSettings[locale as LocaleType];

  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
        pb: 0,
        background: theme.palette.background.neutral,
      })}
    >
      <Container style={{ marginTop: 1 }}>
        <Box sx={{ width: "100%", position: "relative", px: 0.5, py: 6 }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".hero-next",
              prevEl: ".hero-prev",
            }}
            className="mySwiper"
          >
            {banars?.map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  className="responsive-banar"
                  src={item.banar}
                  alt="banner"
                  width={1920}
                  height={500}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <IconButton
            sx={(theme) => ({
              position: "absolute",
              left: 0,
              top: "50%",
              transform: `translateY(-50%)`,
              backgroundColor: theme.customShadows.card,
              zIndex: 10,
            })}
            className="hero-prev"
          >
            <ArrowBackIosNewIcon
              sx={{
                fontSize: "30px",
                transform: dir === "rtl" ? "scaleX(-1)" : undefined,
              }}
            />
          </IconButton>
          <IconButton
            sx={(theme) => ({
              position: "absolute",
              right: 0,
              top: "50%",
              transform: `translateY(-50%)`,
              backgroundColor: theme.customShadows.card,
              zIndex: 10,
            })}
            className="hero-next"
          >
            <ArrowForwardIosIcon
              sx={{
                fontSize: "30px",
                transform: dir === "rtl" ? "scaleX(-1)" : undefined,
              }}
            />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
