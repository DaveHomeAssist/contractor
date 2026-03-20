const {
  useState,
  useEffect,
  useRef
} = React;

// ═══════════════════════════════════════════════════════════════
// DATA LAYER — Contractor / Home Services Template
// ═══════════════════════════════════════════════════════════════

const BIZ = {
  name: "Summit Contracting",
  // ← CHANGE
  phone: "(267) 665-3324",
  // ← CHANGE
  phoneTel: "tel:+12676653324",
  email: "info@summitcontracting.com",
  // ← CHANGE
  address: "1200 Industrial Blvd",
  city: "Philadelphia",
  state: "PA",
  zip: "19103",
  hours: {
    weekday: "Mon–Fri: 7AM–5PM",
    saturday: "Sat: 8AM–1PM",
    sunday: "Sun: Emergency Only"
  },
  founded: 2008,
  years: new Date().getFullYear() - 2008,
  license: "PA HIC #054321",
  // ← CHANGE
  tagline: "Licensed, insured, and trusted by your neighbors since 2008."
};
const SERVICES = [{
  id: "roofing",
  slug: "roofing",
  title: "Roofing",
  icon: "🏠",
  shortDesc: "Complete roof replacement, repair, and storm damage restoration.",
  fullDesc: "From missing shingles to full tear-offs, we handle every roofing challenge. We work with asphalt, architectural shingles, metal, and flat roofing systems. Fully insured with manufacturer-backed warranties.",
  items: ["Full Roof Replacement", "Shingle Repair", "Storm Damage", "Leak Detection", "Flat Roof Systems", "Metal Roofing", "Gutter Installation", "Ventilation"],
  process: ["Free Inspection", "Detailed Estimate", "Material Selection", "Professional Installation", "Final Walkthrough & Warranty"],
  faqs: [{
    q: "How do I know if I need a new roof?",
    a: "Signs include missing or curling shingles, granules in gutters, daylight through attic boards, sagging, and age over 20 years. We offer free inspections to assess your roof's condition."
  }, {
    q: "Do you work with insurance claims?",
    a: "Yes — we work directly with your insurance company on storm damage claims. We document the damage, meet with adjusters, and handle the paperwork."
  }, {
    q: "What warranties do you offer?",
    a: "We provide a workmanship warranty on all labor plus the manufacturer's warranty on materials, which typically ranges from 25 years to lifetime depending on the product."
  }],
  minPrice: 5000,
  maxPrice: 15000,
  unit: "project",
  img: "/images/service-roofing.jpg"
}, {
  id: "siding",
  slug: "siding",
  title: "Siding",
  icon: "🧱",
  shortDesc: "Vinyl, fiber cement, and wood siding installation and repair.",
  fullDesc: "Transform your home's exterior with new siding that protects against the elements and boosts curb appeal. We install James Hardie fiber cement, vinyl, wood, and engineered wood siding with expert craftsmanship.",
  items: ["Vinyl Siding", "Fiber Cement (James Hardie)", "Wood Siding", "Engineered Wood", "Siding Repair", "Trim & Fascia", "Soffit Replacement"],
  process: ["Exterior Assessment", "Material & Color Selection", "Old Siding Removal", "Weather Barrier & Installation", "Trim Work & Cleanup"],
  faqs: [{
    q: "What siding material is best for my home?",
    a: "It depends on your budget and priorities. Vinyl is the most affordable. Fiber cement offers the best durability and fire resistance. Wood gives the most authentic look. We'll help you choose during consultation."
  }, {
    q: "How long does siding last?",
    a: "Vinyl: 20–40 years. Fiber cement: 30–50 years. Wood: 15–30 years with maintenance. All depend on climate and upkeep."
  }],
  minPrice: 8000,
  maxPrice: 25000,
  unit: "project",
  img: "/images/service-siding.jpg"
}, {
  id: "kitchens",
  slug: "kitchens",
  title: "Kitchens",
  icon: "🍳",
  shortDesc: "Full kitchen remodels from design to final walkthrough.",
  fullDesc: "Your kitchen is the heart of your home. We handle complete renovations — cabinets, countertops, flooring, plumbing, electrical, tile work, and finishing. We manage every trade so you don't have to.",
  items: ["Full Kitchen Remodel", "Cabinet Installation", "Countertop Replacement", "Tile Backsplash", "Flooring", "Plumbing Updates", "Electrical & Lighting", "Island Construction"],
  process: ["Design Consultation", "3D Layout & Material Selection", "Demo & Rough-In", "Cabinetry & Countertops", "Finishing & Final Details"],
  faqs: [{
    q: "How long does a kitchen remodel take?",
    a: "A typical full kitchen remodel takes 4–8 weeks depending on scope. We provide a detailed timeline before work begins and keep you updated throughout."
  }, {
    q: "Do I need to move out during a kitchen remodel?",
    a: "No — but you'll need to set up a temporary kitchen area. We work efficiently to minimize disruption and clean up at the end of every day."
  }],
  minPrice: 15000,
  maxPrice: 60000,
  unit: "project",
  img: "/images/service-kitchen.jpg"
}, {
  id: "bathrooms",
  slug: "bathrooms",
  title: "Bathrooms",
  icon: "🚿",
  shortDesc: "Bathroom renovations from budget refreshes to luxury overhauls.",
  fullDesc: "Whether it's a powder room refresh or a primary bath overhaul, we handle tile, plumbing, vanities, showers, tubs, and accessibility upgrades. Licensed plumbers on staff.",
  items: ["Full Bathroom Remodel", "Shower/Tub Installation", "Tile Work", "Vanity & Countertop", "Plumbing Updates", "Accessibility Upgrades", "Heated Floors"],
  process: ["Consultation & Design", "Material Selection", "Demo & Plumbing Rough-In", "Tile & Fixture Installation", "Finishing & Walkthrough"],
  faqs: [{
    q: "How much does a bathroom remodel cost?",
    a: "Budget refreshes start around $8,000. Mid-range remodels run $15,000–25,000. High-end primary bath renovations can reach $40,000+. We'll give you an exact number after consultation."
  }],
  minPrice: 8000,
  maxPrice: 40000,
  unit: "project",
  img: "/images/service-bathroom.jpg"
}, {
  id: "decks",
  slug: "decks",
  title: "Decks & Patios",
  icon: "🪵",
  shortDesc: "Custom deck building, repair, and patio construction.",
  fullDesc: "Extend your living space outdoors. We build custom decks in pressure-treated lumber, cedar, and composite materials like Trex. Also offering paver patios, pergolas, and outdoor living spaces.",
  items: ["Custom Deck Design & Build", "Composite Decking (Trex)", "Cedar & Pressure-Treated", "Deck Repair & Refinishing", "Paver Patios", "Pergolas & Shade Structures", "Railings & Stairs"],
  process: ["Site Visit & Design", "Permit & Material Selection", "Foundation & Framing", "Decking & Railings", "Staining/Sealing & Handoff"],
  faqs: [{
    q: "Composite vs. wood — which should I choose?",
    a: "Composite (like Trex) costs more upfront but requires almost zero maintenance and lasts 25+ years. Wood is more affordable and has a natural look but needs staining every 2–3 years."
  }],
  minPrice: 5000,
  maxPrice: 30000,
  unit: "project",
  img: "/images/service-deck.jpg"
}, {
  id: "general",
  slug: "general",
  title: "General Contracting",
  icon: "🔨",
  shortDesc: "Additions, basements, structural work, and whole-home renovations.",
  fullDesc: "For projects that don't fit a single category — home additions, basement finishing, structural repairs, or multi-room renovations — we serve as your general contractor, managing every trade and keeping the project on track.",
  items: ["Home Additions", "Basement Finishing", "Structural Repairs", "Whole-Home Renovation", "Permit Management", "Multi-Trade Coordination", "Insurance Restoration"],
  process: ["Project Scoping", "Detailed Proposal & Permits", "Phase 1: Structural/Rough", "Phase 2: Systems & Finishing", "Final Inspection & Handoff"],
  faqs: [{
    q: "Do you pull permits?",
    a: "Yes — we handle all permit applications and inspections. Every project we do is fully permitted and code-compliant."
  }, {
    q: "Do you have references?",
    a: "Absolutely. We can provide references for projects similar to yours. We also have verified reviews on Google, Houzz, and the BBB."
  }],
  minPrice: 10000,
  maxPrice: 150000,
  unit: "project",
  img: "/images/service-general.jpg"
}];
const PROJECTS = [{
  id: 1,
  slug: "rittenhouse-kitchen",
  service: "kitchens",
  neighborhood: "Rittenhouse Square",
  title: "Modern Kitchen Overhaul",
  scope: "Complete kitchen remodel — custom shaker cabinets, quartz countertops, subway tile backsplash, hardwood flooring, new lighting",
  challenge: "1920s rowhome with outdated galley kitchen. Load-bearing wall between kitchen and dining room. Aging plumbing and electrical.",
  solution: "Opened the floor plan with a structural beam, replaced all plumbing and electrical, installed custom white shaker cabinets with soft-close, quartz countertops, and a large island with seating.",
  result: "Open-concept kitchen that doubled the usable space. Homeowner called it 'the best investment we've made in 15 years of owning this house.'",
  timeWeeks: 6,
  sqft: 180,
  budget: "$45,000",
  rating: 5,
  featured: true,
  date: "2025-11",
  beforeEmoji: "🏚️",
  afterEmoji: "✨"
}, {
  id: 2,
  slug: "main-line-roof",
  service: "roofing",
  neighborhood: "Main Line",
  title: "Storm Damage Roof Replacement",
  scope: "Full roof tear-off and replacement — architectural shingles, new flashing, ridge vent, gutter system",
  challenge: "Severe hail damage to 30-year-old roof. Multiple leaks. Insurance claim required professional documentation.",
  solution: "Documented all damage for insurance adjuster, coordinated claim approval, performed full tear-off, installed GAF Timberline HDZ architectural shingles with lifetime warranty, replaced all flashing and added ridge ventilation.",
  result: "Insurance covered 90% of the cost. New roof with 50-year warranty. Homeowner paid only their deductible.",
  timeWeeks: 1,
  sqft: 2200,
  budget: "$14,500",
  rating: 5,
  featured: true,
  date: "2025-09",
  beforeEmoji: "⛈️",
  afterEmoji: "✨"
}, {
  id: 3,
  slug: "fishtown-bathroom",
  service: "bathrooms",
  neighborhood: "Fishtown",
  title: "Primary Bath Luxury Renovation",
  scope: "Gut renovation — walk-in shower with rain head, freestanding tub, heated tile floors, double vanity",
  challenge: "Cramped 1950s bathroom with cast iron tub, old tile, and single vanity. Couple wanted a spa-like retreat.",
  solution: "Gutted to studs, reconfigured layout for open shower with frameless glass, installed freestanding soaking tub, heated porcelain tile floors, floating double vanity with undermount sinks, and LED mirror.",
  result: "Complete transformation from dated to luxury. Added an estimated $25,000+ to home value.",
  timeWeeks: 5,
  sqft: 110,
  budget: "$32,000",
  rating: 5,
  featured: true,
  date: "2026-01",
  beforeEmoji: "🏚️",
  afterEmoji: "✨"
}, {
  id: 4,
  slug: "cherry-hill-deck",
  service: "decks",
  neighborhood: "Cherry Hill",
  title: "Multi-Level Composite Deck",
  scope: "800 sq ft two-level Trex deck with built-in bench seating, stairs, pergola, and low-voltage lighting",
  challenge: "Sloped backyard with old pressure-treated deck that was rotting and unsafe. Family wanted usable outdoor entertaining space.",
  solution: "Designed two-level deck to work with the slope — upper level off the kitchen for dining, lower level for lounge area. Trex Transcend decking, aluminum railings, cedar pergola, and integrated LED step lighting.",
  result: "Family went from never using their backyard to hosting every weekend. Deck has required zero maintenance in its first year.",
  timeWeeks: 3,
  sqft: 800,
  budget: "$28,000",
  rating: 5,
  featured: true,
  date: "2025-07",
  beforeEmoji: "🪵",
  afterEmoji: "✨"
}, {
  id: 5,
  slug: "south-philly-siding",
  service: "siding",
  neighborhood: "South Philadelphia",
  title: "Full Siding Replacement",
  scope: "James Hardie fiber cement siding — full home wrap, new trim, soffit, and fascia",
  challenge: "Peeling vinyl siding with water infiltration behind several sections. Rotted trim and fascia boards.",
  solution: "Removed all existing siding, repaired sheathing and rotted framing, installed Tyvek house wrap, and clad the entire home in James Hardie ColorPlus fiber cement siding with coordinating trim.",
  result: "Home looks brand new from the street. Zero maintenance required — ColorPlus finish is pre-painted and warranted for 15 years.",
  timeWeeks: 2,
  sqft: 1600,
  budget: "$18,500",
  rating: 5,
  featured: false,
  date: "2025-12",
  beforeEmoji: "🧱",
  afterEmoji: "✨"
}, {
  id: 6,
  slug: "doylestown-addition",
  service: "general",
  neighborhood: "Doylestown",
  title: "Two-Story Home Addition",
  scope: "600 sq ft addition — first floor family room, second floor bedroom and bath",
  challenge: "Growing family needed more space but didn't want to move from their neighborhood. Tight lot with setback restrictions.",
  solution: "Designed addition to maximize within setback limits. Matched existing roofline and exterior. Full HVAC, electrical, and plumbing integration. Seamless interior transitions.",
  result: "Family gained the space they needed without leaving the neighborhood they love. Addition matches the original house perfectly.",
  timeWeeks: 12,
  sqft: 600,
  budget: "$95,000",
  rating: 5,
  featured: false,
  date: "2025-10",
  beforeEmoji: "🏗️",
  afterEmoji: "✨"
}];
const REVIEWS = [{
  id: 1,
  author: "Mike & Sarah T.",
  neighborhood: "Rittenhouse Square",
  rating: 5,
  service: "kitchens",
  source: "Google",
  text: "Summit completely transformed our kitchen. They managed every detail — demolition, plumbing, electrical, cabinets, countertops — and finished on schedule. The open floor plan changed how we live in our home."
}, {
  id: 2,
  author: "David R.",
  neighborhood: "Main Line",
  rating: 5,
  service: "roofing",
  source: "Google",
  text: "After the hail storm, Summit handled our entire insurance claim. They documented everything, met with the adjuster, and had the new roof on within a week of approval. Professional from start to finish."
}, {
  id: 3,
  author: "Jessica L.",
  neighborhood: "Fishtown",
  rating: 5,
  service: "bathrooms",
  source: "Houzz",
  text: "Our bathroom renovation exceeded every expectation. The heated floors, the walk-in shower, the freestanding tub — it feels like a spa. The crew was respectful, clean, and skilled. Worth every penny."
}, {
  id: 4,
  author: "Tom & Karen W.",
  neighborhood: "Cherry Hill",
  rating: 5,
  service: "decks",
  source: "Google",
  text: "The two-level deck completely changed our backyard. The built-in lighting, the pergola, the Trex material — it's like adding an extra room to the house. And zero maintenance."
}, {
  id: 5,
  author: "Angela M.",
  neighborhood: "South Philadelphia",
  rating: 5,
  service: "siding",
  source: "BBB",
  text: "Our house looks brand new. The James Hardie siding was the right choice — the crew found rotted sheathing we didn't know about and repaired everything before installing. Honest and thorough."
}, {
  id: 6,
  author: "Chris P.",
  neighborhood: "Doylestown",
  rating: 5,
  service: "general",
  source: "Google",
  text: "Building a home addition is a huge undertaking and Summit made it feel manageable. Clear communication, weekly updates, and the final result matches our existing house perfectly. Couldn't be happier."
}, {
  id: 7,
  author: "Linda & Frank B.",
  neighborhood: "Manayunk",
  rating: 5,
  service: "kitchens",
  source: "Google",
  text: "Second time using Summit — first for our bathroom, now the kitchen. Same great experience both times. They remember how we like things done. That kind of relationship matters."
}, {
  id: 8,
  author: "Robert K.",
  neighborhood: "Conshohocken",
  rating: 5,
  service: "roofing",
  source: "Yelp",
  text: "Straightforward, honest, and fast. Got three quotes and Summit was the most transparent about what needed to be done and why. Roof was done in two days and they cleaned up like they were never there."
}];
const SERVICE_AREAS = [{
  name: "Philadelphia",
  neighborhoods: ["Rittenhouse Square", "Center City", "Fishtown", "South Philadelphia", "Manayunk", "Chestnut Hill", "Northeast Philadelphia"]
}, {
  name: "Montgomery County",
  neighborhoods: ["Main Line", "King of Prussia", "Conshohocken", "Norristown", "Ardmore"]
}, {
  name: "Bucks County",
  neighborhoods: ["Doylestown", "Newtown", "Warminster", "Yardley"]
}, {
  name: "Delaware County",
  neighborhoods: ["Media", "Havertown", "Springfield", "Swarthmore"]
}, {
  name: "Chester County",
  neighborhoods: ["West Chester", "Exton", "Malvern"]
}, {
  name: "Camden County, NJ",
  neighborhoods: ["Cherry Hill", "Haddonfield", "Voorhees", "Collingswood"]
}];
const TRUST = [{
  label: `${BIZ.years}+ Years`,
  detail: `Serving Philadelphia since ${BIZ.founded}`,
  icon: "📅"
}, {
  label: "Licensed & Insured",
  detail: BIZ.license,
  icon: "🛡️"
}, {
  label: "Free Estimates",
  detail: "No-obligation consultations",
  icon: "📋"
}, {
  label: "Warranty Backed",
  detail: "Labor + manufacturer warranties",
  icon: "✅"
}];

