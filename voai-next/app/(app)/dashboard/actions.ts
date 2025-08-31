"use server"
import { supabaseServer } from '@/lib/auth/supabase-server'
import { createOneOffInvoice, createBillingPortal } from '@/lib/modules/billing'
import { enqueueIngest } from '@/lib/modules/core'

export async function issueSuccessFeeInvoice(offerId: string, amountCents: number) {
  const supabase = await supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('unauthorized')

  // Kunde mappen: hier minimalistisch – später echte Customer-ID persistieren
  const customerId = user.id // nur Beispiel

  const invoice = await createOneOffInvoice({
    customerId,
    amount: amountCents / 100,
    currency: 'EUR',
    description: `Success Fee für Angebot ${offerId}`,
    metadata: { offerId }
  })

  return { ok: true, invoiceId: invoice.id, hostedInvoiceUrl: invoice.hostedInvoiceUrl }
}

export async function openBillingPortal() {
  const supabase = await supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('unauthorized')
  
  const session = await createBillingPortal(user.id, `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`)
  return { url: session.url }
}

export async function createOfferFromUpload(offerId: string, storagePath: string) {
  const supabase = await supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('unauthorized')
  
  await enqueueIngest({
    userId: user.id,
    source: storagePath,
    type: 'document',
    metadata: { offerId }
  })
  return { ok: true }
}

// Example upload handler (called after successful file upload)
export async function onUploadComplete(storagePath: string, filename: string) {
  const supabase = await supabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('unauthorized')

  // Create offer record in database
  const { data: offer, error } = await supabase
    .from('offers')
    .insert({
      user_id: user.id,
      filename,
      storage_path: storagePath,
      status: 'processing'
    })
    .select()
    .single()

  if (error) throw error

  // Trigger ingest processing
  await createOfferFromUpload(offer.id, storagePath)

  return { ok: true, offerId: offer.id }
}