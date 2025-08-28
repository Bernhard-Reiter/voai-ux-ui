-- Drop old stripe_events table if exists
DROP TABLE IF EXISTS public.stripe_events CASCADE;

-- Create new stripe_events table with proper structure
CREATE TABLE public.stripe_events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    stripe_event_id text UNIQUE NOT NULL,
    type text NOT NULL,
    object jsonb NOT NULL,
    api_version text,
    created timestamptz NOT NULL,
    data jsonb NOT NULL,
    livemode boolean DEFAULT false,
    pending_webhooks integer DEFAULT 0,
    request jsonb,
    processed boolean DEFAULT false,
    processed_at timestamptz,
    error text,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Add constraints
ALTER TABLE public.stripe_events
ADD CONSTRAINT stripe_event_type_not_empty CHECK (type != '');

ALTER TABLE public.stripe_events
ADD CONSTRAINT stripe_event_id_format CHECK (stripe_event_id LIKE 'evt_%');

-- Create indexes for monitoring and performance
CREATE INDEX idx_stripe_events_stripe_event_id ON public.stripe_events(stripe_event_id);
CREATE INDEX idx_stripe_events_type ON public.stripe_events(type);
CREATE INDEX idx_stripe_events_created ON public.stripe_events(created DESC);
CREATE INDEX idx_stripe_events_processed ON public.stripe_events(processed);
CREATE INDEX idx_stripe_events_type_processed ON public.stripe_events(type, processed);
CREATE INDEX idx_stripe_events_created_at ON public.stripe_events(created_at DESC);

-- Enable RLS
ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Only service role can access stripe events
CREATE POLICY "Service role full access to stripe events"
ON public.stripe_events
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Create function to process stripe event
CREATE OR REPLACE FUNCTION public.process_stripe_event(p_event_id uuid)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.stripe_events
    SET 
        processed = true,
        processed_at = NOW(),
        updated_at = NOW()
    WHERE id = p_event_id
    AND processed = false;
    
    RETURN FOUND;
END;
$$;

-- Create function to record stripe event error
CREATE OR REPLACE FUNCTION public.record_stripe_event_error(
    p_event_id uuid,
    p_error text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE public.stripe_events
    SET 
        error = p_error,
        updated_at = NOW()
    WHERE id = p_event_id;
END;
$$;

-- Create monitoring view
CREATE OR REPLACE VIEW public.stripe_events_monitoring AS
SELECT 
    type,
    COUNT(*) as total_events,
    COUNT(*) FILTER (WHERE processed = true) as processed_events,
    COUNT(*) FILTER (WHERE processed = false) as pending_events,
    COUNT(*) FILTER (WHERE error IS NOT NULL) as error_events,
    MAX(created) as latest_event,
    MIN(created) FILTER (WHERE processed = false) as oldest_pending
FROM public.stripe_events
GROUP BY type
ORDER BY total_events DESC;

-- Grant permissions
GRANT ALL ON public.stripe_events TO service_role;
GRANT EXECUTE ON FUNCTION public.process_stripe_event TO service_role;
GRANT EXECUTE ON FUNCTION public.record_stripe_event_error TO service_role;
GRANT SELECT ON public.stripe_events_monitoring TO authenticated;

-- Revoke all access from public and anon
REVOKE ALL ON public.stripe_events FROM public, anon;

-- Add update trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_stripe_events_updated_at
BEFORE UPDATE ON public.stripe_events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add comments
COMMENT ON TABLE public.stripe_events IS 'Stores Stripe webhook events for processing with proper primary key structure';
COMMENT ON COLUMN public.stripe_events.stripe_event_id IS 'Unique Stripe event ID (evt_xxx format)';
COMMENT ON COLUMN public.stripe_events.type IS 'Stripe event type (e.g., payment_intent.succeeded)';
COMMENT ON COLUMN public.stripe_events.processed IS 'Whether this event has been processed by our system';