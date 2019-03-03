/**
 * 获取取值范围是 [start, end) 的左闭右开区间的随机数, 默认不向下取整
 * @param  {number} start - 起始数
 * @param  {number} end - 结束数（不包含）
 * @param  {boolean} [floor=false] - 是否向下取整
 * @returns {number}
 */
export function randomBetweenNumbers(start, end, floor = false) {
  let t = Math.random() * (end - start) + start
  if (floor) return Math.floor(t)
  return t
}

export function deg2Rad(deg) {
  return (Math.PI * deg) / 180
}

export function collision(r1, r2) {
  return (
    r1.x < r2.x + r2.w &&
    r1.x + r1.w > r2.x &&
    r1.y < r2.y + r2.h &&
    r1.h + r1.y > r2.y
  )
}

export function storage(key, data) {
  if (data) localStorage.setItem(key, data)
  else return localStorage.getItem(key)
}

export function detectMob() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  )
    return true
  else return false
}

export function isStorageSupported() {
  const testKey = 'test'
  const storage = window.localStorage

  try {
    storage.setItem(testKey, 'testValue')
    storage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}
