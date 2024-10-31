export const FEATURES = {
  // Environment-based configuration
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  USE_PROD_DATA: process.env.NEXT_PUBLIC_USE_PROD_DATA === 'true',
  
  // User-specific configuration
  DEFAULT_USER_ID: 'f5cb0287-d141-4f8b-9632-98be8d7bcbe7',
  
  // Feature flags
  ENABLE_AI_METRICS: process.env.NEXT_PUBLIC_ENABLE_AI_METRICS === 'true',
  ENABLE_FEEDBACK: process.env.NEXT_PUBLIC_ENABLE_FEEDBACK === 'true',
  ENABLE_PORTFOLIO_FEATURES: process.env.NEXT_PUBLIC_ENABLE_PORTFOLIO === 'true',
  
  // Data source configuration
  DATA_VERSION: process.env.NEXT_PUBLIC_DATA_VERSION || 'mvp',
  
  // API configuration
  PRAISON_AI_URL: process.env.NEXT_PUBLIC_PRAISON_AI_URL || 'http://localhost:8000',
  MAX_TOKENS: parseInt(process.env.NEXT_PUBLIC_MAX_TOKENS || '100000', 10),
  COST_PER_TOKEN: parseFloat(process.env.NEXT_PUBLIC_COST_PER_TOKEN || '0.000001'),
  
  // UI configuration
  THEME: process.env.NEXT_PUBLIC_THEME || 'light',
  LANGUAGE: process.env.NEXT_PUBLIC_LANGUAGE || 'en',
  DEBUG_MODE: process.env.NODE_ENV === 'development'
} as const;

// Data source selector
export const getDataSource = () => {
  if (FEATURES.USE_PROD_DATA) {
    return {
      domainData: require('@/data/domainData-PROD').domainData,
      agentData: require('@/data/domainData-Agents-PROD').agentData,
      yamlConfig: require('../yaml/game-development-prod.yaml')
    };
  }
  return {
    domainData: require('@/data/domainData').domainData,
    agentData: require('@/data/Projects-Mission-Agents').agents,
    yamlConfig: require('../yaml/game-development-mvp.yaml')
  };
};

// Type-safe feature checker
export const isFeatureEnabled = (feature: keyof typeof FEATURES): boolean => {
  return !!FEATURES[feature];
};

// Environment checker
export const isProd = (): boolean => FEATURES.IS_PRODUCTION;
export const isDebug = (): boolean => FEATURES.DEBUG_MODE;

// User configuration
export const getUserId = (): string => FEATURES.DEFAULT_USER_ID;

// Metrics configuration
export const getMetricsConfig = () => ({
  maxTokens: FEATURES.MAX_TOKENS,
  costPerToken: FEATURES.COST_PER_TOKEN,
  enableMetrics: FEATURES.ENABLE_AI_METRICS
}); 