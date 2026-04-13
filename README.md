# Tab Switcher

A minimal Chrome extension that lets you switch tabs with `Option + Arrow Keys`, with full support for both horizontal and vertical tab bar layouts.

## Features

- **Horizontal tab bar** — `⌥←` / `⌥→` to switch tabs, `⌥↑` / `⌥↓` for history navigation
- **Vertical tab bar** — `⌥↑` / `⌥↓` to switch tabs, `⌥←` / `⌥→` for history navigation
- Switch modes instantly from the extension settings page — no restart needed
- Tab history navigation — go back to the last visited tab and undo the jump
- History is persisted across sessions via `chrome.storage`

## Keyboard Shortcuts

| Key | Horizontal mode | Vertical mode |
|-----|----------------|---------------|
| `⌥ ←` | Switch to left tab | History back |
| `⌥ →` | Switch to right tab | History forward |
| `⌥ ↑` | History back | Switch to upper tab |
| `⌥ ↓` | History forward | Switch to lower tab |

Default shortcuts are `Option + Arrow Keys`. You can customize them at `chrome://extensions/shortcuts`.

## Installation

### From source

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked** and select the project folder

### From release

1. Download the latest `.zip` from [Releases](https://github.com/ZiyanLo/tab-switcher/releases)
2. Unzip it
3. Follow steps 2–4 above

## Settings

Click the extension icon → **Options**, or go to `chrome://extensions/` → Tab Switcher → **Details** → **Extension options**.

Select your tab bar layout (horizontal or vertical) — the shortcut mapping updates immediately.

![Settings screenshot](https://github.com/ZiyanLo/tab-switcher/assets/settings-preview.png)

## Requirements

- Chrome 109+ (Manifest V3)
- macOS (default shortcuts use the `Option` key)
