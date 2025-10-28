# OG Image Conversion Guide

## Overview

The Open Graph image reference has been updated from SVG to PNG format for better social media compatibility. An SVG template has been created at `public/og-image-temp.svg` that needs to be converted to PNG.

## Why PNG Instead of SVG?

Social media platforms (Facebook, Twitter, LinkedIn) have better support for PNG/JPG formats:
- More consistent rendering across platforms
- Better thumbnail generation
- Wider compatibility
- Faster loading on social media cards

## Conversion Options

### Option 1: Online Converter (Fastest)
1. Visit https://svgtopng.com or https://cloudconvert.com
2. Upload `public/og-image-temp.svg`
3. Set dimensions: **1200x630 pixels**
4. Download as `og-image.png`
5. Place in `public/og-image.png`

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick (if not installed)
# Ubuntu/Debian: sudo apt-get install imagemagick
# macOS: brew install imagemagick

# Convert SVG to PNG
convert public/og-image-temp.svg -resize 1200x630 public/og-image.png
```

### Option 3: Using Figma/Adobe Illustrator
1. Open `public/og-image-temp.svg` in Figma or Illustrator
2. Export as PNG
3. Dimensions: 1200x630px
4. Quality: 90-100%
5. Save as `public/og-image.png`

### Option 4: Using Node.js (Sharp)
```bash
# Install sharp
pnpm add -D sharp

# Create conversion script
node -e "const sharp = require('sharp'); sharp('public/og-image-temp.svg').resize(1200, 630).png().toFile('public/og-image.png').then(() => console.log('Done'));"
```

## Design Specifications

The OG image should include:
- **Dimensions:** 1200x630 pixels (Facebook/Twitter recommended)
- **Format:** PNG (preferred) or JPG
- **File size:** < 5MB (ideally < 1MB)
- **Background:** Gradient (blue to cyan)
- **Content:**
  - Astra logo/brand name
  - Tagline: "AI-карьерный консультант"
  - Key stats: "90 сек", "99.9%", "162x ROI"
  - Clean, professional design

## Current Template

The template at `public/og-image-temp.svg` includes:
- Gradient background (#1e3a8a → #3b82f6 → #06b6d4)
- Astra brand name in large font
- Subtitle with key features
- 3 glassmorphism stat cards
- AI network pattern effects

## Verification

After conversion, verify the image:

1. **File exists:** `ls -lh public/og-image.png`
2. **Dimensions:** Should be exactly 1200x630 pixels
3. **File size:** Should be < 1MB for fast loading
4. **Visual quality:** Check that text is crisp and readable

## Testing Social Media Preview

Test the OG image on social platforms:

### Facebook Debugger
https://developers.facebook.com/tools/debug/

### Twitter Card Validator
https://cards-dev.twitter.com/validator

### LinkedIn Post Inspector
https://www.linkedin.com/post-inspector/

## Cleanup

After successful conversion:
```bash
# Remove the temporary SVG template
rm public/og-image-temp.svg
```

## References Updated

The following files have been updated to reference `og-image.png`:
- `app/layout.tsx` - Open Graph images array
- `app/layout.tsx` - Twitter card images array

## Troubleshooting

### Image not showing on social media?
- Clear Facebook cache: https://developers.facebook.com/tools/debug/
- Wait 1-2 minutes for cache to update
- Verify file is publicly accessible

### Image looks blurry?
- Ensure dimensions are exactly 1200x630
- Use PNG format (not JPG) for crisp text
- Export at 2x scale (2400x1260) then resize down

### File too large?
- Use PNG-8 instead of PNG-24
- Compress with TinyPNG: https://tinypng.com
- Or use `pngquant`: `pngquant public/og-image.png`

## Status

✅ SVG template created
✅ Layout.tsx updated to reference PNG
⏳ PNG conversion pending (manual step)
⏳ SVG template removal pending

Once the PNG is created, the setup is complete!
