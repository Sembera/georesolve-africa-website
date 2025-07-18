// SEO Metadata for each page
export const PAGE_METADATA = {
  home: {
    title:
      "GeoResolve Africa | Geo-Engineering & Geo-Spatial Experts in Sub-Saharan Africa",
    description:
      "GeoResolve Africa provides trusted geotechnical investigations, geophysical surveys, GIS mapping, and laboratory testing across Sub-Saharan Africa. Empowering sustainable development through reliable geo-data.",
    keywords:
      "geotechnical investigations, geophysical surveys, GIS mapping, laboratory testing, Sub-Saharan Africa, Uganda, Burundi, geo-engineering, geo-spatial analysis",
    path: "/",
  },
  about: {
    title:
      "About GeoResolve Africa | Building Africa's Largest Geo-Data Knowledgebase",
    description:
      "Learn about GeoResolve Africa's mission, values, and team. Our research-driven approach delivers reliable geoscience data for infrastructure, mining, and environmental projects.",
    keywords:
      "about GeoResolve Africa, geoscience research, African geo-data, company mission, geotechnical team, research-driven approach",
    path: "/about",
  },
  services: {
    title:
      "Geotechnical, Geo-Spatial, and Laboratory Testing Services | GeoResolve Africa",
    description:
      "Explore our advanced geo-engineering services, GIS data solutions, aerial surveys, and accredited lab testing for sustainable, cost-effective project delivery in Sub-Saharan Africa.",
    keywords:
      "geotechnical services, geo-spatial services, laboratory testing, drone surveys, GIS mapping, geophysical investigations, Sub-Saharan Africa",
    path: "/services",
  },
  projects: {
    title: "Featured Geotechnical & Geoscience Projects | GeoResolve Africa",
    description:
      "See how GeoResolve Africa supports projects in infrastructure, mining, energy, and environmental geotechnics with world-class data-driven solutions.",
    keywords:
      "geotechnical projects, infrastructure projects, mining projects, energy projects, Uganda projects, Burundi projects, case studies",
    path: "/projects",
  },
  news: {
    title:
      "GeoResolve Africa News & Insights | Geoscience Developments in Africa",
    description:
      "Stay informed on our research, case studies, and the latest advances in geo-engineering and geo-spatial technologies across Sub-Saharan Africa.",
    keywords:
      "geoscience news, research insights, African geotechnology, case studies, geo-engineering developments, technical articles",
    path: "/news",
  },
  resources: {
    title: "Free Geoscience Resources & Downloads | GeoResolve Africa",
    description:
      "Access valuable geotechnical standards, forms, templates, and learning resources to support engineers, researchers, and students in the region.",
    keywords:
      "geotechnical resources, engineering templates, research tools, technical standards, educational materials, free downloads",
    path: "/resources",
  },
  contact: {
    title: "Contact GeoResolve Africa | Partner with Us for Your Next Project",
    description:
      "Get in touch to discuss your geotechnical, geo-spatial, or lab testing needs. Join our newsletter and connect with Africa's leading geo-data specialists.",
    keywords:
      "contact GeoResolve Africa, geotechnical consultation, project inquiry, partnership, geo-engineering services, Uganda office",
    path: "/contact",
  },
} as const;

// Utility function to update document metadata
export const updatePageMetadata = (pageKey: keyof typeof PAGE_METADATA) => {
  const metadata = PAGE_METADATA[pageKey];

  // Update document title
  document.title = metadata.title;

  // Update meta description
  updateMetaTag("name", "description", metadata.description);
  updateMetaTag("name", "keywords", metadata.keywords);

  // Update Open Graph tags
  updateMetaTag("property", "og:title", metadata.title);
  updateMetaTag("property", "og:description", metadata.description);
  updateMetaTag(
    "property",
    "og:url",
    `https://same-862o1jzz68t-latest.netlify.app${metadata.path}`,
  );

  // Update Twitter Card tags
  updateMetaTag("name", "twitter:title", metadata.title);
  updateMetaTag("name", "twitter:description", metadata.description);

  // Update canonical URL
  updateCanonicalUrl(
    `https://same-862o1jzz68t-latest.netlify.app${metadata.path}`,
  );
};

// Helper function to update or create meta tags
const updateMetaTag = (
  attribute: string,
  attributeValue: string,
  content: string,
) => {
  let element = document.querySelector(
    `meta[${attribute}="${attributeValue}"]`,
  ) as HTMLMetaElement;

  if (element) {
    element.content = content;
  } else {
    element = document.createElement("meta");
    element.setAttribute(attribute, attributeValue);
    element.content = content;
    document.head.appendChild(element);
  }
};

// Helper function to update canonical URL
const updateCanonicalUrl = (url: string) => {
  let canonical = document.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement;

  if (canonical) {
    canonical.href = url;
  } else {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = url;
    document.head.appendChild(canonical);
  }
};
