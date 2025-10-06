import { useState, useRef } from "react";
import { Search } from "lucide-react";

interface EnhancedImageViewerProps {
  src: string | undefined;
  alt?: string;
  className?: string;
  onImageClick?: () => void;
  title?: string;
  eventDate?: string;
  category?: string;
  viewerMode?: boolean;
}

export default function EnhancedImageViewer({ 
  src, 
  alt = "Memory image",
  className = "", 
  onImageClick,
  title,
  eventDate,
  category,
  viewerMode = false
}: EnhancedImageViewerProps) {
  const [isVerticalImage, setIsVerticalImage] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>("1 / 1");
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper function to get the correct image URL for memories
  const getMemoryImageUrl = (imageUrl: string | undefined): string => {
    if (!imageUrl) return '/placeholder-image.jpg';
    
    // Memory images are served directly from /public, so we need to ensure the URL is correct
    if (imageUrl.startsWith('/uploads/')) {
      return `/public${imageUrl}`;
    }
    if (imageUrl.startsWith('/public/uploads/')) {
      return imageUrl;
    }
    // If it doesn't start with uploads, assume it's already a full URL
    return imageUrl;
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
    setAspectRatio(ratio);
    
    // Detect if this is a vertical image (portrait)
    const isVertical = img.naturalHeight > img.naturalWidth;
    setIsVerticalImage(isVertical);
    setIsLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Failed to load memory image:', src);
    console.error('Attempted URL:', e.currentTarget.src);
    e.currentTarget.src = '/placeholder-image.jpg';
  };

  return (
    <div 
      className={`group relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform ${className}`}
      style={{ 
        aspectRatio: isLoaded ? aspectRatio : "1 / 1",
        // For vertical images (9:16 or portrait), allow larger height up to 720px
        // For horizontal images, keep reasonable max height
        maxHeight: isVerticalImage ? '45rem' : '24rem', // 720px for vertical, 384px for horizontal
        maxWidth: isVerticalImage ? '25rem' : '100%', // 400px max width for vertical images
        width: 'fit-content',
        margin: '0 auto'
      }}
      onClick={onImageClick}
      data-testid="enhanced-image-viewer"
    >
      <img
        src={getMemoryImageUrl(src)}
        alt={alt}
        className="w-full h-full object-cover"
        onLoad={handleImageLoad}
        onError={handleImageError}
        data-testid="memory-image"
      />
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
        {viewerMode ? (
          <div className="text-white transform scale-0 group-hover:scale-100 transition-transform text-center">
            <Search className="mx-auto text-2xl mb-2" />
            {title && <div className="text-sm font-medium">{title}</div>}
            {eventDate && <div className="text-xs">{eventDate}</div>}
            {category && (
              <div className="text-xs opacity-80 capitalize">{category.replace('_', ' ')}</div>
            )}
          </div>
        ) : (
          <div className="p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform flex items-end">
            <div>
              {title && <div className="text-sm font-medium">{title}</div>}
              {eventDate && <div className="text-xs">{eventDate}</div>}
              {category && (
                <div className="text-xs opacity-80 capitalize">{category.replace('_', ' ')}</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}