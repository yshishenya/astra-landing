# Landing Page Code Examples — Ready to Use

## TABLE OF CONTENTS

1. [Hero Section Examples](#1-hero-section-examples)
2. [Bento Grid Layouts](#2-bento-grid-layouts)
3. [Glassmorphism Components](#3-glassmorphism-components)
4. [Animation Patterns](#4-animation-patterns)
5. [Gradient Effects](#5-gradient-effects)
6. [Dashboard Mockup Displays](#6-dashboard-mockup-displays)
7. [Pricing Tables](#7-pricing-tables)
8. [Complete Landing Page Template](#8-complete-landing-page-template)

---

## 1. HERO SECTION EXAMPLES

### 1.1 AI Product Hero (Vercel-style with Gradient Text)

```tsx
// components/Hero.tsx
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Animated background particles (optional) */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-gray-300">Now available in beta</span>
        </motion.div>

        {/* Headline with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Transform Your Data
          </span>
          <br />
          <span className="text-white">with AI Intelligence</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto font-light"
        >
          Harness the power of advanced machine learning to unlock insights,
          automate workflows, and make data-driven decisions in real-time.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-semibold text-lg overflow-hidden transition-transform hover:scale-105">
            <span className="relative z-10">Start Free Trial</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-semibold text-lg hover:bg-white/20 transition-colors">
            Watch Demo
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-sm text-gray-500"
        >
          Trusted by 10,000+ companies worldwide
        </motion.div>
      </div>

      {/* Hero visual (mockup or diagram) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl px-4"
      >
        <div className="relative aspect-video rounded-t-2xl overflow-hidden border-t border-x border-white/20 bg-gradient-to-b from-slate-800 to-slate-900 shadow-2xl">
          {/* Replace with your dashboard image/video */}
          <img
            src="/dashboard-preview.png"
            alt="Dashboard Preview"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
```

---

### 1.2 Linear-style Hero with Kinetic Typography

```tsx
// components/LinearHero.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LinearHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="max-w-4xl mx-auto px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="block"
          >
            Built for
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            AI teams
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-600 mb-10 font-light"
        >
          The issue tracking tool that transforms how teams work together.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 bg-black text-white rounded-lg font-medium text-lg"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Subtle animated background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
}
```

---

## 2. BENTO GRID LAYOUTS

### 2.1 Responsive Bento Grid for Features

```tsx
// components/BentoGrid.tsx
import { motion } from 'framer-motion';

const features = [
  {
    title: "AI-Powered Analytics",
    description: "Get insights in seconds with advanced machine learning algorithms.",
    icon: "📊",
    size: "large", // col-span-2 row-span-2
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Real-Time Processing",
    description: "Process data as it arrives with zero latency.",
    icon: "⚡",
    size: "small",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Secure & Compliant",
    description: "Enterprise-grade security with SOC 2 compliance.",
    icon: "🔒",
    size: "small",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    title: "Seamless Integrations",
    description: "Connect with your favorite tools in one click.",
    icon: "🔗",
    size: "medium", // col-span-2
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "Custom Dashboards",
    description: "Build dashboards that fit your workflow perfectly.",
    icon: "📱",
    size: "small",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    title: "24/7 Support",
    description: "Our team is here to help, anytime you need us.",
    icon: "💬",
    size: "small",
    gradient: "from-pink-500 to-rose-500"
  },
];

export default function BentoGrid() {
  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'col-span-1 row-span-2 md:col-span-2 md:row-span-2';
      case 'medium':
        return 'col-span-1 md:col-span-2';
      default:
        return 'col-span-1';
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              succeed
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed for modern AI teams
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-fr">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${getSizeClasses(feature.size)} group`}
            >
              <div className="relative h-full p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl overflow-hidden">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 flex-grow">{feature.description}</p>

                  {/* Arrow on hover */}
                  <div className="mt-4 text-gray-400 group-hover:text-gray-900 transition-colors">
                    <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 2.2 Apple-style Bento Grid with Images

```tsx
// components/AppleBento.tsx
export default function AppleBento() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {/* Large feature - Hero */}
          <div className="md:col-span-4 md:row-span-2 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-10 flex flex-col justify-between min-h-[500px]">
            <div>
              <h3 className="text-5xl font-bold mb-4">AI-First Platform</h3>
              <p className="text-xl opacity-90">
                Built from the ground up for artificial intelligence workloads.
              </p>
            </div>
            <div className="mt-8">
              <img src="/dashboard.png" alt="Dashboard" className="rounded-xl shadow-2xl" />
            </div>
          </div>

          {/* Small features */}
          <div className="md:col-span-2 rounded-3xl bg-gray-900 p-8 flex flex-col justify-center min-h-[240px]">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Process millions of records per second.</p>
          </div>

          <div className="md:col-span-2 rounded-3xl bg-gray-900 p-8 flex flex-col justify-center min-h-[240px]">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold mb-2">Bank-Level Security</h3>
            <p className="text-gray-400">Your data is encrypted end-to-end.</p>
          </div>

          {/* Medium feature */}
          <div className="md:col-span-3 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-10 min-h-[300px]">
            <h3 className="text-3xl font-bold mb-4">Real-Time Collaboration</h3>
            <p className="text-lg opacity-90 mb-6">
              Work together seamlessly with your team, anywhere in the world.
            </p>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-teal-600" />
              ))}
            </div>
          </div>

          <div className="md:col-span-3 rounded-3xl bg-gradient-to-br from-orange-600 to-red-600 p-10 min-h-[300px]">
            <h3 className="text-3xl font-bold mb-4">Advanced Analytics</h3>
            <p className="text-lg opacity-90">
              Gain insights that matter with powerful AI-driven analytics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 3. GLASSMORPHISM COMPONENTS

### 3.1 Pricing Cards with Glassmorphism

```tsx
// components/PricingGlass.tsx
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    features: ['Up to 10,000 records', 'Basic analytics', 'Email support', '2 team members'],
    highlighted: false
  },
  {
    name: 'Pro',
    price: '$99',
    features: ['Unlimited records', 'Advanced analytics', 'Priority support', 'Unlimited team members', 'Custom integrations'],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Everything in Pro', 'Dedicated account manager', 'SLA guarantee', 'Custom contract', 'Advanced security'],
    highlighted: false
  }
];

export default function PricingGlass() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl top-0 left-1/4" />
        <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl bottom-0 right-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-300">
            Choose the plan that works best for you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative ${plan.highlighted ? 'md:scale-105' : ''}`}
            >
              {/* Glass card */}
              <div className={`
                relative h-full p-8 rounded-2xl
                bg-white/10 backdrop-blur-md
                border ${plan.highlighted ? 'border-white/40' : 'border-white/20'}
                shadow-xl
                ${plan.highlighted ? 'ring-2 ring-white/50' : ''}
              `}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-sm font-semibold text-white">
                    Most Popular
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-5xl font-bold text-white mb-1">{plan.price}</div>
                  {plan.price !== 'Custom' && (
                    <div className="text-gray-300">per month</div>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3 text-gray-200">
                      <svg className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`
                  w-full py-3 rounded-lg font-semibold transition-all
                  ${plan.highlighted
                    ? 'bg-white text-purple-900 hover:bg-gray-100'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                  }
                `}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 3.2 Feature Cards with Glass Effect

```tsx
// components/FeatureCards.tsx
export default function FeatureCards() {
  return (
    <section className="relative py-24">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl mb-4">
                  🚀
                </div>
                <h3 className="text-2xl font-bold mb-3">Feature {i}</h3>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 4. ANIMATION PATTERNS

### 4.1 Scroll-Triggered Section Reveals

```tsx
// components/ScrollReveal.tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Usage:
// <ScrollReveal>
//   <YourComponent />
// </ScrollReveal>
```

---

### 4.2 Staggered List Animation

```tsx
// components/StaggeredList.tsx
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 }
};

export default function StaggeredList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-4"
    >
      {items.map((text, i) => (
        <motion.li
          key={i}
          variants={item}
          className="flex items-center gap-3 text-lg"
        >
          <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {text}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

---

### 4.3 GSAP Scroll-Triggered Timeline

```tsx
// components/GSAPTimeline.tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPTimeline() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24">
      <div ref={contentRef} className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="feature-card p-8 bg-white rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Feature {i}</h3>
              <p className="text-gray-600">Description here...</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 4.4 Parallax Hero Background

```tsx
// components/ParallaxHero.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background with parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900" />
        <div className="absolute w-full h-full opacity-30">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse" />
          <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex items-center justify-center text-white text-center px-4"
      >
        <div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            Your Content Here
          </h1>
          <p className="text-xl md:text-2xl text-gray-300">
            Subtitle with parallax effect
          </p>
        </div>
      </motion.div>
    </section>
  );
}
```

---

## 5. GRADIENT EFFECTS

### 5.1 Animated Gradient Text (Vercel-style)

```tsx
// components/AnimatedGradientText.tsx
export default function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
        {children}
      </span>
      <span className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        {children}
      </span>
    </span>
  );
}

// Add to tailwind.config.js:
// theme: {
//   extend: {
//     animation: {
//       'gradient': 'gradient 3s ease infinite',
//     },
//     keyframes: {
//       gradient: {
//         '0%, 100%': {
//           'background-size': '200% 200%',
//           'background-position': 'left center'
//         },
//         '50%': {
//           'background-size': '200% 200%',
//           'background-position': 'right center'
//         },
//       },
//     },
//   },
// },
```

---

### 5.2 Gradient Button with Hover Effect

```tsx
// components/GradientButton.tsx
export default function GradientButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative px-8 py-4 rounded-lg font-semibold text-white overflow-hidden transition-transform hover:scale-105">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600" />

      {/* Hover gradient (shifted) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>

      <span className="relative z-10">{children}</span>
    </button>
  );
}
```

---

### 5.3 Mesh Gradient Background

```tsx
// components/MeshGradient.tsx
export default function MeshGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute w-full h-full">
        {/* Multiple gradient blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}

// Add to tailwind.config.js:
// theme: {
//   extend: {
//     animation: {
//       blob: "blob 7s infinite",
//     },
//     keyframes: {
//       blob: {
//         "0%": {
//           transform: "translate(0px, 0px) scale(1)",
//         },
//         "33%": {
//           transform: "translate(30px, -50px) scale(1.1)",
//         },
//         "66%": {
//           transform: "translate(-20px, 20px) scale(0.9)",
//         },
//         "100%": {
//           transform: "tranlate(0px, 0px) scale(1)",
//         },
//       },
//     },
//   },
// },
```

---

## 6. DASHBOARD MOCKUP DISPLAYS

### 6.1 Floating Dashboard with Parallax

```tsx
// components/DashboardMockup.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function DashboardMockup() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          style={{ y, rotateX }}
          className="relative perspective-1000"
        >
          {/* Main dashboard */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/dashboard-main.png"
              alt="Dashboard"
              className="w-full"
            />
          </div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="absolute -left-8 top-1/4 w-64 bg-white rounded-xl shadow-xl p-4 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <div className="text-sm font-semibold">Real-time Processing</div>
            </div>
            <div className="text-3xl font-bold">99.9%</div>
            <div className="text-sm text-gray-500">Uptime</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="absolute -right-8 bottom-1/4 w-64 bg-white rounded-xl shadow-xl p-4 border border-gray-200"
          >
            <div className="text-sm text-gray-500 mb-2">Active Users</div>
            <div className="text-3xl font-bold">12,549</div>
            <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

### 6.2 3D Perspective Dashboard Showcase

```tsx
// components/Dashboard3D.tsx
import { motion } from 'framer-motion';

export default function Dashboard3D() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            See it in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">action</span>
          </h2>
        </div>

        <div className="relative" style={{ perspective: '2000px' }}>
          {/* Desktop view (center) */}
          <motion.div
            initial={{ opacity: 0, rotateY: -20 }}
            whileInView={{ opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative z-20 mx-auto max-w-5xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-300">
              <div className="bg-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 text-center text-sm text-gray-600">
                  dashboard.yourapp.com
                </div>
              </div>
              <img
                src="/dashboard-desktop.png"
                alt="Desktop Dashboard"
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Mobile view (left, behind) */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: 30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 15 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute left-0 top-1/4 z-10 w-64"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border-8 border-gray-900">
              <img
                src="/dashboard-mobile.png"
                alt="Mobile Dashboard"
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Tablet view (right, behind) */}
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: -30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: -15 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute right-0 top-1/3 z-10 w-80"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-gray-800">
              <img
                src="/dashboard-tablet.png"
                alt="Tablet Dashboard"
                className="w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

## 7. PRICING TABLES

### 7.1 Toggle Pricing (Monthly/Annual)

```tsx
// components/PricingToggle.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PricingToggle() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 29,
      annualPrice: 290,
      features: ['10,000 records', 'Basic analytics', 'Email support']
    },
    {
      name: 'Pro',
      monthlyPrice: 99,
      annualPrice: 990,
      features: ['Unlimited records', 'Advanced analytics', 'Priority support', 'Custom integrations'],
      popular: true
    },
    {
      name: 'Enterprise',
      monthlyPrice: null,
      annualPrice: null,
      features: ['Everything in Pro', 'Dedicated support', 'SLA', 'Custom contract']
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-lg ${!annual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative w-16 h-8 bg-gray-300 rounded-full transition-colors"
            style={{ backgroundColor: annual ? '#8B5CF6' : '#D1D5DB' }}
          >
            <motion.div
              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full"
              animate={{ x: annual ? 32 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-lg ${annual ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
            Annual
            <span className="ml-2 text-sm text-emerald-600">(Save 20%)</span>
          </span>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.popular
                  ? 'border-purple-500 shadow-xl scale-105'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-500 text-white rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

              <div className="mb-6">
                {plan.monthlyPrice ? (
                  <>
                    <span className="text-5xl font-bold">
                      ${annual ? plan.annualPrice / 12 : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-500">/month</span>
                    {annual && (
                      <div className="text-sm text-gray-500 mt-1">
                        Billed annually (${plan.annualPrice}/year)
                      </div>
                    )}
                  </>
                ) : (
                  <span className="text-5xl font-bold">Custom</span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`
                w-full py-3 rounded-lg font-semibold transition-all
                ${plan.popular
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }
              `}>
                {plan.monthlyPrice ? 'Get Started' : 'Contact Sales'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 8. COMPLETE LANDING PAGE TEMPLATE

### 8.1 Full Page Structure

```tsx
// app/page.tsx
import Hero from '@/components/Hero';
import BentoGrid from '@/components/BentoGrid';
import DashboardMockup from '@/components/DashboardMockup';
import PricingGlass from '@/components/PricingGlass';
import SocialProof from '@/components/SocialProof';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <SocialProof />
      <BentoGrid />
      <DashboardMockup />
      <PricingGlass />
      <CTA />
      <Footer />
    </main>
  );
}
```

---

### 8.2 Social Proof Section

```tsx
// components/SocialProof.tsx
import { motion } from 'framer-motion';

const logos = [
  { name: 'Company 1', url: '/logos/1.svg' },
  { name: 'Company 2', url: '/logos/2.svg' },
  { name: 'Company 3', url: '/logos/3.svg' },
  { name: 'Company 4', url: '/logos/4.svg' },
  { name: 'Company 5', url: '/logos/5.svg' },
];

export default function SocialProof() {
  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm uppercase tracking-wide text-gray-500 font-semibold">
            Trusted by industry leaders
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="hover:opacity-100 transition-opacity"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="h-8 w-auto"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### 8.3 Final CTA Section

```tsx
// components/CTA.tsx
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600" />
      <MeshGradient />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl mb-10 text-gray-100">
            Join thousands of teams already using our platform to build better products.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-900 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-lg font-semibold text-lg hover:bg-white/30 transition-colors">
              Schedule Demo
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-200">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Import MeshGradient from earlier in this document
```

---

## USAGE INSTRUCTIONS

### Installation:

```bash
# Create Next.js project
npx create-next-app@latest your-landing-page --typescript --tailwind --app

# Install dependencies
npm install framer-motion gsap three

# Optional: Install UI components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

### File Structure:

```
your-landing-page/
├── app/
│   ├── page.tsx (main landing page)
│   └── layout.tsx
├── components/
│   ├── Hero.tsx
│   ├── BentoGrid.tsx
│   ├── PricingGlass.tsx
│   ├── DashboardMockup.tsx
│   ├── SocialProof.tsx
│   ├── CTA.tsx
│   └── Footer.tsx
├── public/
│   ├── dashboard-preview.png
│   ├── logos/
│   └── mockups/
└── tailwind.config.js
```

### Tailwind Config Additions:

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## PERFORMANCE OPTIMIZATION

### Image Optimization:

```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/dashboard.png"
  alt="Dashboard"
  width={1920}
  height={1080}
  quality={90}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Lazy Load Animations:

```tsx
// Only animate when in viewport
const { ref, inView } = useInView({
  triggerOnce: true,
  threshold: 0.1
});
```

### Reduce Motion for Accessibility:

```tsx
// Add to global CSS
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## READY TO USE!

All components are production-ready. Simply:

1. Copy the components you need
2. Adjust colors/content to your brand
3. Add your images/mockups
4. Deploy to Vercel

**Good luck building your amazing landing page! 🚀**
