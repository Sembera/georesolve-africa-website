#!/usr/bin/env node

/**
 * GeoResolve Africa - CMS Setup Script
 * Automates the setup of content management system integration
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CMS_OPTIONS = {
  strapi: {
    name: 'Strapi (Self-hosted)',
    description: 'Full control, visual admin, Railway hosting',
    cost: '$5-10/month',
    difficulty: 'Medium',
    setup: setupStrapi
  },
  contentful: {
    name: 'Contentful (Hosted)',
    description: 'Fully managed, no hosting needed',
    cost: 'Free tier available',
    difficulty: 'Easy',
    setup: setupContentful
  },
  supabase: {
    name: 'Supabase (Database + API)',
    description: 'Real-time database with auto-generated APIs',
    cost: 'Free tier available',
    difficulty: 'Medium',
    setup: setupSupabase
  }
};

function main() {
  console.log('🚀 GeoResolve Africa - CMS Setup Wizard\n');

  console.log('Available CMS options:\n');
  Object.entries(CMS_OPTIONS).forEach(([key, option], index) => {
    console.log(`${index + 1}. ${option.name}`);
    console.log(`   ${option.description}`);
    console.log(`   Cost: ${option.cost} | Difficulty: ${option.difficulty}\n`);
  });

  console.log('Recommended: Option 1 (Strapi) for best balance of features and control\n');
  console.log('Choose your CMS option (1-3) or run with argument:');
  console.log('npm run cms:setup strapi');
  console.log('npm run cms:setup contentful');
  console.log('npm run cms:setup supabase');
}

function setupStrapi() {
  console.log('🔧 Setting up Strapi CMS integration...\n');

  // Create CMS content types configuration
  const contentTypes = {
    article: {
      kind: 'collectionType',
      collectionName: 'articles',
      info: { singularName: 'article', pluralName: 'articles', displayName: 'Article' },
      attributes: {
        title: { type: 'string', required: true },
        excerpt: { type: 'text', required: true },
        content: { type: 'richtext' },
        image: { type: 'media', multiple: false },
        category: {
          type: 'enumeration',
          enum: ['energy', 'infrastructure', 'mining', 'environment'],
          required: true
        },
        location: { type: 'string', required: true },
        client: { type: 'string', required: true },
        period: { type: 'string', required: true },
        services: { type: 'json' },
        publishDate: { type: 'datetime', required: true },
        featured: { type: 'boolean', default: false }
      }
    },
    project: {
      kind: 'collectionType',
      collectionName: 'projects',
      info: { singularName: 'project', pluralName: 'projects', displayName: 'Project' },
      attributes: {
        title: { type: 'string', required: true },
        description: { type: 'text', required: true },
        image: { type: 'media', multiple: false },
        category: {
          type: 'enumeration',
          enum: ['energy', 'infrastructure', 'mining', 'environment'],
          required: true
        },
        location: { type: 'string', required: true },
        client: { type: 'string', required: true },
        year: { type: 'string', required: true },
        services: { type: 'json' },
        challenges: { type: 'text' },
        solution: { type: 'text' },
        featured: { type: 'boolean', default: false }
      }
    }
  };

  // Create environment configuration
  const envContent = `
# CMS Configuration
VITE_CMS_TYPE=strapi
VITE_CMS_API_URL=https://your-app.railway.app/api
VITE_CMS_TOKEN=your-api-token

# Production
VITE_CMS_API_URL_PROD=https://your-production-cms.railway.app/api
VITE_CMS_TOKEN_PROD=your-production-token
`;

  // Create CMS hook for data fetching
  const cmsHookContent = `
import { useState, useEffect } from 'react';

interface CMSConfig {
  apiUrl: string;
  token?: string;
}

const cmsConfig: CMSConfig = {
  apiUrl: import.meta.env.VITE_CMS_API_URL || 'http://localhost:1337/api',
  token: import.meta.env.VITE_CMS_TOKEN
};

export const useCMSData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (cmsConfig.token) {
          headers['Authorization'] = \`Bearer \${cmsConfig.token}\`;
        }

        const response = await fetch(\`\${cmsConfig.apiUrl}/\${endpoint}?populate=*\`, {
          headers
        });

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const result = await response.json();
        setData(result.data || result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error(\`CMS fetch error for \${endpoint}:\`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Specific hooks for different content types
export const useNewsArticles = () => useCMSData<any>('articles');
export const useProjects = () => useCMSData<any>('projects');
export const useServices = () => useCMSData<any>('services');
`;

  // Write files
  writeFile('.env.local', envContent);
  writeFile('src/hooks/useCMS.ts', cmsHookContent);
  writeFile('cms-content-types.json', JSON.stringify(contentTypes, null, 2));

  console.log('✅ Strapi configuration files created!');
  console.log('\n📋 Next steps:');
  console.log('1. Create Strapi project: npx create-strapi-app@latest georesolve-cms');
  console.log('2. Deploy to Railway: https://railway.app');
  console.log('3. Import content types from cms-content-types.json');
  console.log('4. Update .env.local with your Railway URL and API token');
  console.log('5. Update components to use useCMSData hooks');
}

function setupContentful() {
  console.log('🔧 Setting up Contentful CMS integration...\n');

  const envContent = `
# Contentful Configuration
VITE_CMS_TYPE=contentful
VITE_CONTENTFUL_SPACE_ID=your-space-id
VITE_CONTENTFUL_ACCESS_TOKEN=your-access-token
VITE_CONTENTFUL_PREVIEW_TOKEN=your-preview-token
`;

  const contentfulHookContent = `
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

        const url = \`\${baseUrl}/spaces/\${contentfulConfig.spaceId}/entries?content_type=\${contentType}&include=2\`;

        const response = await fetch(url, {
          headers: {
            'Authorization': \`Bearer \${token}\`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const result = await response.json();
        setData(result.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error(\`Contentful fetch error for \${contentType}:\`, err);
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
`;

  writeFile('.env.local', envContent);
  writeFile('src/hooks/useContentful.ts', contentfulHookContent);

  console.log('✅ Contentful configuration files created!');
  console.log('\n📋 Next steps:');
  console.log('1. Create account at https://contentful.com');
  console.log('2. Create content models for articles, projects, services');
  console.log('3. Get Space ID and Access Token from API keys section');
  console.log('4. Update .env.local with your Contentful credentials');
  console.log('5. Update components to use useContentfulData hooks');
}

function setupSupabase() {
  console.log('🔧 Setting up Supabase integration...\n');

  const envContent = `
# Supabase Configuration
VITE_CMS_TYPE=supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
`;

  const supabaseHookContent = `
import { useState, useEffect } from 'react';

interface SupabaseConfig {
  url: string;
  anonKey: string;
}

const supabaseConfig: SupabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};

export const useSupabaseData = <T>(table: string, filters?: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = \`\${supabaseConfig.url}/rest/v1/\${table}?select=*\`;
        if (filters) {
          url += \`&\${filters}\`;
        }

        const response = await fetch(url, {
          headers: {
            'apikey': supabaseConfig.anonKey,
            'Authorization': \`Bearer \${supabaseConfig.anonKey}\`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error(\`Supabase fetch error for \${table}:\`, err);
      } finally {
        setLoading(false);
      }
    };

    if (supabaseConfig.url && supabaseConfig.anonKey) {
      fetchData();
    }
  }, [table, filters]);

  return { data, loading, error };
};

// Specific hooks for different content types
export const useNewsArticles = () => useSupabaseData<any>('articles', 'order=publish_date.desc');
export const useProjects = () => useSupabaseData<any>('projects', 'order=year.desc');
export const useServices = () => useSupabaseData<any>('services');
`;

  const sqlSchema = `
-- GeoResolve Africa Database Schema for Supabase

-- Articles table
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url VARCHAR(500),
  category VARCHAR(50) CHECK (category IN ('energy', 'infrastructure', 'mining', 'environment')),
  location VARCHAR(100) NOT NULL,
  client VARCHAR(100) NOT NULL,
  period VARCHAR(50) NOT NULL,
  services JSONB,
  challenges TEXT,
  solution TEXT,
  publish_date TIMESTAMP DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  category VARCHAR(50) CHECK (category IN ('energy', 'infrastructure', 'mining', 'environment')),
  location VARCHAR(100) NOT NULL,
  client VARCHAR(100) NOT NULL,
  year VARCHAR(4) NOT NULL,
  services JSONB,
  challenges TEXT,
  solution TEXT,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon VARCHAR(100),
  features JSONB,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public articles are viewable by everyone" ON articles FOR SELECT USING (true);
CREATE POLICY "Public projects are viewable by everyone" ON projects FOR SELECT USING (true);
CREATE POLICY "Public services are viewable by everyone" ON services FOR SELECT USING (true);
`;

  writeFile('.env.local', envContent);
  writeFile('src/hooks/useSupabase.ts', supabaseHookContent);
  writeFile('database-schema.sql', sqlSchema);

  console.log('✅ Supabase configuration files created!');
  console.log('\n📋 Next steps:');
  console.log('1. Create account at https://supabase.com');
  console.log('2. Create new project');
  console.log('3. Run database-schema.sql in SQL Editor');
  console.log('4. Get Project URL and anon key from API settings');
  console.log('5. Update .env.local with your Supabase credentials');
  console.log('6. Update components to use useSupabaseData hooks');
}

function writeFile(filePath, content) {
  try {
    const projectRoot = path.join(__dirname, '..');
    const fullPath = path.join(projectRoot, filePath);
    const dir = path.dirname(fullPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content.trim());
    console.log(`✅ Created: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error creating ${filePath}:`, error.message);
  }
}

// Run the script
const cmsType = process.argv[2];
if (cmsType && CMS_OPTIONS[cmsType]) {
  CMS_OPTIONS[cmsType].setup();
} else {
  main();
}
