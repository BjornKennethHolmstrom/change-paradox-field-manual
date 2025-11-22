# PDF Update Guide

This guide explains how to regenerate PDFs when you update the manual.

## When to Update PDFs

Update PDFs when:
- ✅ You make significant content changes (new sections, major rewrites)
- ✅ You fix important errors or typos
- ✅ You add new case studies or policy reframes
- ✅ You release a new version (2.3, 2.4, etc.)

Don't update for:
- ❌ Minor typo fixes (wait until you have several)
- ❌ Formatting tweaks in the web version only
- ❌ Changes to non-content files (CSS, JS)

## Prerequisites

You need:
1. **wkhtmltopdf** - Converts HTML to PDF
2. **An SVG to PDF converter** (one of these):
   - **librsvg** (recommended - fast and reliable)
   - **Inkscape** (if you already have it)
   - **ImageMagick** (if you already have it)
3. **pdfunite** (for combining PDFs, comes with poppler-utils)

### Installation

**macOS:**
```bash
brew install wkhtmltopdf
brew install librsvg    # For SVG cover conversion
brew install poppler    # For pdfunite
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install wkhtmltopdf
sudo apt-get install librsvg2-bin
sudo apt-get install poppler-utils
```

## Step-by-Step Process

### 1. Make Your Changes

Edit the markdown files in `src/` as needed.

### 2. Update Version Number

Update these files with the new version:
- `book.toml` - Update title/metadata if needed
- `CHANGELOG.md` - Document what changed
- `cover.svg` - Update the version number in the SVG
- `generate-pdfs-wkhtmltopdf.sh` - Update VERSION variable

### 3. Generate PDFs

```bash
# Make script executable (first time only)
chmod +x generate-pdfs-wkhtmltopdf.sh

# Run the script
./generate-pdfs-wkhtmltopdf.sh
```

**What this does:**
1. Builds the mdBook HTML
2. Converts `cover.svg` to PDF
3. Converts each section's HTML to PDF
4. Combines all PDFs into the complete manual

### 4. Review PDFs

Check the generated PDFs in `pdfs/` folder:
- ✅ Cover page looks good
- ✅ Tables render correctly
- ✅ Links work (they should be clickable)
- ✅ Formatting looks good
- ✅ No weird page breaks in the middle of sections
- ✅ Complete PDF includes all sections

### 5. Create a Git Tag

```bash
# Update version number (e.g., v2.3)
VERSION="v2.3"

# Create annotated tag
git tag -a $VERSION -m "Version 2.3 - [Brief description of changes]"

# Push tag to GitHub
git push origin $VERSION
```

### 6. Create GitHub Release

1. Go to: https://github.com/BjornKennethHolmstrom/change-paradox-field-manual/releases/new
2. Select the tag you just created
3. Title: "Version 2.3 - [Brief Title]"
4. Description: Copy relevant section from CHANGELOG.md
5. Upload all PDFs from `pdfs/` folder
6. Click "Publish release"

### 7. Update README Links

If this is a major version change, update the version number in README.md:

```markdown
- [Download v2.3 (PDF)](https://github.com/.../releases/download/v2.3/change-paradox-field-manual-complete-v2.3.pdf)
```

Commit and push:
```bash
git add README.md
git commit -m "Update README with v2.3 PDF links"
git push
```

## Troubleshooting

### PDFs have formatting issues

**Problem:** Tables too wide, text overlapping, etc.

**Solution:** 
- Edit the markdown to use shorter text in tables
- Adjust margins in the script if needed
- Check that custom CSS isn't causing issues

### SVG cover conversion fails

**Problem:** "No SVG converter found" error

**Solution:** Install one of:
```bash
brew install librsvg      # Recommended
brew install inkscape     # Alternative
brew install imagemagick  # Alternative
```

### Complete PDF fails to generate

**Problem:** "pdfunite not found" or "pdftk not found"

**Solution:**
```bash
# macOS
brew install poppler    # Provides pdfunite

# Linux
sudo apt-get install poppler-utils
```

### wkhtmltopdf crashes or hangs

**Problem:** The script hangs during PDF generation

**Solution:**
- Update wkhtmltopdf to latest version
- Try running individual conversions manually to isolate the issue
- Check if a specific section's HTML is malformed

## Versioning Strategy

**Semantic versioning for content:**
- **Major (3.0):** Complete restructuring, new sections, major philosophy changes
- **Minor (2.3):** New case studies, new policies, significant additions
- **Patch (2.2.1):** Typo fixes, minor clarifications, formatting improvements

**When to increment:**
- If adding a complete new section → Minor version
- If adding 3+ new policy reframes → Minor version
- If fixing typos only → Patch version
- If restructuring the entire manual → Major version

## Customizing the Cover

The cover is `cover.svg` at the root of the repository.

**To update the cover:**
1. Edit `cover.svg` in any SVG editor (or text editor)
2. Update version number in the SVG
3. Adjust colors, text, artwork as needed
4. Run the PDF generation script

**The yellow/gold background represents integral (Yellow) consciousness in Spiral Dynamics.**

## Questions?

Open an issue or check:
- wkhtmltopdf documentation: https://wkhtmltopdf.org/
- librsvg documentation: https://gitlab.gnome.org/GNOME/librsvg

---

**Last updated:** November 2025
