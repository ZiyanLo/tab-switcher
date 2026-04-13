# Tab Switcher

用 `Option + 方向键` 快速切换 Chrome 标签页，完整支持水平与垂直标签栏布局。

A minimal Chrome extension to switch tabs with `Option + Arrow Keys`, with full support for both horizontal and vertical tab bar layouts.

---

## 功能 Features

- **水平标签栏** — `⌥←` / `⌥→` 切换标签，`⌥↑` / `⌥↓` 历史回溯
- **垂直标签栏** — `⌥↑` / `⌥↓` 切换标签，`⌥←` / `⌥→` 历史回溯
- 在设置页面一键切换模式，立即生效，无需重启
- 标签历史导航：回到上一个访问的标签，并支持撤销跳转
- 历史记录通过 `chrome.storage` 跨会话持久化

---

- **Horizontal tab bar** — `⌥←` / `⌥→` to switch tabs, `⌥↑` / `⌥↓` for history navigation
- **Vertical tab bar** — `⌥↑` / `⌥↓` to switch tabs, `⌥←` / `⌥→` for history navigation
- Switch modes instantly from the settings page — no restart needed
- Tab history navigation — go back to the last visited tab and undo the jump
- History is persisted across sessions via `chrome.storage`

---

## 快捷键 Keyboard Shortcuts

| 按键 Key | 水平模式 Horizontal | 垂直模式 Vertical |
|----------|--------------------|--------------------|
| `⌥ ←` | 切换到左侧标签 Switch to left tab | 历史回退 History back |
| `⌥ →` | 切换到右侧标签 Switch to right tab | 撤销回退 History forward |
| `⌥ ↑` | 历史回退 History back | 切换到上方标签 Switch to upper tab |
| `⌥ ↓` | 撤销回退 History forward | 切换到下方标签 Switch to lower tab |

默认快捷键为 `Option + 方向键`，可在 `chrome://extensions/shortcuts` 自定义。

Default shortcuts are `Option + Arrow Keys`. Customize them at `chrome://extensions/shortcuts`.

---

## 安装 Installation

### 从源码安装 From source

1. 克隆或下载本仓库 Clone or download this repository
2. 打开 Chrome，访问 `chrome://extensions/`
3. 开启右上角的**开发者模式** Enable **Developer mode**
4. 点击**加载已解压的扩展程序** Click **Load unpacked** and select the project folder

### 从 Release 安装 From release

1. 从 [Releases](https://github.com/ZiyanLo/tab-switcher/releases) 下载最新 `.zip` Download the latest `.zip`
2. 解压后按上方步骤 2–4 操作 Unzip and follow steps 2–4 above

---

## 设置 Settings

点击扩展图标 → **选项**，或前往 `chrome://extensions/` → Tab Switcher → **详情** → **扩展程序选项**。

Click the extension icon → **Options**, or go to `chrome://extensions/` → Tab Switcher → **Details** → **Extension options**.

在设置页面选择标签栏布局，快捷键映射立即更新。

Select your tab bar layout — the shortcut mapping updates immediately.

---

## 环境要求 Requirements

- Chrome 109+（Manifest V3）
