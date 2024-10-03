import React from "react";

interface LogoProps {
  src: string; // Ruta de la imagen del logo
  alt: string; // Texto alternativo para la imagen
  width?: number; // Ancho opcional
  height?: number; // Alto opcional
}

const Logo: React.FC<LogoProps> = ({ src, alt, width = 100, height = 100 }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Logo;
