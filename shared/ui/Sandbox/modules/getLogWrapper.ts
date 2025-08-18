export const getLogWrapper = (code: string) => `
(function() {
  const serialize = (value) => {
    if (value instanceof Element) return value.outerHTML;
    try { return JSON.stringify(value); } catch { return String(value); }
  };

  ['log','info','warn','error'].forEach(level => {
    const orig = console[level]?.bind(console);
    console[level] = (...args) => {
      const serializedArgs = args.map(serialize);
      window.parent.postMessage({ source: 'iframe-log', level, args: serializedArgs }, '*');
      orig?.(...args);
    }
  });

  window.addEventListener('error', e => {
    window.parent.postMessage({ source: 'iframe-error', message: e.message, reason: e.reason }, '*');
  });
  window.addEventListener('unhandledrejection', e => {
    window.parent.postMessage({ source: 'iframe-error', message: e.reason?.toString() }, '*');
  });

  try {
    ${code}
  } catch (e) {
    console.error(e);
    window.parent.postMessage({ source: 'iframe-error', message: e.message }, '*');
  }
})();
`
