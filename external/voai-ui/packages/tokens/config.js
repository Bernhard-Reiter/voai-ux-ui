const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['./*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true
        }
      }]
    },
    json: {
      transformGroup: 'web',
      buildPath: 'build/',
      files: [{
        destination: 'tokens.json',
        format: 'json/nested'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{
        destination: 'tailwind-tokens.js',
        format: 'javascript/module',
        filter: function(token) {
          // Include all tokens for Tailwind
          return true;
        }
      }]
    }
  }
};