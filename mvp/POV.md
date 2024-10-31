# Project Understanding & Analysis

## Context Overview

### Current State (@As Is)
- Existing codebase @vsimplify-starter with Supabase auth implementation
- Current page.tsx displays headshots for models
- Uses packs gallery for image display
- Database schema defined in database.types.ts
- Multiple data file versions exist (MVP vs PROD)
- Reference implementation available in @foranswer copy-b4IntegratingPraison

### Target State (@To Be)
- Transform into AI Agent Portfolio Management System
- Replace headshots with AI Agent images
- Implement domain-based filtering for Agents
- Create YAML configurations for Projects/Topics
- Rename "Packs" to "AI Boost 🚀"
- Prepare for future integration with PraisonAI backend

## Key Requirements Analysis

### 1. Data Structure Requirements
- Portfolio follows JIRA structure (Releases, Teams, Themes)
- Two-tier data approach:
  - MVP: Minimal data in .ts files
  - PROD: Full data with database integration
- Need to track AI usage metrics and user feedback
- Domain-based organization of Agents and Projects

### 2. YAML Configuration Requirements
- Two versions needed for each configuration:
  - MVP: Minimal implementation
  - PROD: Complete implementation
- Must align with PraisonAI's agents-advanced.yaml structure
- Need to support up to 3 example Portfolios
- Each Portfolio can have up to 3 Projects per domainId

### 3. UI/UX Requirements
- Replace current headshot gallery with Agent gallery
- Implement cascading dropdowns for domain filtering
- Display Agent details on image click
- Rename and reorganize agent images:
  - Format: <domainId-Role>
  - Default to sailor.png when no specific image exists
  - Remove duplicate/unused images

### 4. Technical Constraints
- Must extend only @vsimplify-starter
- Comply with Supabase Auth NextJS guidelines
- Support configuration switching between MVP and PROD
- Prepare for future REST API integration with PraisonAI backend

## Implementation Considerations

### Data Management
- Need clear separation between MVP and PROD data files
- Implement configuration switch mechanism
- Ensure efficient data loading for MVP version
- Plan database schema for PROD version

### Image Management
- Need to audit existing agent_images
- Implement image naming convention
- Create mapping between domains and images
- Handle fallback image scenarios

### Portfolio Structure
- Define clear hierarchy:
  Portfolio → Projects → Missions (Activities) → Tasks
- Ensure alignment with JIRA portfolio structure
- Support AI metrics tracking
- Enable user feedback collection

### Future Considerations
- REST API design for PraisonAI integration
- Scaling strategy for PROD implementation
- Performance optimization for larger datasets
- Monitoring and analytics implementation

## Risk Factors
1. Data consistency between MVP and PROD versions
2. Image mapping accuracy for domains
3. Performance impact of cascading dropdowns
4. Integration complexity with PraisonAI
5. User experience during MVP to PROD transition

## Next Steps
1. Create YAML configurations (MVP & PROD)
2. Develop PSQL scripts for PROD
3. Implement image management system
4. Modify page.tsx for new requirements
5. Test domain filtering implementation
6. Document configuration switching mechanism

## Questions for Clarification
1. Specific metrics required for AI usage tracking
2. Detailed requirements for user feedback collection
3. Performance expectations for MVP vs PROD
4. Specific JIRA portfolio features to be implemented
5. Timeline for PraisonAI backend integration

# Additional Clarifications

## File Structure Analysis
Current structure shows:
- Multiple versions of domainData files (PROD vs MVP)
- Existing agent images in /agents_images with sailor.png as fallback
- Projects-Mission-Agents.ts containing initial agent implementation
- Packs gallery implementation in overview/packs/page.tsx

## Domain & Agent Relationship
Need to clarify:
1. The relationship between domainId 103.01 and the three default agents:
   - Senior Software Engineer
   - Software Quality Control Engineer
   - Chief Software Quality Control Engineer
2. These agents are currently hardcoded in Projects-Mission-Agents.ts

## YAML Configuration Specifics
For each Portfolio example, we need:
1. AI Productivity Suite (domainId: 103.01)
   - Project: Schedule & Task Automator
   - Project: Content Generation System
   - Project: Workflow Optimization

2. AI Healthcare Innovations (domainId: 100.01)
   - Project: Patient Monitoring System
   - Project: Diagnostic Assistant
   - Project: Healthcare Data Analytics

3. AI Financial Analytics (domainId: 105.01)
   - Project: Risk Assessment Tool
   - Project: Market Analysis System
   - Project: Financial Forecasting

## MVP vs PROD Configuration
Need to implement:
1. Environment-based switching mechanism:
   ```typescript
   const isDevelopment = process.env.NODE_ENV === 'development';
   const dataSource = isDevelopment ? 
     require('./data/domainData.ts') : 
     require('./data/domainData-PROD.ts');
   ```

2. Feature flags for controlling functionality:
   ```typescript
   const FEATURES = {
     USE_PROD_DATA: process.env.NEXT_PUBLIC_USE_PROD_DATA === 'true',
     ENABLE_AI_METRICS: process.env.NEXT_PUBLIC_ENABLE_AI_METRICS === 'true'
   };
   ```

## Image Management Strategy
Current implementation shows:
```typescript
src