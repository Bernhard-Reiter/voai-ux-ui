'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@voai/ui'
import { Button } from '@voai/ui'
import Link from 'next/link'
import { Icons } from '../../../components/icons'

export default function AuthCodeErrorPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-destructive/10 p-3">
                <Icons.alertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Authentifizierungsfehler</CardTitle>
            <CardDescription className="text-center">
              Bei der Anmeldung ist ein Fehler aufgetreten
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm text-muted-foreground text-center">
              Der Authentifizierungscode konnte nicht verarbeitet werden. Dies kann verschiedene
              Gründe haben:
            </p>

            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Der Link ist abgelaufen (Links sind nur 5 Minuten gültig)
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Der Link wurde bereits verwendet
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Es gab ein Problem mit dem OAuth Provider
              </li>
            </ul>

            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/auth/login">Erneut versuchen</Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/">Zur Startseite</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
