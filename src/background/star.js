import { context as ctx } from "../info/display";
import { drawArc } from "../utils/draw";
import { randomBetweenNumbers, deg2Rad } from "../utils/utils";

export class Star {
  constructor() {
    this.initStar()
  }

  initStar(count) {
    let r = randomBetweenNumbers(0, 2)
    let x = randomBetweenNumbers(0, ctx.canvas.width, true)
    let y = randomBetweenNumbers(ctx.canvas.height * -.3, ctx.canvas.height * .3, true)
    let angle = randomBetweenNumbers(-30, 1, true)
    let speed = randomBetweenNumbers(2, 4)

    this.r = r
    this.x = x
    this.y = y
    this.angle = angle
    this.speed = speed
  }

  move() {
    this.y += this.speed * Math.cos(deg2Rad(this.angle))
    this.x += this.speed * Math.sin(deg2Rad(this.angle))
  }

  draw() {
    ctx.save()
    ctx.fillStyle = '#aaaaaa'
    ctx.shadowBlur = 2
    ctx.shadowColor = 'rgba(255, 255, 255, .4)'
    drawArc(this.x, this.y, this.r, 0, 360)
    ctx.restore()
  }
}