// ═══════════════════════════════════════════════════════════════
// STYLES — Industrial / Utilitarian aesthetic
// ═══════════════════════════════════════════════════════════════

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

:root {
  --steel: #2B4C6F;
  --steel-light: #3A6490;
  --steel-deep: #1E3550;
  --steel-pale: rgba(43,76,111,0.08);
  --orange: #E87A2E;
  --orange-light: #F08D45;
  --orange-deep: #C4641F;
  --orange-glow: rgba(232,122,46,0.1);
  --concrete: #F2F0ED;
  --concrete-dark: #E4E1DB;
  --warm-white: #FAFAF8;
  --charcoal: #1A1D21;
  --charcoal-mid: #2D3239;
  --slate: #5E666F;
  --mist: #A5ABB3;
  --slate-light: #999;
  --success: #3D8B5E;
  --font-display: 'Bitter', Georgia, serif;
  --font-body: 'Source Sans 3', system-ui, sans-serif;
  --shadow-sm: 0 1px 4px rgba(26,29,33,0.06);
  --shadow-md: 0 4px 20px rgba(26,29,33,0.08);
  --shadow-lg: 0 8px 40px rgba(26,29,33,0.10);
  --radius: 6px;
  --radius-lg: 10px;
  --transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-body); color: var(--charcoal); background: var(--warm-white); line-height: 1.6; -webkit-font-smoothing: antialiased; }

