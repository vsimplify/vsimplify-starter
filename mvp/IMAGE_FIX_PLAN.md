# Agent Image Fix Plan

## Current Issues
1. Images not loading for agents in BrowseAIAgents view
2. Fallback to sailor.png not working consistently
3. Image paths not properly mapped to domains

## Fix Sequence
1. **Image Organization** (Priority: P0)
   - Create domain-specific folders in /public/agents_images/
   - Rename existing images to match convention: {domainId}-{role}.png
   - Ensure sailor.png exists as fallback

2. **Image Mapping Update** (Priority: P0)
   ```typescript
   // Update imageMapping.ts to include proper paths
   const mvpImageMap: AgentImageMap = {
     "103.01": {
       "senior-software-engineer": "/agents_images/103.01/senior-software-engineer.png",
       "quality-control-engineer": "/agents_images/103.01/quality-control-engineer.png",
       "chief-quality-engineer": "/agents_images/103.01/chief-quality-engineer.png"
     }
   };
   ```

3. **PortfolioCard Fix** (Priority: P0)
   ```typescript
   // Update image handling in PortfolioCard
   const imageSrc = getAgentImage(agent.domainId.toString(), agent.role);
   ```

4. **Image Validation** (Priority: P1)
   - Add image existence check
   - Implement proper error handling
   - Add loading states

## Implementation Steps
1. First create /public/agents_images/{domainId}/ folders
2. Move and rename existing images
3. Update image mapping utility
4. Fix PortfolioCard component
5. Add validation and error handling

## Timeline
- Image Organization: Today
- Image Mapping Update: Today
- PortfolioCard Fix: Today
- Image Validation: Next task

Would you like me to proceed with implementing these fixes? 