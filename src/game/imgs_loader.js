import { config } from '../info/config'

export class ImgsLoader {
  constructor(imgsInfo) {
    this.imgs = this.imgsChange(imgsInfo)
  }

  static imgByUrl(url) {
    let img = new Image()
    img.src = url
    return img
  }

  imgsChange(imgsInfo) {
    let o = {}
    let n = 0
    let l = Object.keys(imgsInfo).length
    for (var key in imgsInfo) {
      if (imgsInfo.hasOwnProperty(key)) {
        let imgPath = imgsInfo[key]
        let img = new Image()
        img.src = imgPath
        img.onload = () => {
          n += 1
          if (n === l) {
            config.imgsLoad = true
          }
        }
        o[key] = img
      }
    }
    return o
  }

  imgByName(name) {
    return this.imgs[name]
  }
}
