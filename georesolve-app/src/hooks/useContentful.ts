import { useState, useEffect } from 'react';

interface ContentfulConfig {
  spaceId: string;
  accessToken: string;
  previewToken?: string;
}

const contentfulConfig: ContentfulConfig = {
  spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
  previewToken: import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN
};

export const useContentfulData = <T>(contentType: string, preview = false) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = preview ? contentfulConfig.previewToken : contentfulConfig.accessToken;
        const baseUrl = preview
          ? 'https://preview.contentful.com'
          : 'https://cdn.contentful.com';

        const url = `${baseUrl}/spaces/${contentfulConfig.spaceId}/entries?content_type=${contentType}&include=2`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error(`Contentful fetch error for ${contentType}:`, err);
      } finally {
        setLoading(false);
      }
    };

    if (contentfulConfig.spaceId && contentfulConfig.accessToken) {
      fetchData();
    }
  }, [contentType, preview]);

  return { data, loading, error };
};

// Specific hooks for different content types
export const useNewsArticles = () => useContentfulData<any>('article');
export const useProjects = () => useContentfulData<any>('project');
export const useServices = () => useContentfulData<any>('service');