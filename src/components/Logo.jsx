import React from 'react';

/**
 * Flavoro Brand Logo Component
 * Uses the high-resolution cropped and transparent Google Imagen ("nano banana") generated brand logo:
 * - Light version: /assets/logo.png
 * - Dark version: /assets/logo_white.png
 */
export default function Logo({
  variant = 'light', // 'light' | 'white' | 'dark'
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  onClick
}) {
  const isWhite = variant === 'white' || variant === 'dark';

  // Height definitions for prominent, large brand visibility
  const sizeStyles = {
    sm: 'h-11 sm:h-12',
    md: 'h-16 sm:h-20',
    lg: 'h-24 sm:h-28',
    xl: 'h-36 sm:h-44'
  };

  const currentHeight = sizeStyles[size] || sizeStyles.md;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none transition-transform duration-200 ${
        onClick ? 'cursor-pointer group hover:scale-[1.03] active:scale-95' : ''
      } ${className}`}
      title="Flavoro Restaurant"
    >
      <img
        src={isWhite ? './assets/logo_white.png' : './assets/logo.png'}
        alt="Flavoro Restaurant Logo"
        className={`${currentHeight} w-auto object-contain drop-shadow-sm`}
        onError={(e) => {
          // Fallback to jpg if png is not supported
          e.target.src = isWhite ? './assets/logo_white.jpg' : './assets/logo.jpg';
        }}
      />
    </div>
  );
}
