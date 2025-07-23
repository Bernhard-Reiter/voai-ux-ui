#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const FIGMA_TOKENS_FILE = path.join(__dirname, '../.figma-tokens.json');
const OUTPUT_FILE = path.join(__dirname, '../figma-tokens.json');

/**
 * Transform Figma Tokens format to Style Dictionary format
 */
function transformTokens(figmaTokens) {
  const transformed = {};
  
  // Process each token set
  Object.entries(figmaTokens).forEach(([setName, tokens]) => {
    if (setName.startsWith('$')) return; // Skip metadata
    
    Object.entries(tokens).forEach(([category, values]) => {
      transformed[category] = transformed[category] || {};
      
      if (typeof values === 'object' && !values.value) {
        // Nested structure
        Object.entries(values).forEach(([key, token]) => {
          if (typeof token === 'object' && token.value !== undefined) {
            transformed[category][key] = {
              value: token.value,
              type: token.type,
              description: token.description || `${category} ${key}`
            };
          } else if (typeof token === 'object') {
            // Double nested
            transformed[category][key] = {};
            Object.entries(token).forEach(([subKey, subToken]) => {
              if (typeof subToken === 'object' && subToken.value !== undefined) {
                transformed[category][key][subKey] = {
                  value: subToken.value,
                  type: subToken.type,
                  description: subToken.description || `${category} ${key} ${subKey}`
                };
              }
            });
          }
        });
      } else if (values.value !== undefined) {
        // Direct value
        transformed[category] = {
          value: values.value,
          type: values.type,
          description: values.description || category
        };
      }
    });
  });
  
  return transformed;
}

/**
 * Main sync function
 */
function syncFigmaTokens() {
  console.log('🎨 Syncing Figma Tokens...');
  
  try {
    // Check if Figma tokens file exists
    if (!fs.existsSync(FIGMA_TOKENS_FILE)) {
      console.error('❌ Figma tokens file not found:', FIGMA_TOKENS_FILE);
      console.log('💡 Make sure to export tokens from Figma Tokens plugin');
      process.exit(1);
    }
    
    // Read Figma tokens
    const figmaTokens = JSON.parse(fs.readFileSync(FIGMA_TOKENS_FILE, 'utf8'));
    console.log('✓ Loaded Figma tokens');
    
    // Transform tokens
    const transformedTokens = transformTokens(figmaTokens);
    console.log('✓ Transformed tokens to Style Dictionary format');
    
    // Write transformed tokens
    fs.writeFileSync(
      OUTPUT_FILE, 
      JSON.stringify(transformedTokens, null, 2)
    );
    console.log('✓ Wrote transformed tokens to:', OUTPUT_FILE);
    
    // Run Style Dictionary build
    console.log('🏗️  Building tokens with Style Dictionary...');
    execSync('npm run build:figma', { 
      cwd: path.join(__dirname, '..'),
      stdio: 'inherit' 
    });
    
    console.log('✅ Figma tokens sync complete!');
    
  } catch (error) {
    console.error('❌ Error syncing Figma tokens:', error.message);
    process.exit(1);
  }
}

// Run sync
if (require.main === module) {
  syncFigmaTokens();
}

module.exports = { transformTokens, syncFigmaTokens };