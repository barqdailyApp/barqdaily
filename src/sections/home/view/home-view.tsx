import { Box, Container, IconButton,Card,CardMedia,Grid, CardContent, Typography, CardHeader } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import 'swiper/css';
import 'swiper/css/pagination';
import { useLocale } from "next-intl";
import { localesSettings, LocaleType } from "@/i18n/config-locale";
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------
interface Props {
  slides : {
    brandId:number
    caption:string,
    image:string
  }[]
}
export default function HomeView({slides}:Props) {
  const locale = useLocale();
  const dir = localesSettings[locale as LocaleType].dir;
  const router = useRouter();

  const handleClick = (brandId: number) => () => {
    router.push(`/brands/${brandId}`);
  };

  return(
    <>
    
    <Box
      sx={(theme)=>({
        textAlign: 'center',
        pb: 0,
        background:theme.palette.background.neutral,
      })}
    >
      <Container style={{marginTop:1}}>
        <Box sx={{ width: '100%', position: 'relative', px:0.5 ,py:6 }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: '.hero-next',
              prevEl: '.hero-prev',
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
            className="hero-prev"
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
              right: 0,
              top: '50%',
              transform: `translateY(-50%)`,
              backgroundColor:theme.customShadows.card,
              zIndex:10
            })}
            className="hero-next"
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

    
    <Box
      sx={(theme)=>({
        textAlign: 'center',
        pb: 0,
      })}
    >
      <Container style={{marginTop:1}}>
        <Box sx={{ width: '100%', position: 'relative', px:0.5 ,py:4 }}>
          <Swiper
            style={{width:'90%'}}
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
              nextEl: '.brand-next',
              prevEl: '.brand-prev',
            }}
            className="mySwiper"
          >
            {slides?.map((item, index) => (
              <SwiperSlide key={index}>
                <img className="responsive-banar" src={item.image} alt="banner" style={{ objectFit:'cover',width:'120px', height:'120px',borderRadius:'50%', cursor: 'pointer' }} onClick={handleClick(item.brandId)} />
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
            className="brand-next"
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
            className="brand-prev"
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
    <Container sx={{ width: '100%', position: 'relative', px: 0.5, py: 6 }}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    {slides?.map((item, index) => (
      <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Card sx={(theme)=> ({
                border:  `1px solid ${theme.palette.primary.main}`,backgroundColor:theme.palette.primary.lighter
              })}>
                
                  <Typography variant="caption" textAlign='center' py={1} display='block' fontWeight={700}>
                    {item.caption}
                  </Typography>
              
                <CardMedia component="img"
                 sx={{height:'auto',aspectRatio:'1/1',objectFit:'cover', cursor:'pointer'}}
                 
                 
                 image={item.image}
                alt={item.caption} onClick={handleClick(item.brandId)}/>
              </Card>
        
        </Grid>
    ))}
    
     
</Grid>
    </Container>

    </>
  );
}
