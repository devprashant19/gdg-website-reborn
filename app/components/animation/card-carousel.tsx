"use client"

import Image from "next/image"
import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"
import "swiper/css/pagination"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { cn } from "@/app/lib/utils"

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
  className?: string
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
  className,
}) => {
  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
    
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 80%; 
    max-width: 300px;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `
  return (
     

          <div className={cn("flex w-full items-center justify-center gap-4",className)}>
             <style>{css}</style>
            <div className="w-full">
              <Swiper
                
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                spaceBetween={20} 
  // 2. Ensure centeredSlides is true (you already have this)
  
  // 3. Set slidesPerView to 'auto' (you already have this)
  slidesPerView={"auto"}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2, // Slightly reduced for better mobile framing
  }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={500}
                        height={500}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={200}
                        height={200}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
      
  )
}
