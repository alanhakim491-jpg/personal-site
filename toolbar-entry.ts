import { initToolbar } from '@21st-extension/toolbar';

const localHosts = new Set(['localhost', '127.0.0.1', '']);
const isLocalDev = localHosts.has(window.location.hostname) || window.location.protocol === 'file:';

if (isLocalDev) {
  initToolbar({
    plugins: [],
  });
}
