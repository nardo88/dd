export {}

// Преобразование объекта в компактную строку
function formatValue(value) {
  if (typeof value === 'object' && value !== null) {
    try {
      return `{ ${Object.entries(value)
        .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
        .join(', ')} }`
    } catch {
      return '[Circular]'
    }
  }
  return String(value)
}

function formatArgs(args) {
  return args.map(formatValue).join(' ')
}

// Переопределяем console.log
console.log = (...args) => {
  self.postMessage({ type: 'stdout', data: formatArgs(args) })
}

// Переопределяем console.error
console.error = (...args) => {
  self.postMessage({ type: 'stderr', data: formatArgs(args) })
}

// Получаем код и выполняем его
self.onmessage = (event) => {
  const { code } = event.data
  try {
    const result = new Function(code)()
    if (result !== undefined) {
      self.postMessage({ type: 'stdout', data: formatValue(result) })
    }
  } catch (e) {
    self.postMessage({ type: 'stderr', data: e?.stack || e?.message || String(e) })
  } finally {
    self.postMessage({ type: 'done' })
  }
}
