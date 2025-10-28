"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { image: "/images/banner1.jpg", title: "Ofertas en Audio", subtitle: "Los mejores precios" },
  { image: "/images/banner2.jpg", title: "Tecnología moderna", subtitle: "Novedades seleccionadas" },
  { image: "/images/banner3.jpg", title: "Nuevas colecciones", subtitle: "Explora ahora" }
];

export default function HeroSlider() {
  return (
    <div className="max-w-6xl mx-auto mb-8">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative h-[260px] md:h-[360px] flex items-center justify-center"
              style={{
                backgroundImage: `url(${s.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/50" />
              <div className="relative z-10 text-center px-4">
                <h2 className="text-2xl md:text-4xl font-bold text-white">
                  {s.title}
                </h2>
                {s.subtitle && (
                  <p className="text-sm md:text-base text-neutral-200 mt-2">
                    {s.subtitle}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
