# Astra Landing Page - Mockup Design Concept
**Полное техническое руководство по созданию визуальных материалов**

---

**Версия:** 1.0
**Дата создания:** 29 октября 2025
**Статус:** Ready for Implementation
**Цель:** Создание всех mockup-визуализаций для 11 секций landing page

---

## Оглавление

1. [Цветовая Палитра и Design System](#1-цветовая-палитра-и-design-system)
2. [Мокапы по Секциям (11 секций)](#2-мокапы-по-секциям-11-секций)
3. [Технические Спецификации](#3-технические-спецификации)
4. [Инструменты и Ресурсы](#4-инструменты-и-ресурсы)
5. [Пошаговый План Создания](#5-пошаговый-план-создания)
6. [Файловая Структура и Naming](#6-файловая-структура-и-naming)

---

## 1. Цветовая Палитра и Design System

### 1.1 Primary Colors (на основе аватара Astra)

```css
/* Основная палитра из аватара Astra */
--cyan-primary: #22d3ee;      /* Основной cyan из glowing effects */
--teal-accent: #0ea5e9;        /* Teal из network connections */
--blue-deep: #2563eb;          /* Deep blue из holographic UI */
--purple-tech: #7928ca;        /* Purple для AI-акцентов */
--pink-electric: #ff0080;      /* Electric pink для highlights */

/* Нейтральные цвета */
--dark-navy: #0a3157;          /* Темный фон для tech sections */
--pure-white: #ffffff;         /* Основной светлый фон */
--gray-50: #f9fafb;            /* Светлый фон для секций */
--gray-900: #111827;           /* Текст темный */
--gray-600: #4b5563;           /* Вторичный текст */
```

### 1.2 Gradient Definitions

```css
/* Gradient 1: Hero Background */
.gradient-hero {
  background: linear-gradient(135deg,
    #22d3ee 0%,    /* Cyan */
    #0ea5e9 35%,   /* Teal */
    #2563eb 70%,   /* Blue */
    #7928ca 100%   /* Purple */
  );
}

/* Gradient 2: CTA Buttons */
.gradient-cta {
  background: linear-gradient(90deg,
    #0ea5e9 0%,    /* Teal */
    #22d3ee 100%   /* Cyan */
  );
}

/* Gradient 3: Accent Elements */
.gradient-accent {
  background: linear-gradient(135deg,
    #7928ca 0%,    /* Purple */
    #ff0080 100%   /* Pink */
  );
}

/* Gradient 4: Data Visualization */
.gradient-data {
  background: linear-gradient(180deg,
    #22d3ee 0%,    /* Cyan */
    rgba(34, 211, 238, 0.1) 100%
  );
}

/* Gradient 5: AI Network Background */
.gradient-network {
  background: radial-gradient(circle at 50% 50%,
    rgba(34, 211, 238, 0.15) 0%,
    rgba(37, 99, 235, 0.05) 50%,
    rgba(10, 49, 87, 0.8) 100%
  );
}
```

### 1.3 Glassmorphism Parameters

```css
/* Glassmorphic Card (основной стиль для карточек) */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 1px 0 0 rgba(255, 255, 255, 0.5);
  border-radius: 16px;
}

/* Glassmorphic Card с gradient border */
.glass-card-gradient {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(25px);
  border: 2px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.glass-card-gradient::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(135deg, #22d3ee, #7928ca);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

/* Glow Effect для AI-элементов */
.ai-glow {
  box-shadow:
    0 0 20px rgba(34, 211, 238, 0.4),
    0 0 40px rgba(34, 211, 238, 0.2),
    0 0 60px rgba(34, 211, 238, 0.1);
}
```

---

## 2. Мокапы по Секциям (11 секций)

### 2.1 HERO SECTION

#### Концепция
Главный экран показывает AI-dashboard с анимированным анализом резюме в реальном времени. 3D rotating mockup MacBook Pro с живым интерфейсом + AI particle network на фоне.

#### Что показывать

**Основной элемент: MacBook Pro 16" Mockup**
- **Содержимое экрана:** Dashboard с активным AI-анализом
  - Левая панель: uploaded resume preview
  - Центр: 6 методов анализа (карточки с progress bars)
  - Правая панель: live AI insights (текст генерируется)
  - Снизу: Timeline 0-90 секунд с анимацией

**Дополнительные элементы:**
- iPhone 14 Pro mockup (плавает справа): Mobile версия dashboard
- Floating UI cards: статистика (99.9% quality, 90 sec, 162x ROI)
- AI particle network на фоне (subtle, cyan/blue)

#### Формат и Стиль

```yaml
Device: MacBook Pro 16" Space Gray
Angle: 15° rotation (floating effect)
Screen Size: 3456 × 2234 px (actual resolution)
Style: Rotato 3D animated mockup
Background: Gradient-network с AI particles
Glow: Cyan glow around screen edges

iPhone 14 Pro:
  Position: Right side, slight overlap
  Angle: 10° tilt
  Screen: Same dashboard, mobile responsive
  Size: 1290 × 2796 px
```

#### Эффекты

- **Primary glow:** Cyan (#22d3ee) вокруг MacBook экрана
- **Particle system:** 200-300 particles, cyan/teal, slow drift
- **Screen animation:** Progress bars filling, text typing effect
- **Floating cards:** Gentle up-down motion (5px, 3s duration)

#### Размеры и Export

```yaml
Final Output:
  - Format: PNG (transparent background)
  - Resolution: 3840 × 2160 px (4K)
  - Optimization: WebP version для web
  - File size target: < 500 KB

Individual Elements:
  - MacBook mockup: 2400 × 1600 px
  - iPhone mockup: 800 × 1600 px
  - Floating cards: 400 × 300 px each
  - Particle overlay: 3840 × 2160 px (separate layer)
```

#### Инструменты для создания

1. **Rotato** - 3D device mockups с анимацией
2. **Figma** - Dashboard UI design
3. **Spline** или **Three.js** - AI particle network
4. **After Effects** (опционально) - Финальная композиция

---

### 2.2 TRUST BAR (Logos Section)

#### Концепция
Строка логотипов клиентов в glassmorphic container. Эффект grayscale → color on hover.

#### Что показывать

**Company Logos (5-7 штук):**
- Тинькофф Банк
- Яндекс
- Сбер
- МТС
- VK (Mail.ru Group)
- Ozon
- Wildberries

#### Формат

```yaml
Container:
  Style: Glassmorphic horizontal bar
  Background: rgba(255, 255, 255, 0.05)
  Border: 1px solid rgba(255, 255, 255, 0.1)
  Padding: 40px 60px

Logos:
  Size: 120 × 60 px each
  Format: SVG (scalable)
  Initial state: Grayscale 100%, opacity 60%
  Hover state: Full color, opacity 100%
  Spacing: 80px gap between
  Animation: Smooth 0.3s transition
```

#### Эффекты

- Infinite horizontal scroll (auto-play)
- Pause on hover
- Subtle glow on hover (cyan, 5px blur)

#### Размеры

```yaml
Desktop: 1440 × 160 px
Tablet: 768 × 140 px
Mobile: 375 × 120 px (2 logos visible, scroll)
```

---

### 2.3 PROBLEM STATEMENT (Pain Section)

#### Концепция
3 карточки с болевыми точками. Каждая карточка показывает "before Astra" visualization.

#### Что показывать

**Pain Card 1: Невидимость пути развития**
- **Visual:** Confusion map illustration
  - Сотрудник в центре
  - Вокруг: размытые иконки ролей с "?"
  - LinkedIn logo стрелка вправо (уход из компании)
  - Цвет: Orange-red тона (проблема)

**Pain Card 2: Время на анализ**
- **Visual:** Clock comparison infographic
  - Слева: 2-3 часа (большие часы)
  - Справа: 90 секунд (маленькие часы с молнией)
  - Progress bars показывают разницу
  - Цвет: Orange тона

**Pain Card 3: Стоимость текучки**
- **Visual:** Money drain visualization
  - Воронка с деньгами (рубли вылетают)
  - Калькулятор: 31.25M руб/год
  - Icon сотрудников уходящих
  - Цвет: Red-orange gradient

#### Формат

```yaml
Card Size: 400 × 500 px each
Layout: Bento-style asymmetric (но balanced)
Background: White card с тенью
Icon Area: 200 × 200 px top section
Content Area: 400 × 300 px bottom

Visual Style:
  - Flat illustration style (не 3D)
  - Orange-red palette для проблем
  - Icons: 80 × 80 px, stroke-based
  - Typography: Bold headlines, regular body
```

#### Эффекты

- Hover: Card lift (translateY -8px)
- Hover: Shadow increase (0 20px 40px rgba(0,0,0,0.15))
- Icon animation: Subtle pulse на hover

---

### 2.4 SOLUTION OVERVIEW (How It Works - 4 Steps)

#### Концепция
4-step animated timeline с screenshots реального UI для каждого этапа.

#### Что показывать

**Step 1: Upload Interface**
- **Screenshot:** Upload screen
  - Drag-and-drop area (dashed border)
  - File formats icons (PDF, DOCX, TXT)
  - Upload button (gradient cyan)
  - Security badge (encrypted icon)
- **Device:** Browser window mockup (Chrome-style)

**Step 2: Analysis Process**
- **Screenshot:** Analysis in progress
  - 6 method cards с progress bars
  - AI brain icon в центре (animated glow)
  - Timer: 0:45 / 1:30 countdown
  - Real-time text generation preview
- **Device:** Browser window + timeline below

**Step 3: PDF Report Preview**
- **Screenshot:** Generated PDF в viewer
  - Cover page с Astra branding
  - Table of contents visible
  - Preview 3 страницы (methods)
  - Download button highlighted
- **Device:** PDF viewer interface (Adobe-style)

**Step 4: Consultation Illustration**
- **Illustration:** HR + Employee meeting
  - HR показывает iPad с отчетом
  - Employee engaged (positive emotion)
  - Background: office setting (minimal)
  - Speech bubbles с insights
- **Style:** Modern flat illustration (не photo)

#### Формат

```yaml
Timeline Layout:
  - Horizontal flow (desktop)
  - Vertical stack (mobile)
  - Arrows between steps (animated)

Screenshot Mockups:
  Browser Window: 1200 × 800 px
  PDF Viewer: 900 × 1200 px
  Illustration: 800 × 600 px

Beautification:
  - Tool: Cleanmock или Screenshot.rocks
  - Background: Custom gradient per step
  - Shadow: 0 30px 60px rgba(0,0,0,0.2)
  - Border radius: 12px
```

#### Эффекты

- Scroll-triggered sequential reveal (stagger 200ms)
- Arrow animation: draw from left to right
- Progress bars fill on scroll into view
- Glow effect на active step

---

### 2.5 KEY FEATURES (6 Methods Bento Grid)

#### Концепция
Bento Grid layout с 6 карточками. Каждая карточка показывает preview результата конкретного метода.

#### Что показывать

**Method 1: Career Insights Card**
- **Visual:** Dashboard panel screenshot
  - 3 роли в виде карточек
  - Каждая роль: icon, title, timeline (6/12/24 мес)
  - Skills required (tags)
  - Match percentage (75%, 85%, 92%)
- **Color accent:** Green gradient

**Method 2: SWOT Analysis Card**
- **Visual:** SWOT matrix visualization
  - 4 квадранта (S-W-O-T)
  - Bullets в каждом квадранте
  - Color-coded (green-red-blue-orange)
  - Professional diagram style
- **Color accent:** Blue gradient

**Method 3: Holland RIASEC Card**
- **Visual:** Hexagon radar chart
  - 6 точек (R-I-A-S-E-C)
  - Filled area показывает profile
  - Scores 0-100 на каждой оси
  - Top 3 types highlighted
- **Color accent:** Purple gradient

**Method 4: IDP Plan Card**
- **Visual:** Timeline roadmap
  - 4 milestones (30/90/180/365 days)
  - Icons для каждого milestone
  - Progress track line
  - Action items preview
- **Color accent:** Orange gradient

**Method 5: Soft Skills Card**
- **Visual:** Skills bar chart
  - 5-6 skills (Communication, Leadership, etc.)
  - Horizontal bars (current level)
  - Target level (dashed line)
  - Gap analysis visual
- **Color accent:** Teal gradient

**Method 6: Psychometric Profile Card**
- **Visual:** Brain-style infographic
  - Center: brain illustration
  - Around: 4-5 key traits (EQ, Logic, etc.)
  - Circular progress indicators
  - Scores + descriptions
- **Color accent:** Indigo gradient

#### Формат (Bento Grid)

```yaml
Grid Layout (Desktop 1440px):
  Row 1: [Card1: 600×400] [Card2: 400×400] [Card3: 400×400]
  Row 2: [Card4: 400×400] [Card5: 600×400] [Card6: 400×400]

Grid Layout (Tablet 768px):
  Row 1: [Card1: 380×300] [Card2: 380×300]
  Row 3: [Card3: 380×300] [Card4: 380×300]
  Row 3: [Card5: 380×300] [Card6: 380×300]

Card Style:
  Background: Glassmorphic white
  Border: Gradient (per method color)
  Padding: 32px
  Border radius: 20px
  Shadow: 0 10px 40px rgba(0,0,0,0.08)

Visual Preview:
  Size: Fit within card (80% width)
  Format: PNG or SVG
  Interactive: Hover enlarges slightly (scale 1.05)
```

#### Эффекты

- Staggered entrance animation (100ms delay each)
- Hover: Card lift + glow (color accent)
- Icon animations: Rotate/pulse on hover
- Charts: Animate values on scroll into view

---

### 2.6 RESULTS & METRICS

#### Концепция
6 metric cards с animated counters и graph visualizations.

#### Что показывать

**Metric 1: Time Reduction (85%)**
- **Visual:** Before/After comparison chart
  - Bar chart: 2-3 hours vs 90 sec
  - Animated reduction arrow
  - Clock icon
- **Style:** Cyan gradient card

**Metric 2: Retention Growth (23%)**
- **Visual:** Line graph trending up
  - X-axis: months (0-12)
  - Y-axis: retention % (70-93%)
  - Filled area gradient
- **Style:** Green gradient card

**Metric 3: Cost Savings (70%)**
- **Visual:** Donut chart
  - 70% saved (teal)
  - 30% remaining (gray)
  - Center: savings amount
- **Style:** Teal gradient card

**Metric 4: Position Fill Speed (40%)**
- **Visual:** Timeline comparison
  - Before: 3 months (long bar)
  - After: 6-8 weeks (short bar)
  - Speed icon (lightning)
- **Style:** Orange gradient card

**Metric 5: Engagement Increase (31%)**
- **Visual:** Gauge/Speedometer
  - Needle pointing to 31%
  - Color zones (red-yellow-green)
  - Happy employees icon
- **Style:** Purple gradient card

**Metric 6: Scalability (25x)**
- **Visual:** Multiplication visualization
  - 1 HR → 500 analyses icon
  - vs 1 HR → 20 analyses (manual)
  - 25x badge prominent
- **Style:** Blue gradient card

#### Формат

```yaml
Card Size: 450 × 350 px each
Layout: 3×2 grid (desktop), 1 column (mobile)

Card Components:
  - Big Number: 72px, bold, gradient text
  - Label: 24px, semibold
  - Graph/Chart: 300 × 200 px
  - Detail text: 16px, regular
  - Impact statement: 14px, badge style

Animation:
  - Numbers: Count up from 0 (on scroll into view)
  - Charts: Draw animation (1.5s duration)
  - Cards: Entrance stagger (150ms delay)
```

#### Инструменты

- **Figma + Chart plugins** для создания графиков
- **Luzmo Instachart** для AI-generated dashboard previews
- **D3.js exports** для SVG charts (если нужна интерактивность)

---

### 2.7 USE CASES

#### Концепция
3 case study cards с real-world scenarios. Каждая показывает before/after visualization.

#### Что показывать

**Case 1: Career Request Scenario**
- **Before visual:** Confused developer + HR (illustration)
- **After visual:** Clear path diagram (3 roles, timeline)
- **Screenshot:** Conversation preview (chat/email)
- **Metrics overlay:** +1 talent retained, 4 hours saved

**Case 2: Succession Planning**
- **Before visual:** Empty chair + question marks
- **After visual:** 5-10 candidates grid with scores
- **Screenshot:** Comparison dashboard (top 3 highlighted)
- **Metrics overlay:** 2 weeks saved, 500k saved

**Case 3: Mass Development**
- **Before visual:** 300 people = chaos illustration
- **After visual:** Organized grid of 300 reports
- **Screenshot:** Bulk upload interface + progress
- **Metrics overlay:** 300 analyses, 2 weeks, 800k saved

#### Формат

```yaml
Case Card Layout:
  - Left side (40%): Scenario illustration (600 × 800 px)
  - Right side (60%): Content + screenshots

Illustration Style:
  - Flat modern style (Undraw/Storyset-inspired)
  - Primary colors: Cyan, teal, purple
  - 2-3 characters max per scene
  - Minimal background

Screenshot Mockups:
  - Device: Browser window or MacBook
  - Size: 800 × 600 px
  - Tool: Cleanmock с custom background

Metrics Badge:
  - Position: Bottom right overlay
  - Style: Glassmorphic badge
  - Size: 200 × 100 px
  - Icons + numbers
```

#### Эффекты

- Scroll-triggered before→after transition
- Screenshots fade in sequentially
- Metrics count up on visibility
- Hover: Card content glow

---

### 2.8 SOCIAL PROOF (Testimonials)

#### Концепция
3 testimonial cards с client photos, 5-star ratings, и company logos.

#### Что показывать

**Testimonial Card Elements:**
- **Avatar photo:** Professional headshot (круг, 80px)
- **Quote:** На фоне quote marks
- **Rating:** 5 stars (yellow/gold)
- **Attribution:** Name, role, company
- **Company logo:** Small (60 × 30 px)
- **Background:** Glassmorphic card

**Stats Bar Above:**
- Icon + "120+ companies"
- Icon + "99.9% quality"
- Icon + "5,000+ employees"

#### Формат

```yaml
Testimonial Card:
  Size: 400 × 500 px
  Layout: Vertical
  Background: White glassmorphic
  Border: 1px gradient (subtle)

Components:
  Avatar: 80 × 80 px, circle, shadow
  Stars: 24 × 24 px each, gold #fbbf24
  Quote: 18px, italic, gray-700
  Attribution: 16px name (bold), 14px role/company

Stats Icons:
  Size: 32 × 32 px
  Color: Cyan #22d3ee
  Style: Outlined, modern
```

#### Визуализация рейтинга

```
⭐⭐⭐⭐⭐
5.0 из 5.0 (120 отзывов)
```

---

### 2.9 PRICING TABLE

#### Концепция
3 pricing cards (Basic, Pro, Enterprise) с glassmorphic style. Middle card (Pro) elevated и highlighted.

#### Что показывать

**Pricing Card Elements:**
- **Plan badge:** "BASIC" / "PRO" / "ENTERPRISE"
- **Price:** Large number + currency
- **Features list:** Checkmarks + text (8-10 items)
- **CTA button:** Gradient button
- **Recommended badge:** (только для Pro)

**Background mockup:**
- Abstract data visualization (blurred)
- Network connections pattern
- Subtle gradient overlay

#### Формат

```yaml
Card Sizes:
  Basic: 380 × 700 px
  Pro: 400 × 750 px (elevated, scale 1.05)
  Enterprise: 380 × 700 px

Pro Card Highlight:
  Border: 3px gradient (cyan → purple)
  Shadow: 0 20px 60px rgba(34, 211, 238, 0.3)
  Badge: "RECOMMENDED" (yellow, top)

Features List:
  Checkmark icon: 20 × 20 px, cyan
  Text: 16px, gray-700
  Spacing: 16px between items

CTA Button:
  Size: 100% width, 56px height
  Style: Gradient for Pro, solid for others
  Text: 18px, bold
```

---

### 2.10 FAQ SECTION

#### Концепция
Accordion-style FAQ с illustrations для каждого вопроса (optional).

#### Что показывать

**FAQ Mockup:**
- 9-10 questions в accordion
- Expanded state shows answer + mini illustration (optional)
- Icons для categories (Security, Pricing, Technical, etc.)

**Visualization ideas:**
- Q: "Как работает?" → Flow diagram mini
- Q: "Что с GDPR?" → Lock + shield icon
- Q: "Интеграции?" → Logos grid (systems)

#### Формат

```yaml
Accordion Item:
  Width: 100% (max 800px container)
  Height:
    Collapsed: 80px
    Expanded: Auto (200-400px)

Question Style:
  Text: 20px, semibold
  Icon: 28 × 28 px chevron (rotates on expand)
  Background: White, border-bottom gray-200

Answer Style:
  Text: 16px, regular, line-height 1.7
  Background: Gray-50
  Padding: 32px
  Illustration: 200 × 150 px (right side, optional)
```

---

### 2.11 FINAL CTA SECTION

#### Концепция
Full-width gradient section с 3 CTA options и animated background.

#### Что показывать

**Background:**
- Animated gradient mesh (cyan → purple → pink)
- Subtle particle effects (reuse from Hero)
- Glassmorphic overlay layer

**3 CTA Cards:**
1. **Quick Trial** - Lightning icon, "5 free analyses"
2. **Demo** - Video icon, "15-min with expert" (HIGHLIGHTED)
3. **Enterprise** - Building icon, "Discuss integration"

#### Формат

```yaml
Section Background:
  - Animated gradient (5s loop, subtle)
  - Particles: 100 max, cyan/purple
  - Overlay: rgba(10, 49, 87, 0.7)

CTA Cards:
  Size: 350 × 450 px each
  Style: White glassmorphic
  Layout: Horizontal 3-column

Middle Card (Demo):
  Ring: 4px yellow-400
  Scale: 1.08
  Shadow: Stronger glow
  Badge: "MOST POPULAR" at top

Icons:
  Size: 64 × 64 px
  Style: Outlined, modern
  Color: Gradient per card
```

---

## 3. Технические Спецификации

### 3.1 Export Settings (Universal)

```yaml
Desktop Assets:
  Format: PNG (transparent) + WebP (optimized)
  Resolution: 2x retina (@2x)
  Color Space: sRGB
  Compression: 80-85% quality

Mobile Assets:
  Format: WebP primary, PNG fallback
  Resolution: 1x standard
  Max file size: 150 KB per image

Vector Assets (icons, logos):
  Format: SVG
  Optimization: SVGO с --multipass
  Fallback: PNG 1x and 2x
```

### 3.2 Mockup Devices Library

**Устройства для использования:**

```yaml
Desktop:
  - MacBook Pro 16" (2023, Space Gray)
  - MacBook Air 13" (2024, Midnight)
  - iMac 24" (2024, Silver)

Mobile:
  - iPhone 15 Pro (Titanium)
  - iPhone 14 Pro (Space Black)
  - iPad Pro 12.9" (Space Gray)

Browser:
  - Chrome window (modern minimal)
  - Safari window (macOS style)
  - Brave window (alternative)
```

**Источники mockup templates:**
- Rotato app (Mac) - основной
- Cleanmock.com - browser beautification
- Apple Design Resources - официальные templates
- Figma Community - "Device Mockups" plugins

### 3.3 Animation Specifications

```yaml
Micro-animations (hover, buttons):
  Duration: 150-300ms
  Easing: ease-out
  Properties: transform, opacity, box-shadow

Scroll-triggered animations:
  Duration: 600-1000ms
  Easing: cubic-bezier(0.4, 0.0, 0.2, 1)
  Stagger: 100-200ms delay between elements

Loading animations:
  Duration: 1500ms
  Loop: Infinite
  Easing: ease-in-out

Particle systems:
  Count: 100-300 particles
  Speed: 0.5-1.5 px/s
  Opacity: 0.3-0.7
  Size: 2-6 px
```

### 3.4 Accessibility Standards

```yaml
Color Contrast:
  Text on background: Minimum 4.5:1 (WCAG AA)
  Large text (24px+): Minimum 3:1
  Interactive elements: Minimum 3:1

Focus States:
  Outline: 2px solid cyan
  Offset: 2px
  Border radius: Match element

Alt Text Requirements:
  Decorative images: alt=""
  Informative images: Descriptive alt text (max 125 chars)
  Complex diagrams: alt + longdesc link

Motion:
  Respect prefers-reduced-motion
  Provide toggle for animations
  Essential animations only on mobile
```

---

## 4. Инструменты и Ресурсы

### 4.1 Primary Tools Stack

**Дизайн и Mockups:**

1. **Figma** (core design)
   - Use case: UI design, layouts, components
   - Plugins:
     - Mockey AI - mockup generation
     - Unsplash - stock photos
     - Iconify - icon library
     - Stark - accessibility checker

2. **Rotato** (Mac app, $79 one-time)
   - Use case: 3D device mockups + animations
   - Export: MP4, GIF, PNG sequences
   - Best for: Hero section, product demos

3. **Cleanmock** (free web tool)
   - Use case: Screenshot beautification
   - Features: Custom backgrounds, device frames
   - Best for: Browser mockups, quick beautification

4. **Spline** (3D design, free tier available)
   - Use case: 3D elements, particle systems
   - Export: Interactive embeds, PNG sequences
   - Best for: AI network backgrounds, 3D icons

**Illustrations:**

5. **Storyset** (free with attribution)
   - Use case: Custom illustrations
   - Style: Flat, modern, customizable colors
   - Best for: Use case scenarios, pain points

6. **unDraw** (free, open source)
   - Use case: SVG illustrations
   - Customization: Color palette adjustment
   - Best for: Generic scenes, concepts

**Data Visualization:**

7. **Luzmo Instachart** (AI dashboard generator)
   - Use case: Generate dashboard mockups
   - Input: Hand-drawn sketch or description
   - Best for: Method preview cards, analytics

8. **Figma Chart Plugins**
   - Charts by Visme
   - Chart Maker
   - Best for: Static charts, infographics

**Animation:**

9. **Framer** (prototyping + code export)
   - Use case: Interactive prototypes
   - Export: React code, video
   - Best for: Micro-interactions, demos

10. **LottieFiles** (free animations)
    - Use case: JSON animations
    - Library: 100,000+ free animations
    - Best for: Icons, loading states

### 4.2 Asset Libraries

**Icons:**
- Heroicons (https://heroicons.com) - MIT license
- Lucide Icons (https://lucide.dev) - ISC license
- Phosphor Icons (https://phosphoricons.com) - MIT license

**Fonts:**
- Inter Variable (Google Fonts) - recommended
- Poppins (headings alternative)
- JetBrains Mono (code/data)

**Stock Photos (for testimonials):**
- Unsplash (https://unsplash.com) - free license
- Generated Photos (https://generated.photos) - AI faces
- This Person Does Not Exist - AI headshots

**Gradients & Colors:**
- Coolors.co - palette generator
- Gradient Hunt - gradient library
- CSS Gradient - generator tool

### 4.3 Code Export Tools

**Figma to Code:**

1. **Anima** (Figma plugin, premium)
   - Export: React, HTML, Vue, Tailwind
   - Quality: Production-ready code
   - Price: $31/month

2. **Builder.io** (free tier available)
   - Visual Copilot feature
   - Export: Any framework via Mitosis
   - Best for: Component generation

3. **v0.dev** by Vercel (free with limits)
   - Input: Text description or Figma upload
   - Output: React/Next.js components
   - Best for: Rapid prototyping

### 4.4 Optimization Tools

**Image Compression:**
- TinyPNG (https://tinypng.com) - PNG/JPG
- Squoosh (https://squoosh.app) - Google tool, WebP
- ImageOptim (Mac app) - batch optimization

**SVG Optimization:**
- SVGOMG (https://jakearchibald.github.io/svgomg/)
- SVGO CLI tool
- Figma export settings (optimize on export)

**Video Compression:**
- HandBrake (free, open source)
- Cloudinary (CDN with auto-optimization)
- FFmpeg (CLI, advanced)

---

## 5. Пошаговый План Создания

### Week 1: Foundation & Hero (Приоритет 1)

**Days 1-2: Design System Setup**
```yaml
Tasks:
  - Create Figma file structure
  - Set up color palette (save as styles)
  - Create typography scale (text styles)
  - Build component library (buttons, cards, inputs)
  - Set up 8px grid system

Deliverables:
  - design-system.fig
  - color-palette-export.png
  - component-library.fig
```

**Days 3-4: Hero Section Mockups**
```yaml
Tasks:
  - Design dashboard UI в Figma (MacBook screen)
  - Design mobile dashboard (iPhone screen)
  - Create floating stat cards
  - Export high-res PNGs

Tools:
  - Figma (UI design)
  - Rotato (3D mockup creation)
  - Spline (particle background)

Deliverables:
  - hero-macbook-mockup@2x.png (3840 × 2160 px)
  - hero-iphone-mockup@2x.png (800 × 1600 px)
  - hero-particles-overlay.png (transparent)
  - hero-stat-cards@2x.png (3 cards)
```

**Days 5-7: Trust Bar + Pain Section**
```yaml
Tasks:
  - Collect/create company logos (7 logos)
  - Design pain point illustrations (3 cards)
  - Create data visualizations (charts)

Tools:
  - Figma (illustrations)
  - Storyset/unDraw (base illustrations)
  - Cleanmock (beautification)

Deliverables:
  - trust-bar-logos.svg (7 logos)
  - pain-card-1-visualization@2x.png
  - pain-card-2-visualization@2x.png
  - pain-card-3-visualization@2x.png
```

---

### Week 2: Solution & Features (Приоритет 2)

**Days 8-10: Solution Steps Screenshots**
```yaml
Tasks:
  - Design upload interface UI
  - Design analysis progress UI
  - Design PDF preview UI
  - Create consultation illustration
  - Beautify all screenshots

Tools:
  - Figma (UI screens)
  - Cleanmock (screenshot beautification)
  - Storyset (consultation illustration)
  - Rotato (optional: browser 3D mockup)

Deliverables:
  - solution-step-1-upload@2x.png (1200 × 800 px)
  - solution-step-2-analysis@2x.png
  - solution-step-3-pdf@2x.png
  - solution-step-4-consultation@2x.png
```

**Days 11-14: Features Bento Grid (6 Methods)**
```yaml
Tasks:
  - Design Career Insights dashboard panel
  - Create SWOT matrix visualization
  - Design Holland RIASEC hexagon chart
  - Create IDP timeline roadmap
  - Design Soft Skills bar chart
  - Create Psychometric brain infographic

Tools:
  - Figma + Chart plugins
  - Luzmo Instachart (dashboard generation)
  - Illustrator (optional, complex charts)

Deliverables:
  - feature-career-insights@2x.png (600 × 400 px)
  - feature-swot-analysis@2x.png (400 × 400 px)
  - feature-holland-riasec@2x.png (400 × 400 px)
  - feature-idp-plan@2x.png (400 × 400 px)
  - feature-soft-skills@2x.png (600 × 400 px)
  - feature-psychometric@2x.png (400 × 400 px)
```

---

### Week 3: Results, Cases, Proof (Приоритет 2)

**Days 15-17: Results & Metrics**
```yaml
Tasks:
  - Create 6 metric visualizations
  - Design animated charts (export frames)
  - Create gradient card backgrounds

Tools:
  - Figma + Chart plugins
  - D3.js (optional, for complex charts)

Deliverables:
  - metric-time-reduction@2x.png (450 × 350 px)
  - metric-retention-growth@2x.png
  - metric-cost-savings@2x.png
  - metric-fill-speed@2x.png
  - metric-engagement@2x.png
  - metric-scalability@2x.png
```

**Days 18-19: Use Cases**
```yaml
Tasks:
  - Design 3 case scenario illustrations
  - Create before/after mockups
  - Design metrics badges

Tools:
  - Figma
  - Storyset/unDraw (illustrations)
  - Cleanmock (screenshots)

Deliverables:
  - case-1-career-request@2x.png (1200 × 800 px)
  - case-2-succession@2x.png
  - case-3-mass-development@2x.png
```

**Days 20-21: Social Proof**
```yaml
Tasks:
  - Source/generate testimonial photos (AI or stock)
  - Design testimonial cards
  - Create stats bar with icons

Tools:
  - Generated Photos or Unsplash
  - Figma (card design)

Deliverables:
  - testimonial-card-1@2x.png (400 × 500 px)
  - testimonial-card-2@2x.png
  - testimonial-card-3@2x.png
  - stats-bar@2x.png (1440 × 160 px)
```

---

### Week 4: Pricing, FAQ, Final CTA (Приоритет 3)

**Days 22-24: Pricing Table**
```yaml
Tasks:
  - Design 3 pricing cards (Basic, Pro, Enterprise)
  - Create gradient borders + shadows
  - Design feature checkmark icons
  - Create background abstract visualization

Tools:
  - Figma
  - Spline (optional, 3D background)

Deliverables:
  - pricing-card-basic@2x.png (380 × 700 px)
  - pricing-card-pro@2x.png (400 × 750 px)
  - pricing-card-enterprise@2x.png (380 × 700 px)
  - pricing-background@2x.png (1440 × 900 px)
```

**Days 25-26: FAQ Section**
```yaml
Tasks:
  - Design accordion component (open/closed states)
  - Create mini illustrations (optional)
  - Design category icons

Tools:
  - Figma

Deliverables:
  - faq-accordion-closed@2x.png (800 × 80 px)
  - faq-accordion-open@2x.png (800 × 300 px)
  - faq-icons.svg (security, pricing, tech, etc.)
```

**Days 27-28: Final CTA Section**
```yaml
Tasks:
  - Create animated gradient background
  - Design 3 CTA option cards
  - Create particle overlay
  - Design icons (lightning, video, building)

Tools:
  - Figma
  - Spline or After Effects (animated gradient)
  - LottieFiles (particles)

Deliverables:
  - final-cta-background.mp4 (or animated WebP)
  - final-cta-card-trial@2x.png (350 × 450 px)
  - final-cta-card-demo@2x.png (350 × 450 px)
  - final-cta-card-enterprise@2x.png (350 × 450 px)
```

---

### Week 5: Polish & Export (Финализация)

**Days 29-30: Optimization**
```yaml
Tasks:
  - Compress all PNGs (TinyPNG)
  - Convert to WebP (Squoosh)
  - Optimize SVGs (SVGO)
  - Create 1x versions for mobile

Tools:
  - TinyPNG
  - Squoosh
  - SVGO

Deliverables:
  - /assets/images/hero/ (all hero images, 2x + WebP)
  - /assets/images/features/ (all feature cards)
  - /assets/images/mockups/ (all device mockups)
  - /assets/icons/ (all SVG icons)
  - /assets/animations/ (Lottie JSON files)
```

**Days 31-32: Documentation**
```yaml
Tasks:
  - Create mockup usage guide
  - Document component specifications
  - Create handoff notes for developers

Deliverables:
  - MOCKUP_USAGE_GUIDE.md
  - COMPONENT_SPECS.md
  - DEVELOPER_HANDOFF.md
```

**Days 33-35: Quality Assurance**
```yaml
Tasks:
  - Review all mockups for consistency
  - Check accessibility (contrast ratios)
  - Verify file sizes (< targets)
  - Test mockups in landing page context

Deliverables:
  - QA_CHECKLIST.md (completed)
  - FINAL_ASSET_INVENTORY.md
```

---

## 6. Файловая Структура и Naming

### 6.1 Directory Structure

```
/astra_landing/assets/
├── images/
│   ├── hero/
│   │   ├── macbook-dashboard@2x.png
│   │   ├── macbook-dashboard@2x.webp
│   │   ├── macbook-dashboard@1x.png
│   │   ├── iphone-dashboard@2x.png
│   │   ├── stat-cards@2x.png
│   │   └── particles-overlay.png
│   │
│   ├── trust-bar/
│   │   ├── logo-tinkoff.svg
│   │   ├── logo-yandex.svg
│   │   ├── logo-sber.svg
│   │   └── [...other-logos].svg
│   │
│   ├── pain-section/
│   │   ├── pain-invisibility@2x.png
│   │   ├── pain-time-waste@2x.png
│   │   └── pain-turnover-cost@2x.png
│   │
│   ├── solution/
│   │   ├── step-1-upload@2x.png
│   │   ├── step-2-analysis@2x.png
│   │   ├── step-3-pdf@2x.png
│   │   └── step-4-consultation@2x.png
│   │
│   ├── features/
│   │   ├── method-career-insights@2x.png
│   │   ├── method-swot@2x.png
│   │   ├── method-holland@2x.png
│   │   ├── method-idp@2x.png
│   │   ├── method-soft-skills@2x.png
│   │   └── method-psychometric@2x.png
│   │
│   ├── results/
│   │   ├── metric-time-reduction@2x.png
│   │   ├── metric-retention@2x.png
│   │   ├── metric-cost-savings@2x.png
│   │   ├── metric-fill-speed@2x.png
│   │   ├── metric-engagement@2x.png
│   │   └── metric-scalability@2x.png
│   │
│   ├── use-cases/
│   │   ├── case-career-request@2x.png
│   │   ├── case-succession@2x.png
│   │   └── case-mass-development@2x.png
│   │
│   ├── social-proof/
│   │   ├── testimonial-hr-director@2x.png
│   │   ├── testimonial-cfo@2x.png
│   │   ├── testimonial-employee@2x.png
│   │   └── stats-bar@2x.png
│   │
│   ├── pricing/
│   │   ├── card-basic@2x.png
│   │   ├── card-pro@2x.png
│   │   ├── card-enterprise@2x.png
│   │   └── pricing-background@2x.png
│   │
│   ├── faq/
│   │   ├── accordion-closed@2x.png
│   │   └── accordion-open@2x.png
│   │
│   └── final-cta/
│       ├── cta-trial@2x.png
│       ├── cta-demo@2x.png
│       ├── cta-enterprise@2x.png
│       └── cta-background.webm (video)
│
├── icons/
│   ├── ui/
│   │   ├── upload.svg
│   │   ├── brain.svg
│   │   ├── file-text.svg
│   │   └── [...].svg
│   │
│   ├── methods/
│   │   ├── career.svg
│   │   ├── swot.svg
│   │   ├── holland.svg
│   │   └── [...].svg
│   │
│   └── social/
│       ├── linkedin.svg
│       ├── twitter.svg
│       └── github.svg
│
├── animations/
│   ├── hero-particles.json (Lottie)
│   ├── loading-spinner.json
│   ├── checkmark-success.json
│   └── counter-animation.json
│
└── fonts/
    ├── inter-variable.woff2
    └── inter-variable-italic.woff2
```

### 6.2 Naming Conventions

**Формат имени файла:**
```
[section]-[element]-[variant]@[resolution].[ext]

Examples:
- hero-macbook-dashboard@2x.png
- pain-invisibility-card@1x.webp
- feature-swot-preview@2x.png
- metric-retention-chart@2x.png
```

**Правила:**
- Lowercase only
- Hyphen separator (не underscore)
- Resolution suffix: @1x, @2x
- Descriptive но краткие имена
- Версионирование: -v1, -v2 (если нужно)

**Примеры по категориям:**

```yaml
Hero Section:
  - hero-macbook-dashboard@2x.png
  - hero-iphone-mobile@2x.png
  - hero-particles-background.png
  - hero-stat-card-speed@2x.png

Features:
  - feature-career-insights@2x.png
  - feature-swot-matrix@2x.png
  - feature-holland-hexagon@2x.png

Metrics:
  - metric-time-reduction-chart@2x.png
  - metric-retention-graph@2x.png
  - metric-cost-donut@2x.png

Icons:
  - icon-upload.svg (не нужен resolution suffix)
  - icon-brain-ai.svg
  - icon-rocket-launch.svg
```

### 6.3 Metadata и Documentation

**Для каждого major asset создавать JSON metadata:**

```json
// hero-macbook-dashboard.meta.json
{
  "fileName": "hero-macbook-dashboard@2x.png",
  "section": "hero",
  "type": "device-mockup",
  "device": "MacBook Pro 16\" 2023",
  "dimensions": {
    "width": 3840,
    "height": 2160,
    "resolution": "2x"
  },
  "fileSize": "487 KB",
  "format": "PNG",
  "colorSpace": "sRGB",
  "createdDate": "2025-10-29",
  "tools": ["Figma", "Rotato"],
  "description": "Hero section MacBook mockup showing AI dashboard interface",
  "usage": "Landing page hero section, desktop view",
  "variants": [
    "hero-macbook-dashboard@1x.png",
    "hero-macbook-dashboard@2x.webp"
  ]
}
```

---

## 7. Quality Checklist

### 7.1 Visual Quality

```yaml
✓ Checklist per Asset:
  - [ ] Resolution matches spec (2x for retina)
  - [ ] Color palette consistency (matches design system)
  - [ ] Typography readable (minimum 16px body)
  - [ ] Contrast ratio ≥ 4.5:1 (WCAG AA)
  - [ ] No pixelation or blurriness
  - [ ] Consistent shadows and lighting
  - [ ] Glassmorphism effects applied correctly
  - [ ] Gradients smooth (no banding)
  - [ ] Icons aligned to 8px grid
  - [ ] Spacing consistent (8px increments)
```

### 7.2 Technical Quality

```yaml
✓ File Optimization:
  - [ ] PNG compressed (< target size)
  - [ ] WebP version created
  - [ ] SVG optimized (SVGO processed)
  - [ ] No unnecessary metadata
  - [ ] Correct color profile embedded
  - [ ] Transparency preserved where needed
  - [ ] File names follow convention
  - [ ] Organized in correct directory

✓ Performance:
  - [ ] Hero images < 500 KB
  - [ ] Feature cards < 150 KB
  - [ ] Icons < 10 KB
  - [ ] Total page weight < 5 MB
  - [ ] Lazy loading metadata added
  - [ ] Responsive variants created
```

### 7.3 Accessibility

```yaml
✓ Alt Text Prepared:
  - [ ] Descriptive alt text written
  - [ ] Max 125 characters
  - [ ] Decorative images marked alt=""
  - [ ] Complex diagrams have longdesc

✓ Color & Contrast:
  - [ ] Text readable on all backgrounds
  - [ ] Color not sole differentiator
  - [ ] Focus states visible
  - [ ] Dark mode variants (if applicable)
```

### 7.4 Brand Consistency

```yaml
✓ Design System Alignment:
  - [ ] Uses approved color palette
  - [ ] Typography matches scale
  - [ ] Spacing uses 8px grid
  - [ ] Component styles consistent
  - [ ] Icons from approved library
  - [ ] Illustrations match style guide
  - [ ] Gradients match definitions
  - [ ] Glassmorphism parameters correct
```

---

## 8. Handoff Documentation

### 8.1 Developer Handoff Package

**Что предоставить разработчикам:**

```yaml
1. Asset Files:
   - All exported images (PNG, WebP, SVG)
   - Lottie JSON animations
   - Video files (compressed)
   - Icon sprite sheets

2. Design Files:
   - Figma file (view access)
   - Component library
   - Style guide
   - Mockup source files (Rotato, etc.)

3. Documentation:
   - This mockup design concept doc
   - Asset inventory spreadsheet
   - Usage guidelines per section
   - Animation specifications
   - Responsive breakpoints guide

4. Code Snippets:
   - CSS for gradients
   - CSS for glassmorphism
   - Tailwind config (colors, fonts)
   - Animation keyframes
   - Sample component code (from Anima/Builder)
```

### 8.2 Asset Inventory Template

```markdown
| Asset Name | Section | Type | Size (px) | File Size | Format | Alt Text | Notes |
|------------|---------|------|-----------|-----------|--------|----------|-------|
| hero-macbook-dashboard@2x | Hero | Mockup | 3840×2160 | 487 KB | PNG/WebP | "AI dashboard analyzing resume in real-time" | Use lazy load |
| pain-invisibility@2x | Pain | Illustration | 400×500 | 125 KB | PNG/WebP | "Confused employee with unclear career path" | - |
| [...] | [...] | [...] | [...] | [...] | [...] | [...] | [...] |
```

### 8.3 Implementation Notes

**Для каждой секции:**

```markdown
## Hero Section Implementation

**Assets Required:**
- hero-macbook-dashboard@2x.png (3840×2160 px)
- hero-iphone-dashboard@2x.png (800×1600 px)
- hero-particles-overlay.png (transparent)
- hero-stat-cards@2x.png

**Layout:**
- Desktop: 50% text (left), 50% mockup (right)
- Tablet: Centered text, mockup below
- Mobile: Stacked, mockup hidden

**Animations:**
- Mockup: Fade in + slide from right (1s delay)
- Particles: Loop infinitely, slow drift
- Stat cards: Stagger entrance (200ms each)

**Performance:**
- Lazy load mockup images
- Preload hero-macbook (critical)
- Use WebP with PNG fallback
- Implement intersection observer for animations

**Responsive:**
- Hide iPhone mockup on tablet/mobile
- Switch to 1x images on mobile
- Adjust particle count (reduce on mobile)
```

---

## 9. Roadmap Summary

### Общий Timeline (5 недель)

```
Week 1: Foundation + Hero + Trust Bar + Pain Section
        [Design System → Hero Mockups → Pain Visuals]

Week 2: Solution Steps + Features Bento Grid
        [4 Step Screenshots → 6 Method Previews]

Week 3: Results + Use Cases + Social Proof
        [6 Metrics → 3 Cases → 3 Testimonials]

Week 4: Pricing + FAQ + Final CTA
        [3 Pricing Cards → FAQ Accordion → 3 CTA Options]

Week 5: Polish + Export + QA
        [Optimization → Documentation → Handoff]
```

### Priority Order

**P1 (Week 1-2): Critical Path**
- Hero Section (самый важный)
- Trust Bar
- Pain Section
- Solution Steps
- Features Grid (6 methods)

**P2 (Week 3): High Impact**
- Results & Metrics
- Use Cases
- Social Proof

**P3 (Week 4): Conversion Optimization**
- Pricing Table
- FAQ Section
- Final CTA

**P4 (Week 5): Polish**
- Optimization
- Documentation
- Quality Assurance

---

## 10. Budget Estimate

### Tools Investment

```yaml
One-time purchases:
  - Rotato (Mac app): $79 USD
  - Spline Pro (optional): $0 (free tier sufficient)

Monthly subscriptions:
  - Figma Professional: $12/month (or free tier)
  - Anima plugin: $31/month (optional, for code export)

Total minimum: $79 one-time + $0-43/month
```

### Time Investment

```yaml
Design & Creation: 35 days (7 weeks, part-time)
  - Assumes 4-6 hours per day
  - Total: ~140-210 hours

Breakdown:
  - Week 1: 25 hours (foundation + hero)
  - Week 2: 30 hours (solution + features)
  - Week 3: 30 hours (results + cases)
  - Week 4: 25 hours (pricing + FAQ + CTA)
  - Week 5: 20 hours (polish + QA)

Total: ~130 hours
```

### Alternative: Hire Designer

```yaml
Freelance Designer (Upwork/Fiverr):
  - Hourly rate: $30-60/hour (Russia)
  - Total hours: 130 hours
  - Cost: $3,900 - $7,800 USD

Fixed-price package:
  - Landing page mockup package: $2,000 - $5,000 USD
  - Includes: All 11 sections, revisions, handoff

Recommendation:
  - DIY if you have design skills + time
  - Hire if budget allows and time is limited
  - Hybrid: DIY foundation, hire for complex parts (3D, animations)
```

---

## Заключение

### Next Steps

1. **Немедленные действия:**
   - [ ] Install Rotato (Mac) - $79
   - [ ] Set up Figma account (free tier OK)
   - [ ] Download Inter Variable font
   - [ ] Create project folder structure
   - [ ] Start Week 1: Design System setup

2. **Week 1 Goals:**
   - [ ] Complete color palette
   - [ ] Build component library
   - [ ] Finish Hero section mockups
   - [ ] Export first assets

3. **Ongoing:**
   - [ ] Track progress weekly
   - [ ] Review quality checklist per asset
   - [ ] Document decisions/changes
   - [ ] Prepare for developer handoff

### Success Criteria

**Project считается завершенным когда:**
- ✓ All 11 sections have mockup assets
- ✓ All assets optimized (< size targets)
- ✓ All assets follow naming conventions
- ✓ Developer handoff documentation complete
- ✓ Quality checklist 100% passed
- ✓ Ready for implementation in Next.js

### Resources

**This document location:**
`/home/yan/astra_landing/ASTRA_MOCKUP_DESIGN_CONCEPT.md`

**Related docs:**
- Landing Structure: `.memory_bank/landing_structure.md`
- Copywriting Assets: `.memory_bank/copywriting_assets.md`
- Design Trends 2025: `LANDING_DESIGN_TRENDS_2025.md`
- Product Brief: `.memory_bank/product_brief.md`

**Design file (to create):**
`/home/yan/astra_landing/design/astra-landing-mockups.fig`

---

**Document Status:** COMPLETE
**Version:** 1.0
**Last Updated:** 2025-10-29
**Ready for:** Implementation

**Создано с использованием:**
- Анализ аватара Astra (cyan/teal/blue color palette)
- Исследование трендов 2025 (glassmorphism, gradients, Bento Grid)
- Product brief Astra (6 методов, 90 секунд, ROI 162x)
- Landing structure (11 секций)
- Copywriting assets (все тексты готовы)

---

**Приступайте к Week 1 и создавайте потрясающий landing page для Astra!**
