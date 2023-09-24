export const dynamic = 'force-dynamic'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@mantine/core/styles.css';


import { MantineProvider, ColorSchemeScript, createTheme, Container } from '@mantine/core';
import TanstackProvider from "@/components/providers/TanstackProvider"
import { HeaderSearch } from '@/components/layouts/Header';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eos',
  description: 'View your YouTube archive.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <TanstackProvider>
          <MantineProvider defaultColorScheme='dark'
            theme={{
              fontFamily: inter.style.fontFamily,
            }}
          >
            <HeaderSearch />
            {children}
          </MantineProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}