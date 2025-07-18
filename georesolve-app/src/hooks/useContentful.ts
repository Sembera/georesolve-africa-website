import { useState, useEffect, useCallback } from 'react';

// Enhanced TypeScript interfaces for Contentful
interface ContentfulAsset {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

interface ContentfulEntry<T = any> {
  sys: {
    id: string;
    type: string;
    contentType: {
      sys: {
        id: string;
      };
    };
    createdAt: string;
    updatedAt: string;
  };
  fields: T;
}

interface ContentfulResponse<T = any> {
  items: ContentfulEntry<T>[];
  total: number;
  skip: number;
  limit: number;
  includes?: {
    Asset?: ContentfulAsset[];
    Entry?: ContentfulEntry[];
  };
}

interface ContentfulConfig {
  spaceId: string;
  accessToken: string;
  previewToken?: string;
  environment?: string;
}

interface UseContentfulOptions {
  preview?: boolean;
  limit?: number;
  order?: string;
  query?: Record<string, any>;
  cacheTime?: number; // Cache time in milliseconds
}

interface ContentfulCache {
  data: any;
  timestamp: number;
  expiresAt: number;
}

// In-memory cache for Contentful data
const contentfulCache = new Map<string, ContentfulCache>();

const contentfulConfig: ContentfulConfig = {
  spaceId: import.meta.env.VITE_CONTENTFUL_SPACE_ID || '',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || '',
  previewToken: import.meta.env.VITE_CONTENTFUL_PREVIEW_TOKEN,
  environment: import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'
};

// Validate environment variables
const validateConfig = (): boolean => {
  if (!contentfulConfig.spaceId) {
    console.warn('VITE_CONTENTFUL_SPACE_ID is not configured');
    return false;
  }
  if (!contentfulConfig.accessToken) {
    console.warn('VITE_CONTENTFUL_ACCESS_TOKEN is not configured');
    return false;
  }
  return true;
};

// Generate cache key from parameters
const generateCacheKey = (contentType: string, options: UseContentfulOptions): string => {
  const optionsString = JSON.stringify(options);
  return `${contentType}-${btoa(optionsString)}`;
};

// Check if cached data is still valid
const isCacheValid = (cache: ContentfulCache): boolean => {
  return Date.now() < cache.expiresAt;
};

export const useContentfulData = <T = any>(
  contentType: string,
  options: UseContentfulOptions = {}
) => {
  const {
    preview = false,
    limit = 100,
    order = 'sys.createdAt',
    query = {},
    cacheTime = 5 * 60 * 1000 // 5 minutes default cache
  } = options;

  const [data, setData] = useState<ContentfulEntry<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async (isRetry = false) => {
    if (!validateConfig()) {
      setError('Contentful configuration is invalid');
      setLoading(false);
      return;
    }

    try {
      if (!isRetry) {
        setLoading(true);
        setError(null);
      }

      // Check cache first
      const cacheKey = generateCacheKey(contentType, options);
      const cached = contentfulCache.get(cacheKey);

      if (cached && isCacheValid(cached)) {
        setData(cached.data);
        setLoading(false);
        return;
      }

      const token = preview ? contentfulConfig.previewToken : contentfulConfig.accessToken;
      const baseUrl = preview
        ? 'https://preview.contentful.com'
        : 'https://cdn.contentful.com';

      // Build query parameters
      const params = new URLSearchParams({
        content_type: contentType,
        include: '2',
        limit: limit.toString(),
        order: order,
        ...query
      });

      const url = `${baseUrl}/spaces/${contentfulConfig.spaceId}/environments/${contentfulConfig.environment}/entries?${params}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // Add timeout
        signal: AbortSignal.timeout(10000)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const result: ContentfulResponse<T> = await response.json();
      const items = result.items || [];

      // Cache the data
      contentfulCache.set(cacheKey, {
        data: items,
        timestamp: Date.now(),
        expiresAt: Date.now() + cacheTime
      });

      setData(items);
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error(`Contentful fetch error for ${contentType}:`, err);

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timeout - please check your connection');
        } else if (err.message.includes('401')) {
          setError('Unauthorized - please check your Contentful access token');
        } else if (err.message.includes('404')) {
          setError('Content not found - please check your space ID or content type');
        } else {
          setError(err.message);
        }
      } else {
        setError('Unknown error occurred');
      }

      // Retry logic with exponential backoff
      if (retryCount < 3) {
        const retryDelay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchData(true);
        }, retryDelay);
      }
    } finally {
      setLoading(false);
    }
  }, [contentType, preview, limit, order, query, cacheTime, retryCount]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Refresh function for manual cache invalidation
  const refresh = useCallback(() => {
    const cacheKey = generateCacheKey(contentType, options);
    contentfulCache.delete(cacheKey);
    setRetryCount(0);
    fetchData();
  }, [contentType, options, fetchData]);

  return {
    data,
    loading,
    error,
    refresh,
    retryCount,
    isConfigured: validateConfig()
  };
};

// Utility function to resolve Contentful assets
export const resolveAsset = (assets: ContentfulAsset[] = [], assetId: string): string | null => {
  const asset = assets.find(asset => asset.sys.id === assetId);
  return asset?.fields?.file?.url ? `https:${asset.fields.file.url}` : null;
};

// Specific hooks for different content types with proper typing
interface ArticleFields {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishDate: string;
  featuredImage?: {
    sys: {
      id: string;
    };
  };
  author?: string;
  tags?: string[];
}

interface ProjectFields {
  title: string;
  slug: string;
  description: string;
  location: string;
  category: string;
  startDate: string;
  endDate?: string;
  images?: Array<{
    sys: {
      id: string;
    };
  }>;
  status: 'Planning' | 'In Progress' | 'Completed';
}

interface ServiceFields {
  title: string;
  slug: string;
  description: string;
  category: string;
  features?: string[];
  icon?: {
    sys: {
      id: string;
    };
  };
}

export const useNewsArticles = (options?: UseContentfulOptions) =>
  useContentfulData<ArticleFields>('article', options);

export const useProjects = (options?: UseContentfulOptions) =>
  useContentfulData<ProjectFields>('project', options);

export const useServices = (options?: UseContentfulOptions) =>
  useContentfulData<ServiceFields>('service', options);

// Hook for clearing all cache
export const useClearContentfulCache = () => {
  return useCallback(() => {
    contentfulCache.clear();
  }, []);
};
