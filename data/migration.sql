-- Insert dummy Portfolio
INSERT INTO public.Portfolio (
  user_id,
  title,
  description,
  progress,
  status,
  created_at,
  "domainId"
)

VALUES
  (  'f5cb0287-d141-4f8b-9632-98be8d7bcbe7', 'AI Productivity Suite', 'Streamline all business operations using AI-driven tools, through forAnswer platform', 50, 'active', NOW(),103.01),
  ('f5cb0287-d141-4f8b-9632-98be8d7bcbe7', 'AI Healthcare Innovations', 'Enhancing healthcare services with cutting-edge AI technologies.', 60, 'active', NOW(), 100.01),
  ('f5cb0287-d141-4f8b-9632-98be8d7bcbe7', 'AI Financial Analytics', 'Revolutionize financial analysis with advanced AI models.', 45, 'active', NOW(), 105.01);
--SELECT * FROM "Domain" WHERE "ForUse"='Work 💼';
-- SELECT id FROM auth.users WHERE email = 'karan.tandon@gmail.com'; 
-- Insert dummy projects
INSERT INTO public."Project"(
	id, objective, goal, "dueOn", nugget, outcome, description, email, "createdAt", "updatedAt", "domainId", user_id)

VALUES
  (
    1,
    'Develop AI-driven Schedule with Task Automation',
    'Create an efficient scheduling application using AI & automates routine business activities.',
    '2024-12-31',
    'Schedule & Task Automator',
    'Automated task management system implemented.',
    'An AI-powered tool to handle repetitive tasks, improving efficiency and reducing manual workload.',
    'karan.tandon@gmail.com',
    NOW(),
    NOW(),
    103.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    2,
    'AI Financial Forecasting Tool',
    'Create an AI tool for accurate financial forecasting and risk assessment.',
    '2024-11-30',
    'FinForecast',
    'Advanced financial forecasting capabilities integrated.',
    'An AI-driven analytics tool designed to provide precise financial forecasts and comprehensive risk assessments.',
    'karan.tandon@gmail.com',
    NOW(),
    NOW(),
    105.01,
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
    'karan.tandon@gmail.com',
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
  )
    (
    'AI Task Manager',
    'Automate and manage routine business tasks efficiently.',
    'An AI specialist focused on optimizing business operations through automation.',
    '{DUCK_DUCK_GO_SEARCH}',
    false,
    true,
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    NOW(),
    NOW(),
    false,
    'Me',
    'aitaskmanager@aiproductivity.com',
    'Task Manager Pro',
    103.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    'AI Healthcare Analyst',
    'Analyze patient data to improve healthcare outcomes.',
    'Expert in healthcare data analysis and AI integration for better patient care.',
    '{SEMANTIC_SCHOLAR, WIKIPEDIA}',
    false,
    true,
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    NOW(),
    NOW(),
    false,
    'Me',
    'aihealthcare@aihealthcare.com',
    'Healthcare Analyst',
    100.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  ),
  (
    'AI Financial Advisor',
    'Provide accurate financial forecasts and risk assessments.',
    'Specialist in financial modeling and AI-driven analytics for financial markets.',
    '{PUBMED, YAHOO_FINANCE}',
    false,
    true,
    'https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg',
    NOW(),
    NOW(),
    false,
    'Me',
    'aifinancial@aifinanalytics.com',
    'Financial Advisor',
    105.01,
    'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'
  );;
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
      "{\"name\": \"Algorithm Development\", \"description\": \"Develop the core scheduling algorithm to automate routine tasks.\", \"expected_output\": \"Fully functional scheduling algorithm.\", \"agent_id\": 69, \"async_execution\": true}",
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
  -- Create indexes for performance optimization
CREATE INDEX idx_project_user_id ON public."Project" (user_id);
CREATE INDEX idx_mission_project_id ON public."Mission" ("projectId");
CREATE INDEX idx_agent_domain_id ON public."Agent" ("domainId");
CREATE INDEX idx_portfolio_domain_id ON public.Portfolio ("domainId");
CREATE INDEX idx_project_domain_id ON public."Project" ("domainId");
CREATE INDEX idx_agent_user_id ON public."Agent" (user_id);
CREATE INDEX idx_portfolio_user_id ON public.Portfolio (user_id);

