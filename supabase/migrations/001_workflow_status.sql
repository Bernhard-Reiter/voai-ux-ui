-- Create workflow_status table
create table if not exists public.workflow_status (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  workflow_id text not null,
  status text not null check (status in ('pending', 'running', 'completed', 'failed')),
  progress integer default 0 check (progress >= 0 and progress <= 100),
  result jsonb,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index workflow_status_user_id_idx on public.workflow_status(user_id);
create index workflow_status_workflow_id_idx on public.workflow_status(workflow_id);
create index workflow_status_status_idx on public.workflow_status(status);
create index workflow_status_created_at_idx on public.workflow_status(created_at desc);

-- Enable RLS
alter table public.workflow_status enable row level security;

-- Create policies
create policy "Users can view own workflow status"
  on public.workflow_status for select
  using (auth.uid() = user_id);

create policy "Users can create own workflow status"
  on public.workflow_status for insert
  with check (auth.uid() = user_id);

create policy "Users can update own workflow status"
  on public.workflow_status for update
  using (auth.uid() = user_id);

create policy "Users can delete own workflow status"
  on public.workflow_status for delete
  using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

create trigger on_workflow_status_updated
  before update on public.workflow_status
  for each row execute procedure public.handle_updated_at();

-- Enable realtime
alter publication supabase_realtime add table public.workflow_status;