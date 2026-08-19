#!/bin/bash
# Theme Your Dream — Internal Link Validator
# Checks for broken internal links (non-existent files)

echo "=== Link Validation Report ==="
echo ""

broken=0

for html in *.html; do
  # Extract all href values
  grep -o 'href="[^"]*"' "$html" | sed 's/href="//;s/"$//' | while read href; do
    # Skip external URLs and anchors
    if [[ "$href" == http* ]] || [[ "$href" == mailto* ]] || [[ "$href" == "#"* ]]; then
      continue
    fi

    # Remove query parameters
    file="${href%%\?*}"
    # Remove anchors
    file="${file%%#*}"

    # Check if file exists
    if [ ! -z "$file" ] && [ ! -f "$file" ]; then
      echo "✗ $html: broken link '$href' → file '$file' not found"
      ((broken++))
    fi
  done
done

echo ""
if [ $broken -eq 0 ]; then
  echo "✓ All internal links valid"
else
  echo "✗ Found $broken broken links"
fi
