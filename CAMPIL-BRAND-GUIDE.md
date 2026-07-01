# CAMPIL Brand Guide

**GEAR FOR EVERY ADVENTURE**

---

## 1. Brand Identity

| Element | Value |
|---|---|
| Brand name | **CAMPIL** (all caps) |
| Tagline | GEAR FOR EVERY ADVENTURE |
| Voice | Premium, honest, outdoor-first, Hebrew-first |
| Tone | Bold yet accessible. Like a knowledgeable friend who actually sleeps in a tent. |
| Comparable brands | ARB, Goal Zero, Yeti Coolers, Overlanding stores |

---

## 2. Primary Color Palette

| Name | Hex | Usage |
|---|---|---|
| **Olive Green** | `#3C4A32` | Primary CTA buttons, nav active, product badges, links |
| **Sunset Gold** | `#D4830A` | Hero CTA, overline text, accent highlights, cart badge, newsletter, star ratings |
| **Charcoal** | `#1E2020` | Footer background, stat banners, dark section headers, body text |
| **Warm Cream** | `#FAF8F3` | Page backgrounds, body background |

---

## 3. Secondary & Scale Colors

### Olive Green Scale (tn-)
| Token | Hex | Usage |
|---|---|---|
| `tn-950` | `#0e1209` | Deepest dark |
| `tn-900` | `#1a2012` | Dark overlays |
| `tn-800` | `#232d1a` | Button hover |
| `tn-700` | `#2e3c22` | Heavy text on dark |
| `tn-600` | `#3C4A32` | **Primary brand olive** |
| `tn-500` | `#4d5e40` | Overlines on white |
| `tn-400` | `#637550` | Subtle borders |
| `tn-300` | `#7d9065` | Muted accents |
| `tn-200` | `#a5b890` | Light tints |
| `tn-100` | `#cdd9be` | Very light tints |
| `tn-50`  | `#edf1e7` | CTA light background |

### Sunset Gold Scale (gold-)
| Token | Hex | Usage |
|---|---|---|
| `gold-900` | `#7a4905` | Dark gold text |
| `gold-700` | `#a8650a` | Gold hover |
| `gold-500` | `#D4830A` | **Primary gold** |
| `gold-300` | `#e9a845` | Light gold accent |
| `gold-100` | `#f8dfa6` | Gold tint |
| `gold-50`  | `#fef7e8` | Gold wash |

### Sand Scale (sand-)
| Token | Hex | Usage |
|---|---|---|
| `sand-500` | `#D8C8A8` | Sand neutral text |
| `sand-400` | `#e4d4bc` | Light sand |
| `sand-300` | `#ede0cc` | Background tint |

### Semantic
| Token | Value |
|---|---|
| Background | `#FAF8F3` |
| Surface | `#F4EEE4` |
| Surface 2 | `#ECE4D8` |
| Border | `#DDD5C8` |
| Text Primary | `#1E2020` |
| Text Secondary | `#4A4A44` |
| Text Muted | `#888880` |

---

## 4. Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| **Headings** | Rubik | 700–900 | Letter-spacing `-0.02em` to `-0.035em` |
| **Body** | Nunito Sans | 400–600 | Line-height 1.6 |
| **Overlines** | Rubik | 700 | Uppercase, letter-spacing `0.22em`, 0.65rem |
| **CTA buttons** | Rubik | 700–800 | 14px |

### Heading Size Scale
| Class | Size | Weight |
|---|---|---|
| `.heading-xl` | `clamp(2.6rem, 6vw, 5rem)` | 900 |
| `.heading-lg` | `clamp(2rem, 4.5vw, 3.5rem)` | 800 |
| `.heading-md` | `clamp(1.6rem, 3.2vw, 2.6rem)` | 800 |
| `.heading-sm` | `clamp(1.15rem, 2.2vw, 1.7rem)` | 700 |

---

## 5. Button Styles

### Primary Button (`.btn-primary`)
- Background: `#3C4A32` (olive)
- Text: `#FAF8F3` (warm white)
- Hover: `#232d1a` + `translateY(-1px)` + soft shadow
- Radius: `14px`
- Font: Rubik 700, 14px

### Gold Button (`.btn-gold`)
- Background: `#D4830A` (sunset gold)
- Text: `#FFFFFF`
- Hover: `#e8940a` + shadow
- Radius: `14px`

### Sand Button (`.btn-sand`)
- Background: `#D8C8A8`
- Text: `#1E2020`
- Hover: `#e4d4bc`

### Hero CTA (`.hero-cta-primary`)
- Background: `#D4830A` (gold — stands out on dark hero)
- Text: `#FFFFFF`
- Shadow: `0 4px 20px rgba(212,131,10,0.38)`

