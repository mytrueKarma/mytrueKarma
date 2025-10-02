"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        title: "Passwörter stimmen nicht überein",
        description: "Die Passwörter stimmen nicht überein. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await register(email, password)
      toast({
        title: "Registrierung erfolgreich",
        description: "Willkommen bei mytrueKarma! Sie sind jetzt angemeldet.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registrierung fehlgeschlagen",
        description: "Bitte versuchen Sie es mit anderen Anmeldedaten erneut.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center min-h-[calc(100vh-8rem)]">
        <div className="hidden md:block">
          <Image
            src="/images/design-mode/pexels-shvetsa-4482900.jpg.jpeg"
            alt="Secure Online Shopping"
            width={500}
            height={400}
            className="rounded-lg shadow-2xl"
          />
        </div>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Konto erstellen</CardTitle>
            <CardDescription>
              Treten Sie mytrueKarma bei und beginnen Sie heute mit dem nachhaltigen Einkaufen
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Geben Sie Ihre E-Mail ein"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Erstellen Sie ein Passwort"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Bestätigen Sie Ihr Passwort"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Konto wird erstellt..." : "Konto erstellen"}
              </Button>
              <div className="text-center text-sm">
                Haben Sie bereits ein Konto?{" "}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Anmelden
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