-- Enable read access for authenticated users
CREATE POLICY "Enable read access for authenticated users"
ON "public"."Project"
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Enable insert access for authenticated users
CREATE POLICY "Enable insert access for authenticated users"
ON "public"."Project"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Enable update access for authenticated users
CREATE POLICY "Enable update access for authenticated users"
ON "public"."Project"
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Enable delete access for authenticated users
CREATE POLICY "Enable delete access for authenticated users"
ON "public"."Project"
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);-- Enable read access for authenticated users
CREATE POLICY "Enable read access for authenticated users"
ON "public"."Project"
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Enable insert access for authenticated users
CREATE POLICY "Enable insert access for authenticated users"
ON "public"."Project"
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Enable update access for authenticated users
CREATE POLICY "Enable update access for authenticated users"
ON "public"."Project"
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Enable delete access for authenticated users
CREATE POLICY "Enable delete access for authenticated users"
ON "public"."Project"
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);
/*The error "permission denied for table Project" indicates that Row Level Security (RLS) is enabled on your Supabase Project table but proper policies aren't set up. Let's fix this by adding the necessary RLS policies.
1. Go to your Supabase Dashboard:
Navigate to your project
Go to Authentication > Policies
Find the "Project" table
Enable RLS on the Project table if not already enabled:*/
   ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
-- Add these RLS Policies for the Project table:
   -- Enable read access for authenticated users to their own projects
   CREATE POLICY "Users can view their own projects"
   ON "public"."Project"
   FOR SELECT
   TO authenticated
   USING (auth.uid() = user_id);

   -- Enable insert access for authenticated users
   CREATE POLICY "Users can create their own projects"
   ON "public"."Project"
   FOR INSERT
   TO authenticated
   WITH CHECK (auth.uid() = user_id);

   -- Enable update access for authenticated users
   CREATE POLICY "Users can update their own projects"
   ON "public"."Project"
   FOR UPDATE
   TO authenticated
   USING (auth.uid() = user_id);

   -- Enable delete access for authenticated users
   CREATE POLICY "Users can delete their own projects"
   ON "public"."Project"
   FOR DELETE
   TO authenticated
   USING (auth.uid() = user_id);
-- Also add policies for the Mission table since we are querying it:
   -- Enable RLS on Mission table
   ALTER TABLE "Mission" ENABLE ROW LEVEL SECURITY;

   -- Enable read access for authenticated users to their own missions
   CREATE POLICY "Users can view their own missions"
   ON "public"."Mission"
   FOR SELECT
   TO authenticated
   USING (auth.uid() = user_id);
/*Verify the user_id format:
Make sure the user_id in your Project table matches the format of auth.uid(). In your app/overview/page.tsx, add a console log to verify:
// Add this near the top of your queryFn
console.log('Auth check:', {
  authUid: user.id,
  format: typeof user.id
});

// Then modify your Project query to log the results:
const { data: projectData, error: projectError } = await supabase
  .from("Project")
  .select("*")
  .eq("user_id", user.id);

console.log('Project query:', {
  userId: user.id,
  error: projectError,
  count: projectData?.length,
  firstProject: projectData?.[0]
});
6. Test the Policies:
After adding the policies, you can test them in the Supabase dashboard:
Go to Table Editor
Select the Project table
Click "New Query"
Run:
   -- Test the policies*/
   SELECT *
   FROM "public"."Project"
   WHERE user_id = auth.uid();
-- If you're still having issues, verify the database schema:
   -- Check the Project table structure
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'Project';
-- Ensure user_id is being set correctly on new projects:
--When creating new projects, make sure the user_id is being --set to auth.uid():
   -- Example of correct project insertion
   CREATE POLICY "Set user_id on insert"
   ON "public"."Project"
   FOR INSERT
   TO authenticated
   WITH CHECK (
     user_id = auth.uid()
   );
/*After applying these policies, try accessing the overview page again. The error should be resolved. If you're still having issues, check the browser console for the logged information about the user ID and project query results to help diagnose any remaining problems.
Let me know if you need help interpreting the logs or if you're still experiencing issues after applying these policies.*/
-- First, get the maximum existing mission ID
DO $$ 
DECLARE
    max_mission_id INTEGER;
