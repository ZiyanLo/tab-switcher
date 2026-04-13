# Tab Switcher

A minimal Chrome extension to switch tabs with `Option + Arrow Keys`, with full support for both horizontal and vertical tab bar layouts.

## Features

- **Horizontal tab bar** — `⌥←` / `⌥→` to switch tabs, `⌥↑` / `⌥↓` for history navigation
- **Vertical tab bar** — `⌥↑` / `⌥↓` to switch tabs, `⌥←` / `⌥→` for history navigation
- Switch modes instantly from the settings page — no restart needed
- Tab history navigation — go back to the last visited tab and undo the jump
- History is persisted across sessions via `chrome.storage`

## Keyboard Shortcuts

| Key | Horizontal mode | Vertical mode |
|-----|----------------|---------------|
| `⌥ ←` | Switch to left tab | History back |
| `⌥ →` | Switch to right tab | History forward |
| `⌥ ↑` | History back | Switch to upper tab |
| `⌥ ↓` | History forward | Switch to lower tab |

Default shortcuts are `Option + Arrow Keys`. Customize them at `chrome://extensions/shortcuts`.

## Installation

### From source

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the project folder

### From release

1. Download the latest `.zip` from [Releases](https://github.com/ZiyanLo/tab-switcher/releases)
2. Unzip it and follow steps 2–4 above

## Settings

Click the extension icon → **Options**, or go to `chrome://extensions/` → Tab Switcher → **Details** → **Extension options**.

Select your tab bar layout — the shortcut mapping updates immediately.

## Requirements

- Chrome 109+ (Manifest V3)
