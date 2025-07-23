const StyleDictionary = require('style-dictionary');

// Custom format for Tailwind CSS
StyleDictionary.registerFormat({
  name: 'tailwind/theme',
  formatter: function({ dictionary }) {
    const buildThemeObject = (tokens) => {
      const theme = {};
      
      tokens.forEach(token => {
        const keys = token.path;
        let current = theme;
        
        keys.forEach((key, index) => {
          if (index === keys.length - 1) {
            current[key] = token.value;
          } else {
            current[key] = current[key] || {};
            current = current[key];
          }
        });
      });
      
      return theme;
    };
    
    return `module.exports = ${JSON.stringify(buildThemeObject(dictionary.allTokens), null, 2)}`;
  }
});

// Custom transform for rem values
StyleDictionary.registerTransform({
  name: 'size/rem',
  type: 'value',
  matcher: function(token) {
    return token.type === 'fontSizes' || token.type === 'spacing';
  },
  transformer: function(token) {
    const baseSize = 16;
    const value = parseFloat(token.value);
    if (isNaN(value)) return token.value;
    return `${value / baseSize}rem`;
  }
});

// Custom transform for px to rem
StyleDictionary.registerTransform({
  name: 'size/pxToRem',
  type: 'value',
  matcher: function(token) {
    return (token.type === 'fontSizes' || token.type === 'spacing') && 
           token.value.toString().endsWith('px');
  },
  transformer: function(token) {
    const baseSize = 16;
    const value = parseFloat(token.value);
    if (isNaN(value)) return token.value;
    return `${value / baseSize}rem`;
  }
});

// Register transform group
StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'time/seconds',
    'content/icon',
    'size/rem',
    'color/css'
  ]
});

StyleDictionary.registerTransformGroup({
  name: 'custom/tailwind',
  transforms: [
    'attribute/cti',
    'name/cti/camel',
    'size/rem',
    'color/hex'
  ]
});

module.exports = {
  source: ['figma-tokens.json'],
  platforms: {
    css: {
      transformGroup: 'custom/css',
      buildPath: 'build/',
      files: [{
        destination: 'figma-variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true
        }
      }]
    },
    tailwind: {
      transformGroup: 'custom/tailwind',
      buildPath: 'build/',
      files: [{
        destination: 'figma-tailwind-theme.js',
        format: 'tailwind/theme'
      }]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{
        destination: 'figma-tokens-flat.json',
        format: 'json/flat'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{
        destination: 'figma-tokens.js',
        format: 'javascript/es6'
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/',
      files: [{
        destination: 'figma-variables.scss',
        format: 'scss/variables'
      }]
    }
  }
};