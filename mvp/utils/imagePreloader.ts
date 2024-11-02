import { useState, useEffect } from 'react';

interface ImagePreloaderStats {
  total: number;
  loaded: number;
  failed: number;
}

export const useImagePreloader = (domainId: string): ImagePreloaderStats => {
  const [stats, setStats] = useState<ImagePreloaderStats>({
    total: 0,
    loaded: 0,
    failed: 0,
  });

  useEffect(() => {
    const imagesToPreload = [
      `/images/domains/${domainId}/image1.jpg`,
      `/images/domains/${domainId}/image2.jpg`,
      `/images/domains/${domainId}/image3.jpg`,
      `/images/domains/${domainId}/image4.jpg`,
    ];

    const preloadImage = (url: string) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
        img.src = url;
      });
    };

    Promise.all(imagesToPreload.map(preloadImage))
      .then((results) => {
        const loadedImages = results.filter((result) => result !== null);
        setStats((prevStats) => ({
          ...prevStats,
          loaded: loadedImages.length,
        }));
      })
      .catch(() => {
        // Handle any unexpected errors
      });

    setStats((prevStats) => ({
      ...prevStats,
      total: imagesToPreload.length,
    }));
  }, [domainId]);

  return stats;
}; 