BEGIN
    SELECT COALESCE(MAX(id), 0) INTO max_mission_id FROM "Mission";

    -- Add emoji column if it doesn't exist
    ALTER TABLE "Mission" 
    ADD COLUMN IF NOT EXISTS "emoji" TEXT DEFAULT '🔄';

    -- Update existing missions with random data
    WITH "mission_updates" AS (
        SELECT 
            m."id",
            CASE floor(random() * 5)
                WHEN 0 THEN '🚀 Launch Feature'
                WHEN 1 THEN '🔧 System Update'
                WHEN 2 THEN '📊 Data Analysis'
                WHEN 3 THEN '🤖 AI Training'
                ELSE '💡 Innovation Task'
            END || ' ' || m."id"::text as "name",
            'SEQUENTIAL'::"MissionProcess" as "process",
            floor(random() * 1000)::integer as "inTokens",
            floor(random() * 1000)::integer as "outTokens",
            CASE floor(random() * 5)
                WHEN 0 THEN '🚀'
                WHEN 1 THEN '🔧'
                WHEN 2 THEN '📊'
                WHEN 3 THEN '🤖'
                ELSE '💡'
            END as "emoji"
        FROM "Mission" m
        WHERE m."id" IN (SELECT "id" FROM "Mission" ORDER BY RANDOM() LIMIT 10)
    )
    UPDATE "Mission" m
    SET 
        "name" = mu."name",
        "process" = mu."process",
        "inTokens" = mu."inTokens",
        "outTokens" = mu."outTokens",
        "emoji" = mu."emoji",
        "updatedAt" = NOW()
    FROM "mission_updates" mu
    WHERE m."id" = mu."id";

    -- Add new missions with incremented IDs
    INSERT INTO "Mission" (
        "id",
        "name",
        "process",
        "project_id",
        "inTokens",
        "outTokens",
        "abandonedForTokens",
        "verbose",
        "emoji",
        "email",
        "createdAt",
        "updatedAt",
        "user_id",
        "domainId",
        "result",
        "taskResult",
        "tasks"
    )
    SELECT 
        max_mission_id + ROW_NUMBER() OVER () as "id",
        CASE floor(random() * 10)
            WHEN 0 THEN '🚀 Feature Development'
            WHEN 1 THEN '🔧 System Maintenance'
            WHEN 2 THEN '📊 Data Analysis'
            WHEN 3 THEN '🤖 AI Model Training'
            WHEN 4 THEN '💡 Innovation Research'
            WHEN 5 THEN '🎯 Performance Optimization'
            WHEN 6 THEN '🔍 Code Review'
            WHEN 7 THEN '🛠️ Infrastructure Update'
            WHEN 8 THEN '📱 UI Enhancement'
            ELSE '🔒 Security Audit'
        END || ' ' || i::text,
        'SEQUENTIAL'::"MissionProcess",
        p."id",
        floor(random() * 1000)::integer,
        floor(random() * 1000)::integer,
        false,
        true,
        CASE floor(random() * 10)
            WHEN 0 THEN '🚀'
            WHEN 1 THEN '🔧'
            WHEN 2 THEN '📊'
            WHEN 3 THEN '🤖'
            WHEN 4 THEN '💡'
            WHEN 5 THEN '🎯'
            WHEN 6 THEN '🔍'
            WHEN 7 THEN '🛠️'
            WHEN 8 THEN '📱'
            ELSE '🔒'
        END,
        'test@example.com',
        NOW() - (random() * interval '30 days'),
        NOW(),
        p."user_id",
        p."domainId",
        NULL,
        NULL,
        ARRAY[jsonb_build_object(
            'name', 'Initial Task',
            'description', 'Setup initial configuration',
            'async_execution', true,
            'expected_output', 'Basic setup completed'
        )]::JSONB[]
    FROM 
        "Project" p,
        generate_series(1, floor(random() * 3 + 2)::int) i
    WHERE p."id" IN (
        SELECT "id" FROM "Project" 
        WHERE "id" NOT IN (SELECT DISTINCT "project_id" FROM "Mission")
        ORDER BY RANDOM() LIMIT 5
    );

    -- Update project progress based on mission completion
    WITH "project_progress" AS (
        SELECT 
            "project_id",
            ROUND(
                (COUNT(CASE WHEN "abandonedForTokens" = false THEN 1 END)::numeric / 
                NULLIF(COUNT(*)::numeric, 0) * 100)
            )::integer as progress
        FROM "Mission"
        GROUP BY "project_id"
    )
    UPDATE "Project" p
    SET "progress" = pp.progress
    FROM "project_progress" pp
    WHERE p."id" = pp."project_id";

