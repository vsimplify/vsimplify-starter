import validateSetup from '../validateSetup';
import fs from 'fs';
import path from 'path';

describe('Setup Validation', () => {
  beforeAll(() => {
    // Setup test environment
    process.env.NEXT_PUBLIC_DEFAULT_AGENT_IMAGE = '/agents_images/sailor.png';
    process.env.NEXT_PUBLIC_AGENT_IMAGES_PATH = '/agents_images';
    process.env.NEXT_PUBLIC_USE_PROD_DATA = 'false';
  });

  afterAll(() => {
    // Cleanup test environment
    delete process.env.NEXT_PUBLIC_DEFAULT_AGENT_IMAGE;
    delete process.env.NEXT_PUBLIC_AGENT_IMAGES_PATH;
    delete process.env.NEXT_PUBLIC_USE_PROD_DATA;
  });

  it('should create required directories if missing', async () => {
    await validateSetup();
    
    expect(fs.existsSync('public/agents_images')).toBe(true);
    expect(fs.existsSync('public/agents_images/103.01')).toBe(true);
    expect(fs.existsSync('public/agents_images/100.01')).toBe(true);
  });

  it('should check for required files', async () => {
    await validateSetup();
    
    const defaultImageExists = fs.existsSync('public/agents_images/default.png');
    const sailorImageExists = fs.existsSync('public/agents_images/sailor.png');
    
    expect(defaultImageExists || sailorImageExists).toBe(true);
  });
}); 