#!/usr/bin/env node

/**
 * Build script: Update robots meta tags based on environment
 *
 * This script runs during the Vercel build process and updates
 * the robots meta tags in all HTML files based on the ENVIRONMENT
 * variable:
 *
 * - development, preview: noindex, nofollow (prevent indexing)
 * - production: index, follow (allow indexing)
 *
 * Usage:
 *   node build-robots-meta.js
 *
 * Environment variables:
 *   ENVIRONMENT: 'development', 'preview', or 'production'
 *   VERCEL_ENV: Vercel's built-in environment (preview, production)
 */

const fs = require('fs');
const path = require('path');

// Determine the environment
const environment = process.env.ENVIRONMENT || process.env.VERCEL_ENV || 'development';
const isDevelopment = environment === 'development' || environment === 'preview';

// Set robots meta content based on environment
const robotsContent = isDevelopment
  ? 'noindex, nofollow'
  : 'index, follow';

console.log(`[SEO Build] Environment: ${environment}`);
console.log(`[SEO Build] Robots meta: ${robotsContent}`);

// Recursively find HTML files
function findHtmlFiles(dir, excludeDirs = ['node_modules', '.next', ':TEMP', 'docs', '.git']) {
  let files = [];
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!excludeDirs.includes(entry.name)) {
          files = files.concat(findHtmlFiles(fullPath, excludeDirs));
        }
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
  }
  return files;
}

const htmlFiles = findHtmlFiles(__dirname);

console.log(`[SEO Build] Found ${htmlFiles.length} HTML files to process`);

// Update each HTML file
htmlFiles.forEach(filePath => {
  try {
    const relPath = path.relative(__dirname, filePath);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the robots meta tag
    const oldRobotsTag = /<meta name="robots" content="[^"]*">/;
    const newRobotsTag = `<meta name="robots" content="${robotsContent}">`;

    if (oldRobotsTag.test(content)) {
      const updatedContent = content.replace(oldRobotsTag, newRobotsTag);
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`[SEO Build] ✓ ${relPath}`);
    } else {
      console.log(`[SEO Build] ⚠ ${relPath} (no robots meta tag found)`);
    }
  } catch (error) {
    console.error(`[SEO Build] ✗ Error processing ${filePath}:`, error.message);
    process.exit(1);
  }
});

console.log('[SEO Build] Done!');
