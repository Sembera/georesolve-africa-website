// Brand Colors
export const BRAND_COLORS = {
  primary: "#345363", // Deep blue-gray
  secondary: "#4DA34D", // Forest green
  accent: "#9EDB9E", // Light green
  background: "#FAF9F6", // Off-white
  text: {
    primary: "#345363",
    secondary: "#6B7280",
    muted: "#9CA3AF",
  },
} as const;

// Typography Classes
export const TYPOGRAPHY = {
  // Hero Headings
  heroTitle: "text-4xl lg:text-5xl font-bold text-[#345363] mb-6",
  heroSubtitle: "text-xl text-stone-600 max-w-4xl mx-auto leading-relaxed",

  // Section Headings
  sectionTitle: "text-3xl lg:text-4xl font-bold text-[#345363] mb-6",
  sectionSubtitle: "text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed",

  // Card Headings
  cardTitle: "text-xl font-semibold text-[#345363] mb-3",
  cardDescription: "text-stone-600 leading-relaxed",

  // Body Text
  bodyLarge: "text-lg text-stone-600 leading-relaxed",
  bodyMedium: "text-base text-stone-600 leading-relaxed",
  bodySmall: "text-sm text-stone-500",
} as const;

// Button Styles
export const BUTTON_STYLES = {
  primary:
    "bg-[#4DA34D] hover:bg-[#345363] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg",
  secondary:
    "border-2 border-[#345363] text-[#345363] hover:bg-[#9EDB9E]/20 font-semibold rounded-xl hover:scale-105 transition-all duration-300",
  accent:
    "bg-[#9EDB9E] hover:bg-white text-[#345363] font-semibold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg",
  ghost:
    "text-[#345363] hover:bg-[#9EDB9E]/20 rounded-lg transition-all duration-200",
} as const;

// Card Styles
export const CARD_STYLES = {
  default:
    "border-[#9EDB9E]/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl",
  interactive:
    "border-[#9EDB9E]/50 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 rounded-2xl group",
  minimal:
    "border-[#9EDB9E]/30 shadow-md hover:shadow-lg transition-shadow duration-200 rounded-xl",
} as const;

// Hero Section Styles
export const HERO_STYLES = {
  container:
    "min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#FAF9F6] to-[#9EDB9E]/10 py-20",
  content: "container mx-auto px-4 lg:px-6 text-center",
  badge: "bg-[#9EDB9E] text-[#345363] border-[#4DA34D] mb-6 animate-pulse",
  highlight:
    "bg-emerald-50 p-8 rounded-3xl border border-emerald-200 shadow-lg",
} as const;

// Layout Spacing
export const SPACING = {
  section: "space-y-12",
  sectionLarge: "space-y-16",
  cardGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  container: "container mx-auto px-4 lg:px-6",
  padding: {
    mobile: "px-4",
    desktop: "px-4 lg:px-6",
  },
} as const;

// Animation Classes
export const ANIMATIONS = {
  fadeIn: "animate-in slide-in-from-bottom-4 duration-1000",
  slideInLeft: "animate-in slide-in-from-left-6 duration-1000",
  slideInRight: "animate-in slide-in-from-right-6 duration-1000",
  zoomIn: "animate-in zoom-in-95 duration-1000",
  staggered: (index: number) =>
    `animate-in slide-in-from-bottom-4 duration-700 delay-${index * 100}`,
} as const;

// Badge Colors by Category
export const BADGE_COLORS = {
  energy: "bg-blue-100 text-blue-800 border-blue-200",
  infrastructure: "bg-green-100 text-green-800 border-green-200",
  mining: "bg-orange-100 text-orange-800 border-orange-200",
  environment: "bg-purple-100 text-purple-800 border-purple-200",
  research: "bg-emerald-100 text-emerald-800 border-emerald-200",
  default: "bg-stone-100 text-stone-800 border-stone-200",
} as const;

// Responsive Design
export const BREAKPOINTS = {
  mobile: "sm",
  tablet: "md",
  desktop: "lg",
  wide: "xl",
} as const;

// Global Styles
export const GLOBAL_STYLES = {
  smoothScrolling: "scroll-smooth",
  focusRing:
    "focus:outline-none focus:ring-2 focus:ring-[#4DA34D] focus:ring-offset-2",
  accessibleText: "text-[#345363]", // WCAG AA compliant contrast
  accessibleBackground: "bg-[#FAF9F6]", // High contrast background
} as const;

// Enhanced Button Hover Effects
export const ENHANCED_BUTTON_STYLES = {
  ...BUTTON_STYLES,
  primaryEnhanced: `${BUTTON_STYLES.primary} transform active:scale-95 focus:ring-2 focus:ring-[#4DA34D] focus:ring-offset-2`,
  secondaryEnhanced: `${BUTTON_STYLES.secondary} transform active:scale-95 focus:ring-2 focus:ring-[#345363] focus:ring-offset-2`,
  accentEnhanced: `${BUTTON_STYLES.accent} transform active:scale-95 focus:ring-2 focus:ring-[#4DA34D] focus:ring-offset-2`,
} as const;

// Helper Functions
export const getButtonClass = (
  variant: keyof typeof BUTTON_STYLES,
  size: "sm" | "md" | "lg" = "md",
) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  return `${BUTTON_STYLES[variant]} ${sizeClasses[size]} ${GLOBAL_STYLES.focusRing}`;
};

export const getCardClass = (variant: keyof typeof CARD_STYLES = "default") => {
  return CARD_STYLES[variant];
};

export const getBadgeColor = (
  category: keyof typeof BADGE_COLORS = "default",
) => {
  return BADGE_COLORS[category];
};