END $$;
---
-- First, get the maximum existing mission ID
WITH max_mission AS (
  SELECT COALESCE(MAX(id), 0) as max_id FROM "Mission"
),
-- Add random activities with meaningful names
new_missions AS (
  SELECT 
    (max_id + ROW_NUMBER() OVER ()) as id,
    CASE floor(random() * 10)
      WHEN 0 THEN '🚀 Feature Development'
      WHEN 1 THEN '🔧 System Maintenance'
      WHEN 2 THEN '📊 Data Analysis'
      WHEN 3 THEN '🤖 AI Model Training'
      WHEN 4 THEN '💡 Innovation Research'
      WHEN 5 THEN '🎯 Performance Optimization'
      WHEN 6 THEN '🔍 Code Review'
      WHEN 7 THEN '🛠️ Infrastructure Update'
      WHEN 8 THEN '📱 UI Enhancement'
      ELSE '🔒 Security Audit'
    END || ' ' || i::text as name,
    'SEQUENTIAL'::"MissionProcess" as process,
    p."id" as project_id,
    floor(random() * 1000)::integer as "inTokens",
    floor(random() * 1000)::integer as "outTokens",
    false as "abandonedForTokens",
    true as "verbose",
    CASE floor(random() * 10)
      WHEN 0 THEN '🚀'
      WHEN 1 THEN '🔧'
      WHEN 2 THEN '📊'
      WHEN 3 THEN '🤖'
      WHEN 4 THEN '💡'
      WHEN 5 THEN '🎯'
      WHEN 6 THEN '🔍'
      WHEN 7 THEN '🛠️'
      WHEN 8 THEN '📱'
      ELSE '🔒'
    END as emoji,
    'test' || floor(random() * 1000) || '@example.com' as email,
    NOW() - (random() * interval '30 days') as "createdAt",
    NOW() as "updatedAt",
    p."user_id",
    p."domainId"
  FROM 
    max_mission,
    "Project" p,
    generate_series(1, floor(random() * 3 + 2)::int) i
  WHERE p."id" IN (
    SELECT "id" FROM "Project" 
    WHERE "id" NOT IN (SELECT DISTINCT "project_id" FROM "Mission" WHERE "project_id" IS NOT NULL)
    ORDER BY RANDOM() LIMIT 5
  )
)
INSERT INTO "Mission" (
  "id",
  "name",
  "process",
  "project_id",
  "inTokens",
  "outTokens",
  "abandonedForTokens",
  "verbose",
  "emoji",
  "email",
  "createdAt",
  "updatedAt",
  "user_id",
  "domainId"
)
SELECT 
  id,
  name,
  process,
  project_id,
  "inTokens",
  "outTokens",
  "abandonedForTokens",
  "verbose",
  emoji,
  email,
  "createdAt",
  "updatedAt",
  user_id,
  "domainId"
FROM new_missions;

-- Update project progress based on mission completion
WITH project_task_stats AS (
  SELECT 
    "project_id",
    ROUND(
      (COUNT(CASE WHEN "abandonedForTokens" = false THEN 1 END)::numeric / 
      NULLIF(COUNT(*)::numeric, 0) * 100)
    )::integer as progress
  FROM "Mission"
  GROUP BY "project_id"
)
UPDATE "Project" p
SET "progress" = pts.progress
FROM project_task_stats pts
WHERE p."id" = pts."project_id";
-- More
-- First, add any missing columns to Mission table
DO $$ 
BEGIN
    -- Add columns if they don't exist
    BEGIN
        ALTER TABLE "Mission" 
        ADD COLUMN IF NOT EXISTS "emoji" TEXT DEFAULT '🔄',
        ADD COLUMN IF NOT EXISTS "inTokens" INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS "outTokens" INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS "abandonedForTokens" BOOLEAN DEFAULT false,
        ADD COLUMN IF NOT EXISTS "verbose" BOOLEAN DEFAULT true,
        ADD COLUMN IF NOT EXISTS "taskResult" JSONB DEFAULT NULL,
        ADD COLUMN IF NOT EXISTS "result" JSONB DEFAULT NULL;
    EXCEPTION
        WHEN duplicate_column THEN NULL;
    END;
