export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Tháng bắt đầu từ 0
  const year = date.getFullYear()

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`
}
