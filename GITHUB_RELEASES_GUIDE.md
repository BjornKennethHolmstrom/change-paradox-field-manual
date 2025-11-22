# GitHub Releases Guide for PDF Distribution

This guide shows you how to create releases and distribute your PDFs through GitHub.

## What Are GitHub Releases?

GitHub Releases are a way to package and distribute versions of your software (or in this case, documentation). They:
- Are tied to Git tags
- Can include downloadable files (like PDFs)
- Have release notes
- Show up in a dedicated "Releases" section on your repo
- Generate permanent download URLs

## Step-by-Step: Creating Your First Release

### 1. Generate Your PDFs

First, make sure you have all your PDFs ready:

```bash
# Generate PDFs using the script
./generate-pdfs-wkhtmltopdf.sh
```

This creates:
- `pdfs/00-cover.pdf`
- `pdfs/00-pre-flight-checklist.pdf`
- `pdfs/01-quick-start-guide.pdf`
- ... (all 13 individual sections)
- `pdfs/change-paradox-field-manual-complete-v2.2.pdf`

### 2. Create a Git Tag

Tags mark specific points in your repository's history:

```bash
# Format: v{major}.{minor}.{patch}
git tag -a v2.2 -m "Version 2.2 - Initial Public Release"

# Push the tag to GitHub
git push origin v2.2
```

**Tag naming conventions:**
- `v2.2` - Minor version (new sections, features)
- `v2.2.1` - Patch (typo fixes, small updates)
- `v3.0` - Major version (complete restructure)

### 3. Create the Release on GitHub

**Option A: Via GitHub Web Interface (Easiest)**

1. Go to your repository: https://github.com/BjornKennethHolmstrom/change-paradox-field-manual

2. Click **"Releases"** on the right sidebar (or go to `/releases`)

3. Click **"Create a new release"** (or **"Draft a new release"**)

4. **Choose tag:** Select `v2.2` from dropdown (or type to create a new one)

5. **Release title:** `Version 2.2 - Initial Public Release`

6. **Description:** Write release notes. Example:

```markdown
# The Change Paradox Field Manual v2.2

**Initial public release of the complete field manual.**

## What's Included

- 📘 **Complete Manual** (PDF) - All sections in one document
- 📄 **Individual Sections** - Download specific chapters as needed
- 🌐 **Read Online** - [View on GitHub Pages](https://bjornkennethholmstrom.github.io/change-paradox-field-manual/)

## Features

- 7-step protocol for building transformative power
- 15 policy reframes for progressive organizing
- 5 detailed case studies
- 9 anti-patterns to avoid
- Complete diagnostic toolkit

## Download Options

**Full Manual:**
- `change-paradox-field-manual-complete-v2.2.pdf` - Everything in one file

**Individual Sections:**
- Pre-flight checklist, quick start, introduction, diagnostic tools, etc.

## Open Source

Licensed under CC BY-SA 4.0 - Free to use, adapt, and redistribute with attribution.

**Contribute:** https://github.com/BjornKennethHolmstrom/change-paradox-field-manual

---

For changelog, see [CHANGELOG.md](https://github.com/BjornKennethHolmstrom/change-paradox-field-manual/blob/main/CHANGELOG.md)
```

7. **Attach files:** 
   - Click **"Attach binaries by dropping them here or selecting them"**
   - Drag all PDFs from your `pdfs/` folder
   - Or click to browse and select them

