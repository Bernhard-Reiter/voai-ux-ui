-- Seed data for testing (only for development)
-- This file is optional and can be used to populate test data

-- Example: Create test workflow statuses
INSERT INTO public.workflow_status (user_id, workflow_name, status, progress, metadata)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'Test Workflow 1', 'pending', 0, '{"description": "Test workflow for development"}'),
  ('00000000-0000-0000-0000-000000000000', 'Test Workflow 2', 'processing', 50, '{"description": "Another test workflow"}'),
  ('00000000-0000-0000-0000-000000000000', 'Test Workflow 3', 'completed', 100, '{"description": "Completed test workflow"}')
ON CONFLICT (id) DO NOTHING;

-- Note: Real user data will be created automatically when users sign up