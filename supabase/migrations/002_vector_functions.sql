-- Vector upsert function for batch embedding insertion
CREATE OR REPLACE FUNCTION vector_upsert(items jsonb)
RETURNS void AS $$
DECLARE
  item jsonb;
BEGIN
  FOR item IN SELECT * FROM jsonb_array_elements(items)
  LOOP
    INSERT INTO document_embeddings (
      job_id,
      tenant_id,
      chunk_index,
      content,
      embedding,
      metadata
    ) VALUES (
      (item->>'job_id')::uuid,
      item->>'tenant_id',
      (item->>'chunk_index')::integer,
      item->>'content',
      (item->>'embedding')::vector,
      COALESCE(item->'metadata', '{}')::jsonb
    )
    ON CONFLICT (job_id, chunk_index) 
    DO UPDATE SET
      content = EXCLUDED.content,
      embedding = EXCLUDED.embedding,
      metadata = EXCLUDED.metadata,
      created_at = document_embeddings.created_at;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vector similarity search function
CREATE OR REPLACE FUNCTION match_vectors(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 10,
  filter_tenant_id text DEFAULT NULL,
  filter_job_id uuid DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  job_id uuid,
  content text,
  metadata jsonb,
  similarity float
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    de.id,
    de.job_id,
    de.content,
    de.metadata,
    1 - (de.embedding <=> query_embedding) AS similarity
  FROM document_embeddings de
  WHERE 
    (filter_tenant_id IS NULL OR de.tenant_id = filter_tenant_id)
    AND (filter_job_id IS NULL OR de.job_id = filter_job_id)
    AND 1 - (de.embedding <=> query_embedding) > match_threshold
  ORDER BY de.embedding <=> query_embedding
  LIMIT match_count;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Helper function to match vectors by text query (includes embedding generation)
CREATE OR REPLACE FUNCTION match_vectors_by_query(
  query_text text,
  top_k int DEFAULT 8,
  filter_tenant_id text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  job_id uuid,
  content text,
  metadata jsonb,
  similarity float
) AS $$
BEGIN
  -- This is a placeholder that would normally call OpenAI
  -- In production, this would be handled by the application layer
  RAISE EXCEPTION 'Text embedding should be generated in application layer';
END;
$$ LANGUAGE plpgsql STABLE;

-- Function to clean up old embeddings
CREATE OR REPLACE FUNCTION cleanup_old_embeddings(days_old int DEFAULT 180)
RETURNS int AS $$
DECLARE
  deleted_count int;
BEGIN
  DELETE FROM document_embeddings
  WHERE created_at < NOW() - INTERVAL '1 day' * days_old;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get embedding stats
CREATE OR REPLACE FUNCTION get_embedding_stats(filter_tenant_id text DEFAULT NULL)
RETURNS TABLE (
  total_embeddings bigint,
  total_jobs bigint,
  avg_chunks_per_job numeric,
  total_storage_mb numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::bigint AS total_embeddings,
    COUNT(DISTINCT job_id)::bigint AS total_jobs,
    ROUND(COUNT(*)::numeric / NULLIF(COUNT(DISTINCT job_id), 0), 2) AS avg_chunks_per_job,
    ROUND(SUM(pg_column_size(embedding) + pg_column_size(content))::numeric / 1024 / 1024, 2) AS total_storage_mb
  FROM document_embeddings
  WHERE filter_tenant_id IS NULL OR tenant_id = filter_tenant_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;