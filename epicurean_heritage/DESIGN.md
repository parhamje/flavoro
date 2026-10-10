---
name: Epicurean Heritage
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#414846'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#717976'
  outline-variant: '#c1c8c4'
  surface-tint: '#43655c'
  primary: '#01261f'
  on-primary: '#ffffff'
  primary-container: '#1a3c34'
  on-primary-container: '#83a69c'
  inverse-primary: '#aacec3'
  secondary: '#944a00'
  on-secondary: '#ffffff'
  secondary-container: '#fc8f34'
  on-secondary-container: '#663100'
  tertiary: '#21211d'
  on-tertiary: '#ffffff'
  tertiary-container: '#373632'
  on-tertiary-container: '#a19f99'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5eadf'
  primary-fixed-dim: '#aacec3'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#2b4d44'
  secondary-fixed: '#ffdcc5'
  secondary-fixed-dim: '#ffb783'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#713700'
  tertiary-fixed: '#e6e2db'
  tertiary-fixed-dim: '#c9c6c0'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#484742'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: DM Serif Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: DM Serif Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  headline-lg:
    fontFamily: DM Serif Display
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
  headline-md:
    fontFamily: DM Serif Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '800'
    lineHeight: 20px
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style

This design system embodies a **Modern Classic** aesthetic, blending the warmth of traditional hospitality with a clean, contemporary editorial structure. It is designed for high-end culinary experiences, focusing on organic textures, sophisticated typography, and a sense of "slow dining" in a fast-paced digital world.

The visual language is rooted in **Modernism** with a tactile edge. It prioritizes generous whitespace to let high-fidelity food photography serve as the primary visual driver. The emotional response is one of reliability, appetite, and premium comfort.

Key stylistic markers include:
- **Editorial Compositions:** Utilizing asymmetrical layouts and large-scale imagery typical of culinary magazines.
- **Organic Accents:** Subtle use of flourishes, botanical icons, and dividers to reinforce the "farm-to-table" narrative.
- **Clean Containers:** Using softly rounded edges and subtle shadows to ground content without clutter.

## Colors

The palette is a sophisticated "Forest & Flame" combination, designed to evoke the natural world and the heat of the kitchen.

- **Primary (Deep Forest):** Used for primary backgrounds and high-contrast text to provide a sense of stability and luxury.
- **Secondary (Warm Orange):** An appetite-stimulating accent used for primary actions, price points, and highlights.
- **Tertiary (Cream/Bone):** A soft, off-white background used to reduce eye strain and provide a warmer feel than pure white.
- **Neutrals:** A range of charcoal and soft greys for body text and secondary information, ensuring high legibility against cream surfaces.

## Typography

The typography system relies on a high-contrast pairing of a classic serif and a modern geometric sans-serif.

- **Headlines:** Use a high-contrast serif font (like DM Serif Display or Newsreader) for a literary, authoritative feel.
- **Body & Labels:** Use a clean, modern sans-serif (Plus Jakarta Sans) for high legibility in dense menus and descriptive text.
- **Visual Rhythm:** Use `label-caps` for eyebrows and category labels to create a structured information hierarchy.
- **Emphasis:** The warm orange accent color should be applied selectively to key words within headlines to guide the eye toward value propositions.

## Layout & Spacing

This design system uses a **Fluid-Fixed Hybrid Grid**. Content is centered within a 1200px container on desktop, while background elements (like forest green sections) bleed edge-to-edge.

- **Vertical Rhythm:** A strict 8px baseline grid ensures consistent spacing between headers, body text, and images.
- **Sectioning:** Large vertical gaps (80px - 120px) are used to distinguish between the hero, features, and menu sections, reinforcing a premium, unhurried pace.
- **Responsive Behavior:** 
    - **Desktop:** 12-column grid.
    - **Tablet:** 8-column grid with 40px margins.
    - **Mobile:** 4-column grid. Large displays scale down to mobile-specific sizes, and multi-column cards stack vertically.

## Elevation & Depth

Visual depth is achieved through **Tonal Layering** rather than heavy shadows.

- **Surfaces:** Use high-contrast color blocks (Cream vs. Deep Green) to define distinct content zones.
- **Cards:** Product and menu cards utilize a very soft, ambient shadow (4px-12px blur, 5% opacity) or a fine 1px border in a slightly darker neutral to separate from the background.
- **Glassmorphism:** Reserved exclusively for floating UI elements like image badges or navigation bars to maintain focus on the photography behind them.

## Shapes

The shape language is **Rounded**, balancing the sharpness of the serif typography with approachable, friendly containers.

- **Base Corner Radius:** 8px (0.5rem) for standard cards and input fields.
- **Large Corner Radius:** 16px (1rem) for feature sections and primary containers.
- **Pill Shapes:** Reserved for buttons and status badges to clearly distinguish interactive elements from static content.
- **Photography:** Food imagery should always feature slightly rounded corners (8px) to soften the layout.

## Components

### Buttons
- **Primary:** Pill-shaped, secondary orange background, white text. Includes a transition to a darker orange on hover.
- **Secondary:** Pill-shaped, ghost style with a 1.5px neutral border.
- **Iconic:** Buttons may include trailing icons (e.g., arrows or calendars) to indicate action type.

### Cards
- **Product Cards:** Image-heavy with a top-aligned photo, followed by title, rating, and a prominent price tag in secondary orange. 
- **Feature Cards:** Vertically stacked icon, title, and short description, often used within a dark primary-colored container with gold-tinted iconography.

### Input Fields
- Understated design with a focus on typography. Use the base corner radius and a light neutral border. Focus states should utilize the secondary orange for the border.

### Badges & Ratings
- **Stars:** Consistent secondary orange color.
- **Floating Badges:** Used on images for favorites or categories, utilizing a high-contrast white circle with a 1px border.

### Icons
- Thin-stroke, gold or secondary-colored line icons that match the "organic/sophisticated" brand narrative.