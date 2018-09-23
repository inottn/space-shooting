import { Scene } from '../game/scene'
import { status } from '../info/status'
import { ImgsLoader } from '../game/imgs_loader'
import { storage, detectMob } from '../utils/utils'
import { SceneStart } from './scene_start'
import { canvas, context as ctx } from '../info/display'
import { canvas as canvasInfo } from '../info/config'

export class SceneEnd extends Scene {
  constructor(dataImg, score) {
    super()
    this.score = score
    this.img = ImgsLoader.imgByUrl(dataImg)

    if (status.storageSupportedFlag) {
      this.storageScore()
    }

    this.handleEvent()
  }

  storageScore() {
    if (storage('game_score') === null || storage('game_score') < this.score)
      storage('game_score', this.score)
  }

  handleEvent() {
    const directEvent = e => {
      canvas.removeEventListener('click', directEvent)
      canvas.removeEventListener('touchstart', directEvent)
      this.afterScene = new SceneStart()
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
    ctx.drawImage(
      this.img,
      0,
      0,
      canvasInfo.canvasWidth,
      canvasInfo.canvasHeight
    )
    ctx.fillStyle = 'rgba(0, 0, 0, .3)'
    ctx.fillRect(0, 0, canvasInfo.canvasWidth, canvasInfo.canvasHeight)
    const textWidth = ctx.measureText('点击返回开始画面').width
    const textPosX = (canvasInfo.canvasWidth - textWidth) / 2
    ctx.fillStyle = '#cecece'
    ctx.font = '18px Verdana'
    ctx.fillText('你的分数：' + this.score, textPosX, 240)

    if (status.storageSupportedFlag) {
      ctx.fillText('你的最高分数：' + storage('game_score'), textPosX, 280)
    }

    ctx.fillText('点击返回开始画面', textPosX, 320)
  }
}
