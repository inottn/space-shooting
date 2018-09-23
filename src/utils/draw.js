import { context as ctx } from '../info/display'
import { randomBetweenNumbers, deg2Rad } from './utils'

export function bezierEllipse(x, y, a, b) {
  let k = 0.5522848
  let ox = a * k // 水平控制点偏移量
  let oy = b * k // 垂直控制点偏移量

  ctx.beginPath()
  //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
  ctx.moveTo(x - a, y)
  ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b)
  ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y)
  ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b)
  ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y)
  ctx.closePath()
  ctx.fill()
}

export function drawRoundedRect(x, y, w, h, r) {
  ctx.save()
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.arcTo(x, y, x + r, y, r)
  ctx.fill()
  ctx.restore()
}

/**
 * @param  {number} x - 圆心x轴坐标
 * @param  {number} y - 圆心y轴坐标
 * @param  {number} radius - 圆弧的半径
 * @param  {number} [startAngle=0] - 开始的弧度（开始角度），只接受弧度单位，需要将deg先转换为rad
 * @param  {number} [endAngle=360] - 结束的弧度（结束的角度）
 * @param  {boolean} [anticlockwise=false] - 旋转方向；true为逆时针，false为顺时针
 */
export function drawArc(
  x,
  y,
  r,
  startAngle = 0,
  endAngle = 360,
  anticlockwise = false,
  fillStyle = '#aaaaaa',
  alpha = 1
) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = fillStyle
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.arc(x, y, r, deg2Rad(startAngle), deg2Rad(endAngle), anticlockwise)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function drawCloud(
  type,
  x = 0,
  y = 0,
  scale = 10,
  fillStyle = '#aaaaaa',
  alpha = 0.1
) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  ctx.globalAlpha = alpha
  ctx.fillStyle = fillStyle
  switch (type) {
    case 1:
      ctx.beginPath()
      ctx.moveTo(2, 0)
      ctx.arcTo(6, 0, 6, 2, 2)
      ctx.arcTo(6, 4, 6 - 2, 4, 2)
      ctx.arcTo(0, 4, 0, 4 - 2, 2)
      ctx.arcTo(0, 0, 2, 0, 2)
      ctx.closePath()
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(10, 0)
      ctx.arcTo(20, 0, 20, 2, 2)
      ctx.arcTo(20, 4, 18, 4, 2)
      ctx.arcTo(8, 4, 8, 2, 2)
      ctx.arcTo(8, 0, 10, 0, 2)
      ctx.closePath()
      break

    case 2:
      ctx.beginPath()
      ctx.arc(11, 2, 2, -1.6, 1.6, 1)
      ctx.arc(12, 5, 1, -1.6, 1.6, 0)
      ctx.arc(2, 8, 2, -1.6, 1.6, 1)
      ctx.arc(21, 8, 2, 1.6, 4.7, 1)
      ctx.arc(21, 5, 1, 1.6, 4.7, 0)
      ctx.arc(23, 2, 2, 1.6, 4.7, 1)
      ctx.closePath()
      break

    case 3:
      ctx.beginPath()
      ctx.moveTo(20, 8)
      ctx.lineTo(11, 8)
      ctx.bezierCurveTo(10.69, 8, 10.44, 7.55, 10.44, 7)
      ctx.bezierCurveTo(10.44, 6.45, 10.69, 6, 11, 6)
      ctx.lineTo(13, 6)
      ctx.arc(13, 3, 3, 1.57, 4.7, 1)
      ctx.lineTo(3, 0)
      ctx.arc(3, 3, 3, -1.57, 1.57, 1)
      ctx.lineTo(6, 6)
      ctx.bezierCurveTo(6.31, 6, 6.56, 6.45, 6.56, 7)
      ctx.bezierCurveTo(6.56, 7.55, 6.31, 8, 6, 8)
      ctx.arc(6, 10, 2, -1.57, 1.57, 1)
      ctx.lineTo(20, 12)
      ctx.arc(20, 10, 2, 1.57, 4.7, 1)
      ctx.closePath()
      break

    default:
      break
  }
  ctx.fill()
  ctx.restore()
}

export function drawBullet(x = 0, y = 0, w = 2, h = 4) {
  ctx.save()
  ctx.fillStyle = '#e2623f'
  ctx.fillRect(x, y, w, h)
  ctx.restore()
}

export function drawFighter(x = 0, y = 0, w = 10, h = 10) {
  ctx.save()
  ctx.fillStyle = '#4eb7f7'
  ctx.fillRect(x, y, w, h)
  ctx.restore()
}

export function drawSmallEnemy(x = 0, y = 0, w = 10, h = 10) {
  ctx.save()
  ctx.fillStyle = '#ed6e30'
  ctx.fillRect(x, y, w, h)
  ctx.restore()
}

export function drawMiddleEnemy(x = 0, y = 0, w = 24, h = 18) {
  ctx.save()
  ctx.fillStyle = '#009688'
  ctx.fillRect(x, y, w, h)
  ctx.restore()
}

export function drawBigEnemy(x = 0, y = 0, w = 40, h = 68) {
  ctx.save()
  ctx.fillStyle = '#607d8b'
  ctx.fillRect(x, y, w, h)
  ctx.restore()
}

export function drawParticles(x = 0, y = 0, w, h, fillStyle) {
  ctx.save()
  ctx.fillStyle = fillStyle
  for (let i = x; i < x + w; i = i + 4) {
    for (let j = y; j < y + h; j = j + 4) {
      Math.random() > 0.8 && ctx.fillRect(i, j, 4, 4)
    }
  }
  ctx.restore()
}

const arcs = []

/**
 * @param  {number} count - 圆圈数量
 */
export function drawRandomArcs(count) {
  if (arcs.length === count) {
    for (let e of arcs) {
      drawArc(...e)
    }
    return
  }

  for (let i = 0; i < count; i++) {
    let r = randomBetweenNumbers(0, 2)
    let x = randomBetweenNumbers(0, ctx.canvas.width, true)
    let y = randomBetweenNumbers(0, ctx.canvas.height, true)

    arcs.push([x, y, r])
    drawArc(x, y, r)
  }
}
