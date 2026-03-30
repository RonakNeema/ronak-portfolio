# Portfolio Development Context

## Project Overview
Modern portfolio website for Ronak Neema - DevOps Engineer / Full Stack Developer
- **Tech Stack**: Next.js 16.2.1, React 19, TypeScript, Tailwind CSS
- **Theme**: Dark terminal/code aesthetic with cyan accents
- **Deployed**: Localhost (ready for production deployment)

## Design System

### Colors
- **Background**: `#0d0d0d` (darkest), `#1a1a1a` (cards), `#252525` (card headers)
- **Borders**: `#2a2a2a`
- **Primary Accent**: Cyan (cyan-400, cyan-500, cyan-600)
- **Text**: White (primary), gray-300/400 (secondary), gray-500 (muted)
- **Success**: Green-400
- **Warning**: Amber/Yellow-400

### Typography
- **Font Family**: Monospace throughout (JetBrains Mono, Fira Code, Consolas fallback)
- **Headings**: Bold, large sizes with terminal-style prompts (`$`, `>`)
- **Body**: Small-medium mono text with code comments style (`//`)

### Terminal Card Pattern
Standard component structure used throughout:
```jsx
<div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden">
  {/* macOS-style Header */}
  <div className="bg-[#252525] px-4 py-2 flex items-center gap-2 border-b border-[#2a2a2a]">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
    <div className="w-3 h-3 rounded-full bg-green-500"></div>
    <span className="ml-4 text-gray-400 text-sm font-mono">filename.ext</span>
  </div>
  
  {/* Content */}
  <div className="p-6">
    {/* Your content here */}
  </div>
</div>
```

### Section Header Pattern
```jsx
<p className="text-cyan-400 font-mono text-sm mb-2">{'// section-name'}</p>
<h2 className="text-3xl md:text-4xl font-bold text-white font-mono">
  <span className="text-gray-500">$</span> command <span className="text-cyan-400">args</span>
</h2>
```

## Site Structure

### Pages & Sections (in order)
1. **Loading Screen** - Terminal typing animation
2. **Hero** - Matrix-style avatar, name, bio, social links
3. **About** - Personal introduction with terminal card
4. **Journey** - Timeline with Work/Education tabs (expandable cards)
5. **Skills** - 8 category cards (frontend, backend, devops, etc.)
6. **Projects** - 6 project showcase cards with GitHub links
7. **GitHub Stats** - Contribution graph, language breakdown, stats
8. **Achievements** - Gamified certifications with rarity system
9. **Contact** - Terminal-style contact form
10. **Footer** - Social links and branding

### Global Components
- **CustomCursor** - Terminal block cursor that follows mouse
- **CommandPalette** - `Ctrl+K` opens navigation modal
- **EasterEgg** - Konami code (↑↑↓↓←→←→BA) triggers Snake game
- **Navigation** - Fixed nav bar that appears on scroll

## Component Details

### Hero.tsx
- **Matrix Avatar**: Canvas-based falling characters with "RN" initials
- **Typing Bio**: Character-by-character animation on scroll into view
- Uses Intersection Observer for animation triggers
- Social links: GitHub, LinkedIn, LeetCode

### Journey/Experience.tsx
- Tabbed interface (Work/Education)
- Vertical timeline with center line
- Cards expand on hover to show achievements
- Data arrays: `workData`, `educationData`

### Skills.tsx
- 4-column responsive grid
- 8 skill categories with icons
- Terminal folder naming style (`frontend/`, `backend/`)
- Pill-style tech tags

### Projects.tsx
- 6 sample projects in 3-column grid
- Each card shows: title, description, tech stack, GitHub stars/forks
- Links to GitHub repo and live demo (if available)

### GitHubStats.tsx
- Static contribution graph (20 weeks × 7 days)
- **IMPORTANT**: Uses static data to avoid hydration mismatch (not `Math.random()`)
- Language breakdown bar chart
- Stats cards: repos, stars, commits, contributions, followers

### Achievements/Certifications.tsx
- Rarity system: common, rare, epic, legendary
- Color-coded borders and glows per rarity
- Sequential reveal animation on scroll
- Progress bar showing unlocked achievements
- Locked achievements show as "???"

### Contact.tsx
- Terminal-style form with animated prompts
- Fields: name, email, message
- Submit simulation (needs backend integration)
- Alternative email link provided

### CommandPalette.tsx
- Opens with `Ctrl+K` or `Cmd+K`
- Keyboard navigation (arrow keys, enter, escape)
- Categories: navigation, social, actions
- Fuzzy search through commands
- Floating button (bottom-right) with hover hint

### EasterEgg.tsx
- Konami code listener (↑↑↓↓←→←→BA)
- Snake game with terminal styling
- Score tracking, game over state
- Hint appears after 30 seconds on page
- Uses WASD or arrow keys for control

### CustomCursor.tsx
- Cyan terminal block cursor (`▋`)
- Follows mouse with slight delay
- Scales up on hover over interactive elements
- Glowing trail effect
- Hidden on touch devices

