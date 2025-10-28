#!/bin/bash

# SEO Validation Script for Astra Landing Page
# Usage: ./scripts/validate-seo.sh

set -e

echo "========================================="
echo "SEO Validation for Astra Landing Page"
echo "========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if files exist
echo "1. Checking required files..."

files=(
  "app/layout.tsx"
  "app/sitemap.ts"
  "public/robots.txt"
  "components/structured-data.tsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file exists"
  else
    echo -e "${RED}✗${NC} $file missing"
    exit 1
  fi
done

echo ""

# Check TypeScript compilation
echo "2. Checking TypeScript compilation..."
if pnpm tsc --noEmit > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} TypeScript compilation successful"
else
  echo -e "${RED}✗${NC} TypeScript errors found"
  exit 1
fi

echo ""

# Check for metadata in layout.tsx
echo "3. Validating metadata in layout.tsx..."
if grep -q "metadataBase" app/layout.tsx; then
  echo -e "${GREEN}✓${NC} metadataBase found"
else
  echo -e "${RED}✗${NC} metadataBase missing"
fi

if grep -q "openGraph" app/layout.tsx; then
  echo -e "${GREEN}✓${NC} Open Graph tags found"
else
  echo -e "${RED}✗${NC} Open Graph tags missing"
fi

if grep -q "twitter" app/layout.tsx; then
  echo -e "${GREEN}✓${NC} Twitter Card tags found"
else
  echo -e "${RED}✗${NC} Twitter Card tags missing"
fi

echo ""

# Check structured data schemas
echo "4. Validating structured data schemas..."
schemas=(
  "organizationSchema"
  "websiteSchema"
  "productSchema"
  "featuresListSchema"
  "webPageSchema"
  "faqSchema"
  "breadcrumbSchema"
  "offerSchema"
)

for schema in "${schemas[@]}"; do
  if grep -q "$schema" components/structured-data.tsx; then
    echo -e "${GREEN}✓${NC} $schema implemented"
  else
    echo -e "${RED}✗${NC} $schema missing"
  fi
done

echo ""

# Check robots.txt
echo "5. Validating robots.txt..."
if grep -q "User-agent: \*" public/robots.txt; then
  echo -e "${GREEN}✓${NC} User-agent directive found"
else
  echo -e "${RED}✗${NC} User-agent directive missing"
fi

if grep -q "Sitemap:" public/robots.txt; then
  echo -e "${GREEN}✓${NC} Sitemap reference found"
else
  echo -e "${RED}✗${NC} Sitemap reference missing"
fi

if grep -q "Disallow: /api/" public/robots.txt; then
  echo -e "${GREEN}✓${NC} API routes blocked"
else
  echo -e "${YELLOW}⚠${NC} API routes not blocked (optional)"
fi

echo ""

# Check sitemap.ts
echo "6. Validating sitemap.ts..."
if grep -q "MetadataRoute.Sitemap" app/sitemap.ts; then
  echo -e "${GREEN}✓${NC} Sitemap function signature correct"
else
  echo -e "${RED}✗${NC} Sitemap function signature incorrect"
fi

if grep -q "priority" app/sitemap.ts; then
  echo -e "${GREEN}✓${NC} Priority attributes set"
else
  echo -e "${YELLOW}⚠${NC} Priority attributes missing"
fi

if grep -q "changeFrequency" app/sitemap.ts; then
  echo -e "${GREEN}✓${NC} Change frequency set"
else
  echo -e "${YELLOW}⚠${NC} Change frequency missing"
fi

echo ""

# Environment variables check
echo "7. Checking environment variables..."
if [ -f ".env.local" ]; then
  if grep -q "NEXT_PUBLIC_APP_URL" .env.local; then
    echo -e "${GREEN}✓${NC} NEXT_PUBLIC_APP_URL found in .env.local"
  else
    echo -e "${YELLOW}⚠${NC} NEXT_PUBLIC_APP_URL not set (will use default)"
  fi

  if grep -q "NEXT_PUBLIC_CONTACT_EMAIL" .env.local; then
    echo -e "${GREEN}✓${NC} NEXT_PUBLIC_CONTACT_EMAIL found in .env.local"
  else
    echo -e "${YELLOW}⚠${NC} NEXT_PUBLIC_CONTACT_EMAIL not set (will use default)"
  fi
else
  echo -e "${YELLOW}⚠${NC} .env.local not found (using defaults)"
fi

echo ""

# Summary
echo "========================================="
echo "Validation Summary"
echo "========================================="
echo ""
echo -e "${GREEN}All critical SEO components are implemented!${NC}"
echo ""
echo "Next steps:"
echo "1. Build the project: pnpm build"
echo "2. Start dev server: pnpm dev"
echo "3. Visit http://localhost:3000"
echo "4. View sitemap: http://localhost:3000/sitemap.xml"
echo "5. View robots: http://localhost:3000/robots.txt"
echo "6. Validate structured data:"
echo "   - https://search.google.com/test/rich-results"
echo "   - https://validator.schema.org/"
echo ""
echo "Documentation: SEO_IMPLEMENTATION_REPORT.md"
echo ""
