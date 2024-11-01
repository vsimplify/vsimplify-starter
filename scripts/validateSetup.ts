import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const validateSetup = async () => {
  const requiredDirs = [
    'public/agents_images',
    'public/agents_images/103.01',
    'public/agents_images/100.01'
  ];

  const requiredFiles = [
    'public/agents_images/sailor.png',
    'public/agents_images/default.png'
  ];

  console.log('Validating setup...\n');

  // Check directories
  console.log('Checking directories:');
  for (const dir of requiredDirs) {
    const exists = fs.existsSync(dir);
    console.log(`${dir}: ${exists ? '✅' : '❌'}`);
    if (!exists) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }

  // Check files
  console.log('\nChecking files:');
  for (const file of requiredFiles) {
    const exists = fs.existsSync(file);
    console.log(`${file}: ${exists ? '✅' : '❌'}`);
  }

  // Check Ollama
  console.log('\nChecking Ollama server:');
  try {
    const response = await fetch('http://localhost:11434/api/health');
    console.log(`Ollama server: ${response.ok ? '✅' : '❌'}`);
  } catch (error) {
    console.log('Ollama server: ❌ (not running)');
  }

  // Check environment variables
  console.log('\nChecking environment variables:');
  const requiredEnvVars = [
    'NEXT_PUBLIC_DEFAULT_AGENT_IMAGE',
    'NEXT_PUBLIC_AGENT_IMAGES_PATH',
    'NEXT_PUBLIC_USE_PROD_DATA'
  ];

  for (const envVar of requiredEnvVars) {
    console.log(`${envVar}: ${process.env[envVar] ? '✅' : '❌'}`);
  }

  console.log('\nSetup validation complete!');
};

// Run validation if called directly
if (require.main === module) {
  validateSetup().catch(console.error);
}

export default validateSetup; 