## File Structure
```
app/
├── components/
│   ├── About.tsx
│   ├── Certifications.tsx (Achievements)
│   ├── CommandPalette.tsx
│   ├── Contact.tsx
│   ├── CustomCursor.tsx
│   ├── EasterEgg.tsx
│   ├── Experience.tsx (Journey)
│   ├── Footer.tsx
│   ├── GitHubStats.tsx
│   ├── Hero.tsx
│   ├── HomeContent.tsx (main wrapper)
│   ├── Journey.tsx
│   ├── LoadingScreen.tsx
│   ├── Navigation.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── hooks/
│   └── useScrollAnimation.ts
├── globals.css
├── layout.tsx
└── page.tsx
```

## Recent Changes (Latest Session)

### 1. ASCII Avatar → Matrix Avatar
- Replaced 3-frame ASCII art with canvas-based Matrix rain effect
- Falling cyan characters with "RN" initials in center
- Animated, auto-refreshing characters

### 2. Easter Egg Simplification (Pending)
- User requested simpler activation than Konami code
- **TODO**: Make it trigger on simpler key combo or button click

### 3. All 8 Features Completed
✅ Custom cursor
✅ Typing bio effect
✅ Projects section
✅ Contact form
✅ Command palette
✅ GitHub stats
✅ Achievements
✅ Easter egg

### 4. Fixed Hydration Mismatch
- GitHub contribution graph used `Math.random()` 
- Replaced with static pattern data to ensure server/client match

## Technical Notes

### Next.js 16 Specifics
- Uses Turbopack for builds
- `'use client'` directive required for interactive components
- No theme context needed (dark mode only)
- Static site generation works perfectly

### Performance Optimizations
- Canvas animation uses `requestAnimationFrame`
- Intersection Observer for lazy animations
- CSS transitions over JavaScript animations where possible
- Minimal re-renders with proper React hooks

### Responsive Design
- Mobile-first approach
- Grid layouts collapse to single column on small screens
- Navigation shows/hides items based on screen size
- Touch device detection for cursor hiding

## Content Data

### Work Experience
1. DevOps Engineer @ TCS (June 2025 - Present)
2. Software Engineer Intern @ ForwardAI (May 2024 - Aug 2024)
3. DevOps Engineer Intern @ TCS (Jun 2023 - Dec 2023)

### Education
- M.S. Computer Science - University of Texas at Arlington (Aug 2023 - May 2025)
- B.Tech Computer Science - SRM University (2019 - 2023)

### Certifications/Achievements
- AWS Developer Associate (Legendary)
- CTO Appreciation Award (Epic)
- Star of the Quarter - TCS (Rare)
- Master's Degree (Legendary)
- First 1000 Commits (Rare)
- Open Source Contributor (Common)
- Kubernetes Certified - CKA (Locked)
- Tech Lead (Locked)

### Social Links
- GitHub: https://github.com/Ronakneema/
- LinkedIn: https://www.linkedin.com/in/ronak-neema/
- LeetCode: https://leetcode.com/RonakNeema/

## Known Issues / TODOs

### Immediate
- [ ] Simplify Easter egg activation (user request)
- [ ] Test Matrix avatar on different screen sizes
- [ ] Add actual email sending to Contact form (needs backend)

### Future Enhancements
- [ ] Add blog section
- [ ] Integrate real GitHub API for live stats
- [ ] Add resume download functionality
- [ ] Create 404 page with terminal theme
- [ ] Add loading states for async operations
- [ ] Implement form validation with better UX
- [ ] Add unit tests for components
- [ ] Set up CI/CD pipeline

## Build & Development

### Commands
```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Build Status
✅ All builds passing
✅ No TypeScript errors
✅ No hydration mismatches
✅ Static generation successful

### Dependencies
- Next.js 16.2.1
- React 19
- TypeScript
- Tailwind CSS
- lucide-react (icons)

## Development Patterns

### State Management
- Local component state with `useState`
- Refs for DOM access and animation frames
- No global state management needed (simple site)

### Animation Patterns
1. **CSS Transitions**: Hover effects, color changes
2. **Canvas Animation**: Matrix rain effect
3. **Intersection Observer**: Scroll-triggered reveals
4. **setTimeout/setInterval**: Typing effects, character cycling

### Accessibility Considerations
- Semantic HTML throughout
- `aria-label` on icon-only buttons
- Keyboard navigation in Command Palette
- Focus states on interactive elements
- Touch device adaptations

## Deployment Checklist
- [ ] Update meta tags in layout.tsx
- [ ] Add favicon and app icons
- [ ] Set up environment variables
- [ ] Configure domain and SSL
- [ ] Test all links and forms
- [ ] Run Lighthouse audit
- [ ] Set up analytics (optional)
- [ ] Add sitemap.xml
- [ ] Configure redirects if needed

## Contact Integration
Current form is simulated. To make it functional:
1. Add API route in `app/api/contact/route.ts`
2. Use EmailJS, SendGrid, or similar service
3. Add proper validation and error handling
4. Implement rate limiting
5. Add honeypot for spam protection

---

**Last Updated**: March 30, 2026
**Status**: Feature-complete, ready for deployment
**Next Steps**: Simplify Easter egg, test on various devices, deploy to production
