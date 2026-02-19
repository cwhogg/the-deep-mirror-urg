'use client';

import { useState, FormEvent } from 'react';
import JsonLd from '../components/content/JsonLd';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error — please try again');
    }
  }

  return (
    <>
      <JsonLd data={{"@context":"https://schema.org","@type":"Organization","name":"The Deep Mirror","url":"https://the-deep-mirror.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"WebSite","name":"The Deep Mirror","url":"https://the-deep-mirror.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the most accurate online Enneagram test?","acceptedAnswer":{"@type":"Answer","text":"The Deep Mirror uses conversational AI to achieve unprecedented accuracy by adapting questions based on your responses. Unlike static surveys, it explores the deeper motivations behind your behaviors, eliminating the guesswork that leads to mistyping."}},{"@type":"Question","name":"Is the Enneagram test debunked?","acceptedAnswer":{"@type":"Answer","text":"The Enneagram framework itself is psychologically valid, but traditional testing methods are severely limited. Static surveys suffer from social desirability bias and oversimplified questions, which is why we developed an AI-powered conversational approach."}},{"@type":"Question","name":"Why do I get different Enneagram types on different tests?","acceptedAnswer":{"@type":"Answer","text":"Traditional tests rely on predetermined questions that can't account for individual context and motivations. Our conversational AI eliminates this inconsistency by exploring your unique patterns through dynamic dialogue rather than rigid multiple-choice formats."}},{"@type":"Question","name":"What is criticism of the Enneagram test?","acceptedAnswer":{"@type":"Answer","text":"Most criticism targets the testing methodology, not the Enneagram system itself. Survey-based assessments are prone to mistyping due to social desirability bias and surface-level questioning, which our AI conversation approach specifically addresses."}}]}} />

      <header className="border-b border-border bg-background-elevated">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
            The Deep Mirror
          </a>
          <div className="flex items-center gap-6 text-sm">
            <a href="/blog" className="text-text-muted hover:text-text transition-colors">Blog</a>
            <a href="/compare" className="text-text-muted hover:text-text transition-colors">Comparisons</a>
            <a href="/faq" className="text-text-muted hover:text-text transition-colors">FAQ</a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section aria-label="Hero" className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text mb-4 leading-tight">
            The Most Accurate AI Enneagram Test That Eliminates Mistyping
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Our conversational enneagram assessment uses advanced AI to uncover your true type through dynamic dialogue, not limiting multiple-choice surveys.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            {status === 'success' ? (
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-primary font-medium">Thanks for signing up! We&apos;ll be in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-background-elevated border border-border text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-primary text-background font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : `Get Your True Type`}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}
          </div>
        </section>

        {/* Value Props */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Why The Deep Mirror?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <section aria-label="Conversational AI Replaces Static Surveys" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Conversational AI Replaces Static Surveys</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Dynamic questioning that adapts to your responses, exploring nuances that predetermined surveys miss completely.</p>
          </section>
          <section aria-label="Clinical-Grade Accuracy for Professionals" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Clinical-Grade Accuracy for Professionals</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Built specifically for executives and coaches who need reliable insights, not entertainment-grade personality quizzes.</p>
          </section>
          <section aria-label="Eliminates Social Desirability Bias" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Eliminates Social Desirability Bias</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Our AI detects inconsistencies and explores deeper motivations, preventing the mistyping that plagues traditional assessments.</p>
          </section>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What is the most accurate online Enneagram test?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Deep Mirror uses conversational AI to achieve unprecedented accuracy by adapting questions based on your responses. Unlike static surveys, it explores the deeper motivations behind your behaviors, eliminating the guesswork that leads to mistyping.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Is the Enneagram test debunked?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Enneagram framework itself is psychologically valid, but traditional testing methods are severely limited. Static surveys suffer from social desirability bias and oversimplified questions, which is why we developed an AI-powered conversational approach.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Why do I get different Enneagram types on different tests?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Traditional tests rely on predetermined questions that can't account for individual context and motivations. Our conversational AI eliminates this inconsistency by exploring your unique patterns through dynamic dialogue rather than rigid multiple-choice formats.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What is criticism of the Enneagram test?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Most criticism targets the testing methodology, not the Enneagram system itself. Survey-based assessments are prone to mistyping due to social desirability bias and surface-level questioning, which our AI conversation approach specifically addresses.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border bg-background-elevated mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">&copy; 2026 The Deep Mirror. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="/" className="text-text-muted hover:text-text transition-colors">Home</a>
              <a href="/blog" className="text-text-muted hover:text-text transition-colors">Blog</a>
              <a href="/compare" className="text-text-muted hover:text-text transition-colors">Comparisons</a>
              <a href="/faq" className="text-text-muted hover:text-text transition-colors">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
