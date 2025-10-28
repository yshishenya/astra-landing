# Asset Placeholders

## Missing Assets - Action Required

The following placeholder assets have been created and need to be replaced with actual brand assets:

### 1. Logo: `astra.png`
**Current:** Placeholder SVG (`astra.svg`)  
**Required:** PNG logo (recommended 512x512px or higher)  
**Usage:** Header, Footer, Metadata  
**Source:** Brand design team

**To replace:**
1. Get the official Astra logo from the brand team
2. Export as PNG (512x512px minimum, transparent background)
3. Save as `public/astra.png`
4. Optionally keep SVG version for better scalability

### 2. Open Graph Image: `og-image.png`
**Current:** ❌ Not created (no placeholder)  
**Required:** PNG image (1200x630px exactly)  
**Usage:** Social media sharing (LinkedIn, Twitter, Facebook)  
**Content:** Should include:
- Astra logo
- Tagline: "AI-карьерный помощник"
- Key metric: "90 секунд анализа"
- Brand colors (cyan, teal, blue gradient)

**To create:**
1. Use Figma or Canva template (1200x630px)
2. Add Astra branding and key message
3. Export as PNG
4. Save as `public/og-image.png`

**Design tools:**
- Figma: https://www.figma.com/templates/og-image/
- Canva: https://www.canva.com/create/og-images/
- Manual: Use design system from `.memory_bank/design_system.md`

### 3. Favicon (Optional)
**File:** `public/favicon.ico`  
**Size:** 32x32px and 16x16px  
**Generator:** https://realfavicongenerator.net/

---

## Temporary Solution

For development, you can use the SVG logo:

```tsx
// In components, import the SVG instead:
<Image src="/astra.svg" alt="Astra" width={100} height={100} />
```

**Note:** Remember to replace with actual PNG assets before production deployment!
