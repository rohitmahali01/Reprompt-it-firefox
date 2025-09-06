# Firefox Installation Guide

## Quick Start

### Method 1: Temporary Installation (Development/Testing)

1. **Open Firefox Debug Console**
   - Type `about:debugging` in the address bar
   - Click "This Firefox" in the left sidebar

2. **Load the Extension**
   - Click "Load Temporary Add-on..."
   - Navigate to the extension folder
   - Select the `manifest.json` file

3. **Verify Installation**
   - The extension should appear in the list
   - Look for the Rephrase-It icon in your toolbar
   - Right-click on any text to see context menu options

### Method 2: Permanent Installation

1. **Package the Extension**
   ```bash
   zip -r reprompt-it-firefox.zip . -x "*.git*" "*.md" "node_modules/*"
   ```

2. **Install the Package**
   - Open `about:addons`
   - Click the gear icon
   - Select "Install Add-on From File..."
   - Choose your zip file

## Configuration

1. **Set API Keys**
   - Click the extension icon in the toolbar
   - Or right-click and select "Options"
   - Enter your OpenAI and/or Gemini API keys

2. **Choose Default Provider**
   - Select between OpenAI or Gemini
   - Choose your preferred models

## Usage

- Select any text on a webpage
- Right-click to see rephrasing options
- Choose: elaborative, Concise, or Professional
- The text will be replaced automatically

## Keyboard Shortcuts

- `Ctrl+Shift+R`: Open extension popup
- `Ctrl+M`: Toggle between OpenAI and Gemini

## Troubleshooting

- **Extension not appearing**: Check Firefox version (109+ required)
- **Context menu missing**: Ensure text is selected before right-clicking
- **API errors**: Verify your API keys are correct and have sufficient credits
- **Permission errors**: Make sure all required permissions are granted
- **Script execution errors**: If the extension loads but doesn't work, check the browser console (F12) for errors
- **Models not working**: Use the updated model names: gpt-4o, gpt-4o-mini, gpt-3.5-turbo for OpenAI

## Recent Fixes Applied

- ✓ Fixed manifest.json to remove non-existent models.js reference
- ✓ Updated to valid OpenAI model names (gpt-4o, gpt-4o-mini, gpt-3.5-turbo)
- ✓ Fixed script execution format for Firefox compatibility
- ✓ Added custom extension icons (icon16.png, icon32.png, icon128.png)
- ✓ Fixed browser.tabs.executeScript return value handling

## Firefox Compatibility

- **Minimum Firefox Version**: 109.0
- **Manifest Version**: 2 (Firefox standard)
- **Browser API**: Uses `browser.*` namespace
- **Security**: Local storage only, no data syncing

## Attribution

- **Extension Icon**: [Letter r icons created by Ina Mella - Flaticon](https://www.flaticon.com/free-icons/letter-r)