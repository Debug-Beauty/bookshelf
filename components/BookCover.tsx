// components/BookCover.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const LOCAL_FALLBACK_SRC = '/fallback.png';

interface BookCoverProps {
  src: string;
  alt: string;
}

const BookCover = ({ src, alt }: BookCoverProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  // Garante que a imagem seja atualizada se a prop 'src' mudar
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image 
      src={imgSrc} 
      alt={alt} 
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-lg"
      // A lógica onError agora está segura dentro de um Client Component
      onError={() => {
        if (imgSrc !== LOCAL_FALLBACK_SRC) {
          setImgSrc(LOCAL_FALLBACK_SRC);
        }
      }}
    />
  );
};

export default BookCover;