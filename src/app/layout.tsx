import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { RootLayoutWrapper } from '@/components/navigation/RootLayoutWrapper';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { GlobalBackgroundSetter } from '@/components/theme/GlobalBackgroundSetter';
import { prisma } from '@/lib/database/prisma';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Sailesh P | Interactive Portfolio & Dashboard',
  description: 'Personal interactive portfolio, web dashboard, and analytics ecosystem of Sailesh P.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 'singleton' } });

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans bg-background text-foreground">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem storageKey="portfolio-theme">
          <GlobalBackgroundSetter themeConfig={settings?.themeConfig} />
          <RootLayoutWrapper>
            {children}
          </RootLayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
