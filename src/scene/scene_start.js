import { Scene } from '../game/scene'
import { detectMob } from '../utils/utils'
import { SceneMain } from './scene_main'
import { canvas, context as ctx } from '../info/display'
import { canvas as canvasInfo } from '../info/config'

export class SceneStart extends Scene {
  constructor() {
    super()

    this.handleEvent()
  }

  handleEvent() {
    const directEvent = e => {
      canvas.removeEventListener('click', directEvent)
      canvas.removeEventListener('touchstart', directEvent)
      this.afterScene = new SceneMain()
      this.redirect = true
    }

    if (detectMob()) {
      canvas.addEventListener('touchstart', directEvent, false)
    } else {
      canvas.addEventListener('click', directEvent, false)
    }
  }

  update() {
    super.update()
  }

  draw() {
    super.draw()

    ctx.save()
    ctx.fillStyle = '#cecece'
    ctx.font = '18px Verdana'
    const textWidth = ctx.measureText('点击开始游戏').width
    const textPosX = (canvasInfo.canvasWidth - textWidth) / 2
    ctx.fillText('by inottn', textPosX, 320)
    ctx.fillText('点击开始游戏', textPosX, 360)
    ctx.restore()
  }
}
