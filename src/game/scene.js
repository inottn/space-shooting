import { context as ctx } from '../info/display'
import { Bg } from '../background/bg';
import { canvas } from '../info/config';

export class Scene {
  constructor() {
    this.redirect = false
    this.afterScene = null
  }

  update() {
    this.bg.update()
  }

  draw() {
    ctx.clearRect(0, 0, canvas.canvasWidth, canvas.canvasHeight)
    this.bg.draw()
  }
}

Scene.prototype.bg = new Bg()
