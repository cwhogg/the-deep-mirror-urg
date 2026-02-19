import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: `DeepMirror — AI-powered conversational Enneagram assessment`,
  description: `The most accurate AI Enneagram test 2026. Conversational assessment eliminates mistyping through dynamic dialogue. Built for executives and coaches.`,
  openGraph: {
    title: `DeepMirror — AI-powered conversational Enneagram assessment`,
    description: `The most accurate AI Enneagram test 2026. Conversational assessment eliminates mistyping through dynamic dialogue. Built for executives and coaches.`,
    type: 'website',
    siteName: `DeepMirror`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `DeepMirror — AI-powered conversational Enneagram assessment`,
    description: `The most accurate AI Enneagram test 2026. Conversational assessment eliminates mistyping through dynamic dialogue. Built for executives and coaches.`,
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
