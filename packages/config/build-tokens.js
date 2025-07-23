const StyleDictionary = require('style-dictionary');

const config = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true
        }
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    },
    typescript: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [{
        destination: 'tokens.d.ts',
        format: 'typescript/es6-declarations'
      }]
    }
  }
};

const sd = StyleDictionary.extend(config);
sd.buildAllPlatforms();

console.log('✨ Design tokens built successfully!');