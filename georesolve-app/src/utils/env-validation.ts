interface EnvironmentConfig {
  contentful: {
    spaceId: string;
    accessToken: string;
    previewToken?: string;
    environment: string;
  };
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
  };
  features: {
    performanceMonitoring: boolean;
    serviceWorker: boolean;
    contentfulIntegration: boolean;
  };
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  config: Partial<EnvironmentConfig>;
}

// Environment variable getters with defaults
const getEnvVar = (key: string, defaultValue = ''): string => {
  return import.meta.env[key] || defaultValue;
};

const getBooleanEnvVar = (key: string, defaultValue = false): boolean => {
  const value = getEnvVar(key).toLowerCase();
  return value === 'true' || value === '1';
};

// Validate individual environment variables
const validateContentfulConfig = (): { errors: string[]; warnings: string[]; config: EnvironmentConfig['contentful'] } => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const spaceId = getEnvVar('VITE_CONTENTFUL_SPACE_ID');
  const accessToken = getEnvVar('VITE_CONTENTFUL_ACCESS_TOKEN');
  const previewToken = getEnvVar('VITE_CONTENTFUL_PREVIEW_TOKEN');
  const environment = getEnvVar('VITE_CONTENTFUL_ENVIRONMENT', 'master');

  // Required variables
  if (!spaceId) {
    errors.push('VITE_CONTENTFUL_SPACE_ID is required for Contentful integration');
  }

  if (!accessToken) {
    errors.push('VITE_CONTENTFUL_ACCESS_TOKEN is required for Contentful integration');
  }

  // Optional but recommended variables
  if (!previewToken) {
    warnings.push('VITE_CONTENTFUL_PREVIEW_TOKEN is recommended for preview functionality');
  }

  // Validate format
  if (spaceId && !/^[a-zA-Z0-9]{12}$/.test(spaceId)) {
    errors.push('VITE_CONTENTFUL_SPACE_ID appears to be invalid (should be 12 alphanumeric characters)');
  }

  if (accessToken && !/^[a-zA-Z0-9_-]{43}$/.test(accessToken)) {
    warnings.push('VITE_CONTENTFUL_ACCESS_TOKEN format appears unusual');
  }

  return {
    errors,
    warnings,
    config: {
      spaceId,
      accessToken,
      previewToken,
      environment
    }
  };
};

const validateAppConfig = (): { errors: string[]; warnings: string[]; config: EnvironmentConfig['app'] } => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const appName = getEnvVar('VITE_APP_NAME', 'GeoResolve Africa');
  const appVersion = getEnvVar('VITE_APP_VERSION', '1.0.0');
  const nodeEnv = getEnvVar('NODE_ENV', 'development');

  let environment: 'development' | 'staging' | 'production' = 'development';

  if (nodeEnv === 'production') {
    environment = 'production';
  } else if (getEnvVar('VITE_APP_ENV') === 'staging') {
    environment = 'staging';
  }

  return {
    errors,
    warnings,
    config: {
      name: appName,
      version: appVersion,
      environment
    }
  };
};

const validateFeatureFlags = (): { errors: string[]; warnings: string[]; config: EnvironmentConfig['features'] } => {
  const errors: string[] = [];
  const warnings: string[] = [];

  const performanceMonitoring = getBooleanEnvVar('VITE_PERFORMANCE_MONITORING', true);
  const serviceWorker = getBooleanEnvVar('VITE_SERVICE_WORKER', true);
  const contentfulIntegration = getBooleanEnvVar('VITE_CONTENTFUL_INTEGRATION', true);

  // Warn about disabled features in production
  if (import.meta.env.PROD) {
    if (!performanceMonitoring) {
      warnings.push('Performance monitoring is disabled in production');
    }

    if (!serviceWorker) {
      warnings.push('Service worker is disabled in production');
    }
  }

  return {
    errors,
    warnings,
    config: {
      performanceMonitoring,
      serviceWorker,
      contentfulIntegration
    }
  };
};

// Main validation function
export const validateEnvironment = (): ValidationResult => {
  const allErrors: string[] = [];
  const allWarnings: string[] = [];
  const config: Partial<EnvironmentConfig> = {};

  // Validate each section
  const contentfulValidation = validateContentfulConfig();
  const appValidation = validateAppConfig();
  const featuresValidation = validateFeatureFlags();

  // Collect errors and warnings
  allErrors.push(...contentfulValidation.errors);
  allErrors.push(...appValidation.errors);
  allErrors.push(...featuresValidation.errors);

  allWarnings.push(...contentfulValidation.warnings);
  allWarnings.push(...appValidation.warnings);
  allWarnings.push(...featuresValidation.warnings);

  // Build config object
  config.contentful = contentfulValidation.config;
  config.app = appValidation.config;
  config.features = featuresValidation.config;

  const isValid = allErrors.length === 0;

  // Log validation results in development
  if (import.meta.env.DEV) {
    console.group('🔧 Environment Validation');

    if (isValid) {
      console.log('✅ Environment validation passed');
    } else {
      console.error('❌ Environment validation failed');
      for (const error of allErrors) {
        console.error(`  • ${error}`);
      }
    }

    if (allWarnings.length > 0) {
      console.warn('⚠️ Environment warnings:');
      for (const warning of allWarnings) {
        console.warn(`  • ${warning}`);
      }
    }

    console.log('📋 Current configuration:', config);
    console.groupEnd();
  }

  return {
    isValid,
    errors: allErrors,
    warnings: allWarnings,
    config
  };
};

// Get typed environment config
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const validation = validateEnvironment();

  if (!validation.isValid) {
    throw new Error(`Environment validation failed: ${validation.errors.join(', ')}`);
  }

  return validation.config as EnvironmentConfig;
};

// Utility to check if specific features are enabled
export const isFeatureEnabled = (feature: keyof EnvironmentConfig['features']): boolean => {
  try {
    const config = getEnvironmentConfig();
    return config.features[feature];
  } catch {
    return false;
  }
};

// Runtime environment checks
export const isProduction = (): boolean => import.meta.env.PROD;
export const isDevelopment = (): boolean => import.meta.env.DEV;
export const isStaging = (): boolean => getEnvVar('VITE_APP_ENV') === 'staging';

// Debug information for development
export const getDebugInfo = () => {
  if (!isDevelopment()) return null;

  return {
    environment: {
      NODE_ENV: import.meta.env.NODE_ENV,
      MODE: import.meta.env.MODE,
      DEV: import.meta.env.DEV,
      PROD: import.meta.env.PROD,
    },
    variables: {
      VITE_CONTENTFUL_SPACE_ID: getEnvVar('VITE_CONTENTFUL_SPACE_ID') ? '***configured***' : 'missing',
      VITE_CONTENTFUL_ACCESS_TOKEN: getEnvVar('VITE_CONTENTFUL_ACCESS_TOKEN') ? '***configured***' : 'missing',
      VITE_CONTENTFUL_PREVIEW_TOKEN: getEnvVar('VITE_CONTENTFUL_PREVIEW_TOKEN') ? '***configured***' : 'missing',
      VITE_CONTENTFUL_ENVIRONMENT: getEnvVar('VITE_CONTENTFUL_ENVIRONMENT', 'master'),
    },
    features: validateFeatureFlags().config,
    validation: validateEnvironment()
  };
};
