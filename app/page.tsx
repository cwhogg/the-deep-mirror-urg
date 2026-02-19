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
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the most accurate online Enneagram test?","acceptedAnswer":{"@type":"Answer","text":"The Deep Mirror uses conversational AI to achieve higher accuracy than traditional survey-based tests. While tools like Integrative9 use conditional logic, our AI adapts dynamically to your specific responses, eliminating the preset pathways that can lead to mistyping."}},{"@type":"Question","name":"Is the Enneagram test debunked?","acceptedAnswer":{"@type":"Answer","text":"The Enneagram framework itself has strong theoretical foundations, but traditional testing methods are indeed problematic. Static surveys suffer from social desirability bias and forced-choice limitations, which is why we developed an AI-powered conversational approach."}},{"@type":"Question","name":"Why do I get different Enneagram results on different tests?","acceptedAnswer":{"@type":"Answer","text":"This happens because traditional tests use rigid question sets that can't account for context or clarify ambiguous responses. Our AI eliminates this inconsistency by asking personalized follow-up questions and detecting contradictory patterns in real-time."}},{"@type":"Question","name":"What Enneagram type is usually a narcissist?","acceptedAnswer":{"@type":"Answer","text":"Narcissistic traits can appear in any Enneagram type, as the system describes core motivations rather than pathological behaviors. Our assessment focuses on healthy personality patterns and growth opportunities rather than diagnostic labels."}},{"@type":"Question","name":"How does AI make Enneagram typing more accurate?","acceptedAnswer":{"@type":"Answer","text":"AI enables dynamic conversation that traditional surveys can't provide. It can detect inconsistencies, ask clarifying questions, and adapt the assessment flow based on your specific responses, eliminating the guesswork and mistyping common with static questionnaires."}}]}} />

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
            The First AI Enneagram Test That Eliminates Mistyping
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Stop getting different results every time. Our conversational AI assessment adapts to your responses in real-time, delivering the accuracy that static surveys can't match.
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
            <p className="text-text-secondary text-sm leading-relaxed">Unlike rigid questionnaires, our AI engages in dynamic dialogue that adapts based on your responses. No more feeling trapped by multiple-choice limitations or getting inconsistent results across retakes.</p>
          </section>
          <section aria-label="Eliminates Social Desirability Bias" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Eliminates Social Desirability Bias</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Traditional tests are easily gamed by socially desirable answers. Our AI detects patterns and asks follow-up questions that reveal authentic motivations, not aspirational self-presentation.</p>
          </section>
          <section aria-label="27 Subtype Precision" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">27 Subtype Precision</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Move beyond basic 9-type results. Our assessment identifies your specific instinctual variant and wing combinations, providing the nuanced insights executives and coaches demand for professional development.</p>
          </section>
          <section aria-label="Built for Professional Context" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Built for Professional Context</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Designed specifically for executives, coaches, and HR leaders who need clinical-grade accuracy without the spiritual or therapeutic framing that dominates most Enneagram tools.</p>
          </section>
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What is the most accurate online Enneagram test?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Deep Mirror uses conversational AI to achieve higher accuracy than traditional survey-based tests. While tools like Integrative9 use conditional logic, our AI adapts dynamically to your specific responses, eliminating the preset pathways that can lead to mistyping.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Is the Enneagram test debunked?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The Enneagram framework itself has strong theoretical foundations, but traditional testing methods are indeed problematic. Static surveys suffer from social desirability bias and forced-choice limitations, which is why we developed an AI-powered conversational approach.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Why do I get different Enneagram results on different tests?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">This happens because traditional tests use rigid question sets that can't account for context or clarify ambiguous responses. Our AI eliminates this inconsistency by asking personalized follow-up questions and detecting contradictory patterns in real-time.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What Enneagram type is usually a narcissist?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Narcissistic traits can appear in any Enneagram type, as the system describes core motivations rather than pathological behaviors. Our assessment focuses on healthy personality patterns and growth opportunities rather than diagnostic labels.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How does AI make Enneagram typing more accurate?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">AI enables dynamic conversation that traditional surveys can't provide. It can detect inconsistencies, ask clarifying questions, and adapt the assessment flow based on your specific responses, eliminating the guesswork and mistyping common with static questionnaires.</p>
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
