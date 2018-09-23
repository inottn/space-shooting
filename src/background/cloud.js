import { randomBetweenNumbers } from '../utils/utils'
import { canvas } from '../info/config'
import { drawCloud } from '../utils/draw'

export class Cloud {
  constructor() {
    this.initStatus()
  }

  initStatus() {
    this.y = randomBetweenNumbers(-300, -200)
    this.x = randomBetweenNumbers(
      canvas.canvasWidth * -0.2,
      canvas.canvasWidth * 0.8
    )
    this.speed = randomBetweenNumbers(1, 4)
    this.scale = randomBetweenNumbers(4, 9)
    this.type = randomBetweenNumbers(1, 4, true)
  }

  move() {
    if (this.y > canvas.canvasHeight) {
      this.initStatus()
    } else {
      this.y = this.y + this.speed
    }
  }

  draw() {
    drawCloud(this.type, this.x, this.y, this.scale)
  }
}
