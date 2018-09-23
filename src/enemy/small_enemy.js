import { Enemy } from './enemy'
import { randomBetweenNumbers } from '../utils/utils'
import { smallEnemy, canvas } from '../info/config'
import { drawSmallEnemy, drawParticles } from '../utils/draw'
import { context as ctx } from '../info/display'

export class SmallEnemy extends Enemy {
  constructor(x, y, speed) {
    super(x, y, speed)
    this.w = 16
    this.h = 16
    this.lifes = smallEnemy.lifes
    this.time = smallEnemy.time
  }

  static createEnemys(count) {
    const t = []
    for (let i = 0; i < count; i++) {
      const e = new this(
        randomBetweenNumbers(0, canvas.canvasWidth - 16),
        randomBetweenNumbers(-30, -20),
        randomBetweenNumbers(1, 2)
      )
      t.push(e)
    }
    return t
  }

  drawParticles(x = 0, y = 0, w, h, fillStyle) {
    ctx.save()
    ctx.fillStyle = fillStyle
    let particleSize = smallEnemy.particleSize
    let r = 1 - this.time / smallEnemy.time
    for (let i = x; i < x + w; i = i + particleSize) {
      let xr =
        i - x < w / 2 - particleSize ? (i - x) / (w / 2) : (x + w - i) / (w / 2)

      for (let j = y; j < y + h; j = j + particleSize) {
        let yr =
          j - y < h / 2 - particleSize
            ? (j - y) / (h / 2)
            : (y + h - j) / (h / 2)

        if (xr < r || yr < r) continue

        Math.random() > 0.8 && ctx.fillRect(i - particleSize / 2, j - particleSize / 2, particleSize, particleSize)
      }
    }
    ctx.restore()
  }

  draw() {
    if (this.alive) drawSmallEnemy(this.x, this.y, this.w, this.h)
    else {
      this.time--
      this.drawParticles(this.x, this.y, this.w, this.h, '#ed6e30')
    }
  }
}