/* ── HEADER ── */
.site-header { position: sticky; top: 0; z-index: 100; background: rgba(26,29,33,0.97); backdrop-filter: blur(12px); border-bottom: 3px solid var(--orange); }
.header-top { background: var(--steel-deep); padding: 5px 0; text-align: center; font-size: 12px; color: rgba(255,255,255,0.7); letter-spacing: 0.03em; }
.header-top strong { color: var(--orange-light); font-weight: 600; }
.header-main { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; height: 64px; }
.h-logo { font-family: var(--font-display); font-size: 20px; font-weight: 800; color: white; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.04em; }
.h-logo-accent { color: var(--orange); }
.h-nav { display: flex; gap: 2px; align-items: center; }
.h-nav a, .h-nav button { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 13px; font-weight: 500; padding: 8px 14px; border-radius: 4px; transition: var(--transition); cursor: pointer; background: none; border: none; font-family: var(--font-body); white-space: nowrap; }
.h-nav a:hover, .h-nav button:hover { color: white; background: rgba(255,255,255,0.08); }
.h-nav a.is-active { color: var(--orange-light); }
.h-phone { color: white; text-decoration: none; font-weight: 700; font-size: 15px; padding: 8px 16px; background: var(--orange); border-radius: var(--radius); transition: var(--transition); white-space: nowrap; font-family: var(--font-body); }
.h-phone:hover { background: var(--orange-light); }
.h-menu-btn { display: none; background: none; border: none; color: white; cursor: pointer; padding: 8px; font-size: 24px; }
@media (max-width: 900px) {
  .h-nav { display: none; } .h-phone-desk { display: none; } .h-menu-btn { display: block; }
  .h-nav.is-open { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--charcoal); padding: 16px 24px 24px; gap: 4px; border-bottom: 3px solid var(--orange); }
  .h-nav.is-open a, .h-nav.is-open button { padding: 12px 16px; font-size: 15px; text-align: left; width: 100%; }
.h-actions { display: flex; align-items: center; gap: 8px; }
}

/* ── MOBILE BAR ── */
.mob-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 200; background: var(--charcoal); padding: 10px 16px; border-top: 3px solid var(--orange); }
.mob-bar-inner { display: flex; gap: 10px; max-width: 500px; margin: 0 auto; }
.mob-btn { flex: 1; padding: 14px; border-radius: var(--radius); font-weight: 700; font-size: 14px; cursor: pointer; text-align: center; text-decoration: none; font-family: var(--font-body); border: none; display: flex; align-items: center; justify-content: center; gap: 6px; }
.mob-call { background: var(--orange); color: white; }
.mob-est { background: rgba(255,255,255,0.08); color: white; border: 1px solid rgba(255,255,255,0.15); }
.mob-btn:hover { opacity: 0.85; }
.mob-btn:focus-visible { outline: 2px solid var(--orange-deep); outline-offset: 2px; }
@media (max-width: 768px) { .mob-bar { display: block; } main { padding-bottom: 80px; } }

/* ── HERO ── */
.hero { background: linear-gradient(160deg, var(--charcoal) 0%, var(--charcoal-mid) 40%, var(--steel-deep) 100%); padding: 96px 24px 80px; position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 60px); pointer-events: none; }
.hero::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--orange), var(--steel), var(--orange)); }
.hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 48px; align-items: center; }
@media (max-width: 768px) { .hero-inner { grid-template-columns: 1fr; } .hero-right { display: none; } .hero { padding: 72px 24px 64px; } }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--orange-glow); color: var(--orange); padding: 6px 16px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; border: 1px solid rgba(232,122,46,0.2); }
.hero h1 { font-family: var(--font-display); font-size: clamp(36px, 5vw, 52px); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 20px; text-transform: uppercase; letter-spacing: -0.01em; }
.hero h1 em { font-style: italic; color: var(--orange); text-transform: none; font-weight: 700; }
.hero-sub { color: rgba(255,255,255,0.7); font-size: 17px; line-height: 1.75; margin-bottom: 32px; max-width: 520px; }
.hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
.btn-primary { background: var(--orange); color: white; border: none; padding: 15px 30px; border-radius: var(--radius); font-weight: 700; font-size: 15px; cursor: pointer; transition: var(--transition); font-family: var(--font-body); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.04em; }
.btn-primary:hover { background: var(--orange-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(232,122,46,0.3); }
.btn-ghost { background: transparent; color: rgba(255,255,255,0.8); border: 1px solid rgba(255,255,255,0.2); padding: 15px 28px; border-radius: var(--radius); font-weight: 600; font-size: 15px; cursor: pointer; transition: var(--transition); font-family: var(--font-body); text-decoration: none; }
.btn-ghost:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.35); color: white; }
.hero-stats { display: flex; gap: 32px; margin-top: 40px; padding-top: 28px; border-top: 1px solid rgba(255,255,255,0.08); flex-wrap: wrap; }
.hero-stat { text-align: left; }
.hero-stat-num { font-family: var(--font-display); font-size: 28px; font-weight: 800; color: white; }
.hero-stat-label { font-size: 12px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.06em; }
.hero-right { display: flex; flex-direction: column; gap: 12px; }
.hero-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-lg); padding: 20px; display: flex; align-items: center; gap: 16px; }
.hero-card-icon { font-size: 28px; }
.hero-card h4 { font-family: var(--font-display); font-size: 16px; color: white; margin-bottom: 2px; }
.hero-card p { font-size: 12px; color: rgba(255,255,255,0.5); }

