/**
 * Type definitions for Astra Landing Page
 */

export interface PricingPlan {
  id: string;
  name: string;
  price: number | null;
  period: string;
  description: string;
  recommended: boolean;
  features: string[];
  cta: string;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface PainPoint {
  stat: string;
  title: string;
  description: string;
  cost: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  companySize: string;
  message: string;
}

export interface DemoFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  preferredTime: string;
}

export interface ROICalculatorInput {
  companySize: number;
  currentTurnover: number;
  currentHireTime: number;
}

export interface ROICalculatorResult {
  currentCost: number;
  potentialSavings: number;
  roi: number;
  paybackDays: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface UseCase {
  id: string;
  title: string;
  problem: string;
  solution: string;
  result: string;
  icon: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
