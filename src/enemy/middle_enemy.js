import { Enemy } from './enemy'
import { randomBetweenNumbers } from '../utils/utils'
import { middleEnemy, canvas } from '../info/config'
import { drawMiddleEnemy, drawParticles } from '../utils/draw'
import { context as ctx } from '../info/display'

export class MiddleEnemy extends Enemy {
  constructor(x, y, speed) {
    super(x, y, speed)
    this.w = 24
    this.h = 20
    this.lifes = middleEnemy.lifes
    this.time = middleEnemy.time
  }

  static createEnemys(count) {
    const t = []
    for (let i = 0; i < count; i++) {
      const e = new this(
        randomBetweenNumbers(0, canvas.canvasWidth - 24),
        randomBetweenNumbers(-80, -40),
        randomBetweenNumbers(1, 2)
      )
      t.push(e)
    }
    return t
  }

  drawParticles(x = 0, y = 0, w, h, fillStyle) {
    ctx.save()
    ctx.fillStyle = fillStyle
    let particleSize = middleEnemy.particleSize
    let r = 1 - this.time / middleEnemy.time
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
    if (this.alive) drawMiddleEnemy(this.x, this.y, this.w, this.h)
    else {
      this.time--
      this.drawParticles(this.x, this.y, this.w, this.h, '#009688')
    }
  }
}