8. **Options:**
   - ☐ Set as a pre-release (only if it's not stable yet)
   - ☑ Set as the latest release (for v2.2, check this)
   - ☐ Create a discussion for this release (optional)

9. Click **"Publish release"**

**Option B: Via Command Line (GitHub CLI)**

```bash
# Install GitHub CLI if you haven't
brew install gh  # macOS
# or: sudo apt install gh  # Linux

# Login
gh auth login

# Create release with all PDFs
gh release create v2.2 \
  --title "Version 2.2 - Initial Public Release" \
  --notes "Initial public release. See repo for details." \
  pdfs/*.pdf
```

### 4. Verify Your Release

1. Go to: https://github.com/BjornKennethHolmstrom/change-paradox-field-manual/releases

2. You should see your v2.2 release with:
   - Title and description
   - All PDF files listed as "Assets"
   - Download count (starts at 0)
   - Date published

3. Click on any PDF to download it

## Understanding Release URLs

Once published, each file gets a permanent URL:

### Direct Download URL Format

```
https://github.com/{username}/{repo}/releases/download/{tag}/{filename}
```

**Example:**
```
https://github.com/BjornKennethHolmstrom/change-paradox-field-manual/releases/download/v2.2/change-paradox-field-manual-complete-v2.2.pdf
```

### "Latest Release" URL

GitHub provides a special URL that always points to the latest release:

```
https://github.com/BjornKennethHolmstrom/change-paradox-field-manual/releases/latest
```

This redirects to the most recent release page. Users can then choose which file to download.

**This is perfect for your website** - you don't need to update links when you create v2.3!

### Direct File from Latest Release

You can also construct a URL that always downloads from the latest release:

```
https://github.com/{username}/{repo}/releases/latest/download/{filename}
```

**Example:**
```
https://github.com/BjornKennethHolmstrom/change-paradox-field-manual/releases/latest/download/change-paradox-field-manual-complete-v2.2.pdf
```

⚠️ **Note:** The filename still contains the version number, so this only works if you keep the same filename pattern.

## Best Practice: Use `/releases/latest`

In your website's `whitepapers-data.ts`, use:

```typescript
pdfPath: { 
  en: 'https://github.com/BjornKennethHolmstrom/change-paradox-field-manual/releases/latest' 
}
```

**Why this is best:**
- ✅ Always points to the newest version
- ✅ Users can see all available files
- ✅ Users can see release notes
- ✅ You don't need to update website code for new releases

## Updating to v2.3 (Future Release)

When you're ready to release v2.3:

```bash
# 1. Update version in files
# - Update cover.svg version number
# - Update generate-pdfs-wkhtmltopdf.sh VERSION variable
# - Update CHANGELOG.md

# 2. Generate new PDFs
./generate-pdfs-wkhtmltopdf.sh

# 3. Commit changes
git add .
git commit -m "Release v2.3 - [Brief description]"
git push

# 4. Create new tag
git tag -a v2.3 -m "Version 2.3 - [Brief description]"
git push origin v2.3

# 5. Create new release on GitHub
# - Either via web interface
# - Or via CLI:
gh release create v2.3 \
  --title "Version 2.3 - [Title]" \
  --notes "See CHANGELOG.md for details" \
  pdfs/*.pdf
```

Your website will automatically point to the new version because you used `/releases/latest`!

## Managing Releases

### Editing a Release

1. Go to the release page
2. Click **"Edit release"**
3. You can:
   - Change title/description
   - Add/remove files
   - Change pre-release status
   - Delete the release

### Deleting a Release

1. Edit the release
2. Click **"Delete release"** at the bottom
3. Confirm

**Note:** This doesn't delete the Git tag. To delete the tag:
```bash
git tag -d v2.2           # Delete locally
git push origin :v2.2     # Delete on GitHub
```

### Draft Releases

You can create a draft release that's not publicly visible:

1. When creating a release, click **"Save draft"** instead of **"Publish"**
2. The draft is only visible to you
3. Publish it when ready

**Use case:** Prepare release notes and upload files before the actual release date.

## Download Statistics

GitHub tracks download counts for each asset. To see them:

1. Go to your releases page
2. Look at each asset - the download count is shown
3. Use this to track which formats are most popular

## Release Notifications

People can "watch" your repo to get notified of new releases:

1. On your repo page, click **"Watch"**
2. Select **"Custom"**
3. Check **"Releases"**
4. They'll get an email for each new release

## Advanced: Automating Releases with GitHub Actions

You can automate release creation. Create `.github/workflows/release.yml`:

```yaml
name: Create Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Install dependencies
        run: |
          sudo apt-get update
          sudo apt-get install -y wkhtmltopdf librsvg2-bin poppler-utils
      
      - name: Generate PDFs
        run: |
          chmod +x generate-pdfs-wkhtmltopdf.sh
          ./generate-pdfs-wkhtmltopdf.sh
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: pdfs/*.pdf
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Now when you push a tag, GitHub automatically:
1. Generates the PDFs
2. Creates the release
3. Uploads all PDFs

**To use:**
```bash
git tag v2.3
git push origin v2.3
# That's it! GitHub Actions does the rest
```

## Troubleshooting

### "Tag does not exist"
- Make sure you pushed the tag: `git push origin v2.2`
- Tags are case-sensitive

### Can't upload files
- File size limit: 2GB per file (you're way under this)
- Total release size limit: None (but be reasonable)

### Release doesn't show as "latest"
- Check the box **"Set as the latest release"** when publishing
- Or edit the release and check it

### Download URL returns 404
- Check spelling of tag and filename
- Make sure release is published (not draft)
- Wait a few seconds - sometimes there's a delay

## Summary

**For your v2.2 release:**

1. Generate PDFs: `./generate-pdfs-wkhtmltopdf.sh`
2. Create tag: `git tag -a v2.2 -m "Version 2.2"`
3. Push tag: `git push origin v2.2`
4. Go to GitHub → Releases → Create new release
5. Select v2.2 tag
6. Add title and description
7. Upload all PDFs from `pdfs/` folder
8. Check "Set as latest release"
9. Click "Publish release"

**Done!** Your PDFs are now available at:
`https://github.com/BjornKennethHolmstrom/change-paradox-field-manual/releases/latest`

People can download them, and you can track download statistics!
