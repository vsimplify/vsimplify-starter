import { useEffect } from 'react';
import { getAgentImage, getDomainImages } from './imageMapping';
import { FEATURES } from '../config/features';

interface PreloadStats {
  total: number;
  loaded: number;
  failed: number;
}

class ImagePreloader {
  private preloadedImages: Map<string, HTMLImageElement> = new Map();
  private stats: PreloadStats = { total: 0, loaded: 0, failed: 0 };

  // Preload a single image
  private preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.preloadedImages.set(src, img);
        this.stats.loaded++;
        resolve();
      };
      
      img.onerror = () => {
        this.stats.failed++;
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
    });
  }

  // Preload all images for a domain
  async preloadDomainImages(domainId: string | number): Promise<PreloadStats> {
    const images = getDomainImages(domainId);
    this.stats.total += images.length;

    const preloadPromises = images.map(src => 
      this.preloadImage(src).catch(error => {
        console.error(error);
        // Fallback to default image
        return this.preloadImage(FEATURES.DEFAULT_AGENT_IMAGE);
      })
    );

    await Promise.allSettled(preloadPromises);
    return this.stats;
  }

  // Get preloaded image
  getPreloadedImage(src: string): HTMLImageElement | undefined {
    return this.preloadedImages.get(src);
  }

  // Clear preloaded images
  clearPreloadedImages(): void {
    this.preloadedImages.clear();
    this.stats = { total: 0, loaded: 0, failed: 0 };
  }

  // Get preload statistics
  getStats(): PreloadStats {
    return { ...this.stats };
  }
}

export const imagePreloader = new ImagePreloader();

// Hook for React components
export const useImagePreloader = (domainId: string | number) => {
  useEffect(() => {
    imagePreloader.preloadDomainImages(domainId)
      .then(stats => {
        if (FEATURES.DEBUG_MODE) {
          console.log('Image preload stats:', stats);
        }
      });

    return () => {
      imagePreloader.clearPreloadedImages();
    };
  }, [domainId]);

  return imagePreloader.getStats();
}; 