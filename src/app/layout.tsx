import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Actual Resume',
  description: 'Beyond a shadow of a doubt'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}
