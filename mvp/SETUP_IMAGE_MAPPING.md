# Image Mapping Utility Setup & Testing Guide

## Prerequisites
1. Ensure all agent images are in `/public/agents_images/` directory
2. Default sailor.png exists at `/public/agents_images/sailor.png`
3. Environment variables are set in `.env.local`:

Let me write instructions for running and testing the image mapping utility:
bash
NEXT_PUBLIC_DEFAULT_AGENT_IMAGE=/agents_images/sailor.png
NEXT_PUBLIC_AGENT_IMAGES_PATH=/agents_images

## Image Naming Convention
Format: {domainId}-{role}.png
Examples:
103.01-senior-software-engineer.png
103.01-quality-control-engineer.png
103.01-chief-quality-engineer.png
103.01-game-asset-developer.png

## Testing Steps

1. **Basic Image Mapping Test**
typescript
import { getAgentImage, validateImage, debugImageMapping } from '@/mvp/utils/imageMapping';
// Test existing image
const seniorDevImage = getAgentImage('103.01', 'Senior Software Engineer');
console.log('Senior Dev Image:', seniorDevImage);
// Expected: "/agents_images/103.01-senior-software-engineer.png"
// Test fallback
const nonExistentImage = getAgentImage('999.99', 'Unknown Role');
console.log('Fallback Image:', nonExistentImage);
// Expected: "/agents_images/sailor.png"

2. **Image Validation Test**
typescript
async function testImageValidation() {
// Test existing image
const validImage = await validateImage('/agents_images/103.01-senior-software-engineer.png');
console.log('Valid Image:', validImage); // Expected: true
// Test non-existent image
const invalidImage = await validateImage('/agents_images/nonexistent.png');
console.log('Invalid Image:', invalidImage); // Expected: false
}

3. **Domain Images Test**
typescript
const domainImages = getDomainImages('103.01');
console.log('Domain 103.01 Images:', domainImages);
// Expected: Array of image paths for domain 103.01

## Expected Outcomes

### MVP Mode
typescript
// When NEXT_PUBLIC_USE_PROD_DATA=false
const mvpImages = {
"103.01": {
"senior-software-engineer": "/agents_images/103.01-senior-software-engineer.png",
"quality-control-engineer": "/agents_images/103.01-quality-control-engineer.png",
"chief-quality-engineer": "/agents_images/103.01-chief-quality-engineer.png",
"game-asset-developer": "/agents_images/103.01-game-asset-developer.png"
}
};

### PROD Mode
typescript
// When NEXT_PUBLIC_USE_PROD_DATA=true
const prodImages = {
"103.01": {
// MVP images plus:
"game-designer": "/agents_images/103.01-game-designer.png",
"qa-specialist": "/agents_images/103.01-qa-specialist.png"
},
"100.01": {
"patient-monitor": "/agents_images/100.01-patient-monitor.png",
"diagnostic-assistant": "/agents_images/100.01-diagnostic-assistant.png",
"health-analyst": "/agents_images/100.01-health-analyst.png"
}
};

## Debug Mode
When `NODE_ENV=development`, use debugImageMapping:
typescript
debugImageMapping('103.01', 'Senior Software Engineer');
// Expected console output:
{
domainId: "103.01",
role: "Senior Software Engineer",
normalizedRole: "senior-software-engineer",
isProd: false,
imagePath: "/agents_images/103.01-senior-software-engineer.png",
availableImages: [/ array of all images for domain 103.01 /]
}

## Common Issues & Solutions

1. **Image Not Found**
   - Check image exists in correct location
   - Verify naming convention
   - Ensure proper case sensitivity

2. **Wrong Environment**
   - Check NEXT_PUBLIC_USE_PROD_DATA value
   - Verify .env.local settings

3. **Role Mapping Issues**
   - Use debugImageMapping to see normalized role name
   - Check for special characters in role names

4. **Performance Issues**
   - Images are loaded on demand
   - Use priority={true} for critical images
   - Consider implementing image preloading
Would you like me to:
Create automated tests for the image mapping utility?
Add more specific test cases?
Or focus on implementing the utility in a specific component?
rewrite as SETUP_IMAGE_MAPPING.md does not show all the text

Let me write the complete SETUP_IMAGE_MAPPING.md:
bash
NEXT_PUBLIC_DEFAULT_AGENT_IMAGE=/agents_images/sailor.png
NEXT_PUBLIC_AGENT_IMAGES_PATH=/agents_images

