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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the most accurate online Enneagram test?","acceptedAnswer":{"@type":"Answer","text":"The Deep Mirror uses conversational AI to achieve higher accuracy than static surveys by adapting questions in real-time and catching response inconsistencies. Unlike traditional tests that rely on predetermined logic, our AI explores the nuances of your personality through dynamic dialogue."}},{"@type":"Question","name":"Is the Enneagram test debunked?","acceptedAnswer":{"@type":"Answer","text":"The Enneagram framework itself has decades of clinical validation, but traditional testing methods are problematic. Static surveys suffer from social desirability bias and oversimplified questions, leading to mistyping and skepticism about the entire system."}},{"@type":"Question","name":"Why do I get different Enneagram types on different tests?","acceptedAnswer":{"@type":"Answer","text":"Most Enneagram tests use static questionnaires that can't account for context, mood, or the complexity of human psychology. Our conversational approach maintains consistency by exploring the deeper motivations behind your responses rather than relying on surface-level multiple choice answers."}},{"@type":"Question","name":"What makes conversational assessment better than surveys?","acceptedAnswer":{"@type":"Answer","text":"Conversational assessment allows for follow-up questions, clarification of ambiguous responses, and exploration of contradictions that reveal true motivations. This dynamic interaction prevents the mistyping that occurs when complex personalities are forced into rigid survey formats."}},{"@type":"Question","name":"How does AI improve Enneagram typing accuracy?","acceptedAnswer":{"@type":"Answer","text":"Our AI recognizes patterns in your responses that indicate potential bias or inconsistency, then asks targeted follow-up questions to clarify. This creates a more honest assessment environment and captures the subtleties that static surveys miss."}}]}} />

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
            The AI Enneagram Test That Solves Mistyping
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Stop getting different results every time. Our conversational enneagram assessment uses AI to discover your true type through dynamic dialogue, not static surveys.
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
                  {status === 'loading' ? 'Sending...' : `Start Your Assessment`}
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
          <section aria-label="Conversational Intelligence" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Conversational Intelligence</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Unlike rigid questionnaires, our AI adapts questions based on your responses, diving deeper into the nuances that matter for accurate typing.</p>
          </section>
          <section aria-label="Eliminate Social Desirability Bias" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Eliminate Social Desirability Bias</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Traditional surveys let you game the system. Our conversational approach catches inconsistencies and guides you toward honest self-reflection.</p>
          </section>
          <section aria-label="27 Subtype Precision" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">27 Subtype Precision</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Go beyond basic 9-type results. Discover your instinctual variant and wings with the depth that executives and coaches demand.</p>
          </section>
          <section aria-label="Built for Professionals" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Built for Professionals</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Designed specifically for leaders, coaches, and high-performers who need reliable insights for decision-making and team dynamics.</p>
          </section>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What is the most accurate online Enneagram test?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Deep Mirror uses conversational AI to achieve higher accuracy than static surveys by adapting questions in real-time and catching response inconsistencies. Unlike traditional tests that rely on predetermined logic, our AI explores the nuances of your personality through dynamic dialogue.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Is the Enneagram test debunked?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Enneagram framework itself has decades of clinical validation, but traditional testing methods are problematic. Static surveys suffer from social desirability bias and oversimplified questions, leading to mistyping and skepticism about the entire system.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Why do I get different Enneagram types on different tests?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Most Enneagram tests use static questionnaires that can't account for context, mood, or the complexity of human psychology. Our conversational approach maintains consistency by exploring the deeper motivations behind your responses rather than relying on surface-level multiple choice answers.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What makes conversational assessment better than surveys?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Conversational assessment allows for follow-up questions, clarification of ambiguous responses, and exploration of contradictions that reveal true motivations. This dynamic interaction prevents the mistyping that occurs when complex personalities are forced into rigid survey formats.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How does AI improve Enneagram typing accuracy?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Our AI recognizes patterns in your responses that indicate potential bias or inconsistency, then asks targeted follow-up questions to clarify. This creates a more honest assessment environment and captures the subtleties that static surveys miss.</p>
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
