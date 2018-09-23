import { Enemy } from './enemy'
import { randomBetweenNumbers } from '../utils/utils'
import { bigEnemy, canvas } from '../info/config'
import { drawBigEnemy } from '../utils/draw'
import { context as ctx } from '../info/display'

export class BigEnemy extends Enemy {
  constructor(x, y, speed) {
    super(x, y, speed)
    this.w = 40
    this.h = 68
    this.lifes = bigEnemy.lifes
    this.time = bigEnemy.time
  }

  static createEnemys(count) {
    const t = []
    for (let i = 0; i < count; i++) {
      const e = new this(
        randomBetweenNumbers(0, canvas.canvasWidth - 40),
        randomBetweenNumbers(-600, -400),
        randomBetweenNumbers(1, 1.4)
      )
      t.push(e)
    }
    return t
  }

  drawParticles(x = 0, y = 0, w, h, fillStyle) {
    ctx.save()
    ctx.fillStyle = fillStyle
    let particleSize = bigEnemy.particleSize
    let r = 1 - this.time / bigEnemy.time
    for (let i = x; i < x + w; i = i + particleSize) {
      let xr =
        i - x < w / 2
          ? (i - x) / (w / 2)
          : (x + w - i) / (w / 2)

      for (let j = y; j < y + h; j = j + particleSize) {
        let yr =
          j - y < h / 2
            ? (j - y) / (h / 2)
            : (y + h - j) / (h / 2)

        if (xr < r || yr < r) continue

        Math.random() > 0.8 && ctx.fillRect(i - particleSize / 2, j - particleSize / 2, particleSize, particleSize)
      }
    }
    ctx.restore()
  }

  draw() {
    if (this.alive) drawBigEnemy(this.x, this.y, this.w, this.h)
    else {
      this.time--
      this.drawParticles(this.x, this.y, this.w, this.h, '#607d8b')
    }
  }
}
