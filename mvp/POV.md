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
- Each Domain.Domain gets 1 Portfolio
- Each Portfolio contains 3 Projects, each with a unique Domain.Area:
  - 1 Project using existing Domain.Area
  - 2 Projects using new Domain.Areas (requiring new domainIds)

### 3. UI/UX Requirements
- Replace current headshot gallery with Agent gallery
- Implement cascading dropdowns for domain filtering
- Display Agent details on image click
- Rename and reorganize agent images:
  - Format: domainId-Role
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
1. Understanding of Projects-Mission-Agents.ts:
   - Contains incomplete implementation for domainId 103.01
   - Currently shows 3 agents for "Game Building" mission
   - Has placeholder "Mission1" and "Mission2" that need realistic names
   - Each mission needs proper task definitions to determine agent requirements

2. Example for Digital Services 🌐 (domainId: 103.01):
   - Portfolio: "Game Development Suite"
   - Project 1: "Chrono Quest" (using existing Area: "Productivity ⚡")
      - Mission: "Game Building" (using existing 3 agents)
      - Mission: "Asset Development" (needs agent definition)
      - Mission: "Testing & QA" (needs agent definition)

3. New Domain.Area Creation:
   - Each new Project requires a new domainId
   - New domainIds need PSQL INSERT statements
   - Area values must align with project objectives

## YAML Configuration Specifics
_Need to create comprehensive agent ecosystems:_
1. _For each Domain.Domain in domainData-PROD.ts:_
   - _Create 1 Portfolio_
   - _Create 3 Projects per Portfolio:_
     - _1 Project using existing Domain.Area_
     - _2 Additional Projects with new Domain.Areas_
   - _Each Project needs:_
     - _MVP YAML (minimal version)_
     - _PROD YAML (detailed version)_
     - _Specialized AI Agents for tasks_

Example for Digital Services 🌐 (domainId: 103.01):
Portfolio: "AI Productivity Enhancement"
1. Project: Task Automation (existing Area: "Productivity ⚡")
2. _Project: Knowledge Management (new Area: "Information Organization 📚")_
3. _Project: Process Optimization (new Area: "Workflow Enhancement 🔄")_

_Similar structure needed for each Domain.Domain, such as:_
- Healthcare Monitoring
- Financial Analysis
- Legal Documentation
- Educational Support
- etc.

## Agent Distribution Strategy
_New understanding of agent allocation:_
1. _Each Domain needs multiple specialized agents_
2. _Agents should be domain-specific experts_
3. _Need to create agent hierarchies within domains_
4. _Agents should have complementary skills within each domain_

## Image Management Strategy
_Enhanced image mapping requirements:_
1. _Each domain needs its own set of agent images_
2. _Images should reflect agent specialization_
3. _Naming convention: `${domainId}-${specialization}-${role}.png`_
4. _Need to map existing agent_images to domains_
5. _Create new images for missing agent types_

## Database Schema Extensions
- **Domain table already has Area column**
- **Portfolio table already has domainId relationship**
- **Project table already has project_id relationship**

**New schema requirements:**
1. **Add metrics tracking columns to Mission table:**
   - **token_usage**
   - **execution_time**
   - **cost_per_execution**
2. **Add feedback columns to Agent table:**
   - **performance_rating**
   - **success_rate**
   - **user_feedback**

## Implementation Phases
**Revised implementation approach with expanded UI requirements:**
1. **Basic Infrastructure:**
   - Create domain-specific YAML files (MVP & PROD)
   - Implement image management system
   - Extend domain data files

2. **Core UI Components:**
   - **Agent Management UI:**
     - Create new agents with domain selection
     - Update agent properties
     - Delete agents with confirmation
   - **Portfolio Management UI:**
     - Create Portfolio with domain filtering
     - Update portfolio details
     - Delete Portfolio with cascade options
   - **Project Management UI:**
     - Create projects within selected portfolio
     - Update project details
     - Delete projects with related missions
   - **Activity/Mission Management UI:**
     - Create activities with agent assignments
     - Update activity details
     - Delete activities with confirmation

3. **Page Updates:**
   - **Modify overview/page.tsx:**
     - Add portfolio management section
     - Implement domain-based filtering
   - **Transform packs/page.tsx to "AI Boost 🚀":**
     - Replace image gallery with agent showcase
     - Add agent management features
   - **Enhance models/[id]/page.tsx:**
     - Add activity tracking
     - Implement feedback system

## Configuration Management
_Enhanced configuration needs:_
1. _Domain-specific feature flags_
2. _Environment-based data switching_
3. _Image path configuration_
4. _Agent capability toggles_

## Risk Factors
_Additional risks identified:_
1. _Data consistency across multiple domains_
2. _Image availability for all agent types_
3. _Performance with increased agent count_
4. _Domain-specific configuration management_
5. _Cross-domain agent interactions_

## Next Steps
**Revised implementation sequence:**
1. **Audit existing domains and areas**
2. **Create comprehensive agent mapping**
3. **Generate missing agent images using DALL-E**
4. **Implement CRUD UIs:**
   - Agent management
   - Portfolio management
   - Project management
   - Activity/Mission management
5. **Update existing pages:**
   - overview/page.tsx
   - packs/page.tsx ("AI Boost 🚀")
   - models/[id]/page.tsx
6. **Implement domain-based filtering**
7. **Add metrics tracking**
8. **Develop feedback system**

## Questions for Clarification
_Additional questions:_
1. _Priority order for domain implementation_
2. _Required agent specializations per domain_
3. _Cross-domain agent collaboration rules_
4. _Domain-specific metrics requirements_
5. _Portfolio visualization preferences_

## Database Schema & YAML Mapping

### Production Database Structure
**1. Portfolio Schema Extensions:**
- **Release Management:**
  - release_date: timestamp
  - release_version: string
  - release_status: enum (planned, in_progress, completed)
  - release_notes: text
- **Team Management:**
  - team_id: references teams table
  - team_capacity: integer
  - team_velocity: float
- **Theme Tracking:**
  - theme_id: references themes table
  - theme_priority: integer
  - theme_progress: float

**2. Dummy Data Requirements:**
- **For each Domain.Domain:**
  - 1 Portfolio
  - 3 Projects (1 existing Area, 2 new Areas)
  - 2-3 Releases per Portfolio
  - 1-2 Teams per Portfolio
  - 2-3 Themes per Portfolio

**3. YAML Structure:**

### MVP Version (Minimal)
