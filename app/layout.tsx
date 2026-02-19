import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: `DeepMirror — AI-powered Enneagram typing that actually works`,
  description: `Revolutionary AI Enneagram test using conversational assessment instead of flawed surveys. Get your accurate type through dynamic dialogue, not static questionnaires.`,
  openGraph: {
    title: `DeepMirror — AI-powered Enneagram typing that actually works`,
    description: `Revolutionary AI Enneagram test using conversational assessment instead of flawed surveys. Get your accurate type through dynamic dialogue, not static questionnaires.`,
    type: 'website',
    siteName: `DeepMirror`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `DeepMirror — AI-powered Enneagram typing that actually works`,
    description: `Revolutionary AI Enneagram test using conversational assessment instead of flawed surveys. Get your accurate type through dynamic dialogue, not static questionnaires.`,
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
