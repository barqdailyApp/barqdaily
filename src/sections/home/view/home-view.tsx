"use client";
import { Box, Container, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import 'swiper/css';
import 'swiper/css/pagination';
import { useLocale } from "next-intl";
import { localesSettings, LocaleType } from "@/i18n/config-locale";


// ----------------------------------------------------------------------
interface Props {
  slides : {
    caption:string,
    image:string
  }[]
}
export default function HomeView({slides}:Props) {
  const locale = useLocale();
  const dir =localesSettings[locale as LocaleType].dir
  return(
    <Box
    sx={(theme)=>({
      textAlign: 'center',
      pb: 0,
      background:theme.palette.background.neutral,
     
    })}
  >
    <Container style={{marginTop:1}}>
      <Box  sx={{ width: '100%', position: 'relative', px:0.5 ,py:6 }}>
        <Swiper
          
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="mySwiper"
        >
          {slides?.map((item, index) => (
            <SwiperSlide key={index}>
              <img className="responsive-banar" src={item.image} alt="banner" />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton
          sx={(theme)=>({
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: `translateY(-50%)`,
            backgroundColor:theme.customShadows.card,
            zIndex:10
            
            
            
    })}
          className="swiper-button-next"
        >
          <ArrowBackIosNewIcon
          sx={{
            fontSize: '30px',
            transform: dir === 'rtl' ? 'scaleX(-1)' : undefined
  
            
          }}
          />
        </IconButton>
        <IconButton
          sx={(theme)=>({
            position: 'absolute',
            right:0,
            top: '50%',
            transform: `translateY(-50%)`,
            backgroundColor:theme.customShadows.card,
            zIndex:10
                    
          })}
          className="swiper-button-prev"
        >
          <ArrowForwardIosIcon
        
            sx={{
              fontSize: '30px',
              transform: dir === 'rtl' ? 'scaleX(-1)' : undefined
  
            }}
          />
        </IconButton>
      </Box>
    </Container>
  </Box>

);
}
