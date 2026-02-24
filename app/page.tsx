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
      <JsonLd data={{"@context":"https://schema.org","@type":"Organization","name":"The Deep Mirror","url":"https://the-deep-mirror-b28o37uk2-chris-marleymedicas-projects.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"WebSite","name":"The Deep Mirror","url":"https://the-deep-mirror-b28o37uk2-chris-marleymedicas-projects.vercel.app"}} />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Why do I keep getting different types on different Enneagram tests?","acceptedAnswer":{"@type":"Answer","text":"Static tests are inconsistent because they can't resolve contradictions in your answers. When you answer slightly differently on two different days, or when two questions pull in different directions, a fixed questionnaire tallies the results and hands you whatever type scored highest. Small variations in how you read a question produce different outcomes. Conversational assessment resolves this by exploring contradictions directly rather than averaging them out."}},{"@type":"Question","name":"How is this different from the iEQ9 or other premium Enneagram assessments?","acceptedAnswer":{"@type":"Answer","text":"The iEQ9 uses conditional logic, which is a significant improvement over basic static tests. But conditional logic is still predetermined branching: the follow-up questions are fixed in advance. The Deep Mirror uses conversational AI, which means the follow-up questions are generated from what you actually said. The conversation adapts in real time rather than routing you through a decision tree someone built before you answered a single question."}},{"@type":"Question","name":"Do I need to know anything about the Enneagram before I start?","acceptedAnswer":{"@type":"Answer","text":"No. The conversation works whether you've spent years studying the Enneagram or have never heard of it before today. If you're new to it, the conversation will explain what's being explored and why as it goes. You don't need to understand the system to participate in the assessment."}},{"@type":"Question","name":"What does the conversation actually cover?","acceptedAnswer":{"@type":"Answer","text":"The conversation explores your core motivations, how you respond under stress, what drives your decisions, and where your patterns of behavior come from. It's not a surface-level quiz about preferences. It goes into the underlying motivations that define your type, which is why it takes longer than a static survey and produces a more accurate result."}},{"@type":"Question","name":"What happens after I get my type?","acceptedAnswer":{"@type":"Answer","text":"You receive your type and the reasoning behind it: not just a number, but an explanation of what the conversation surfaced and why it points to your type. From there, you can bring specific situations into the conversation to see how your type applies, or return as your self-awareness develops to refine your understanding further."}},{"@type":"Question","name":"Is my conversation private?","acceptedAnswer":{"@type":"Answer","text":"Yes. Your typing conversation is private. Your responses are used to generate your assessment and are not shared."}},{"@type":"Question","name":"What if I disagree with my result?","acceptedAnswer":{"@type":"Answer","text":"That's a conversation worth having. If the result doesn't fit, bring the specific parts that feel wrong back into the conversation. The Deep Mirror holds your typing open rather than locking it in. Disagreement with a result is often where the most useful exploration happens."}},{"@type":"Question","name":"Does this cover the 27 Enneagram subtypes?","acceptedAnswer":{"@type":"Answer","text":"Yes. The conversation explores subtype as part of the typing process. The 27 subtypes, which combine the 9 core types with 3 instinctual variants, are where a lot of mistyping happens on static tests. A conversation that probes your actual motivations and instinctual patterns is better positioned to identify subtypes accurately than a questionnaire with fixed subtype-indicator questions."}}]}} />

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
            The AI Enneagram Test Built for Accuracy
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Static tests record your contradictions. The Deep Mirror explores them. Conversational AI that probes your answers, follows up, and surfaces what questionnaires systematically miss.
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
                  {status === 'loading' ? 'Sending...' : `Start Your Typing Conversation`}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}
          </div>
        </section>

        {/* Problem */}
        <section aria-label="Problem" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-4">
            Three Tests. Three Types. Here's the Actual Problem.
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            You answered honestly. The test still got it wrong. Here's what happened: at some point, your answers contradicted each other. You said one thing about how you handle conflict, then said something different three questions later. The survey recorded both answers and moved on. No follow-up. No exploration. Just a tally of your most consistent responses, assigned as a type.

Static tests can't ask why. They were never built to. That's not a flaw in the data, it's a flaw in the method. And it's why getting mistyped doesn't mean you answered wrong. It means the test stopped exactly where the real work should have started.
          </p>
        </section>

        {/* Features */}
        <section aria-label="Features" className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">What Questionnaires Can't Do. What This Conversation Does.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <section aria-label="Where Your Real Type Emerges" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Where Your Real Type Emerges</h3>
            <p className="text-text-secondary text-sm leading-relaxed">When your answers contradict each other, the conversation doesn't move on. It asks why. That follow-up is where your actual type lives, in the gap between what you said and what you meant.</p>
          </section>
          <section aria-label="Typing That Stays Open" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Typing That Stays Open</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Your first conversation opens a type. It doesn't close one. The dialogue holds your typing open the way a skilled practitioner would: not locked after 20 minutes, revisable as your self-awareness grows.</p>
          </section>
          <section aria-label="Your Type in Your Actual Life" className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Your Type in Your Actual Life</h3>
            <p className="text-text-secondary text-sm leading-relaxed">Bring a real situation into the conversation: a recurring conflict, a difficult relationship, a decision you keep postponing. Typing grounded in your actual context produces a more accurate result than abstract questions about how you behave in general.</p>
          </section>
          <section aria-label="Practitioner Depth. Without the Waitlist." className="bg-background-elevated border border-border rounded-xl p-6">
            <h3 className="text-lg font-semibold text-text mb-2">Practitioner Depth. Without the Waitlist.</h3>
            <p className="text-text-secondary text-sm leading-relaxed">The probing methodology of a skilled human Enneagram practitioner. The same contradiction-following, follow-up-asking approach that makes human typing sessions accurate. No \$300 session fee. No six-week waitlist.</p>
          </section>
          </div>
        </section>

        {/* How It Works */}
        <section aria-label="How it works" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">How Conversation Gets to Your Actual Type</h2>
          <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">1</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">The conversation opens where you are</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The first question is simple. Your answer sets the direction. There's no fixed question path, because the conversation routes itself around what you actually say, not around responses everyone else has already given.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">2</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">The AI follows the thread</h3>
              <p className="text-text-secondary text-sm leading-relaxed">When your answers point in different directions, the conversation goes deeper. Follow-up questions explore the contradiction instead of moving past it. Static surveys record the inconsistency. This conversation asks what it means.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">Your type takes shape</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Not from a tally of your most consistent answers, but from what the conversation surfaces about your core motivations. The patterns that emerge from dialogue are different from what any fixed question set can produce.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold text-sm">4</div>
            <div>
              <h3 className="text-lg font-semibold text-text mb-1">You leave with a complete result</h3>
              <p className="text-text-secondary text-sm leading-relaxed">You get your type, the reasoning behind it, and a clear picture of what it explains about how you actually operate. A complete result from a single conversation, not a number handed over without context.</p>
            </div>
          </div>
          </div>
        </section>

        {/* Audience */}
        <section aria-label="Audience" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-4">
            For People Who Need Their Type to Actually Be Right
          </h2>
          <p className="text-text-secondary text-center leading-relaxed">
            You've taken the tests. The results felt close, or contradictory, or both. You read the description and spent time talking yourself into it. That experience is the product of a methodology problem, not an accuracy problem with you.

The Deep Mirror is an AI Enneagram assessment built for people who want the real answer. For the executive who has noticed patterns in how they lead and wants to understand them precisely. For the coach who recommends tools they'd stake their professional credibility on. For the person who keeps questioning their type because something about it has never quite fit.

And for the person who has never taken an Enneagram test: if you're choosing between a static survey and a conversation that adapts to what you actually say, you already know which one is more likely to get it right.

If you want a five-minute quiz, this is not it.
          </p>
        </section>

        {/* Objections */}
        <section aria-label="Objections" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">A Few Things Worth Knowing Before You Start</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How long does this take?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Longer than a survey. A thorough typing conversation takes 30 to 45 minutes. That's the tradeoff: more time in, more accurate result out. If 30 minutes feels like too much to invest in understanding your core motivations, this probably isn't the right tool.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Will the AI just tell me what I want to hear?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The conversation pushes back. Here is what that actually looks like: if you describe yourself as someone who avoids conflict, then describe a situation where you held your ground under real pressure, the conversation doesn't smooth that over. It stops and asks: which one is more true when it actually matters? That question is uncomfortable. It is supposed to be. The system is built on the assumption that your first answer is often your performed answer, not your real one.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Can AI really type me as accurately as a human practitioner?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">A skilled practitioner is accurate because they follow up, probe contradictions, and don't accept your first answer as your final one. That's the methodology. The Deep Mirror applies the same methodology conversationally. If you say you're driven by achievement in one answer, then describe spending hours on a problem because you couldn't stand getting it wrong, the conversation stops and asks which one is more true for you. That's what good practitioners do. That's what this does.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">I've already taken Enneagram tests and have a result.</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Good. Bring it into the conversation. If you've been told you're a Type 3 but something about it has never quite fit, that tension is exactly what the conversation is built to explore. Previous results aren't a starting point to defend. They're a thread to pull.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-label="Final CTA" className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Find Out What a Conversation Produces That a Survey Can't</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">Every static test recorded your answers and handed you a number. This conversation asks why. The difference shows up in the result.</p>
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
                  {status === 'loading' ? 'Sending...' : `Start Your Typing Conversation`}
                </button>
              </form>
            )}
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-2">{errorMsg}</p>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section aria-label="Frequently Asked Questions" className="mx-auto max-w-3xl px-6 py-12">
          <h2 className="text-2xl font-bold text-text text-center mb-8">Common Questions</h2>
          <div className="space-y-4">
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Why do I keep getting different types on different Enneagram tests?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Static tests are inconsistent because they can't resolve contradictions in your answers. When you answer slightly differently on two different days, or when two questions pull in different directions, a fixed questionnaire tallies the results and hands you whatever type scored highest. Small variations in how you read a question produce different outcomes. Conversational assessment resolves this by exploring contradictions directly rather than averaging them out.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">How is this different from the iEQ9 or other premium Enneagram assessments?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The iEQ9 uses conditional logic, which is a significant improvement over basic static tests. But conditional logic is still predetermined branching: the follow-up questions are fixed in advance. The Deep Mirror uses conversational AI, which means the follow-up questions are generated from what you actually said. The conversation adapts in real time rather than routing you through a decision tree someone built before you answered a single question.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Do I need to know anything about the Enneagram before I start?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">No. The conversation works whether you've spent years studying the Enneagram or have never heard of it before today. If you're new to it, the conversation will explain what's being explored and why as it goes. You don't need to understand the system to participate in the assessment.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What does the conversation actually cover?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">The conversation explores your core motivations, how you respond under stress, what drives your decisions, and where your patterns of behavior come from. It's not a surface-level quiz about preferences. It goes into the underlying motivations that define your type, which is why it takes longer than a static survey and produces a more accurate result.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What happens after I get my type?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">You receive your type and the reasoning behind it: not just a number, but an explanation of what the conversation surfaced and why it points to your type. From there, you can bring specific situations into the conversation to see how your type applies, or return as your self-awareness develops to refine your understanding further.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Is my conversation private?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Yes. Your typing conversation is private. Your responses are used to generate your assessment and are not shared.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">What if I disagree with my result?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">That's a conversation worth having. If the result doesn't fit, bring the specific parts that feel wrong back into the conversation. The Deep Mirror holds your typing open rather than locking it in. Disagreement with a result is often where the most useful exploration happens.</p>
            </div>
            <div className="border-b border-border pb-4">
              <h3 className="text-text font-medium mb-2">Does this cover the 27 Enneagram subtypes?</h3>
              <p className="text-text-secondary text-sm leading-relaxed">Yes. The conversation explores subtype as part of the typing process. The 27 subtypes, which combine the 9 core types with 3 instinctual variants, are where a lot of mistyping happens on static tests. A conversation that probes your actual motivations and instinctual patterns is better positioned to identify subtypes accurately than a questionnaire with fixed subtype-indicator questions.</p>
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
