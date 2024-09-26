"use client";

import 'swiper/css';
import 'swiper/css/pagination';

import maskGroup from './Maskgroup.jpg';
import { HomeView } from "@/sections/home/view";

;

const images = [
  {
    image: maskGroup.src,
    caption: "Image 1",
  },
  {
    image: maskGroup.src,
    caption: "Image 2",
  },
  {
    image: maskGroup.src,
    caption: "Image 3",
  },
];

export default function Page() {
  return(
    <HomeView slides={images}/>
  )
}
