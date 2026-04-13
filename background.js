let tabHistory = [];
let historyIndex = -1;
let isUndoing = false;
const MAX_HISTORY = 30;

// 标签栏模式：'horizontal'（默认）或 'vertical'
let tabBarMode = 'horizontal';

// 启动时从 storage 加载历史 & 模式
(async function init() {
  try {
    const data = await chrome.storage.local.get(['tabHistory', 'historyIndex', 'tabBarMode']);
    if (data.tabHistory) tabHistory = data.tabHistory;
    if (data.historyIndex !== undefined) historyIndex = data.historyIndex;
    if (data.tabBarMode) tabBarMode = data.tabBarMode;
  } catch {}
})();

// 监听 options 页面保存的模式变更，实时生效
chrome.storage.onChanged.addListener((changes) => {
  if (changes.tabBarMode) tabBarMode = changes.tabBarMode.newValue;
});

async function saveHistory() {
  try {
    await chrome.storage.local.set({ tabHistory, historyIndex });
  } catch {}
}

// 切换到相邻标签（offset: -1 上/左，+1 下/右）
async function switchAdjacentTab(offset) {
  const tabs = await chrome.tabs.query({ currentWindow: true });
  const currentIdx = tabs.findIndex(t => t.active);
  const targetIdx = currentIdx + offset;
  if (targetIdx >= 0 && targetIdx < tabs.length) {
    chrome.tabs.update(tabs[targetIdx].id, { active: true });
  }
}

// 历史回退
async function goBack() {
  if (historyIndex > 0) {
    historyIndex--;
    isUndoing = true;
    chrome.tabs.update(tabHistory[historyIndex], { active: true });
    await saveHistory();
  }
}

// 撤销回退（前进）
async function goForward() {
  if (historyIndex < tabHistory.length - 1) {
    historyIndex++;
    isUndoing = true;
    chrome.tabs.update(tabHistory[historyIndex], { active: true });
    await saveHistory();
  }
}

// 标签页切换时记录历史
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabId = activeInfo.tabId;
  if (!tabId) return;

  if (isUndoing) {
    isUndoing = false;
    return;
  }

  tabHistory = tabHistory.slice(0, historyIndex + 1);
  if (tabHistory.at(-1) === tabId) return;

  tabHistory.push(tabId);
  if (tabHistory.length > MAX_HISTORY) tabHistory.shift();
  historyIndex = tabHistory.length - 1;
  await saveHistory();
});

// 快捷键映射
//
// 水平模式（标签栏在顶部）：
//   cmd-left  (⌥←) → 切换到左侧标签
//   cmd-right (⌥→) → 切换到右侧标签
//   cmd-up    (⌥↑) → 历史回退
//   cmd-down  (⌥↓) → 撤销回退
//
// 垂直模式（标签栏在侧边）：
//   cmd-left  (⌥←) → 历史回退
//   cmd-right (⌥→) → 撤销回退
//   cmd-up    (⌥↑) → 切换到上方标签
//   cmd-down  (⌥↓) → 切换到下方标签
chrome.commands.onCommand.addListener(async (command) => {
  try {
    const v = tabBarMode === 'vertical';
    switch (command) {
      case 'cmd-left':  v ? await goBack()              : await switchAdjacentTab(-1); break;
      case 'cmd-right': v ? await goForward()           : await switchAdjacentTab(+1); break;
      case 'cmd-up':    v ? await switchAdjacentTab(-1) : await goBack();              break;
      case 'cmd-down':  v ? await switchAdjacentTab(+1) : await goForward();           break;
    }
  } catch {}
});

chrome.runtime.onStartup.addListener(() => {});
chrome.runtime.onInstalled.addListener(() => {});
