import { getAgentImage, validateImage, getDomainImages } from '@/mvp/utils/imageMapping';
import { FEATURES } from '@/mvp/config/features';

describe('Image Mapping Utility', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_DEFAULT_AGENT_IMAGE: '/agents_images/sailor.png',
      NEXT_PUBLIC_AGENT_IMAGES_PATH: '/agents_images',
      NEXT_PUBLIC_USE_PROD_DATA: 'false'
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('getAgentImage', () => {
    it('should return correct image path for known agent', () => {
      const imagePath = getAgentImage('103.01', 'Senior Software Engineer');
      expect(imagePath).toBe('/agents_images/103.01-Senior Software Engineer (Scheduler Pro).png');
    });

    it('should return fallback image for unknown agent', () => {
      const imagePath = getAgentImage('999.99', 'Unknown Role');
      expect(imagePath).toBe(FEATURES.DEFAULT_AGENT_IMAGE);
    });

    it('should handle case sensitivity', () => {
      const imagePath = getAgentImage('103.01', 'SENIOR SOFTWARE ENGINEER');
      expect(imagePath).toBe('/agents_images/103.01-Senior Software Engineer (Scheduler Pro).png');
    });
  });

  describe('validateImage', () => {
    it('should return true for existing image', async () => {
      const isValid = await validateImage('/agents_images/103.01-Senior Software Engineer (Scheduler Pro).png');
      expect(isValid).toBe(true);
    });

    it('should return false for non-existent image', async () => {
      const isValid = await validateImage('/agents_images/nonexistent.png');
      expect(isValid).toBe(false);
    });
  });

  describe('getDomainImages', () => {
    it('should return all images for a domain', () => {
      const images = getDomainImages('103.01');
      expect(images).toHaveLength(4); // MVP mode should have 4 images
      expect(images).toContain('/agents_images/103.01-Senior Software Engineer (Scheduler Pro).png');
    });

    it('should return empty array for unknown domain', () => {
      const images = getDomainImages('999.99');
      expect(images).toHaveLength(0);
    });
  });

  describe('Environment Switching', () => {
    it('should use PROD images when enabled', () => {
      process.env.NEXT_PUBLIC_USE_PROD_DATA = 'true';
      const images = getDomainImages('103.01');
      expect(images.length).toBeGreaterThan(4); // PROD should have more images
    });

    it('should use MVP images when disabled', () => {
      process.env.NEXT_PUBLIC_USE_PROD_DATA = 'false';
      const images = getDomainImages('103.01');
      expect(images).toHaveLength(4); // MVP should have exactly 4 images
    });
  });
}); 