END $$;

-- Update existing missions with random data
WITH "mission_updates" AS (
  SELECT 
    m."id",
    CASE floor(random() * 5)
      WHEN 0 THEN '🚀 Launch Feature'
      WHEN 1 THEN '🔧 System Update'
      WHEN 2 THEN '📊 Data Analysis'
      WHEN 3 THEN '🤖 AI Training'
      ELSE '💡 Innovation Task'
    END || ' ' || m."id"::text as "name",
    'SEQUENTIAL'::"MissionProcess" as "process",
    floor(random() * 1000)::integer as "inTokens",
    floor(random() * 1000)::integer as "outTokens",
    CASE floor(random() * 5)
      WHEN 0 THEN '🚀'
      WHEN 1 THEN '🔧'
      WHEN 2 THEN '📊'
      WHEN 3 THEN '🤖'
      ELSE '💡'
    END as "emoji"
  FROM "Mission" m
  WHERE m."id" IN (SELECT "id" FROM "Mission" ORDER BY RANDOM() LIMIT 10)
)
UPDATE "Mission" m
SET 
  "name" = mu."name",
  "process" = mu."process",
  "inTokens" = mu."inTokens",
  "outTokens" = mu."outTokens",
  "emoji" = mu."emoji",
  "updatedAt" = NOW()
FROM "mission_updates" mu
WHERE m."id" = mu."id";

-- Add random activities
WITH max_mission AS (
  SELECT COALESCE(MAX("id"), 0) as max_id FROM "Mission"
)
INSERT INTO "Mission" (
  "id",
  "name",
  "process",
  "project_id",
  "inTokens",
  "outTokens",
  "abandonedForTokens",
  "verbose",
  "emoji",
  "email",
  "createdAt",
  "updatedAt",
  "user_id",
  "domainId",
  "result",
  "taskResult"
)
SELECT 
  (max_id + ROW_NUMBER() OVER ()) as "id",
  CASE floor(random() * 10)
    WHEN 0 THEN '🚀 Feature Development'
    WHEN 1 THEN '🔧 System Maintenance'
    WHEN 2 THEN '📊 Data Analysis'
    WHEN 3 THEN '🤖 AI Model Training'
    WHEN 4 THEN '💡 Innovation Research'
    WHEN 5 THEN '🎯 Performance Optimization'
    WHEN 6 THEN '🔍 Code Review'
    WHEN 7 THEN '🛠️ Infrastructure Update'
    WHEN 8 THEN '📱 UI Enhancement'
    ELSE '🔒 Security Audit'
  END || ' ' || i::text,
  'SEQUENTIAL'::"MissionProcess",
  p."id",
  floor(random() * 1000)::integer,
  floor(random() * 1000)::integer,
  false,
  true,
  CASE floor(random() * 10)
    WHEN 0 THEN '🚀'
    WHEN 1 THEN '🔧'
    WHEN 2 THEN '📊'
    WHEN 3 THEN '🤖'
    WHEN 4 THEN '💡'
    WHEN 5 THEN '🎯'
    WHEN 6 THEN '🔍'
    WHEN 7 THEN '🛠️'
    WHEN 8 THEN '📱'
    ELSE '🔒'
  END,
  'test' || floor(random() * 1000) || '@example.com',
  NOW() - (random() * interval '30 days'),
  NOW(),
  p."user_id",
  p."domainId",
  NULL,
  NULL
FROM 
  max_mission,
  "Project" p,
  generate_series(1, floor(random() * 3 + 2)::int) i
WHERE p."id" IN (
  SELECT "id" FROM "Project" 
  WHERE "id" NOT IN (SELECT DISTINCT "project_id" FROM "Mission" WHERE "project_id" IS NOT NULL)
  ORDER BY RANDOM() LIMIT 5
);

-- Update project progress based on mission completion
WITH "project_progress" AS (
  SELECT 
    "project_id",
    ROUND(
      (COUNT(CASE WHEN "abandonedForTokens" = false THEN 1 END)::numeric / 
      NULLIF(COUNT(*)::numeric, 0) * 100)
    )::integer as progress
  FROM "Mission"
  GROUP BY "project_id"
)
UPDATE "Project" p
SET "progress" = pp.progress
FROM "project_progress" pp
WHERE p."id" = pp."project_id";
--
-- First, update Portfolio with project_id
UPDATE "Portfolio" SET
  "domainId" = CASE "title"
    WHEN 'Home Automation' THEN 103.02
    WHEN 'Fitness Tracker' THEN 2.02
    WHEN 'Personal Finance Management' THEN 3.01
    ELSE "domainId"
  END;

