import { canvas } from '../info/display';
import { canvas as canvasInfo } from '../info/config';
import { addEvent } from './event';

export class Game {
  constructor(scene) {
    this.currentScene = scene
    this.init()
  }

  static instance(...args) {
    this.i = this.i || new this(...args)
    return this.i
  }

  init() {
    canvas.width = canvasInfo.canvasWidth
    canvas.height = canvasInfo.canvasHeight
    addEvent()
  }

  replaceScene(scene) {
    this.currentScene = scene
  }

  __start() {
    requestAnimationFrame(() => {
      this.currentScene.update()
      this.currentScene.draw()
      if (this.currentScene.redirect) {
        this.replaceScene(this.currentScene.afterScene)
      }
      this.__start()
    })
  }
}
