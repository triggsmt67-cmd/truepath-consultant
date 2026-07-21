# True Path Digital - Brand & Style Guide

This outlines the core brand identity, color palette, typography, and UI patterns extracted directly from the True Path Digital website's source code. You can use these specifications as a baseline for creating any new assets, marketing materials, or additional pages.

## 1. Core Brand Identity
- **Name:** True Path Digital
- **Tagline:** Clearer marketing. Better websites.
- **Mission:** Helping owner-operated service businesses find the gaps between visibility, customer trust, lead response, and booked work.

---

## 2. Color Palette

The color system is built on a warm, organic "stone" foundation with a strong, earthy primary accent.

| Token | Hex Code | Usage / Tailwind Equivalent |
| :--- | :--- | :--- |
| **Background** | `#FAFAF9` | Primary page background. (Stone 50) |
| **Foreground** | `#1C1917` | Primary text, main headings, dark contrast blocks. (Stone 900) |
| **Primary** | `#A16207` | Call-to-action buttons, active states, emphasized text, eyebrow lines. (Yellow 700 / Ochre) |
| **Surface Alt** | `#F5F5F4` | Secondary section backgrounds, footers. (Stone 100) |
| **Muted Text** | `#57534E` | Body copy, secondary text, descriptions. (Stone 600) |
| **Muted Border** | `#E8ECF0` | Structural dividers, subtle borders between sections. |

> **Tip:** When creating assets, rely heavily on the high contrast between **Background** and **Foreground** for readability, using the **Primary** color sparingly to draw the eye to critical actions or key phrases.

---

## 3. Typography

The site uses a dual-font system contrasting a premium serif for display against a clean sans-serif for utility and readability.

### Display Serif: `Newsreader`
- **Usage:** Headings (`h1`, `h2`, `h3`), large quotes, and display numbers.
- **Styling:** Typically used with `font-medium` (Medium weight) and `tracking-tight` (negative letter-spacing) to create a tight, editorial look.
- **Google Fonts Link:** [Newsreader](https://fonts.google.com/specimen/Newsreader)

### Utility Sans-Serif: `Inter`
- **Usage:** Body text, button labels, navigation links, and small structural labels.
- **Styling:** Standard reading sizes for body text, but styled distinctly for structural elements (e.g., uppercase and wide letter-spacing for buttons and "eyebrow" tags).
- **Google Fonts Link:** [Inter](https://fonts.google.com/specimen/Inter)

---

## 4. UI Patterns & Visual Design

To make assets feel like they belong to the website, incorporate these specific stylistic choices:

### Texture (The "Noise" Overlay)
The website uses a subtle, fixed 3% opacity SVG fractal noise overlay. This gives the entire interface a textured, tactile, "premium print" feel. 
- *Asset translation:* Add a very faint noise/film grain layer to digital assets to maintain this aesthetic.

### Eyebrow Headings
Sections are often introduced with an "eyebrow" heading to provide context before the main serif headline.
- **Style:** Small sans-serif (`text-sm`), uppercase, wide letter-spacing (`tracking-widest`), primary color (`#A16207`).
- **Visual detail:** Often prefixed with a small horizontal line in the primary color.

### Button Architecture
Buttons on the site are highly engineered with specific animations and spacing.
- **Typography:** Sans-serif, uppercase, wide letter-spacing (`tracking-widest`), font-medium.
- **Styling Details:** Very crisp and structural; they are completely square (no rounded corners).

### Spacing & Structure
- **Borders:** The site relies heavily on thin, 1px horizontal lines (`#E8ECF0`) to separate distinct thoughts and sections, rather than using heavy background colors.
- **Breathing Room:** The brand relies on generous padding and negative space to keep content feeling focused, premium, and readable.

---

## 5. Motion & Animation
If you are creating animated assets (like social media videos or presentation decks), mimic these motion curves:
- **Style:** Smooth, deliberate, and premium. Never erratic or bouncy.
- **Effects:** Elements typically fade in while shifting slowly upward, and occasionally un-blur gently into focus.
