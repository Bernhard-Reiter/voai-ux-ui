import { z } from 'zod'

export const negotiationSchema = z.object({
  customerName: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100),
  customerEmail: z.string().email('Ungültige E-Mail-Adresse'),
  merchantName: z.string().min(2, 'Händlername muss mindestens 2 Zeichen lang sein').max(100),
  merchantPhone: z.string().regex(/^[\d\s\-+()]+$/, 'Ungültige Telefonnummer'),
  originalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Ungültiger Preis'),
  productCategory: z.enum([
    'general',
    'electronics',
    'automotive',
    'services',
    'software',
    'consulting',
  ]),
  urgencyLevel: z.enum(['low', 'medium', 'high']),
  customerNotes: z.string().max(1000, 'Notizen dürfen maximal 1000 Zeichen lang sein').optional(),
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'Die Datei darf maximal 10MB groß sein')
    .refine((file) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png',
      ]
      return allowedTypes.includes(file.type)
    }, 'Nicht unterstützter Dateityp. Erlaubt sind: PDF, DOC, DOCX, JPG, PNG'),
})

export type NegotiationFormData = z.infer<typeof negotiationSchema>
