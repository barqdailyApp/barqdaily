"use client";

import 'swiper/css';
import 'swiper/css/pagination';

import maskGroup from './Maskgroup.jpg';
import { HomeView } from "@/sections/home/view";

;

const images = [
  {
    brandId:1,
    image: maskGroup.src,
    caption: "Image 1",
  },
  {
    brandId:2,
    image: maskGroup.src,
    caption: "Image 2",
  },
  {
    brandId:3,
    image: maskGroup.src,
    caption: "Image 3",
  },
  {  brandId:4,
    image: maskGroup.src,
    caption: "Image 4",
  },
  {
    brandId:5,
    image: maskGroup.src,
    caption: "Image 5",
  },
  {  
    brandId:6,
    image: maskGroup.src,
    caption: "Image 6",
  },
  {
    brandId:7,
    image: maskGroup.src,
    caption: "Image 7",
  },
  {
    brandId:8,
    image: maskGroup.src,
    caption: "Image 8",
  },
  {
    brandId:9,
    image: maskGroup.src,
    caption: "Image 9",
  },
  { 
    brandId:10,
    image: maskGroup.src,
    caption: "Image 10",
  },  
  {
    brandId:11,
    image: maskGroup.src,
    caption: "Image 11",
  },
  {
    brandId:12,
    image: maskGroup.src,
    caption: "Image 12",
  },
  {
    brandId:13,
    image: maskGroup.src,
    caption: "Image 13",
  },
 
];

export default function Page() {
  return(
    <HomeView slides={images}/>
  )
}
