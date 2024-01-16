import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Logos',
  description: 'An abstraction built from CMC'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className={'min-h-screen bg-background font-sans antialiased'}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
