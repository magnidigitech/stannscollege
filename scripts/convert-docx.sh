#!/bin/bash

# Target directory
ROOT_DIR="/Users/venkatavivek/stanns/7.Placements & Industry Linkages"

echo "========================================="
# Check if pandoc is installed, if not try to install it
if ! command -v pandoc &> /dev/null; then
    echo "⚠️ pandoc is not installed. Installing it via Homebrew..."
    brew install pandoc
    if [ $? -ne 0 ]; then
        echo "❌ Error: Failed to install pandoc. Please install it manually using: brew install pandoc"
        exit 1
    fi
    echo "✅ pandoc installed successfully!"
else
    echo "✅ pandoc is already installed."
fi
echo "========================================="

echo "🔄 Starting bulk conversion of DOCX files to Markdown..."

# Find all docx files recursively, ignoring 'markdown' folders
find "$ROOT_DIR" -type f -name "*.docx" | while read -r docx_path; do
    # Get containing directory
    dir_path=$(dirname "$docx_path")
    
    # Get file name without extension
    file_name=$(basename "$docx_path" .docx)
    
    # Skip if we are inside a markdown folder
    if [[ "$(basename "$dir_path")" == "markdown" ]]; then
        continue
    fi
    
    # Define and create markdown folder locally
    md_folder="$dir_path/markdown"
    mkdir -p "$md_folder"
    
    # Output markdown file path
    md_path="$md_folder/$file_name.md"
    
    echo "Converting: '$docx_path'"
    echo "        to: '$md_path'"
    
    # Run pandoc conversion
    pandoc "$docx_path" -f docx -t markdown -o "$md_path"
    
    if [ $? -eq 0 ]; then
        echo "✅ Success!"
    else
        echo "❌ Failed to convert!"
    fi
    echo ""
done

echo "========================================="
echo "🎉 Bulk conversion completed!"
echo "========================================="
