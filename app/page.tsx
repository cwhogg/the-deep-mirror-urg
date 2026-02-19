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
      <JsonLd data={{"@context":"https://schema.org","@type":"Organization","name":"DeepMirror","url":"https://deepmirror.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"WebSite","name":"DeepMirror","url":"https://deepmirror.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the most accurate online Enneagram test?","acceptedAnswer":{"@type":"Answer","text":"Traditional surveys like RHETI and iEQ9 suffer from static question formats that can't adapt to individual nuances. DeepMirror's conversational AI eliminates the limitations of multiple-choice questions by engaging in dynamic dialogue that reveals authentic motivations."}},{"@type":"Question","name":"Is the Enneagram test debunked?","acceptedAnswer":{"@type":"Answer","text":"The Enneagram system itself has strong validity when applied correctly. The problem lies with assessment methods—static surveys are prone to mistyping due to social desirability bias and oversimplified questions. Our AI approach addresses these methodological flaws."}},{"@type":"Question","name":"Why do I get different Enneagram types on different tests?","acceptedAnswer":{"@type":"Answer","text":"Inconsistent results typically occur because traditional tests can't account for context, mood, or the way you interpret questions. Our conversational approach clarifies ambiguities in real-time and validates responses for consistency."}},{"@type":"Question","name":"What Enneagram type is usually a narcissist?","acceptedAnswer":{"@type":"Answer","text":"Narcissistic traits can appear across multiple types, but are most commonly associated with unhealthy Type 3s and 8s. However, true typing requires understanding core motivations, not just surface behaviors—which is why conversational assessment is crucial."}}]}} />

      <header className="border-b border-border bg-background-elevated">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="/" className="text-xl font-bold text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
            DeepMirror
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
            Stop getting different results every time. Our conversational AI eliminates the mistyping and social desirability bias that plague traditional surveys.
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
          <h2 className="text-2xl font-bold text-text text-center mb-8">Why DeepMirror?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <section aria-label="Conversational Intelligence" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Conversational Intelligence</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Unlike static surveys, our AI adapts to your responses in real-time, asking follow-up questions that reveal your authentic motivations and fears.</p>
          </section>
          <section aria-label="Eliminates Mistyping" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Eliminates Mistyping</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Advanced dialogue patterns catch inconsistencies and social desirability bias that cause 60% of people to get wrong results on traditional tests.</p>
          </section>
          <section aria-label="Executive-Grade Accuracy" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Executive-Grade Accuracy</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Built for leaders who need reliable insights, not entertainment. Clinical-level precision without the academic jargon or spiritual overtones.</p>
          </section>
          <section aria-label="27 Subtype Precision" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">27 Subtype Precision</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Goes beyond basic 9 types to identify your specific subtype and integration patterns, providing actionable insights for leadership development.</p>
          </section>
          <section aria-label="Ongoing Refinement" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Ongoing Refinement</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Your understanding evolves—so should your assessment. Refine and validate your type through continued conversations as you grow in self-awareness.</p>
          </section>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What is the most accurate online Enneagram test?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Traditional surveys like RHETI and iEQ9 suffer from static question formats that can't adapt to individual nuances. DeepMirror's conversational AI eliminates the limitations of multiple-choice questions by engaging in dynamic dialogue that reveals authentic motivations.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Is the Enneagram test debunked?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Enneagram system itself has strong validity when applied correctly. The problem lies with assessment methods—static surveys are prone to mistyping due to social desirability bias and oversimplified questions. Our AI approach addresses these methodological flaws.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Why do I get different Enneagram types on different tests?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Inconsistent results typically occur because traditional tests can't account for context, mood, or the way you interpret questions. Our conversational approach clarifies ambiguities in real-time and validates responses for consistency.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What Enneagram type is usually a narcissist?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Narcissistic traits can appear across multiple types, but are most commonly associated with unhealthy Type 3s and 8s. However, true typing requires understanding core motivations, not just surface behaviors—which is why conversational assessment is crucial.</p>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border bg-background-elevated mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-text-muted text-sm">&copy; 2026 DeepMirror. All rights reserved.</p>
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
