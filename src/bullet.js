import { drawBullet } from './utils/draw'
import { deg2Rad } from './utils/utils'

export class Bullet {
  constructor(x, y, w = 4, h = 8, angle = 0, speed = 12) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.speed = speed
    this.angle = angle
  }

  static createBullet(fighter, type = 1) {
    switch (type) {
      case 1:
        return [new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 8)]
        break

      case 2:
        return [
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, -10),
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 0),
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 10)
        ]
        break

      case 3:
        return [
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, -18),
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, -12),
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, -6),
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 0),
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 6),
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 12),
          new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 18),
        ]
        break
      default:
        return new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8)
        break
    }
  }

  move() {
    this.y -= this.speed * Math.cos(deg2Rad(this.angle))
    this.x += this.speed * Math.sin(deg2Rad(this.angle))
  }

  kill(array, index, clear = false) {
    if (clear || this.y < 0) {
      array.splice(index, 1)
    }
  }

  draw() {
    drawBullet(this.x, this.y, this.w, this.h)
  }
}
