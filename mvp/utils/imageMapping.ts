import { FEATURES } from '../config/features';

interface AgentImageMap {
  [domainId: string]: {
    [role: string]: string;
  };
}

// Default image path
const DEFAULT_IMAGE = FEATURES.DEFAULT_AGENT_IMAGE || '/agents_images/sailor.png';
const IMAGES_PATH = FEATURES.AGENT_IMAGES_PATH || '/agents_images';

// Image mapping for MVP (minimal set)
const mvpImageMap: AgentImageMap = {
  "103.01": {
    "senior-software-engineer": `${IMAGES_PATH}/103.01-senior-software-engineer.png`,
    "quality-control-engineer": `${IMAGES_PATH}/103.01-quality-control-engineer.png`,
    "chief-quality-engineer": `${IMAGES_PATH}/103.01-chief-quality-engineer.png`,
    "game-asset-developer": `${IMAGES_PATH}/103.01-game-asset-developer.png`
  }
};

// Image mapping for PROD (complete set)
const prodImageMap: AgentImageMap = {
  // Game Development (103.01)
  "103.01": {
    ...mvpImageMap["103.01"],
    "game-designer": `${IMAGES_PATH}/103.01-game-designer.png`,
    "qa-specialist": `${IMAGES_PATH}/103.01-qa-specialist.png`
  },
  // Healthcare (100.01)
  "100.01": {
    "patient-monitor": `${IMAGES_PATH}/100.01-patient-monitor.png`,
    "diagnostic-assistant": `${IMAGES_PATH}/100.01-diagnostic-assistant.png`,
    "health-analyst": `${IMAGES_PATH}/100.01-health-analyst.png`
  }
  // Add more domains as needed
};

// Helper to normalize role names
const normalizeRole = (role: string): string => 
  role.toLowerCase().replace(/\s+/g, '-');

// Get image path for agent
export const getAgentImage = (domainId: string | number, role: string): string => {
  const imageMap = FEATURES.USE_PROD_DATA ? prodImageMap : mvpImageMap;
  const normalizedRole = normalizeRole(role);
  
  try {
    return imageMap[domainId.toString()]?.[normalizedRole] || DEFAULT_IMAGE;
  } catch (error) {
    console.error('Error getting agent image:', { domainId, role, error });
    return DEFAULT_IMAGE;
  }
};

// Validate image exists
export const validateImage = async (imagePath: string): Promise<boolean> => {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Get all images for a domain
export const getDomainImages = (domainId: string | number): string[] => {
  const imageMap = FEATURES.USE_PROD_DATA ? prodImageMap : mvpImageMap;
  const domainImages = imageMap[domainId.toString()] || {};
  return Object.values(domainImages);
};

// Debug utility
export const debugImageMapping = (domainId: string | number, role: string) => {
  if (!FEATURES.DEBUG_MODE) return;

  console.log('Image Mapping Debug:', {
    domainId,
    role,
    normalizedRole: normalizeRole(role),
    isProd: FEATURES.USE_PROD_DATA,
    imagePath: getAgentImage(domainId, role),
    availableImages: getDomainImages(domainId)
  });
}; 