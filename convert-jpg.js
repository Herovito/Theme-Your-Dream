const fs = require('fs');
const path = require('path');

// Simple PNG to JPG conversion using sharp if available, otherwise use ImageMagick
try {
  const sharp = require('sharp');

  sharp('screenshot-temp.png')
    .toFormat('jpeg', { quality: 90 })
    .toFile('screenshot-temp.jpg', (err, info) => {
      if (err) {
        console.error('Error converting image:', err);
        process.exit(1);
      }
      console.log(`Converted to JPG: ${JSON.stringify(info)}`);

      // Get dimensions
      sharp('screenshot-temp.png')
        .metadata()
        .then(metadata => {
          console.log(`Dimensions: ${metadata.width}x${metadata.height}`);
        });
    });
} catch (e) {
  console.error('Sharp not available. Trying alternative method...');
  // Fallback: just copy as is, we'll handle conversion differently
  process.exit(1);
}
