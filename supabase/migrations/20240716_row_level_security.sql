-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.negotiations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Profiles policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Negotiations policies
-- Users can view their own negotiations
CREATE POLICY "Users can view own negotiations" 
  ON public.negotiations 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can insert their own negotiations
CREATE POLICY "Users can insert own negotiations" 
  ON public.negotiations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own negotiations
CREATE POLICY "Users can update own negotiations" 
  ON public.negotiations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own negotiations
CREATE POLICY "Users can delete own negotiations" 
  ON public.negotiations 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Documents policies
-- Users can view documents from their negotiations
CREATE POLICY "Users can view documents from own negotiations" 
  ON public.documents 
  FOR SELECT 
  USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM public.negotiations 
      WHERE negotiations.id = documents.negotiation_id 
      AND negotiations.user_id = auth.uid()
    )
  );

-- Users can insert documents to their negotiations
CREATE POLICY "Users can insert documents to own negotiations" 
  ON public.documents 
  FOR INSERT 
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.negotiations 
      WHERE negotiations.id = negotiation_id 
      AND negotiations.user_id = auth.uid()
    )
  );

-- Users can update their own documents
CREATE POLICY "Users can update own documents" 
  ON public.documents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own documents
CREATE POLICY "Users can delete own documents" 
  ON public.documents 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', false);

-- Storage policies
CREATE POLICY "Users can upload documents" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own documents" 
  ON storage.objects 
  FOR SELECT 
  USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own documents" 
  ON storage.objects 
  FOR DELETE 
  USING (
    bucket_id = 'documents' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );