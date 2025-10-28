import { describe, it, expect } from 'vitest';
import {
  contactFormEmailToTeam,
  demoBookingEmailToTeam,
  demoBookingConfirmationEmail,
} from '@/lib/email-templates';

describe('Email Templates - XSS Protection', () => {
  describe('contactFormEmailToTeam()', () => {
    it('escapes HTML in name field', () => {
      const html = contactFormEmailToTeam({
        name: '<script>alert("XSS")</script>',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test message',
      });

      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('escapes HTML in company field', () => {
      const html = contactFormEmailToTeam({
        name: 'Test User',
        email: 'test@example.com',
        company: '<img src=x onerror=alert(1)>',
        message: 'Test message',
      });

      expect(html).not.toContain('<img src=x');
      expect(html).toContain('&lt;img');
    });

    it('escapes HTML in message field', () => {
      const html = contactFormEmailToTeam({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: '<b>Bold</b> and <script>evil()</script>',
      });

      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;b&gt;Bold&lt;/b&gt;');
      expect(html).toContain('&lt;script&gt;');
    });

    it('preserves line breaks in message', () => {
      const html = contactFormEmailToTeam({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Line 1\nLine 2\nLine 3',
      });

      expect(html).toContain('Line 1<br>Line 2<br>Line 3');
    });

    it('handles optional companySize field', () => {
      const htmlWithSize = contactFormEmailToTeam({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test',
        companySize: '50-100',
      });

      const htmlWithoutSize = contactFormEmailToTeam({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        message: 'Test',
      });

      expect(htmlWithSize).toContain('50-100');
      expect(htmlWithoutSize).not.toContain('Размер компании');
    });

    it('escapes special characters', () => {
      const html = contactFormEmailToTeam({
        name: 'User & Co.',
        email: 'test@example.com',
        company: 'Company "Name"',
        message: "Message with 'quotes'",
      });

      expect(html).toContain('&amp;');
      expect(html).toContain('&quot;');
      expect(html).toContain('&#039;');
    });
  });

  describe('demoBookingEmailToTeam()', () => {
    it('escapes HTML in all fields', () => {
      const html = demoBookingEmailToTeam({
        name: '<script>alert(1)</script>',
        email: 'test@example.com',
        company: '<img src=x>',
        phone: '<b>123</b>',
        preferredTime: '<i>Time</i>',
        companySize: '<u>Size</u>',
      });

      expect(html).not.toContain('<script>');
      expect(html).not.toContain('<img src=x>');
      expect(html).toContain('&lt;script&gt;');
      expect(html).toContain('&lt;img');
      expect(html).toContain('&lt;b&gt;123&lt;/b&gt;');
    });

    it('handles optional fields correctly', () => {
      const htmlMinimal = demoBookingEmailToTeam({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
      });

      const htmlFull = demoBookingEmailToTeam({
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        phone: '1234567890',
        preferredTime: '2024-12-01',
        companySize: '50-100',
      });

      expect(htmlMinimal).not.toContain('Телефон');
      expect(htmlFull).toContain('Телефон');
      expect(htmlFull).toContain('1234567890');
    });
  });

  describe('demoBookingConfirmationEmail()', () => {
    it('escapes user name in greeting', () => {
      const html = demoBookingConfirmationEmail(
        {
          name: '<script>alert(1)</script>',
          email: 'test@example.com',
          company: 'Test Company',
        },
        'contact@example.com',
        'https://example.com'
      );

      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;');
    });

    it('escapes contact email and app URL', () => {
      const html = demoBookingConfirmationEmail(
        {
          name: 'Test User',
          email: 'test@example.com',
          company: 'Test Company',
        },
        '<script>evil@example.com</script>',
        '<img src=x>'
      );

      expect(html).not.toContain('<script>');
      expect(html).not.toContain('<img src=x>');
      expect(html).toContain('&lt;script&gt;');
      expect(html).toContain('&lt;img');
    });

    it('includes contact information', () => {
      const html = demoBookingConfirmationEmail(
        {
          name: 'Test User',
          email: 'test@example.com',
          company: 'Test Company',
        },
        'contact@example.com',
        'https://example.com'
      );

      expect(html).toContain('contact@example.com');
      expect(html).toContain('https://example.com');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty strings', () => {
      const html = contactFormEmailToTeam({
        name: '',
        email: '',
        company: '',
        message: '',
      });

      expect(html).toBeDefined();
      expect(html.length).toBeGreaterThan(0);
    });

    it('handles very long input', () => {
      const longText = 'A'.repeat(10000);
      const html = contactFormEmailToTeam({
        name: longText,
        email: 'test@example.com',
        company: longText,
        message: longText,
      });

      expect(html).toContain(longText);
    });

    it('handles unicode characters', () => {
      const html = contactFormEmailToTeam({
        name: '你好',
        email: 'test@example.com',
        company: '株式会社',
        message: 'Привет мир 🌍',
      });

      expect(html).toContain('你好');
      expect(html).toContain('株式会社');
      expect(html).toContain('Привет мир 🌍');
    });
  });
});
