type Countdown = Record<string, string | number>

function replaceStr(source: string, search: string, replace: string | number): string {
  return source.replace(new RegExp('\\b' + search + '\\b', 'g'), String(replace))
}

// Format countdown
export function formatCountdown (
  countdown: Countdown,
  format = 'HH:mm:ss'
): string {

  let result = format
  Object.keys(countdown).forEach(key => {
    result = replaceStr(result, key, String(countdown[key]))
  })

  return result
}