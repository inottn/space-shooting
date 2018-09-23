import { Cloud } from './cloud'
import { Star } from './star'
import { Planet } from './planet'
import { bg, canvas } from '../info/config';
import { context as ctx } from '../info/display';

export class Bg {
  constructor() {
    this.cloud = new Cloud()
    this.planet = new Planet()
    this.stars = []
    this.initStars(bg.star.starsCount)
  }

  initStars(count) {
    for (let i = 0; i < count; i++) {
      this.stars.push(new Star())
    }
  }

  removeStars() {
    this.stars = this.stars.filter(star => {
      return !(
        star.x < 0 ||
        star.x > canvas.canvasWidth ||
        star.y < 0 ||
        star.y > canvas.canvasHeight
      )
    })
  }

  drawBg() {
    ctx.save()
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.canvasHeight)
    bgGradient.addColorStop(0, '#2c2927')
    bgGradient.addColorStop(1, '#120626')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, canvas.canvasWidth, canvas.canvasHeight)
    ctx.restore()
  }

  update() {
    this.stars.forEach(star => {
      star.move()
    })

    this.removeStars()

    this.initStars(bg.star.starsCount - this.stars.length)

    this.cloud.move()

    this.planet.move()
  }

  draw() {
    this.drawBg()
    
    this.stars.forEach(star => {
      star.draw()
    })

    this.cloud.draw()

    this.planet.draw()
  }
}
