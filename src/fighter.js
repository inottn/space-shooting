import { Bullet } from './bullet'
import { canvas } from './info/config'
import { drawFighter } from './utils/draw'

export class Fighter {
  constructor() {
    this.x = (canvas.canvasWidth - 10) / 2
    this.y = canvas.canvasHeight - 10
    this.w = 10
    this.h = 10
    this.speed = 4
    this.bullets = []
  }

  moveLeft() {
    this.x = this.x <= 0 ? 0 : this.x - this.speed
  }

  moveRight() {
    this.x =
      this.x + this.w >= canvas.canvasWidth
        ? canvas.canvasWidth - this.w
        : this.x + this.speed
  }

  moveTop() {
    this.y = this.y <= 0 ? 0 : this.y - this.speed
  }

  moveBottom() {
    this.y =
      this.y + this.h >= canvas.canvasHeight
        ? canvas.canvasHeight - this.h
        : this.y + this.speed
  }

  fire() {
    this.bullets.push(...Bullet.createBullet(this))
  }

  draw() {
    drawFighter(this.x, this.y, this.w, this.h)
  }
}