### Ghost Button
- Border: `rgba(255,255,255,0.22)`
- Text: `rgba(255,255,255,0.85)`
- Hover: border `rgba(255,255,255,0.50)` + backdrop blur

---

## 6. Card Styles

### Product Card
- Background: `#FFFFFF`
- Border: `1px solid rgba(0,0,0,0.065)`
- Radius: `20px`
- Hover: `translateY(-5px)` + shadow lift (`.card-lift`)
- Image aspect: `1/1`, background `#F5F2EE`

### Trust/Info Card
- Background: `#FFFFFF`
- Border: `1px solid #DDD5C8`
- Radius: `16px`
- Padding: `24px`

---

## 7. Badge / Tag Styles

| Type | Background | Text |
|---|---|---|
| חדש (new) | `tn-600` (#3C4A32) | White |
| מבצע (sale) | `#C0392B` (red) | White |
| פופולרי (bestseller) | `#D4830A` (gold) | White |
| מוגבל (limited) | `#1E2020` (charcoal) | White |
| Discount % | `#C0392B` | White |

---

## 8. Navigation

### Announcement Bar
- Background: `#1E2020` (charcoal)
- Text: `rgba(255,255,255,0.70)`
- Height: `40px`, collapses on scroll

### Main Nav
- Transparent on homepage hero (before scroll)
- `glass-nav` = `rgba(255,255,255,0.92)` + `blur(28px)` when scrolled
- Logo: CAMPIL logo image in white pill container when transparent
- Cart badge: `#D4830A` (gold)

---

## 9. Header Sections (Page Heroes)

- Background: `#1E2020` (charcoal) for all non-homepage headers
- Top padding: `120px` (mobile) / `140px` (desktop) to clear fixed nav
- Overline text: `#D4830A` (gold)
- Heading: white
- Body: `rgba(255,255,255,0.70)`

---

## 10. Footer

- Background: `#1E2020` (charcoal)
- Logo: full CAMPIL logo image in white pill container
- Section titles: `rgba(255,255,255,0.40)` overlines
- Links: `rgba(255,255,255,0.70)` → white on hover
- Social icons: gold on hover (`#D4830A`)
- Bottom copyright: `rgba(255,255,255,0.40)`
- Tagline: `rgba(212,131,10,0.65)` — "GEAR FOR EVERY ADVENTURE"

---

## 11. Dark Sections

Used for: Stats Banner, Newsletter, StatsBanner, Footer, page headers.

- Background: `#1E2020` (charcoal)
- Accent texture: gold + olive radial gradients at low opacity
- Highlights: gold (`#D4830A`) / `#E8940A`
- Number suffixes: `#D4830A`

---

## 12. Icon Style

- Lucide icons throughout
- `strokeWidth={2}` to `{2.5}` (medium weight)
- Colors: match context (`text-tn-600` or `text-white/60`)
- Size: `w-4 h-4` (16px) to `w-6 h-6` (24px) depending on context

---

## 13. Image Treatment

- Product images: square `1/1` aspect ratio, `object-cover`, `background: #F5F2EE`
- Hover: `scale(1.04)` with 700ms cubic-bezier transition
- Hero/lifestyle: full-bleed with cinematic gradient overlay
- Noise grain overlay: `opacity: 0.028` on heroes for film texture

---

## 14. Spacing System

- Section vertical padding: `96px` (`section-py`) / `112px` (`section-py-lg`)
- Mobile: `56px` / `72px`
- Card padding: `16–24px`
- Max content width: `1280px` (`max-w-7xl`)

---

## 15. Effects & Animations

| Effect | Class / Implementation |
|---|---|
| Card hover lift | `.card-lift` — `translateY(-5px)` + shadow |
| Image zoom | `.img-zoom img` — `scale(1.04)` |
| Fade in up | `.animate-fade-in-up` — 500ms cubic-bezier |
| Float (scroll indicator) | `.animate-float` — 4s loop |
| Scale in (dropdown) | `.animate-scale-in` — 250ms |
| Slide in (cart drawer) | `slideInRight` — 300ms |
| Shimmer (skeleton) | `.skeleton` — 1.4s infinite |
| Glassmorphism nav | `.glass-nav` — blur(28px) + white/92 |

---

## 16. Logo Usage

| Context | Treatment |
|---|---|
| Navigation (scrolled / non-home) | `campil-logo.png`, height `40–48px`, no container |
| Navigation (transparent / homepage hero) | `campil-logo.png` in `white/90 backdrop-blur` pill |
| Footer | `campil-logo.png` in `white` rounded container |
| Light backgrounds | Direct image use (cream background blends) |
| Dark backgrounds | Image in white pill container |
| Print / Email | Use `CAMPIL` in Rubik Black + tagline in uppercase |

---

*Generated: July 2026 — applies to CampingStore Next.js project*
