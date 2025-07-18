import type React from 'react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

interface ImageState {
  loaded: boolean;
  error: boolean;
  inView: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75,
  sizes,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc,
  ...props
}) => {
  const [state, setState] = useState<ImageState>({
    loaded: false,
    error: false,
    inView: priority // If priority, consider it in view immediately
  });

  const imgRef = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  // Generate optimized src URLs
  const generateSrcSet = useCallback((originalSrc: string): string => {
    // If it's a Contentful URL, add optimization parameters
    if (originalSrc.includes('ctfassets.net') || originalSrc.includes('contentful.com')) {
      const baseUrl = originalSrc.split('?')[0];
      const sizes = [480, 768, 1024, 1280, 1920];

      return sizes
        .map(size => `${baseUrl}?w=${size}&q=${quality}&fm=webp ${size}w`)
        .join(', ');
    }

    // For local images, return as-is
    return originalSrc;
  }, [quality]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || state.inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setState(prev => ({ ...prev, inView: true }));
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, state.inView]);

  // Set source when in view
  useEffect(() => {
    if (state.inView && !currentSrc) {
      setCurrentSrc(src);
    }
  }, [state.inView, src, currentSrc]);

  // Handle image load
  const handleLoad = useCallback(() => {
    setState(prev => ({ ...prev, loaded: true, error: false }));
    onLoad?.();
  }, [onLoad]);

  // Handle image error
  const handleError = useCallback(() => {
    setState(prev => ({ ...prev, error: true }));

    // Try fallback source if available
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }

    onError?.();
  }, [fallbackSrc, currentSrc, onError]);

  // Preload critical images
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      if (sizes) link.setAttribute('imagesizes', sizes);
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [priority, src, sizes]);

  // Placeholder component
  const PlaceholderComponent = () => {
    if (placeholder === 'blur' && blurDataURL) {
      return (
        <img
          src={blurDataURL}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            state.loaded ? "opacity-0" : "opacity-100"
          )}
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        className={cn(
          "absolute inset-0 bg-gray-200 animate-pulse transition-opacity duration-300",
          state.loaded ? "opacity-0" : "opacity-100"
        )}
        aria-hidden="true"
      />
    );
  };

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      {/* Placeholder */}
      {!state.loaded && !state.error && <PlaceholderComponent />}

      {/* Error fallback */}
      {state.error && !fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Failed to load image</div>
        </div>
      )}

      {/* Main image */}
      {currentSrc && (
        <img
          ref={imgRef}
          src={currentSrc}
          srcSet={generateSrcSet(currentSrc)}
          sizes={sizes || '100vw'}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            state.loaded ? "opacity-100" : "opacity-0"
          )}
          style={{
            aspectRatio: width && height ? `${width}/${height}` : undefined
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
