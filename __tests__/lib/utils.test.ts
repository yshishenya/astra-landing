import { describe, it, expect } from 'vitest';
import { cn, formatNumber, formatCurrency, isValidEmail, clamp } from '@/lib/utils';

describe('Utils', () => {
  describe('cn()', () => {
    it('merges class names correctly', () => {
      expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'active', false && 'disabled')).toBe('base active');
    });

    it('handles Tailwind conflicts', () => {
      // tailwind-merge should resolve conflicts
      expect(cn('px-2', 'px-4')).toBe('px-4');
    });
  });

  describe('formatNumber()', () => {
    it('formats numbers with Russian locale by default', () => {
      // Non-breaking space (\u00A0) is used in Russian number formatting
      expect(formatNumber(1000)).toBe('1\u00A0000');
      expect(formatNumber(1000000)).toBe('1\u00A0000\u00A0000');
    });

    it('handles decimals', () => {
      // Non-breaking space for thousands, comma for decimals
      expect(formatNumber(1234.56)).toBe('1\u00A0234,56');
    });
  });

  describe('formatCurrency()', () => {
    it('formats RUB currency by default', () => {
      const result = formatCurrency(60000);
      // Non-breaking space in Russian number formatting
      expect(result).toContain('60\u00A0000');
      expect(result).toContain('₽');
    });

    it('removes decimal places for whole numbers', () => {
      const result = formatCurrency(100000);
      expect(result).not.toContain(',');
    });
  });

  describe('isValidEmail()', () => {
    it('validates correct emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.user+tag@domain.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('missing@')).toBe(false);
      expect(isValidEmail('@nodomain.com')).toBe(false);
      expect(isValidEmail('spaces in@email.com')).toBe(false);
    });
  });

  describe('clamp()', () => {
    it('clamps value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('handles edge cases', () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });
});
