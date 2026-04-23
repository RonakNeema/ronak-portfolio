# Branding Assets

## Logo & Favicon

The portfolio uses a minimal terminal-style brand identity:

### Brand Elements
- **Monogram**: RN (Ronak Neema)
- **Colors**: 
  - Primary: Cyan (#22d3d3)
  - Background: Dark (#0d0d0d)
- **Style**: Terminal/Code aesthetic with monospace fonts

### Current Assets

#### Generated:
- `favicon.svg` - Vector favicon with RN monogram

#### Required (to create):
To complete the branding, you need to create these assets:

1. **favicon.ico** (16x16, 32x32, 48x48)
   - Can use: https://realfavicongenerator.net/
   - Upload the favicon.svg and generate all sizes

2. **icon-192.png** - PWA icon (192x192)
3. **icon-512.png** - PWA icon (512x512)
4. **apple-touch-icon.png** - iOS icon (180x180)
5. **og-image.png** - Social media preview (1200x630)
6. **screenshot-desktop.png** - PWA screenshot (1280x720)
7. **screenshot-mobile.png** - PWA screenshot (750x1334)

### Quick Setup

Use an online tool or ImageMagick:

```bash
# If you have ImageMagick installed:
convert -background "#0d0d0d" -fill "#22d3d3" -font "Courier-Bold" \
  -pointsize 120 -size 192x192 -gravity center label:"RN" \
  public/icon-192.png

convert -background "#0d0d0d" -fill "#22d3d3" -font "Courier-Bold" \
  -pointsize 320 -size 512x512 -gravity center label:"RN" \
  public/icon-512.png

convert -background "#0d0d0d" -fill "#22d3d3" -font "Courier-Bold" \
  -pointsize 100 -size 180x180 -gravity center label:"RN" \
  public/apple-touch-icon.png
```

Or use online tools:
- **Favicon**: https://realfavicongenerator.net/
- **OG Image**: https://www.canva.com/ (1200x630)
- **Screenshots**: Take screenshots of your deployed site

### Brand Consistency

The same cyan color (#22d3d3) is used throughout:
- Navigation accent
- Buttons and CTAs
- Code syntax highlighting
- Links and hover states
- Icons and badges

Fonts used:
- Primary: JetBrains Mono, Fira Code, Consolas
- System fallback: Monaco, monospace
