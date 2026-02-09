"use client";

import { useState } from "react";
import RouterLink from "next/link";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useLocale, useTranslations } from "next-intl";

import {
  Box,
  Link,
  Stack,
  styled,
  Container,
  IconButton,
  Typography,
} from "@mui/material";

import { paths } from "@/routes/paths";
import { useDir } from "@/routes/hooks/use-dir";

import { LocaleType } from "@/i18n/config-locale";
import { SECTION_PADDING } from "@/layouts/config-layout";

import Iconify from "@/components/iconify";

import { ProductCard } from "@/sections/products/product-card";

import { CollectionWithProducts } from "@/types/products";

interface Props {
  collections: CollectionWithProducts[];
}

const StyledButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  boxShadow: theme.customShadows.card,
  background: theme.palette.background.paper,
  border: `1px solid ${theme.palette.primary.light}`,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  transition: "background-color 0.3s ease",
}));

export default function CollectionsList({ collections }: Props) {
  console.log("collections", collections);
  const t = useTranslations("Pages.Home");
  const locale = useLocale() as LocaleType;
  const dir = useDir();

  return (
    <Box py={SECTION_PADDING}>
      <Container>
        <Stack spacing={4}>
          {collections
            .filter((item) => item.products?.length)
            .map((item) => (
              <CollectionRow
                key={item.collection.id}
                item={item}
                locale={locale}
                dir={dir}
                actionLabel={t("action")}
              />
            ))}
        </Stack>
      </Container>
    </Box>
  );
}

function CollectionRow({
  item,
  locale,
  dir,
  actionLabel,
}: {
  item: CollectionWithProducts;
  locale: LocaleType;
  dir: "rtl" | "ltr";
  actionLabel: string;
}) {
  const { collection } = item;
  const name =
    locale === "ar" ? collection.name_ar || collection.name : collection.name;
  const href = `${paths.collections}/${collection.id}`;
  const [slidesPerView, setSlidesPerView] = useState(2);
  const shouldShowArrows = item.products.length > slidesPerView;

  return (
    <Box key={collection.id}>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" sx={{ textAlign: "start" }}>
          {name}
        </Typography>
        <Link
          href={href}
          variant="h6"
          sx={{ display: "flex", alignItems: "center", gap: 0.25 }}
          component={RouterLink}
        >
          {actionLabel}
          <Iconify
            icon="weui:arrow-filled"
            sx={{ transform: dir === "rtl" ? " scaleX(-1)" : "" }}
            width={24}
          />
        </Link>
      </Stack>

      <Box pt={{ xs: 2, sm: 4 }} sx={{ position: "relative" }}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={12}
          slidesPerView={2}
          style={{ alignItems: "stretch", paddingInline: 4 }}
          breakpoints={{
            600: { slidesPerView: 3, spaceBetween: 16 },
            900: { slidesPerView: 4, spaceBetween: 18 },
            1200: { slidesPerView: 5, spaceBetween: 20 },
            1536: { slidesPerView: 7, spaceBetween: 24 },
          }}
          navigation={{
            nextEl: `.collection-next-${collection.id}`,
            prevEl: `.collection-prev-${collection.id}`,
          }}
          onBeforeInit={(swiper) => {
            // Make all slides match the tallest card height.
            swiper.wrapperEl.style.alignItems = "stretch";
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
          {item.products.map((product) => (
            <SwiperSlide
              key={product.product_id}
              style={{ height: "auto", alignSelf: "stretch", paddingBlock: 4 }}
            >
              <ProductCard
                product={product}
                href={`${paths.products}/${product.product_id}`}
                sx={{ minHeight: "100%", height: "100%" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {shouldShowArrows && (
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: `translateY(-50%)`,
              width: "100%",
              px: 1,
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <StyledButton
              className={`collection-prev-${collection.id}`}
              sx={{ pointerEvents: "auto", zIndex: 3 }}
            >
              <Iconify
                width={20}
                sx={{ transform: dir === "rtl" ? undefined : "scaleX(-1)" }}
                icon="weui:arrow-filled"
              />
            </StyledButton>
            <StyledButton
              className={`collection-next-${collection.id}`}
              sx={{ pointerEvents: "auto", zIndex: 3 }}
            >
              <Iconify
                width={20}
                sx={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}
                icon="weui:arrow-filled"
              />
            </StyledButton>
          </Stack>
        )}
      </Box>
    </Box>
  );
}

