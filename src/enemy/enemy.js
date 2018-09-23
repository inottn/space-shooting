import { randomBetweenNumbers } from '../utils/utils'
import { canvas } from '../info/config'

export class Enemy {
  constructor(x, y, speed) {
    this.x = x
    this.y = y
    this.speed = speed
    this.alive = true
  }

  static createEnemys(count) {
    const t = []
    for (let i = 0; i < count; i++) {
      const e = new this(
        randomBetweenNumbers(0, 280),
        randomBetweenNumbers(-30, -20),
        randomBetweenNumbers(1, 4)
      )
      t.push(e)
    }
    return t
  }

  move() {
    this.y += this.speed
  }

  damage() {
    this.lifes = this.lifes - 1 < 0 ? 0 : this.lifes - 1
    if (this.lifes === 0) {
      this.alive = false
      return true
    }
  }

  kill(array, index) {
    if ((!this.alive && !this.time) || this.y > canvas.canvasHeight) {
      array.splice(index, 1)
    }
  }

  update() {
    if (!this.alive) this.time--
  }
}
