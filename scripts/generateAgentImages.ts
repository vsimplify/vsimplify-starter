import fs from 'fs';
import path from 'path';
import { agentData } from '../data/domainData-PROD';
import fetch from 'node-fetch';

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434';
const MODEL = 'llava';

type AgentRole = 
  | "Senior Software Engineer"
  | "Quality Control Engineer"
  | "Chief Quality Engineer"
  | "Technical Architect";

const prompts: Record<AgentRole, string> = {
  "Senior Software Engineer": "Professional 3D avatar of a senior software engineer, modern tech style, blue and white theme, minimalist, clean design",
  "Quality Control Engineer": "Professional 3D avatar of a quality control engineer, precision focused, green and white theme, minimalist, clean design",
  "Chief Quality Engineer": "Professional 3D avatar of a chief quality engineer, leadership style, purple and gold theme, minimalist, clean design",
  "Technical Architect": "Professional 3D avatar of a technical architect, innovative style, red and black theme, minimalist, clean design"
};

async function generateAgentImage(role: string, domainId: string) {
  const prompt = (prompts[role as AgentRole] || `Professional 3D avatar of a ${role.toLowerCase()}, modern style, minimalist, clean design`);
  
  try {
    // Call Ollama API
    const response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        stream: false,
        options: {
          image_size: 1024
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Ensure directory exists
    const imagePath = path.join(process.cwd(), 'public', 'agents_images', domainId);
    fs.mkdirSync(imagePath, { recursive: true });
    
    // Save image
    const outputPath = path.join(imagePath, `${role.toLowerCase().replace(/\s+/g, '-')}.png`);
    
    // Convert base64 to image if response is base64
    if (data.image) {
      const imageBuffer = Buffer.from(data.image, 'base64');
      const uint8Array = new Uint8Array(imageBuffer);
      fs.writeFileSync(outputPath, uint8Array);
      console.log(`Generated image for ${role} at ${outputPath}`);
    } else {
      console.error(`No image data received for ${role}`);
    }

  } catch (error) {
    console.error(`Error generating image for ${role}:`, error);
  }
}

// Generate images for all agents
async function generateAllImages() {
  // Ensure Ollama is running
  try {
    const healthCheck = await fetch(`${OLLAMA_API_URL}/api/health`);
    if (!healthCheck.ok) {
      throw new Error('Ollama server not responding');
    }
  } catch (error) {
    console.error('Error connecting to Ollama:', error);
    return;
  }

  console.log('Starting image generation...');
  
  for (const agent of agentData) {
    console.log(`Generating image for ${agent.role}...`);
    await generateAgentImage(agent.role, agent.domainId.toString());
    // Add delay between requests to prevent overloading
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('Image generation complete!');
}

// Add command line argument support
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    console.log(`
Usage: npm run generate-images [options]

Options:
  --help          Show this help message
  --model=<name>  Specify Ollama model (default: llava)
  --url=<url>     Specify Ollama API URL (default: http://localhost:11434)
    `);
  } else {
    // Parse arguments
    const modelArg = args.find(arg => arg.startsWith('--model='));
    const urlArg = args.find(arg => arg.startsWith('--url='));
    
    if (modelArg) {
      const model = modelArg.split('=')[1];
      console.log(`Using model: ${model}`);
    }
    
    if (urlArg) {
      const url = urlArg.split('=')[1];
      console.log(`Using API URL: ${url}`);
    }

    generateAllImages().catch(console.error);
  }
} 