## Image Naming Convention
Format: `{domainId}-{role}.png`

Examples:
- 103.01-senior-software-engineer.png
- 103.01-quality-control-engineer.png
- 103.01-chief-quality-engineer.png
- 103.01-game-asset-developer.png

## Required Images for MVP
1. Game Development (103.01):
   - senior-software-engineer
   - quality-control-engineer
   - chief-quality-engineer
   - game-asset-developer

2. Healthcare (100.01):
   - patient-monitor
   - diagnostic-assistant
   - health-analyst

## Testing Steps

### 1. Basic Image Mapping Test
typescript
import { getAgentImage, validateImage, debugImageMapping } from '@/mvp/utils/imageMapping';
// Test existing image
const seniorDevImage = getAgentImage('103.01', 'Senior Software Engineer');
console.log('Senior Dev Image:', seniorDevImage);
// Expected: "/agents_images/103.01-senior-software-engineer.png"
// Test fallback
const nonExistentImage = getAgentImage('999.99', 'Unknown Role');
console.log('Fallback Image:', nonExistentImage);
// Expected: "/agents_images/sailor.png"

### 2. Image Validation Test
typescript
async function testImageValidation() {
// Test existing image
const validImage = await validateImage('/agents_images/103.01-senior-software-engineer.png');
console.log('Valid Image:', validImage); // Expected: true
// Test non-existent image
const invalidImage = await validateImage('/agents_images/nonexistent.png');
console.log('Invalid Image:', invalidImage); // Expected: false
}

### 3. Domain Images Test
typescript
const domainImages = getDomainImages('103.01');
console.log('Domain 103.01 Images:', domainImages);
// Expected: Array of all images for domain 103.01

## Expected Outcomes

### MVP Mode
typescript
// When NEXT_PUBLIC_USE_PROD_DATA=false
const mvpImages = {
"103.01": {
"senior-software-engineer": "/agents_images/103.01-senior-software-engineer.png",
"quality-control-engineer": "/agents_images/103.01-quality-control-engineer.png",
"chief-quality-engineer": "/agents_images/103.01-chief-quality-engineer.png",
"game-asset-developer": "/agents_images/103.01-game-asset-developer.png"
}
};

### PROD Mode
typescript
// When NEXT_PUBLIC_USE_PROD_DATA=true
const prodImages = {
"103.01": {
// MVP images plus:
"game-designer": "/agents_images/103.01-game-designer.png",
"qa-specialist": "/agents_images/103.01-qa-specialist.png"
},
"100.01": {
"patient-monitor": "/agents_images/100.01-patient-monitor.png",
"diagnostic-assistant": "/agents_images/100.01-diagnostic-assistant.png",
"health-analyst": "/agents_images/100.01-health-analyst.png"
}
};

## Debug Mode
When `NODE_ENV=development`, use debugImageMapping:
typescript
debugImageMapping('103.01', 'Senior Software Engineer');
// Expected console output:
{
domainId: "103.01",
role: "Senior Software Engineer",
normalizedRole: "senior-software-engineer",
isProd: false,
imagePath: "/agents_images/103.01-senior-software-engineer.png",
availableImages: [/ array of all images for domain 103.01 /]
}

## Common Issues & Solutions

### 1. Image Not Found
- Check image exists in correct location
- Verify naming convention
- Ensure proper case sensitivity
- Check file permissions
- Verify image format (PNG only)

### 2. Wrong Environment
- Check NEXT_PUBLIC_USE_PROD_DATA value
- Verify .env.local settings
- Clear browser cache
- Restart development server

### 3. Role Mapping Issues
- Use debugImageMapping to see normalized role name
- Check for special characters in role names
- Verify role case sensitivity
- Ensure consistent role naming

### 4. Performance Issues
- Images are loaded on demand
- Use priority={true} for critical images
- Consider implementing image preloading
- Optimize image sizes
- Use proper caching headers

## Validation Checklist
- [ ] All required images exist in /public/agents_images/
- [ ] Images follow naming convention
- [ ] Fallback to sailor.png works
- [ ] Image validation works
- [ ] Debug mode shows correct information
- [ ] Environment switching works
- [ ] Performance is acceptable

## Next Steps
1. Create missing agent images
2. Implement image preloading
3. Add error tracking
4. Setup monitoring
5. Document image requirements for new agents
Would you like me to:
