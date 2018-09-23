import { Scene } from '../game/scene'
import { SceneEnd } from './scene_end'
import { Fighter } from '../fighter'
import {
  canvas as canvasInfo,
  smallEnemy,
  middleEnemy,
  bigEnemy
} from '../info/config'
import { collision } from '../utils/utils'
import { SmallEnemy } from '../enemy/small_enemy'
import { MiddleEnemy } from '../enemy/middle_enemy'
import { BigEnemy } from '../enemy/bid_enemy'
import { drawRoundedRect } from '../utils/draw'
import { canvas, context as ctx } from '../info/display'
import { registerKeyEvents, callKeyEventHandler } from '../game/event'

export class SceneMain extends Scene {
  constructor() {
    super()
    this.fighter = new Fighter()
    this.smallEnemys = SmallEnemy.createEnemys(smallEnemy.count)
    this.middleEnemys = MiddleEnemy.createEnemys(middleEnemy.count)
    this.bigEnemys = BigEnemy.createEnemys(bigEnemy.count)
    this.score = 0
    this.cooldown = 0

    this.handleEvent()
  }

  handleEvent() {
    registerKeyEvents('65', () => {
      this.fighter.moveLeft()
    })
    registerKeyEvents('68', () => {
      this.fighter.moveRight()
    })
    registerKeyEvents('87', () => {
      this.fighter.moveTop()
    })
    registerKeyEvents('83', () => {
      this.fighter.moveBottom()
    })

    canvas.addEventListener(
      'touchmove',
      e => {
        e.preventDefault()
        let t = e.changedTouches[0]
        if (
          t.clientX > this.fighter.x &&
          t.clientX < this.fighter.x + this.fighter.w &&
          t.clientY > this.fighter.y &&
          t.clientY < this.fighter.y + this.fighter.h
        ) {
          this.fighter.x = t.clientX - this.fighter.w / 2
          this.fighter.y = t.clientY - this.fighter.h / 2
        }
      },
      false
    )
  }

  removeThing(array) {
    array.forEach(function(e, i, a) {
      e.move()
      e.kill(a, i)
    }, this)
  }

  sceneRedirect(array) {
    array.forEach(function(e) {
      if (!e.alive) return
      if (collision(this.fighter, e)) {
        const dataImg = canvas.toDataURL('image/png')
        this.afterScene = new SceneEnd(dataImg, this.score)
        this.redirect = true
      }
    }, this)
  }

  calculateScore() {
    this.fighter.bullets.forEach(function(b, i, a) {
      this.smallEnemys.forEach(function(e) {
        if (!e.alive) return
        if (collision(b, e)) {
          b.kill(a, i, true)
          if (e.damage()) this.score += smallEnemy.score
        }
      }, this)
      this.middleEnemys.forEach(function(e) {
        if (!e.alive) return
        if (collision(b, e)) {
          b.kill(a, i, true)
          if (e.damage()) this.score += middleEnemy.score
        }
      }, this)
      this.bigEnemys.forEach(function(e) {
        if (!e.alive) return
        if (collision(b, e)) {
          b.kill(a, i, true)
          if (e.damage()) this.score += bigEnemy.score
        }
      }, this)
    }, this)
  }

  update() {
    super.update()

    callKeyEventHandler()

    //remove enemys
    this.removeThing(this.smallEnemys)
    this.removeThing(this.middleEnemys)
    this.removeThing(this.bigEnemys)

    //remove bullets
    this.removeThing(this.fighter.bullets)

    //add enemys
    this.smallEnemys = [
      ...this.smallEnemys,
      ...SmallEnemy.createEnemys(smallEnemy.count - this.smallEnemys.length)
    ]
    this.middleEnemys = [
      ...this.middleEnemys,
      ...MiddleEnemy.createEnemys(middleEnemy.count - this.middleEnemys.length)
    ]
    this.bigEnemys = [
      ...this.bigEnemys,
      ...BigEnemy.createEnemys(bigEnemy.count - this.bigEnemys.length)
    ]

    //add bullets
    if (this.cooldown === 0) {
      this.cooldown = 8
      this.fighter.fire()
    }

    //collision enemys and bullets then calculate score
    this.calculateScore()

    //collision enemys and fighter then redirect
    this.sceneRedirect(this.smallEnemys)
    this.sceneRedirect(this.middleEnemys)
    this.sceneRedirect(this.bigEnemys)

    this.cooldown--
  }

  draw() {
    super.draw()

    ctx.save()
    this.fighter.draw()
    this.smallEnemys.forEach(e => {
      e.draw()
    })
    this.middleEnemys.forEach(e => {
      e.draw()
    })
    this.bigEnemys.forEach(e => {
      e.draw()
    })
    this.fighter.bullets.forEach(e => {
      e.draw()
    })

    ctx.fillStyle = '#ffffff22'
    drawRoundedRect((canvasInfo.canvasWidth - 160) / 2, 10, 160, 32, 16)
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(this.score, canvasInfo.canvasWidth / 2, 32)
    ctx.restore()
  }
}
