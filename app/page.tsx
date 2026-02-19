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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the most accurate online Enneagram test?","acceptedAnswer":{"@type":"Answer","text":"The Deep Mirror uses conversational AI to eliminate the social desirability bias and rigid survey limitations that cause mistyping in traditional tests. Unlike static questionnaires, our AI adapts to your responses and explores inconsistencies in real-time for unprecedented accuracy."}},{"@type":"Question","name":"Is the Enneagram test debunked?","acceptedAnswer":{"@type":"Answer","text":"The Enneagram framework itself remains valid for understanding core motivations and behavior patterns. The problem lies in traditional testing methods that rely on self-reporting surveys vulnerable to bias. Our AI-powered approach addresses these methodological limitations."}},{"@type":"Question","name":"Why am I getting different Enneagram types on different tests?","acceptedAnswer":{"@type":"Answer","text":"Traditional tests use static questions that can't adapt to your responses or catch inconsistencies. Social desirability bias and the limitations of multiple-choice formats create unreliable results. Our conversational AI eliminates these variables for consistent, accurate typing."}},{"@type":"Question","name":"How does AI improve Enneagram assessment accuracy?","acceptedAnswer":{"@type":"Answer","text":"AI enables dynamic questioning that adapts based on your responses, explores contradictions, and detects response patterns that indicate bias. This creates a more natural conversation that reveals authentic motivations rather than socially acceptable answers."}},{"@type":"Question","name":"What makes this different from other Enneagram tools?","acceptedAnswer":{"@type":"Answer","text":"Unlike survey-based assessments, The Deep Mirror uses conversational AI to conduct a personalized interview that adapts to your responses. This approach solves the mistyping problems executives and coaches face with traditional tools while delivering clinical-grade accuracy."}}]}} />

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
            The First AI Enneagram Test That Actually Gets You Right
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Skip the limiting surveys. Our conversational enneagram assessment adapts to your responses in real-time, delivering the accuracy executives and coaches demand.
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
                  {status === 'loading' ? 'Sending...' : `Get Early Access`}
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
          <section aria-label="Beyond Static Surveys" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Beyond Static Surveys</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Dynamic AI conversation replaces rigid questionnaires. No more feeling boxed in by multiple choice limitations that miss your nuanced reality.</p>
          </section>
          <section aria-label="Eliminates Mistyping Issues" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Eliminates Mistyping Issues</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Our AI detects social desirability bias and inconsistencies in real-time, solving the accuracy problems that plague traditional enneagram tests.</p>
          </section>
          <section aria-label="Executive-Grade Insights" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Executive-Grade Insights</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Built specifically for leaders who need sophisticated personality insights without the 'woo-woo' positioning of consumer-focused tools.</p>
          </section>
          <section aria-label="27 Subtype Precision" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">27 Subtype Precision</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Goes beyond basic 9-type results to identify your specific subtype and integration patterns for actionable leadership development.</p>
          </section>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What is the most accurate online Enneagram test?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Deep Mirror uses conversational AI to eliminate the social desirability bias and rigid survey limitations that cause mistyping in traditional tests. Unlike static questionnaires, our AI adapts to your responses and explores inconsistencies in real-time for unprecedented accuracy.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Is the Enneagram test debunked?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Enneagram framework itself remains valid for understanding core motivations and behavior patterns. The problem lies in traditional testing methods that rely on self-reporting surveys vulnerable to bias. Our AI-powered approach addresses these methodological limitations.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Why am I getting different Enneagram types on different tests?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Traditional tests use static questions that can't adapt to your responses or catch inconsistencies. Social desirability bias and the limitations of multiple-choice formats create unreliable results. Our conversational AI eliminates these variables for consistent, accurate typing.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How does AI improve Enneagram assessment accuracy?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">AI enables dynamic questioning that adapts based on your responses, explores contradictions, and detects response patterns that indicate bias. This creates a more natural conversation that reveals authentic motivations rather than socially acceptable answers.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What makes this different from other Enneagram tools?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Unlike survey-based assessments, The Deep Mirror uses conversational AI to conduct a personalized interview that adapts to your responses. This approach solves the mistyping problems executives and coaches face with traditional tools while delivering clinical-grade accuracy.</p>
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