-- Update Project table with portfolio_id using proper UUID casting
UPDATE "Project" p SET
  "portfolio_id" = (
    CASE p."id"
      WHEN 1 THEN '31d35361-8792-4c79-895a-4c0dbe353415'::uuid  -- AI Productivity Suite
      WHEN 2 THEN 'c1c45943-f892-4352-a75d-77576bc2b354'::uuid  -- AI Financial Analytics
      WHEN 3 THEN 'b377c311-c44a-44d1-8533-bbdc29dfa9d8'::uuid  -- AI Healthcare Solutions
      WHEN 4 THEN '8e2b1c4e-4d3b-4f8b-9632-98be8d7bcbe7'::uuid  -- Home Automation
      WHEN 5 THEN '9f3c2d5f-5e4c-4a9c-8743-12cd8e9fcdef'::uuid  -- Personal Finance Management
      WHEN 6 THEN '10d4e6f8-6f5d-4b0d-9854-23de9f0abcde'::uuid  -- Fitness Tracker
    END
  )
WHERE p."id" IN (1, 2, 3, 4, 5, 6);

-- Verify the updates
SELECT 
  p."id" as "Project ID",
  p."title" as "Project Title",
  pf."id" as "Portfolio ID",
  pf."title" as "Portfolio Title"
FROM "Project" p
LEFT JOIN "Portfolio" pf ON p."portfolio_id" = pf."id"
ORDER BY p."id";
--
-- Update project titles to match their corresponding Portfolio
UPDATE "Project" p
SET "title" = CASE p."id"
    WHEN 1 THEN 'AI-driven Schedule with Task Automation'  -- AI Productivity Suite
    WHEN 2 THEN 'AI Financial Forecasting Tool'           -- AI Financial Analytics
    WHEN 3 THEN 'Patient Monitoring System'               -- AI Healthcare Solutions
    WHEN 4 THEN 'Smart Home Controller'                   -- Home Automation
    WHEN 5 THEN 'AI Expense Tracker'                      -- Personal Finance Management
    WHEN 6 THEN 'Personalized Workout Planner'           -- Fitness Tracker
  END,
  "description" = CASE p."id"
    WHEN 1 THEN 'An AI-driven scheduling application to optimize user calendars.'
    WHEN 2 THEN 'A content generation tool leveraging large language models for diverse content needs.'
    WHEN 3 THEN 'An AI-based system for tracking and analyzing patient vitals in real-time.'
    WHEN 4 THEN 'Voice-controlled home automation system'
    WHEN 5 THEN 'Automatically categorize and track expenses'
    WHEN 6 THEN 'Generate custom workout plans based on goals'
  END,
  "portfolio_id" = CASE p."id"
    WHEN 1 THEN '31d35361-8792-4c79-895a-4c0dbe353415'::uuid  -- AI Productivity Suite
    WHEN 2 THEN 'c1c45943-f892-4352-a75d-77576bc2b354'::uuid  -- AI Financial Analytics
    WHEN 3 THEN 'b377c311-c44a-44d1-8533-bbdc29dfa9d8'::uuid  -- AI Healthcare Solutions
    WHEN 4 THEN '8e2b1c4e-4d3b-4f8b-9632-98be8d7bcbe7'::uuid  -- Home Automation
    WHEN 5 THEN '9f3c2d5f-5e4c-4a9c-8743-12cd8e9fcdef'::uuid  -- Personal Finance Management
    WHEN 6 THEN '10d4e6f8-6f5d-4b0d-9854-23de9f0abcde'::uuid  -- Fitness Tracker
  END
WHERE p."id" IN (1, 2, 3, 4, 5, 6);

-- Verify the updates
SELECT 
  p."id" as "Project ID",
  p."title" as "Project Title",
  pf."id" as "Portfolio ID",
  pf."title" as "Portfolio Title"
FROM "Project" p
LEFT JOIN "Portfolio" pf ON p."portfolio_id" = pf."id"
ORDER BY p."id";