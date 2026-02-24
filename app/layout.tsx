import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: `The Deep Mirror — AI-Powered Conversational Enneagram Assessment`,
  description: `Unlike static surveys, The Deep Mirror uses conversational AI to probe contradictions and explore complexity. The most accurate AI enneagram test available. Start your typing conversation.`,
  openGraph: {
    title: `The Deep Mirror — AI-Powered Conversational Enneagram Assessment`,
    description: `Unlike static surveys, The Deep Mirror uses conversational AI to probe contradictions and explore complexity. The most accurate AI enneagram test available. Start your typing conversation.`,
    type: 'website',
    siteName: `The Deep Mirror`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `The Deep Mirror — AI-Powered Conversational Enneagram Assessment`,
    description: `Unlike static surveys, The Deep Mirror uses conversational AI to probe contradictions and explore complexity. The most accurate AI enneagram test available. Start your typing conversation.`,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-text min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
