export function parseResponse(data) {
  if (!data) {
    return { firstCommand: '', remainingData: data }
  }

  let eofIdx = data.indexOf('EOF')
  if (eofIdx === -1) {
    return { firstCommand: '', remainingData: data }
  }

  let removed = data.substring(0, eofIdx)
  let remaining = data.substring(eofIdx + 3)
  return { firstCommand: removed, remainingData: remaining }
}
