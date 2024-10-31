-- Create new Tasks table
CREATE TABLE IF NOT EXISTS "public"."Task" (
    "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    "name" varchar NOT NULL,
    "description" text,
    "assignedAgentId" integer REFERENCES "public"."Agent"("id"),
    "missionId" integer REFERENCES "public"."Mission"("id") ON DELETE CASCADE,
    "status" varchar CHECK (status IN ('not_started', 'next', 'in_progress', 'blocked', 'done')) DEFAULT 'not_started',
    "priority" varchar CHECK (priority IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    "dependencies" uuid[] DEFAULT NULL,
    "metrics" jsonb DEFAULT NULL,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    "user_id" uuid NOT NULL
);

-- Create function to migrate existing tasks
CREATE OR REPLACE FUNCTION migrate_mission_tasks()
RETURNS void AS $$
DECLARE
    mission_record RECORD;
    task_json jsonb;
BEGIN
    FOR mission_record IN SELECT id, tasks, user_id FROM "public"."Mission" WHERE tasks IS NOT NULL
    LOOP
        -- Convert tasks array to jsonb and iterate
        FOR task_json IN SELECT * FROM jsonb_array_elements(array_to_json(mission_record.tasks)::jsonb)
        LOOP
            INSERT INTO "public"."Task" (
                "name",
                "description",
                "assignedAgentId",
                "missionId",
                "status",
                "priority",
                "user_id"
            )
            SELECT
                task_json->>'name',
                task_json->>'description',
                (task_json->>'agent_id')::integer,
                mission_record.id,
                'not_started',
                'medium',
                mission_record.user_id;
        END LOOP;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute migration
SELECT migrate_mission_tasks();

-- Add comment to mark Mission.tasks as deprecated
COMMENT ON COLUMN "public"."Mission"."tasks" IS '@deprecated - Use Tasks table instead. Column kept for backward compatibility';

-- Create indexes
CREATE INDEX idx_task_mission ON "public"."Task"("missionId");
CREATE INDEX idx_task_agent ON "public"."Task"("assignedAgentId");
CREATE INDEX idx_task_status ON "public"."Task"("status");
CREATE INDEX idx_task_user ON "public"."Task"("user_id");

-- Add RLS policies
ALTER TABLE "public"."Task" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tasks"
    ON "public"."Task"
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks"
    ON "public"."Task"
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
    ON "public"."Task"
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
    ON "public"."Task"
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id); 