"use client"

import Image from "next/image"
import React, { useState, useEffect } from "react"
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

import { cn } from "@/lib/utils"

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const css = `
  .swiper {
    width: 100%;
    padding-bottom: 50px;
    padding-right: 20px;
    padding-left: 20px;
  }
  
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `

  if (!mounted || images.length === 0) {
    return (
      <div className={cn("flex w-full items-center justify-center gap-4", className)}>
        <div className="w-full h-[300px] bg-gray-200 rounded-3xl animate-pulse" />
      </div>
    )
  }

  return (
    <div className={cn("flex w-full items-center justify-center gap-4", className)}>
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
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
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
                  width={300}
                  height={300}
                  className="size-full rounded-3xl object-cover"
                  alt={image.alt}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
