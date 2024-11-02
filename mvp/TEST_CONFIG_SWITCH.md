# Configuration Switch Testing Plan

## 1. Environment Setup

### 1.1 Development (.env.local)

NODE_ENV=development

NEXT_PUBLIC_USE_PROD_DATA=false

NEXT_PUBLIC_DATA_VERSION=mvp

NEXT_PUBLIC_DEFAULT_USER_ID=f5cb0287-d141-4f8b-9632-98be8d7bcbe7

### 1.2 Production (.env)

NODE_ENV=production

NEXT_PUBLIC_USE_PROD_DATA=true

NEXT_PUBLIC_DATA_VERSION=prod

NEXT_PUBLIC_DEFAULT_USER_ID=f5cb0287-d141-4f8b-9632-98be8d7bcbe7

#### 2. Test Cases

### 2.1 MVP Mode Testing

1. Set environment:

   ```bash

   cp .env.local.example .env.local

   yarn dev

   ```

2. Verify in browser console:

   ```javascript

   console.log(FEATURES.USE_PROD_DATA) // should be false

   console.log(getDataSource()) // should show MVP YAML config

   ```

3. Check loaded data:

   - Should show minimal agent set

   - Should use MVP YAML configuration

   - Should show basic metrics

### 2.2 Production Mode Testing

1. Set environment:

   ```bash

   cp .env.example .env

   yarn build

   yarn start

   ```

2. Verify in browser console:

   ```javascript

   console.log(FEATURES.USE_PROD_DATA) // should be true

   console.log(getDataSource()) // should show PROD YAML config

   ```

3. Check loaded data:

   - Should show full agent set

   - Should use PROD YAML configuration

   - Should show detailed metrics

## 3. Validation Steps

### 3.1 Data Source Validation

typescript

// In browser console

const dataSource = getDataSource();

console.log({

isDevelopment: !FEATURES.IS_PRODUCTION,

usingProdData: FEATURES.USE_PROD_DATA,

dataVersion: FEATURES.DATA_VERSION,

yamlConfig: dataSource.yamlConfig,

domainDataLength: dataSource.domainData.length,

agentDataLength: dataSource.agentData.length

});

### 3.2 Feature Flag Tests

typescript

// Test each feature flag

console.log({

aiMetrics: isFeatureEnabled('ENABLE_AI_METRICS'),

feedback: isFeatureEnabled('ENABLE_FEEDBACK'),

portfolio: isFeatureEnabled('ENABLE_PORTFOLIO_FEATURES')

});

### 3.3 User Authentication Test

typescript

// Verify user ID

console.log({

userId: getUserId(),

expectedId: 'f5cb0287-d141-4f8b-9632-98be8d7bcbe7'

});

## 4. Common Issues & Solutions

### 4.1 Environment Variables Not Loading

- Check if .env files are in correct location

- Verify NEXT_PUBLIC_ prefix for client-side vars

- Restart development server

### 4.2 Wrong Data Source Loading

- Clear browser cache

- Check NODE_ENV value

- Verify USE_PROD_DATA flag

### 4.3 RLS Issues

- Verify user ID in requests

- Check RLS policies in Supabase

- Validate auth token

## 5. Switching Between Environments

### 5.1 Development to Production

bash

# 1. Stop development server

ctrl + c

# 2. Switch environment

mv .env.local .env.local.bak

cp .env.example .env

# 3. Build and start

yarn build

yarn start

### 5.2 Production to Development

bash

# 1. Stop production server

ctrl + c

# 2. Switch environment

mv .env.local.bak .env.local

rm .env

# 3. Start development

yarn dev

## 6. Verification Checklist

- [ ] Environment variables loaded correctly

- [ ] Correct YAML configuration loaded

- [ ] User authentication working

- [ ] RLS policies enforced

- [ ] Metrics display appropriate for environment

- [ ] Agent filtering working

- [ ] Data consistency maintained