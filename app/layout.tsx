import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ToastProvider } from './contexts/ToastContext'
import Navbar from './components/Navbar/Navbar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'El picado en Praia',
  description:
    'El picado del emir, busca salir de la zona de confort y adentrarse en los mares glass de Praia do Rosa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-screen bg-slate-100`}
      >
        <Navbar />
        <ToastProvider>
          <div className="lg:ml-64">{children}</div>
        </ToastProvider>
      </body>
    </html>
  )
}
