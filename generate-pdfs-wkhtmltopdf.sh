#!/bin/bash

# PDF Generation Script using wkhtmltopdf
# This converts the built mdBook HTML directly to PDF

set -e

echo "🔧 Checking dependencies..."

if ! command -v mdbook &> /dev/null; then
    echo "❌ mdbook not found"
    exit 1
fi

if ! command -v wkhtmltopdf &> /dev/null; then
    echo "❌ wkhtmltopdf not found. Install: brew install wkhtmltopdf"
    exit 1
fi

echo "✅ Dependencies ready"
echo ""

# Build the book first
echo "📚 Building mdBook..."
mdbook build

# Create output directory
mkdir -p pdfs

VERSION="v2.2"

echo ""
echo "📄 Generating individual section PDFs..."

# First, generate the cover page PDF from SVG
echo "  🎨 Creating cover page from SVG..."

if [ -f "cover.svg" ]; then
    # Try different SVG to PDF converters in order of preference
    if command -v rsvg-convert &> /dev/null; then
        rsvg-convert -f pdf -o pdfs/00-cover.pdf cover.svg
        echo "  ✅ 00-cover.pdf (using rsvg-convert)"
    elif command -v inkscape &> /dev/null; then
        inkscape --export-type=pdf --export-filename=pdfs/00-cover.pdf cover.svg 2>/dev/null
        echo "  ✅ 00-cover.pdf (using inkscape)"
    elif command -v convert &> /dev/null; then
        convert -density 300 cover.svg pdfs/00-cover.pdf 2>/dev/null
        echo "  ✅ 00-cover.pdf (using imagemagick)"
    else
        echo "  ⚠️  No SVG converter found. Install one of:"
        echo "      brew install librsvg (for rsvg-convert)"
        echo "      brew install inkscape"
        echo "      brew install imagemagick"
        echo "  Skipping cover page."
    fi
else
    echo "  ⚠️  cover.svg not found (skipping cover)"
fi

# Function to convert HTML to PDF
html_to_pdf() {
    local html_file=$1
    local pdf_file=$2
    
    wkhtmltopdf \
        --enable-local-file-access \
        --print-media-type \
        --footer-center "Page [page] of [toPage]" \
        --footer-font-size 8 \
        --margin-top 15mm \
        --margin-bottom 15mm \
        --margin-left 15mm \
        --margin-right 15mm \
        "book/$html_file" \
        "pdfs/$pdf_file" \
        2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "  ✅ $pdf_file"
    else
        echo "  ❌ Failed: $pdf_file"
    fi
}

# Generate all individual section PDFs
html_to_pdf "00-pre-flight-checklist.html" "00-pre-flight-checklist.pdf"
html_to_pdf "01-quick-start-guide.html" "01-quick-start-guide.pdf"
html_to_pdf "02-introduction.html" "02-introduction.pdf"
html_to_pdf "03-four-voices.html" "03-four-voices.pdf"
html_to_pdf "04-diagnostic-toolkit.html" "04-diagnostic-toolkit.pdf"
html_to_pdf "05-reclaiming-the-warrior.html" "05-reclaiming-the-warrior.pdf"
html_to_pdf "06-protocol-steps-1-2.html" "06-protocol-steps-1-2.pdf"
html_to_pdf "06-protocol-steps-3-4.html" "06-protocol-steps-3-4.pdf"
html_to_pdf "06-protocol-steps-5-6-7.html" "06-protocol-steps-5-6-7.pdf"
html_to_pdf "07-policy-playbook.html" "07-policy-playbook.pdf"
html_to_pdf "08-case-studies.html" "08-case-studies.pdf"
html_to_pdf "09-anti-patterns.html" "09-anti-patterns.pdf"
html_to_pdf "10-spread-adapt-improve.html" "10-spread-adapt-improve.pdf"

echo ""
echo "📦 Creating complete PDF by combining sections..."

# Combine PDFs using pdfunite or pdftk
if command -v pdfunite &> /dev/null; then
    pdfunite \
        pdfs/00-cover.pdf \
        pdfs/00-pre-flight-checklist.pdf \
        pdfs/01-quick-start-guide.pdf \
        pdfs/02-introduction.pdf \
        pdfs/03-four-voices.pdf \
        pdfs/04-diagnostic-toolkit.pdf \
        pdfs/05-reclaiming-the-warrior.pdf \
        pdfs/06-protocol-steps-1-2.pdf \
        pdfs/06-protocol-steps-3-4.pdf \
        pdfs/06-protocol-steps-5-6-7.pdf \
        pdfs/07-policy-playbook.pdf \
        pdfs/08-case-studies.pdf \
        pdfs/09-anti-patterns.pdf \
        pdfs/10-spread-adapt-improve.pdf \
        "pdfs/change-paradox-field-manual-complete-$VERSION.pdf"
    
    echo "✅ Complete PDF created with cover page"
    
elif command -v pdftk &> /dev/null; then
    pdftk \
        pdfs/00-cover.pdf \
        pdfs/00-pre-flight-checklist.pdf \
        pdfs/01-quick-start-guide.pdf \
        pdfs/02-introduction.pdf \
        pdfs/03-four-voices.pdf \
        pdfs/04-diagnostic-toolkit.pdf \
        pdfs/05-reclaiming-the-warrior.pdf \
        pdfs/06-protocol-steps-1-2.pdf \
        pdfs/06-protocol-steps-3-4.pdf \
        pdfs/06-protocol-steps-5-6-7.pdf \
        pdfs/07-policy-playbook.pdf \
        pdfs/08-case-studies.pdf \
        pdfs/09-anti-patterns.pdf \
        pdfs/10-spread-adapt-improve.pdf \
        cat output "pdfs/change-paradox-field-manual-complete-$VERSION.pdf"
    
    echo "✅ Complete PDF created with cover page"
    
else
    echo "⚠️  Cannot create complete PDF"
    echo "   Install pdfunite: brew install poppler"
    echo "   Or install pdftk: brew install pdftk-java"
    echo ""
    echo "   Individual section PDFs are ready!"
fi

echo ""
echo "✨ PDF generation complete!"
echo ""
echo "📊 Generated files:"
ls -lh pdfs/*.pdf | awk '{print $9, "(" $5 ")"}'
echo ""
echo "📤 Next steps:"
echo "1. Review PDFs for quality"
echo "2. Create GitHub release (v2.2)"
echo "3. Upload PDFs to release"
