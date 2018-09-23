import { context as ctx } from "../info/display";
import { randomBetweenNumbers } from '../utils/utils'
import { canvas } from "../info/config";

export class Planet {
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
    this.scale = randomBetweenNumbers(1, 3)
    this.type = randomBetweenNumbers(1, 3, true)
  }

  move() {
    if (this.y > canvas.canvasHeight) {
      this.initStatus()
    } else {
      this.y = this.y + this.speed
    }
  }

  draw1() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.scale, this.scale)
    ctx.save()
    ctx.fillStyle = '#fc9ea3'
    ctx.beginPath()
    ctx.arc(34, 34, 34, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#ea7d7d'
    ctx.beginPath()
    ctx.arc(34, 34, 32, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#bf6262'
    ctx.beginPath()
    ctx.arc(23, 19, 3, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    ctx.save()
    ctx.fillStyle = '#bf6262'
    ctx.beginPath()
    ctx.moveTo(48.5, 24)
    ctx.bezierCurveTo(51, 24, 53, 25, 53, 26.5)
    ctx.bezierCurveTo(53, 28, 51, 29, 48.5, 29)
    ctx.bezierCurveTo(46, 29, 44, 28, 44, 26.5)
    ctx.bezierCurveTo(44, 25, 46, 24, 48.5, 24)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    ctx.save()
    ctx.fillStyle = '#bf6262'
    ctx.beginPath()
    ctx.arc(50.5, 37.5, 1.5, 0, 6.2831853, true)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    ctx.save()
    ctx.fillStyle = '#bf6262'
    ctx.beginPath()
    ctx.moveTo(22.5, 36)
    ctx.bezierCurveTo(27.194420373561744, 36, 31, 38.462433875930635, 31, 41.5)
    ctx.bezierCurveTo(31, 44.537566124069365, 27.194420373561744, 47, 22.5, 47)
    ctx.bezierCurveTo(17.805579626438256, 47, 14, 44.537566124069365, 14, 41.5)
    ctx.bezierCurveTo(14, 38.462433875930635, 17.805579626438256, 36, 22.5, 36)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    ctx.save()
    ctx.fillStyle = '#bf6262'
    ctx.beginPath()
    ctx.moveTo(32, 48)
    ctx.bezierCurveTo(33.10456949966159, 48, 34, 48.67157287525381, 34, 49.5)
    ctx.bezierCurveTo(34, 50.32842712474619, 33.10456949966159, 51, 32, 51)
    ctx.bezierCurveTo(30.895430500338414, 51, 30, 50.32842712474619, 30, 49.5)
    ctx.bezierCurveTo(30, 48.67157287525381, 30.895430500338414, 48, 32, 48)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    ctx.save()
    ctx.fillStyle = '#fff'
    ctx.beginPath()
    ctx.moveTo(34, 4)
    ctx.bezierCurveTo(38.76, 4, 42.65, 2.77, 43, 1.2000000000000002)
    ctx.translate(34, 33.987192621510005)
    ctx.arc(0, 0, 34, -1.3028974143889072, -1.8386952392008862, 1)
    ctx.translate(-34, -33.987192621510005)
    ctx.bezierCurveTo(25.35, 2.77, 29.24, 4, 34, 4)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
    ctx.restore()
  }

  draw2() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.scale, this.scale)
    ctx.fillStyle = '#D0CFD9'
    ctx.beginPath()
    ctx.arc(34, 34, 34, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#DFDFE5'
    ctx.beginPath()
    ctx.arc(34, 34, 32, Math.PI / 2, 0, 0)
    ctx.arc(34, 34, 32, 0, Math.PI / 2, 0)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#AAA9B3'
    ctx.beginPath()
    ctx.arc(43.5, 30.5, 3.5, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(45, 43, 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(12, 21, 1, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(48, 20, 1, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(19, 38, 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(25.5, 13.5, 2.5, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(30, 54, 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(48, 55, 1, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(58, 39, 1, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(15, 49, 1, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.beginPath()
    ctx.arc(29, 28, 1, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }

  draw() {
    switch (this.type) {
      case 1:
        this.draw1()
        break

      case 2:
        this.draw2()
        break

      default:
        break
    }
  }
}
