import { useState, useEffect } from 'react';
import { useContentfulData } from './useContentful';

// Fallback static data for when Contentful is not configured
const staticNewsArticles = [
  {
    id: 1,
    title: "Geotechnical Investigations services for Jiji Hp Project",
    category: "energy",
    location: "Matana, Burundi",
    client: "Aecom/Artelia",
    period: "Dec 2024",
    year: "2024",
    image: "/Slope_Stability_2.jpeg",
    excerpt: "Comprehensive geotechnical investigation services for hydropower project including drilling operations, geotechnical engineering analysis, and laboratory testing with slope stability assessment.",
    services: ["Drilling", "Geotechnical Engineering", "Laboratory Testing", "Slope Stability Analysis"],
    challenges: "Complex geological conditions in hydropower development",
    solution: "Advanced drilling techniques and comprehensive slope stability analysis",
    publishDate: "January 15, 2025",
    readTime: "8 min read",
  },
  // Add more static articles as needed
];

interface ContentDataConfig {
  useContentful: boolean;
  spaceId?: string;
  accessToken?: string;
}

const getContentConfig = (): ContentDataConfig => {
  const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

  return {
    useContentful: Boolean(spaceId && accessToken),
    spaceId,
    accessToken,
  };
};

export const useNewsArticles = () => {
  const config = getContentConfig();
  const contentfulData = useContentfulData('article');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (config.useContentful) {
      // Use Contentful data
      setData(contentfulData.data);
      setLoading(contentfulData.loading);
      setError(contentfulData.error);
    } else {
      // Use static data
      setData(staticNewsArticles);
      setLoading(false);
      setError(null);
    }
  }, [config.useContentful, contentfulData.data, contentfulData.loading, contentfulData.error]);

  return { data, loading, error, isUsingContentful: config.useContentful };
};

export const useProjects = () => {
  const config = getContentConfig();
  const contentfulData = useContentfulData('project');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (config.useContentful) {
      setData(contentfulData.data);
      setLoading(contentfulData.loading);
      setError(contentfulData.error);
    } else {
      // Return empty array for now, can add static projects if needed
      setData([]);
      setLoading(false);
      setError(null);
    }
  }, [config.useContentful, contentfulData.data, contentfulData.loading, contentfulData.error]);

  return { data, loading, error, isUsingContentful: config.useContentful };
};

export const useServices = () => {
  const config = getContentConfig();
  const contentfulData = useContentfulData('service');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (config.useContentful) {
      setData(contentfulData.data);
      setLoading(contentfulData.loading);
      setError(contentfulData.error);
    } else {
      // Return empty array for now, can add static services if needed
      setData([]);
      setLoading(false);
      setError(null);
    }
  }, [config.useContentful, contentfulData.data, contentfulData.loading, contentfulData.error]);

  return { data, loading, error, isUsingContentful: config.useContentful };
};
