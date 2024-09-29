"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { Box, Container, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { LocaleType, localesSettings } from "@/i18n/config-locale";

import { Brand } from "@/types/products";

interface Props {
  brands: Brand[];
}

export default function BrandsSwiper({ brands }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const { dir } = localesSettings[locale as LocaleType];

  return (
    <Box
      sx={(theme) => ({
        textAlign: "center",
        pb: 0,
      })}
    >
      <Container style={{ marginTop: 1 }}>
        <Box sx={{ width: "100%", position: "relative", px: 0.5, py: 4 }}>
          <Swiper
            style={{ width: "90%" }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
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
              nextEl: ".brand-next",
              prevEl: ".brand-prev",
            }}
            className="mySwiper"
          >
            {brands?.map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  className="responsive-banar"
                  src={item.logo}
                  alt="banner"
                  style={{
                    objectFit: "cover",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  width={120}
                  height={120}
                  onClick={() => router.push(`brand/${item.id}`)}
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
            className="brand-next"
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
            className="brand-prev"
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
