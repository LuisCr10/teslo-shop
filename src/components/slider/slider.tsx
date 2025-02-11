'use client';

import { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';

export default function Slider() {
  const [image, setImage] = useState('');

  const handleResize = useCallback(() => {
    const newImage = window.innerWidth > 768
      ? "https://lscoglobal.scene7.com/is/image/lscoglobal/25_H1_SPM_D1_JANUARY-SUSTAIN_D_HP?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2050"
      : "https://lscoglobal.scene7.com/is/image/lscoglobal/25_H1_SPM_D1_JANUARY-SUSTAIN_D_HP_MOBILE-1?fmt=webp&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=840";
    setImage(newImage);
  }, []);

  useEffect(() => {
    handleResize(); // Establecer la imagen inicial
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <Swiper slidesPerView={1} className="relative w-full h-[200px]" style={{ height: '70%' }}>
      <SwiperSlide className="relative">
        {/* Imagen de fondo */}
        <img src={image} alt="Slider" className="w-full h-full object-cover" style={{ height: '70%' }} />

        {/* Contenido superpuesto */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/30">
          <h2 className="text-4xl font-bold mb-4">Nueva Colección</h2>
          <div className="flex gap-4">
            <Link
              href="/gender/men"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              Hombres
            </Link>
            <Link
              href="/gender/women"
              className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg"
            >
              Mujeres
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}