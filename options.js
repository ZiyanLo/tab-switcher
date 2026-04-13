// 两种模式下，每个命令对应的功能描述
const MODE_KEYMAP = {
  horizontal: [
    { command: 'cmd-left',  action: '切换到左侧标签', desc: '激活当前标签左边的标签页' },
    { command: 'cmd-right', action: '切换到右侧标签', desc: '激活当前标签右边的标签页' },
    { command: 'cmd-up',    action: '历史回退',       desc: '回到上一次访问的标签页' },
    { command: 'cmd-down',  action: '撤销回退',       desc: '撤销回退，向前恢复' },
  ],
  vertical: [
    { command: 'cmd-up',    action: '切换到上方标签', desc: '激活当前标签上方的标签页' },
    { command: 'cmd-down',  action: '切换到下方标签', desc: '激活当前标签下方的标签页' },
    { command: 'cmd-left',  action: '历史回退',       desc: '回到上一次访问的标签页' },
    { command: 'cmd-right', action: '撤销回退',       desc: '撤销回退，向前恢复' },
  ],
};

const KEY_SYMBOL = {
  Alt: '⌥', Ctrl: '⌃', Control: '⌃', Shift: '⇧', Command: '⌘', MacCtrl: '⌃',
  Left: '←', Right: '→', Up: '↑', Down: '↓',
  Space: 'Space', Tab: 'Tab', Enter: '↩', Backspace: '⌫', Escape: 'Esc',
};

function parseShortcut(str) {
  if (!str) return [];
  return str.split('+').map(p => KEY_SYMBOL[p] ?? p);
}

function renderKeys(keys) {
  if (!keys.length) return '<span class="key-unset">未设置</span>';
  return keys.map((k, i) =>
    (i > 0 ? '<span class="key-sep">+</span>' : '') + `<span class="key">${k}</span>`
  ).join('');
}

async function fetchCommandMap() {
  const map = {};
  try {
    const cmds = await chrome.commands.getAll();
    for (const c of cmds) map[c.name] = c.shortcut || '';
  } catch {}
  return map;
}

async function renderKeymap(mode) {
  const tbody = document.getElementById('keymap-body');
  const cmdMap = await fetchCommandMap();
  const rows = MODE_KEYMAP[mode];
  tbody.innerHTML = rows.map(({ command, action, desc }) => {
    const keys = parseShortcut(cmdMap[command] || '');
    return `
      <tr>
        <td>
          <div class="action-name">${action}</div>
          <div class="action-desc">${desc}</div>
        </td>
        <td><span class="key-badge">${renderKeys(keys)}</span></td>
      </tr>`;
  }).join('');
}

function showToast(msg = '已保存') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

async function init() {
  let mode = 'horizontal';
  try {
    const data = await chrome.storage.local.get('tabBarMode');
    if (data.tabBarMode) mode = data.tabBarMode;
  } catch {}

  const radio = document.querySelector(`input[name="mode"][value="${mode}"]`);
  if (radio) radio.checked = true;

  await renderKeymap(mode);

  document.querySelectorAll('input[name="mode"]').forEach(input => {
    input.addEventListener('change', async () => {
      const newMode = input.value;
      try {
        await chrome.storage.local.set({ tabBarMode: newMode });
        showToast('已保存');
      } catch {
        showToast('保存失败');
      }
      await renderKeymap(newMode);
    });
  });

  document.getElementById('open-shortcuts-btn').addEventListener('click', () => {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  });
}

init();