/* ── SECTIONS ── */
.section { padding: 80px 24px; }
.section-inner { max-width: 1200px; margin: 0 auto; }
.section-alt { background: var(--concrete); }
.section-dark { background: var(--charcoal); color: white; }
.section-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700; color: var(--orange); margin-bottom: 10px; }
.section-title { font-family: var(--font-display); font-size: clamp(28px, 4vw, 40px); font-weight: 800; color: var(--charcoal); line-height: 1.15; margin-bottom: 12px; text-transform: uppercase; }
.section-dark .section-title { color: white; }
.section-desc { color: var(--slate); font-size: 16px; line-height: 1.7; max-width: 560px; }

/* ── TRUST BAR ── */
.trust-bar { display: flex; justify-content: center; gap: 36px; flex-wrap: wrap; padding: 32px 24px; background: white; border-bottom: 1px solid var(--concrete-dark); }
.trust-item { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--charcoal); }
.trust-icon { font-size: 20px; }
.trust-detail { display: block; font-size: 11px; color: var(--slate); font-weight: 400; }

/* ── CARDS ── */
.card { background: white; border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-sm); transition: var(--transition); border: 1px solid rgba(0,0,0,0.04); }
.card:hover { box-shadow: var(--shadow-md); transform: translateY(-3px); }
.card-body { padding: 24px; }

/* ── SERVICE GRID ── */
.svc-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.svc-card { cursor: pointer; border-left: 4px solid var(--steel); }
.svc-card:hover { border-left-color: var(--orange); }
.svc-card:focus-visible, .proj-card:focus-visible { outline: 2px solid var(--orange-deep); outline-offset: 2px; }
.svc-card .card-body { padding: 28px; }
.svc-icon { font-size: 28px; margin-bottom: 12px; }
.svc-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--charcoal); margin-bottom: 6px; text-transform: uppercase; }
.svc-desc { font-size: 14px; color: var(--slate); line-height: 1.6; }
.svc-link { margin-top: 12px; color: var(--orange); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }

/* ── PROJECT CARDS ── */
.proj-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
.proj-card { cursor: pointer; }
.proj-imgs { display: grid; grid-template-columns: 1fr 1fr; height: 160px; }
.proj-img { display: flex; align-items: center; justify-content: center; font-size: 40px; position: relative; }
.proj-before { background: linear-gradient(135deg, var(--mist) 0%, var(--slate-light) 100%); }
.proj-after { background: linear-gradient(135deg, var(--steel) 0%, var(--steel-deep) 100%); }
.proj-label { position: absolute; bottom: 6px; left: 6px; background: rgba(0,0,0,0.6); color: white; font-size: 9px; padding: 2px 8px; border-radius: 3px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
.proj-card h3 { font-family: var(--font-display); font-size: 17px; color: var(--charcoal); margin-bottom: 4px; text-transform: uppercase; }
.proj-card p { font-size: 13px; color: var(--slate); }
.proj-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
.proj-tag { font-size: 10px; padding: 3px 8px; border-radius: 3px; background: var(--concrete); color: var(--steel-deep); font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em; }

/* ── REVIEWS ── */
.review-card { padding: 28px; border-left: 4px solid var(--orange); }
.review-stars { color: var(--orange); font-size: 15px; letter-spacing: 2px; margin-bottom: 12px; }
.review-text { font-size: 14px; line-height: 1.75; color: var(--charcoal); margin-bottom: 16px; font-style: italic; }
.review-author { font-weight: 700; color: var(--charcoal); font-size: 14px; }
.review-detail { color: var(--slate); font-size: 12px; }
.review-source { font-size: 10px; padding: 3px 8px; border-radius: 3px; background: var(--concrete); color: var(--steel-deep); font-weight: 600; }

/* ── PROCESS ── */
.proc-steps { display: flex; flex-direction: column; }
.proc-step { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid var(--concrete-dark); }
.proc-step:last-child { border-bottom: none; }
.proc-num { width: 44px; height: 44px; border-radius: 4px; background: var(--steel); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; flex-shrink: 0; font-family: var(--font-display); }
.proc-content h4 { font-family: var(--font-display); font-size: 17px; color: var(--charcoal); margin-bottom: 4px; text-transform: uppercase; }
.proc-content p { font-size: 14px; color: var(--slate); line-height: 1.6; }

/* ── FAQ ── */
.faq-item { border-bottom: 1px solid var(--concrete-dark); }
.faq-q { width: 100%; text-align: left; padding: 20px 0; background: none; border: none; font-family: var(--font-body); font-size: 15px; font-weight: 600; color: var(--charcoal); cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 16px; }
.faq-q:hover { color: var(--orange); }
.faq-arrow { font-size: 18px; transition: var(--transition); color: var(--mist); flex-shrink: 0; }
.faq-arrow.is-open { transform: rotate(180deg); color: var(--orange); }
.faq-a { padding: 0 0 20px; font-size: 14px; line-height: 1.7; color: var(--slate); max-width: 700px; }

/* ── QUOTE FORM ── */
.form-container { background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); overflow: hidden; max-width: 560px; margin: 0 auto; }
.form-header { background: var(--charcoal); padding: 24px 32px; }
.form-header h3 { font-family: var(--font-display); font-size: 22px; color: white; text-transform: uppercase; }
.form-header p { color: rgba(255,255,255,0.6); font-size: 13px; }
.form-body { padding: 28px 32px 32px; }
.form-field { margin-bottom: 16px; }
.form-label { display: block; font-size: 12px; font-weight: 700; color: var(--charcoal); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.04em; }
.form-input, .form-select, .form-textarea { width: 100%; padding: 12px 14px; border: 1.5px solid var(--concrete-dark); border-radius: var(--radius); font-family: var(--font-body); font-size: 14px; color: var(--charcoal); transition: var(--transition); background: white; outline: none; }
.form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--steel); box-shadow: 0 0 0 3px var(--steel-pale); }
.form-textarea { resize: vertical; min-height: 80px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
@media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }
.form-submit { width: 100%; padding: 14px; background: var(--orange); color: white; border: none; border-radius: var(--radius); font-weight: 700; font-size: 15px; cursor: pointer; font-family: var(--font-body); text-transform: uppercase; letter-spacing: 0.04em; transition: var(--transition); margin-top: 8px; }
.form-submit:hover { background: var(--orange-light); }
.form-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.form-success { text-align: center; padding: 48px 32px; }
.form-success h3 { font-family: var(--font-display); font-size: 28px; color: var(--charcoal); margin: 16px 0 8px; }

/* ── CTA BANNER ── */
.cta-banner { background: linear-gradient(135deg, var(--charcoal) 0%, var(--steel-deep) 100%); border-radius: var(--radius-lg); padding: 44px; text-align: center; margin: 40px 0; position: relative; overflow: hidden; }
.cta-banner::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 4px; background: var(--orange); }
.cta-banner h3 { font-family: var(--font-display); font-size: 28px; color: white; margin-bottom: 12px; text-transform: uppercase; }
.cta-banner p { color: rgba(255,255,255,0.6); margin-bottom: 24px; font-size: 15px; }

/* ── FILTER ── */
.filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
.filter-chip { padding: 7px 16px; border-radius: 4px; font-size: 13px; font-weight: 600; border: 1px solid var(--concrete-dark); background: white; color: var(--slate); cursor: pointer; transition: var(--transition); font-family: var(--font-body); text-transform: uppercase; letter-spacing: 0.02em; }
.filter-chip:hover { border-color: var(--steel); color: var(--steel); }
.filter-chip.is-active { background: var(--charcoal); color: white; border-color: var(--charcoal); }

/* ── FOOTER ── */
.site-footer { background: var(--charcoal); color: rgba(255,255,255,0.6); padding: 64px 24px 32px; font-size: 14px; }
.footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
.footer-brand h3 { font-family: var(--font-display); font-size: 20px; color: white; margin-bottom: 12px; text-transform: uppercase; }
.footer-col h4 { color: var(--orange); font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 16px; font-weight: 700; }
.footer-col a { display: block; color: rgba(255,255,255,0.5); text-decoration: none; padding: 4px 0; transition: var(--transition); cursor: pointer; }
.footer-col a:hover { color: white; }
.footer-bottom { max-width: 1200px; margin: 40px auto 0; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 12px; opacity: 0.4; }
@media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 32px; } }

/* ── MISC ── */
.text-center { text-align: center; }
.mt-24 { margin-top: 24px; } .mt-32 { margin-top: 32px; } .mt-48 { margin-top: 48px; } .mb-32 { margin-bottom: 32px; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start; }
@media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr; } }
.tag { font-size: 11px; padding: 4px 10px; border-radius: 3px; background: var(--concrete); color: var(--steel-deep); font-weight: 600; }
.link-btn { background: none; border: none; color: var(--orange); font-weight: 700; cursor: pointer; font-family: var(--font-body); font-size: 14px; text-decoration: underline; text-underline-offset: 3px; padding: 0; text-transform: uppercase; letter-spacing: 0.02em; transition: var(--transition); }
.link-btn:hover, .link-btn:focus { color: var(--orange-deep); }
.breadcrumb { font-size: 13px; color: var(--slate); margin-bottom: 8px; }
.breadcrumb a { color: var(--orange); text-decoration: none; cursor: pointer; }
.breadcrumb a:hover { text-decoration: underline; }
`;

// ═══════════════════════════════════════════════════════════════
// HOOKS & HELPERS
// ═══════════════════════════════════════════════════════════════

function useHash() {
  const [hash, setHash] = useState(window.location.hash || "#/");
  useEffect(() => {
    const h = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return hash;
}
function nav(p) {
  window.location.hash = p;
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
function getService(s) {
  return SERVICES.find(x => x.slug === s);
}
function getProject(s) {
  return PROJECTS.find(x => x.slug === s);
}

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function TrustBar() {
  return /*#__PURE__*/React.createElement("div", {
    className: "trust-bar"
  }, TRUST.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "trust-item"
  }, /*#__PURE__*/React.createElement("span", {
    className: "trust-icon"
  }, t.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", null, t.label), /*#__PURE__*/React.createElement("span", {
    className: "trust-detail"
  }, t.detail)))));
}
function CTA({
  title = "Ready to Start Your Project?",
  text = "Get a free estimate — no obligation, no pressure.",
  cta = "Get Free Estimate"
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "cta-banner"
  }, /*#__PURE__*/React.createElement("h3", null, title), /*#__PURE__*/React.createElement("p", null, text), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => nav("/contact")
  }, cta));
}
function FAQ({
  faqs
}) {
  const [open, setOpen] = useState(null);
  return /*#__PURE__*/React.createElement("div", null, faqs.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "faq-item"
  }, /*#__PURE__*/React.createElement("button", {
    className: "faq-q",
    "aria-expanded": open === i,
    onClick: () => setOpen(open === i ? null : i)
  }, f.q, /*#__PURE__*/React.createElement("span", {
    className: `faq-arrow ${open === i ? "is-open" : ""}`
  }, "\u25BE")), open === i && /*#__PURE__*/React.createElement("div", {
    className: "faq-a"
  }, f.a))));
}
function ProcessSteps({
  steps
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "proc-steps"
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "proc-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proc-num"
  }, i + 1), /*#__PURE__*/React.createElement("div", {
    className: "proc-content"
  }, /*#__PURE__*/React.createElement("h4", null, s)))));
}
function ReviewCard({
  r
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card review-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "review-stars"
  }, "★".repeat(r.rating)), /*#__PURE__*/React.createElement("p", {
    className: "review-text"
  }, "\"", r.text, "\""), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "review-author"
  }, r.author), /*#__PURE__*/React.createElement("span", {
    className: "review-detail"
  }, " \xB7 ", r.neighborhood)), /*#__PURE__*/React.createElement("span", {
    className: "review-source"
  }, r.source)));
}
function ServiceCard({
  s,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card svc-card",
    onClick: onClick,
    role: "button",
    tabIndex: 0,
    onKeyDown: e => e.key === "Enter" && onClick()
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-icon"
  }, s.icon), /*#__PURE__*/React.createElement("h3", {
    className: "svc-title"
  }, s.shortTitle || s.title), /*#__PURE__*/React.createElement("p", {
    className: "svc-desc"
  }, s.shortDesc), /*#__PURE__*/React.createElement("div", {
    className: "svc-link"
  }, "Learn More \u2192")));
}
function ProjectCard({
  p,
  onClick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card proj-card",
    onClick: onClick,
    role: "button",
    tabIndex: 0,
    onKeyDown: e => e.key === "Enter" && onClick()
  }, /*#__PURE__*/React.createElement("div", {
    className: "proj-imgs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "proj-img proj-before"
  }, p.beforeEmoji, /*#__PURE__*/React.createElement("span", {
    className: "proj-label"
  }, "Before")), /*#__PURE__*/React.createElement("div", {
    className: "proj-img proj-after"
  }, p.afterEmoji, /*#__PURE__*/React.createElement("span", {
    className: "proj-label"
  }, "After"))), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h3", null, p.neighborhood), /*#__PURE__*/React.createElement("p", null, p.scope.slice(0, 80), "\u2026"), /*#__PURE__*/React.createElement("div", {
    className: "proj-tags"
  }, /*#__PURE__*/React.createElement("span", {
    className: "proj-tag"
  }, SERVICES.find(s => s.id === p.service)?.title), /*#__PURE__*/React.createElement("span", {
    className: "proj-tag"
  }, p.budget), /*#__PURE__*/React.createElement("span", {
    className: "proj-tag"
  }, p.timeWeeks, " weeks"))));
}
function QuoteForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    const data = new FormData(formRef.current);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString()
    }).then(response => {
      if (!response.ok) throw new Error("Netlify form submit failed");
      setSent(true);
    }).catch(() => {
      setSending(false);
    });
  }

  if (sent) return /*#__PURE__*/React.createElement("div", {
    className: "form-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-success"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", null, "Request Received"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--slate)",
      fontSize: 14
    }
  }, "We'll call you within 24 hours to schedule your free estimate."), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 12
    }
  }, "Or call now: ", /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    style: {
      color: "var(--orange)",
      fontWeight: 700
    }
  }, BIZ.phone))));
  return /*#__PURE__*/React.createElement("div", {
    className: "form-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-header"
  }, /*#__PURE__*/React.createElement("h3", null, "Get Your Free Estimate"), /*#__PURE__*/React.createElement("p", null, "Tell us about your project \u2014 we respond within 24 hours.")), /*#__PURE__*/React.createElement("form", {
    ref: formRef,
    name: "quote",
    method: "POST",
    "data-netlify": "true",
    "netlify-honeypot": "bot-field",
    className: "form-body",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", { type: "hidden", name: "form-name", value: "quote" }),
  /*#__PURE__*/React.createElement("input", { type: "hidden", name: "bot-field" }),
  /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Name *"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    name: "name",
    placeholder: "Your full name",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Phone *"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    name: "phone",
    type: "tel",
    placeholder: "(555) 000-0000",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    name: "email",
    type: "email",
    placeholder: "you@email.com"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Service Needed"), /*#__PURE__*/React.createElement("select", {
    className: "form-select",
    name: "service",
    defaultValue: ""
  }, [/*#__PURE__*/React.createElement("option", {
    key: "",
    value: "",
    disabled: true
  }, "Select\u2026"), ...SERVICES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s.id,
    value: s.id
  }, s.title))])), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Project Details"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-textarea",
    name: "details",
    placeholder: "Describe your project \u2014 what needs to be done, any concerns, timeline preferences\u2026"
  })), /*#__PURE__*/React.createElement("button", {
    className: "form-submit",
    type: "submit",
    disabled: sending
  }, sending ? "Sending\u2026" : "Request Free Estimate")));
}

// ═══════════════════════════════════════════════════════════════
// PAGES
// ═══════════════════════════════════════════════════════════════

function HomePage() {
  const featured = PROJECTS.filter(p => p.featured).slice(0, 4);
  const featuredReviews = REVIEWS.slice(0, 3);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, "Licensed \xB7 Insured \xB7 ", BIZ.years, "+ Years Experience"), /*#__PURE__*/React.createElement("h1", null, "Philadelphia's Trusted Home ", /*#__PURE__*/React.createElement("em", null, "Contractor")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "Roofing, siding, kitchens, bathrooms, decks, and whole-home renovations. Quality craftsmanship backed by real warranties. Free estimates \u2014 always."), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => nav("/contact")
  }, "Get Free Estimate \u2192"), /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    className: "btn-ghost"
  }, "\uD83D\uDCDE ", BIZ.phone)), /*#__PURE__*/React.createElement("div", {
    className: "hero-stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num"
  }, BIZ.years, "+"), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-label"
  }, "Years Experience")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num"
  }, "500+"), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-label"
  }, "Projects Completed")), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-num"
  }, "5.0"), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-label"
  }, "Google Rating")))), /*#__PURE__*/React.createElement("div", {
    className: "hero-right"
  }, SERVICES.slice(0, 4).map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: "hero-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-card-icon"
  }, s.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, s.title), /*#__PURE__*/React.createElement("p", null, s.shortDesc.slice(0, 50), "\u2026"))))))), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Our Services"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "What We Do"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc mb-32"
  }, "Full-service contracting for every part of your home \u2014 from the roof down to the foundation."), /*#__PURE__*/React.createElement("div", {
    className: "svc-grid"
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.id,
    s: s,
    onClick: () => nav(`/services/${s.slug}`)
  }))))), /*#__PURE__*/React.createElement("section", {
    className: "section section-alt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Recent Work"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Before & After"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc mb-32"
  }, "See the quality of our craftsmanship across the Philadelphia area."), /*#__PURE__*/React.createElement("div", {
    className: "proj-grid"
  }, featured.map(p => /*#__PURE__*/React.createElement(ProjectCard, {
    key: p.id,
    p: p,
    onClick: () => nav(`/projects/${p.slug}`)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-32"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => nav("/gallery")
  }, "View All Projects \u2192")))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Reviews"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "What Homeowners Say"), /*#__PURE__*/React.createElement("p", {
    className: "section-desc mb-32"
  }, "Real reviews from real projects across Philadelphia and the suburbs."), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, featuredReviews.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.id,
    r: r
  }))), /*#__PURE__*/React.createElement("div", {
    className: "text-center mt-32"
  }, /*#__PURE__*/React.createElement("button", {
    className: "link-btn",
    onClick: () => nav("/reviews")
  }, "Read All Reviews \u2192")))), /*#__PURE__*/React.createElement("section", {
    className: "section section-dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "About Us"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title",
    style: {
      color: "white"
    }
  }, "Built on Reputation"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 680,
      margin: "0 auto 32px",
      lineHeight: 1.8,
      color: "rgba(255,255,255,0.65)",
      fontSize: 15
    }
  }, BIZ.name, " has been serving the Philadelphia area since ", BIZ.founded, ". We're licensed, fully insured, and we stand behind every project with real warranties. Our reputation is built on honest communication, quality workmanship, and treating your home like our own."), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => nav("/about")
  }, "Our Full Story \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(CTA, null)));
}
function ServicesPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      gridTemplateColumns: "1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, "Our Services"), /*#__PURE__*/React.createElement("h1", null, "Every Part of ", /*#__PURE__*/React.createElement("em", null, "Your Home")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "From roofing and siding to kitchens, bathrooms, decks, and major renovations \u2014 we handle it all."), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => nav("/contact")
  }, "Get Free Estimate \u2192"))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-grid"
  }, SERVICES.map(s => /*#__PURE__*/React.createElement(ServiceCard, {
    key: s.id,
    s: s,
    onClick: () => nav(`/services/${s.slug}`)
  }))))));
}
function ServiceDetailPage({
  slug
}) {
  const svc = getService(slug);
  if (!svc) return /*#__PURE__*/React.createElement("div", {
    className: "section section-inner"
  }, /*#__PURE__*/React.createElement("p", null, "Service not found."));
  const projects = PROJECTS.filter(p => p.service === svc.id).slice(0, 3);
  const reviews = REVIEWS.filter(r => r.service === svc.id).slice(0, 2);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      gridTemplateColumns: "1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, svc.title), /*#__PURE__*/React.createElement("h1", null, svc.title, " ", /*#__PURE__*/React.createElement("em", null, "Services")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, svc.fullDesc), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => nav("/contact")
  }, "Get Free Estimate \u2192"), /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    className: "btn-ghost"
  }, "\uD83D\uDCDE ", BIZ.phone))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/")
  }, "Home"), " / ", /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/services")
  }, "Services"), " / ", svc.title), /*#__PURE__*/React.createElement("div", {
    className: "grid-2 mt-32"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Our Process"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      color: "var(--charcoal)",
      marginBottom: 16,
      textTransform: "uppercase"
    }
  }, "How We Work"), /*#__PURE__*/React.createElement(ProcessSteps, {
    steps: svc.process
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "What We Cover"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      color: "var(--charcoal)",
      marginBottom: 16,
      textTransform: "uppercase"
    }
  }, "Services Included"), svc.items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 12,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange)",
      fontWeight: 700,
      flexShrink: 0
    }
  }, "\u25B8"), " ", item)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      padding: 20,
      background: "var(--concrete)",
      borderRadius: "var(--radius)",
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--charcoal)"
    }
  }, "Typical Investment:"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 18,
      color: "var(--orange)",
      fontWeight: 700
    }
  }, "$", svc.minPrice.toLocaleString(), " \u2013 $", svc.maxPrice.toLocaleString()), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--slate)",
      marginTop: 4
    }
  }, "Final pricing depends on scope, materials, and site conditions. Estimates are always free.")))), projects.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-48"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Recent ", svc.title, " Projects"), /*#__PURE__*/React.createElement("div", {
    className: "proj-grid"
  }, projects.map(p => /*#__PURE__*/React.createElement(ProjectCard, {
    key: p.id,
    p: p,
    onClick: () => nav(`/projects/${p.slug}`)
  })))), /*#__PURE__*/React.createElement(CTA, {
    title: `Ready for Your ${svc.title} Project?`
  }), svc.faqs.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-32"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "FAQ"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 24,
      color: "var(--charcoal)",
      marginBottom: 16,
      textTransform: "uppercase"
    }
  }, "Common Questions"), /*#__PURE__*/React.createElement(FAQ, {
    faqs: svc.faqs
  })), reviews.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-48"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Client Reviews"), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, reviews.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.id,
    r: r
  })))))));
}
function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const opts = [...new Set(PROJECTS.map(p => p.service))].map(s => ({
    value: s,
    label: SERVICES.find(sv => sv.id === s)?.title || s
  }));
  const filtered = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.service === filter);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      gridTemplateColumns: "1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, "Our Work"), /*#__PURE__*/React.createElement("h1", null, "Before & ", /*#__PURE__*/React.createElement("em", null, "After")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "Quality you can see. Browse our completed projects across the Philadelphia area."), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => nav("/contact")
  }, "Get Free Estimate \u2192"))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `filter-chip ${filter === "all" ? "is-active" : ""}`,
    onClick: () => setFilter("all")
  }, "All"), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    className: `filter-chip ${filter === o.value ? "is-active" : ""}`,
    onClick: () => setFilter(o.value)
  }, o.label))), /*#__PURE__*/React.createElement("div", {
    className: "proj-grid"
  }, filtered.map(p => /*#__PURE__*/React.createElement(ProjectCard, {
    key: p.id,
    p: p,
    onClick: () => nav(`/projects/${p.slug}`)
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(CTA, null)));
}
function ProjectDetailPage({
  slug
}) {
  const proj = getProject(slug);
  if (!proj) return /*#__PURE__*/React.createElement("div", {
    className: "section section-inner"
  }, /*#__PURE__*/React.createElement("p", null, "Project not found."));
  const svc = SERVICES.find(s => s.id === proj.service);
  const related = PROJECTS.filter(p => p.id !== proj.id).slice(0, 3);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      gridTemplateColumns: "1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, "Case Study \xB7 ", svc?.title), /*#__PURE__*/React.createElement("h1", null, proj.neighborhood, " \u2014 ", /*#__PURE__*/React.createElement("em", null, proj.title)), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, proj.scope), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => nav("/contact")
  }, "Get a Similar Estimate \u2192"))))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner",
    style: {
      maxWidth: 900,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "breadcrumb"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/")
  }, "Home"), " / ", /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/gallery")
  }, "Gallery"), " / ", proj.neighborhood), /*#__PURE__*/React.createElement("div", {
    className: "proj-imgs",
    style: {
      height: 200,
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "proj-img proj-before",
    style: {
      fontSize: 56
    }
  }, proj.beforeEmoji, /*#__PURE__*/React.createElement("span", {
    className: "proj-label"
  }, "Before")), /*#__PURE__*/React.createElement("div", {
    className: "proj-img proj-after",
    style: {
      fontSize: 56
    }
  }, proj.afterEmoji, /*#__PURE__*/React.createElement("span", {
    className: "proj-label"
  }, "After"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      gap: 12,
      margin: "24px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderRadius: "var(--radius)",
      background: "var(--concrete)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--orange)",
      marginBottom: 4
    }
  }, "Location"), proj.neighborhood), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderRadius: "var(--radius)",
      background: "var(--concrete)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--orange)",
      marginBottom: 4
    }
  }, "Service"), svc?.title), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderRadius: "var(--radius)",
      background: "var(--concrete)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--orange)",
      marginBottom: 4
    }
  }, "Area"), proj.sqft, " sq ft"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderRadius: "var(--radius)",
      background: "var(--concrete)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--orange)",
      marginBottom: 4
    }
  }, "Timeline"), proj.timeWeeks, " weeks"), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderRadius: "var(--radius)",
      background: "var(--concrete)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontSize: 10,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--orange)",
      marginBottom: 4
    }
  }, "Investment"), proj.budget)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 16,
      margin: "32px 0"
    }
  }, [["Challenge", proj.challenge], ["Solution", proj.solution], ["Result", proj.result]].map(([title, text]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      padding: 24,
      borderRadius: "var(--radius)",
      background: "white",
      boxShadow: "var(--shadow-sm)"
    }
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      color: "var(--orange)",
      marginBottom: 8,
      fontWeight: 700
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      lineHeight: 1.65,
      color: "var(--charcoal)"
    }
  }, text)))), /*#__PURE__*/React.createElement(CTA, {
    title: "Want Similar Results?"
  }), related.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-48"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "var(--charcoal)",
      marginBottom: 16,
      textTransform: "uppercase"
    }
  }, "More Projects"), /*#__PURE__*/React.createElement("div", {
    className: "proj-grid"
  }, related.map(p => /*#__PURE__*/React.createElement(ProjectCard, {
    key: p.id,
    p: p,
    onClick: () => nav(`/projects/${p.slug}`)
  })))))));
}
function ReviewsPage() {
  const [filter, setFilter] = useState("all");
  const opts = [...new Set(REVIEWS.map(r => r.service))].map(s => ({
    value: s,
    label: SERVICES.find(sv => sv.id === s)?.title || s
  }));
  const filtered = filter === "all" ? REVIEWS : REVIEWS.filter(r => r.service === filter);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      gridTemplateColumns: "1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, "Reviews"), /*#__PURE__*/React.createElement("h1", null, "What Homeowners ", /*#__PURE__*/React.createElement("em", null, "Say")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "Real reviews from real projects. Our reputation is built on results.")))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 48,
      flexWrap: "wrap",
      padding: "24px 0",
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 36,
      fontWeight: 800,
      color: "var(--charcoal)"
    }
  }, "5.0"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--slate)",
      textTransform: "uppercase"
    }
  }, "Average Rating")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 36,
      fontWeight: 800,
      color: "var(--charcoal)"
    }
  }, REVIEWS.length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--slate)",
      textTransform: "uppercase"
    }
  }, "Reviews")), /*#__PURE__*/React.createElement("div", {
    className: "text-center"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 36,
      fontWeight: 800,
      color: "var(--charcoal)"
    }
  }, "100%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--slate)",
      textTransform: "uppercase"
    }
  }, "5-Star"))), /*#__PURE__*/React.createElement("div", {
    className: "filter-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `filter-chip ${filter === "all" ? "is-active" : ""}`,
    onClick: () => setFilter("all")
  }, "All"), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    className: `filter-chip ${filter === o.value ? "is-active" : ""}`,
    onClick: () => setFilter(o.value)
  }, o.label))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, filtered.map(r => /*#__PURE__*/React.createElement(ReviewCard, {
    key: r.id,
    r: r
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(CTA, null)));
}
function AboutPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      gridTemplateColumns: "1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, "About ", BIZ.name), /*#__PURE__*/React.createElement("h1", null, "Built on ", /*#__PURE__*/React.createElement("em", null, "Reputation")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, BIZ.tagline)))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Our Story"), /*#__PURE__*/React.createElement("h2", {
    className: "section-title"
  }, "Honest Work, ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange)"
    }
  }, "Every Time")), /*#__PURE__*/React.createElement("p", {
    style: {
      lineHeight: 1.85,
      marginBottom: 16
    }
  }, BIZ.name, " was founded in ", BIZ.founded, " with a simple principle: do quality work, communicate honestly, and stand behind everything we build. ", BIZ.years, " years later, that hasn't changed."), /*#__PURE__*/React.createElement("p", {
    style: {
      lineHeight: 1.85,
      marginBottom: 16
    }
  }, "We're a full-service contracting company handling roofing, siding, kitchens, bathrooms, decks, additions, and whole-home renovations across the Philadelphia metro area. Every project is managed by our experienced team \u2014 we don't subcontract the important work."), /*#__PURE__*/React.createElement("p", {
    style: {
      lineHeight: 1.85
    }
  }, "We're licensed (", BIZ.license, "), fully insured, and every project comes with our workmanship warranty plus manufacturer warranties on materials. We pull permits, schedule inspections, and make sure everything is code-compliant. No shortcuts.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Why Choose Us"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "var(--charcoal)",
      marginBottom: 20,
      textTransform: "uppercase"
    }
  }, "What Sets Us Apart"), ["Licensed, insured, and bonded — full protection for your home", "Transparent pricing — detailed estimates, no hidden costs", "Experienced crews — our team averages 12+ years in the trades", "Clean job sites — we clean up at the end of every work day", "Permit management — we handle all paperwork and inspections", "Warranty-backed — labor warranty plus manufacturer material warranties", "Insurance claim assistance — we work directly with your insurer", "Communication — weekly updates and direct phone access to your project manager"].map((v, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 12,
      marginBottom: 14,
      fontSize: 14,
      lineHeight: 1.6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--orange)",
      fontWeight: 700,
      flexShrink: 0
    }
  }, "\u25B8"), " ", v)))), /*#__PURE__*/React.createElement(CTA, {
    title: "Ready to Get Started?",
    text: "Free estimates on every project \u2014 no obligation."
  }))));
}
function AreasPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      gridTemplateColumns: "1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, "Service Areas"), /*#__PURE__*/React.createElement("h1", null, "Serving Greater ", /*#__PURE__*/React.createElement("em", null, "Philadelphia")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "We serve homeowners throughout Southeastern PA and South Jersey.")))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "svc-grid"
  }, SERVICE_AREAS.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.name,
    className: "card",
    style: {
      borderLeft: "4px solid var(--steel)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 20,
      color: "var(--charcoal)",
      marginBottom: 8,
      textTransform: "uppercase"
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 6
    }
  }, a.neighborhoods.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    className: "tag"
  }, n))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px"
    }
  }, /*#__PURE__*/React.createElement(CTA, null)));
}
function ContactPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-inner",
    style: {
      gridTemplateColumns: "1fr"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "hero-badge"
  }, "Contact"), /*#__PURE__*/React.createElement("h1", null, "Get Your ", /*#__PURE__*/React.createElement("em", null, "Free Estimate")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "Tell us about your project. We respond within 24 hours.")))), /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(QuoteForm, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Contact Information"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      color: "var(--charcoal)",
      marginBottom: 20,
      textTransform: "uppercase"
    }
  }, "Reach Us Directly"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--slate)"
    }
  }, "Phone"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    style: {
      color: "var(--orange)",
      fontSize: 20,
      fontWeight: 700,
      textDecoration: "none"
    }
  }, BIZ.phone))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--slate)"
    }
  }, "Email"), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    href: `mailto:${BIZ.email}`,
    style: {
      color: "var(--orange)",
      textDecoration: "none"
    }
  }, BIZ.email))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--slate)"
    }
  }, "Address"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14
    }
  }, BIZ.address, /*#__PURE__*/React.createElement("br", null), BIZ.city, ", ", BIZ.state, " ", BIZ.zip)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--slate)"
    }
  }, "Hours"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14
    }
  }, BIZ.hours.weekday, /*#__PURE__*/React.createElement("br", null), BIZ.hours.saturday, /*#__PURE__*/React.createElement("br", null), BIZ.hours.sunday)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 12,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      color: "var(--slate)"
    }
  }, "License"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14
    }
  }, BIZ.license)), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--concrete)",
      borderRadius: "var(--radius-lg)",
      padding: 24,
      display: "flex",
      gap: 16,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28
    }
  }, "\uD83D\uDEE1\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--charcoal)"
    }
  }, "Free Estimates, Always"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--slate)",
      lineHeight: 1.6
    }
  }, "Every project starts with a free on-site estimate. We'll assess the work, explain your options, and provide transparent pricing. No pressure, no obligation."))))))));
}

// ═══════════════════════════════════════════════════════════════
// LAYOUT
// ═══════════════════════════════════════════════════════════════

function Header({
  path
}) {
  const [open, setOpen] = useState(false);
  const go = p => {
    nav(p);
    setOpen(false);
  };
  const links = [{
    l: "Services",
    p: "/services"
  }, {
    l: "Gallery",
    p: "/gallery"
  }, {
    l: "Reviews",
    p: "/reviews"
  }, {
    l: "Areas",
    p: "/areas"
  }, {
    l: "About",
    p: "/about"
  }, {
    l: "Contact",
    p: "/contact"
  }];
  return /*#__PURE__*/React.createElement("header", {
    className: "site-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "header-top"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Free Estimates"), " \xB7 Licensed & Insured \xB7 Serving Philadelphia & Surrounding Counties \xB7 ", /*#__PURE__*/React.createElement("strong", null, BIZ.license))), /*#__PURE__*/React.createElement("div", {
    className: "header-main"
  }, /*#__PURE__*/React.createElement("a", {
    className: "h-logo",
    onClick: () => go("/")
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-logo-accent"
  }, "Summit"), " Contracting"), /*#__PURE__*/React.createElement("nav", {
    className: `h-nav ${open ? "is-open" : ""}`
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.p,
    className: path.startsWith(l.p) ? "is-active" : "",
    onClick: () => go(l.p)
  }, l.l))), /*#__PURE__*/React.createElement("div", {
    className: "h-actions"
  }, /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    className: "h-phone h-phone-desk"
  }, "\uD83D\uDCDE ", BIZ.phone), /*#__PURE__*/React.createElement("button", {
    className: "h-menu-btn",
    "aria-label": "Toggle navigation menu",
    onClick: () => setOpen(!open)
  }, open ? "✕" : "☰"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "site-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-brand"
  }, /*#__PURE__*/React.createElement("h3", null, BIZ.name), /*#__PURE__*/React.createElement("p", null, "Licensed general contractor serving the greater Philadelphia area. ", BIZ.years, "+ years of quality craftsmanship."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      marginTop: 8,
      opacity: 0.6
    }
  }, BIZ.license, " \xB7 Fully Insured")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Services"), SERVICES.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.id,
    onClick: () => nav(`/services/${s.slug}`)
  }, s.title))), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Company"), /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/about")
  }, "About"), /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/gallery")
  }, "Gallery"), /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/reviews")
  }, "Reviews"), /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/areas")
  }, "Service Areas")), /*#__PURE__*/React.createElement("div", {
    className: "footer-col"
  }, /*#__PURE__*/React.createElement("h4", null, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel
  }, BIZ.phone), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${BIZ.email}`
  }, BIZ.email), /*#__PURE__*/React.createElement("a", {
    onClick: () => nav("/contact")
  }, "Free Estimate"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 12,
      opacity: 0.5
    }
  }, BIZ.address, /*#__PURE__*/React.createElement("br", null), BIZ.city, ", ", BIZ.state, " ", BIZ.zip, /*#__PURE__*/React.createElement("br", null), BIZ.hours.weekday, /*#__PURE__*/React.createElement("br", null), BIZ.hours.saturday))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, "\xA9 ", new Date().getFullYear(), " ", BIZ.name, ". All rights reserved. ", BIZ.license));
}

// ═══════════════════════════════════════════════════════════════
// ROUTER & APP
// ═══════════════════════════════════════════════════════════════

function Router({
  hash
}) {
  const parts = hash.replace("#", "").split("/").filter(Boolean);
  const p0 = parts[0] || "",
    p1 = parts[1] || "";
  if (!p0) return /*#__PURE__*/React.createElement(HomePage, null);
  if (p0 === "services" && !p1) return /*#__PURE__*/React.createElement(ServicesPage, null);
  if (p0 === "services" && p1) return /*#__PURE__*/React.createElement(ServiceDetailPage, {
    slug: p1
  });
  if (p0 === "gallery") return /*#__PURE__*/React.createElement(GalleryPage, null);
  if (p0 === "projects" && p1) return /*#__PURE__*/React.createElement(ProjectDetailPage, {
    slug: p1
  });
  if (p0 === "reviews") return /*#__PURE__*/React.createElement(ReviewsPage, null);
  if (p0 === "areas") return /*#__PURE__*/React.createElement(AreasPage, null);
  if (p0 === "about") return /*#__PURE__*/React.createElement(AboutPage, null);
  if (p0 === "contact") return /*#__PURE__*/React.createElement(ContactPage, null);
  return /*#__PURE__*/React.createElement(HomePage, null);
}
window.__App = function ContractorApp() {
  const hash = useHash();
  const path = hash.replace("#", "") || "/";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, CSS), /*#__PURE__*/React.createElement(Header, {
    path: path
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Router, {
    hash: hash
  })), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement("div", {
    className: "mob-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mob-bar-inner"
  }, /*#__PURE__*/React.createElement("a", {
    href: BIZ.phoneTel,
    className: "mob-btn mob-call"
  }, "\uD83D\uDCDE Call Now"), /*#__PURE__*/React.createElement("button", {
    className: "mob-btn mob-est",
    onClick: () => nav("/contact")
  }, "\uD83D\uDCCB Free Estimate"))));
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(window.__App));
