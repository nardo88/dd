export const getTimerValue = (seconds?: string | number) => {
  if (!seconds) return '00:00'
  const m = !Number.isNaN(Number(seconds)) ? Math.floor(Number(seconds) / 60) : 0 // минуты
  const s = !Number.isNaN(Number(seconds)) ? Number(seconds) % 60 : 0 // секунды
  const str = `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`
  return str
}
