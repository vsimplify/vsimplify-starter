-- Insert dummy portfolios
INSERT INTO public.portfolios (
  user_id,
  title,
  description,
  progress,
  status,
  created_at,
  "domainId"
)

VALUES
  (  'f5cb0287-d141-4f8b-9632-98be8d7bcbe7', 'AI Productivity Tools', 'Automate all task by using AI through forAnswer platform', 50, 'active', NOW(),103.01),
  ( 'f5cb0287-d141-4f8b-9632-98be8d7bcbe7', 'AI Healthcare Solutions', 'Revolutionizing healthcare with advanced AI models.', 30, 'active', NOW(),100.01);
--SELECT * FROM "Domain" WHERE "ForUse"='Work 💼';
-- SELECT id FROM auth.users WHERE email = 'karan.tandon@gmail.com'; 
-- Insert dummy projects
INSERT INTO public."Project"(
	id, objective, goal, "dueOn", nugget, outcome, description, email, "createdAt", "updatedAt", "domainId", user_id)

VALUES
  (
    1,
    'Develop an AI-driven scheduling algorithm.',
    'Create an efficient scheduling application using AI.',
    '2024-12-31',
    'AI Scheduler',
    'Seamless scheduling for users.',
    'An AI-driven scheduling application to optimize user calendars.',
    'entrepreneur@aiapp.com',
    NOW(),
    NOW(),
    103.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    2,
    'Implement an AI content generator.',
    'Generate high-quality content using LLMs.',
    '2024-11-30',
    'Content Generator',
    'Automated content creation for various platforms.',
    'A content generation tool leveraging large language models for diverse content needs.',
    'entrepreneur@aiapp.com',
    NOW(),
    NOW(),
    103.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    3,
    'Set up a patient monitoring system.',
    'Monitor patient vitals using AI.',
    '2025-01-15',
    'Health Monitor',
    'Real-time patient monitoring dashboard.',
    'An AI-based system for tracking and analyzing patient vitals in real-time.',
    'entrepreneur@aiapp.com',
    NOW(),
    NOW(),
    100.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  );
  --SELECT *  FROM pg_type WHERE typname like 'AgentTool'
  -- Insert dummy agents linked to projects
INSERT INTO public."Agent" ("role", "goal", "backstory", "tools", 
 "allowDelegation", "verbose", image, "createdAt", "updatedAt", "memory", "creator", "email", "title", "domainId", user_id
)

VALUES
  (
    'Senior Software Engineer',
    'Create efficient scheduling algorithms.',
    'Experienced in building scalable software solutions.',
    '{DUCK_DUCK_GO_SEARCH}',
    false,
    true,
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    NOW(),
    NOW(),
    false,
    'Me',
    'scheduler@aiapp.com',
    'Scheduler Pro',
    103.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    'Software Quality Control Engineer',
    'Ensure the content generated is error-free.',
    'Specializes in code quality and error detection.',
    '{DUCK_DUCK_GO_SEARCH}',
    false,
    true,
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    NOW(),
    NOW(),
    false,
    'Me',
    'quality@aiapp.com',
    'Content Master',
    103.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    'Chief Software Quality Control Engineer',
    'Oversee the health monitoring algorithms.',
    'Dedicated to high-quality and reliable code.',
    '{SEMANTIC_SCHOLAR, WIKIDATA, YOUTUBE_SEARCH}',
    false,
    true,
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    NOW(),
    NOW(),
    false,
    'Me',
    'chief@aiapp.com',
    'Health Monitor',
    103.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  );
  -- Insert dummy missions (activities) linked to projects with tasks embedded as JSON arrays
INSERT INTO public."Mission" (
  name,
  email,
  "domainId",
   "inTokens",
  "outTokens", "abandonedForTokens",
  process,
"verbose", "createdAt", "updatedAt", "projectId",
  result,
  "taskResult",
  tasks,
  user_id
)
VALUES
  (
    'Develop Scheduling Algorithm',
    'mission1@aiapp.com',
   103.01,
    500,
    300,
    false,
    'SEQUENTIAL',
    true,
    NOW(),
    NOW(),
    1,
    NULL,
    NULL,
    '{
      "{\"name\": \"Algorithm Development\", \"description\": \"Develop the core scheduling algorithm.\", \"expected_output\": \"Fully functional scheduling algorithm.\", \"agent_id\": 69, \"async_execution\": true}",
      "{\"name\": \"Testing\", \"description\": \"Test the algorithm for bugs.\", \"expected_output\": \"Bug-free scheduling algorithm.\", \"agent_id\": 70, \"async_execution\": true}"
    }',
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    'Implement Content Generation',
    'mission2@aiapp.com',
    103.01,
    800,
    500,
    false,
    'SEQUENTIAL',
    true,
    NOW(),
    NOW(),
    2,
    NULL,
    NULL,
    '{
      "{\"name\": \"Content Implementation\", \"description\": \"Implement the content generation feature.\", \"expected_output\": \"AI-generated content integrated into the app.\", \"agent_id\": 69, \"async_execution\": true}",
      "{\"name\": \"Review\", \"description\": \"Review the generated content for quality.\", \"expected_output\": \"High-quality, error-free content.\", \"agent_id\": 70, \"async_execution\": true}"
    }',
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    'Set Up Patient Monitoring',
    'mission3@aiapp.com',
    100.01,
    600,
    400,
    false,
    'SEQUENTIAL',
    true,
    NOW(),
    NOW(),
    3,
    NULL,
    NULL,
    '{
      "{\"name\": \"Monitoring System Setup\", \"description\": \"Set up patient monitoring systems.\", \"expected_output\": \"Real-time patient monitoring dashboard.\", \"agent_id\": 69, \"async_execution\": true}",
      "{\"name\": \"Integration Testing\", \"description\": \"Integrate monitoring system with existing healthcare infrastructure.\", \"expected_output\": \"Seamless integration with healthcare systems.\", \"agent_id\": 69, \"async_execution\": true}"
    }',
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  );