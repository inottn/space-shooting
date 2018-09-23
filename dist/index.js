(function () {
  'use strict';

  const CANVAS_ID = 'in-canvas';

  const canvas = document.querySelector('#' + CANVAS_ID);

  const context = canvas.getContext('2d');

  const canvas$1 = {
    canvasWidth: 320,
    canvasHeight: 568
  };

  const bg = {
    star: {
      starsCount: 20
    }
  };

  const smallEnemy = {
    count: 12,
    lifes: 1,
    time: 18,
    score: 10,
    particleSize: 2
  };

  const middleEnemy = {
    count: 3,
    lifes: 3,
    time: 32,
    score: 28,
    particleSize: 2
  };

  const bigEnemy = {
    count: 1,
    lifes: 8,
    time: 40,
    score: 80,
    particleSize: 2
  };

  const keys = {};
  const events = {};

  function addEvent() {
    window.addEventListener(
      'keydown',
      e => {
        keys[e.keyCode] = true;
      },
      false
    );

    window.addEventListener(
      'keyup',
      e => {
        keys[e.keyCode] = false;
      },
      false
    );
  }

  function registerKeyEvents(key, callback) {
    events[key] = callback;
  }

  function callKeyEventHandler() {
    const eventsKeys = Object.keys(events);

    for (let i = 0; i < eventsKeys.length; i++) {
      const key = eventsKeys[i];
      if (keys[key]) {
        events[key]();
      }
    }
  }

  class Game {
    constructor(scene) {
      this.currentScene = scene;
      this.init();
    }

    static instance(...args) {
      this.i = this.i || new this(...args);
      return this.i
    }

    init() {
      canvas.width = canvas$1.canvasWidth;
      canvas.height = canvas$1.canvasHeight;
      addEvent();
    }

    replaceScene(scene) {
      this.currentScene = scene;
    }

    __start() {
      requestAnimationFrame(() => {
        this.currentScene.update();
        this.currentScene.draw();
        if (this.currentScene.redirect) {
          this.replaceScene(this.currentScene.afterScene);
        }
        this.__start();
      });
    }
  }

  /**
   * 获取取值范围是 [start, end) 的左闭右开区间的随机数, 默认不向下取整
   * @param  {number} start - 起始数
   * @param  {number} end - 结束数（不包含）
   * @param  {boolean} [floor=false] - 是否向下取整
   * @returns {number}
   */
  function randomBetweenNumbers(start, end, floor = false) {
    let t = Math.random() * (end - start) + start;
    if (floor) return Math.floor(t)
    return t
  }

  function deg2Rad(deg) {
    return (Math.PI * deg) / 180
  }

  function collision(r1, r2) {
    return (
      r1.x < r2.x + r2.w &&
      r1.x + r1.w > r2.x &&
      r1.y < r2.y + r2.h &&
      r1.h + r1.y > r2.y
    )
  }

  function storage(key, data) {
    if (data) localStorage.setItem(key, data);
    else return localStorage.getItem(key)
  }

  function detectMob() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    )
      return true
    else return false
  }

  function isStorageSupported() {
    const testKey = 'test';
    const storage = window.localStorage;

    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true
    } catch (error) {
      return false
    }
  }

  function drawRoundedRect(x, y, w, h, r) {
    context.save();
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + w, y, x + w, y + r, r);
    context.arcTo(x + w, y + h, x + w - r, y + h, r);
    context.arcTo(x, y + h, x, y + h - r, r);
    context.arcTo(x, y, x + r, y, r);
    context.fill();
    context.restore();
  }

  /**
   * @param  {number} x - 圆心x轴坐标
   * @param  {number} y - 圆心y轴坐标
   * @param  {number} radius - 圆弧的半径
   * @param  {number} [startAngle=0] - 开始的弧度（开始角度），只接受弧度单位，需要将deg先转换为rad
   * @param  {number} [endAngle=360] - 结束的弧度（结束的角度）
   * @param  {boolean} [anticlockwise=false] - 旋转方向；true为逆时针，false为顺时针
   */
  function drawArc(
    x,
    y,
    r,
    startAngle = 0,
    endAngle = 360,
    anticlockwise = false,
    fillStyle = '#aaaaaa',
    alpha = 1
  ) {
    context.save();
    context.globalAlpha = alpha;
    context.fillStyle = fillStyle;
    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, r, deg2Rad(startAngle), deg2Rad(endAngle), anticlockwise);
    context.closePath();
    context.fill();
    context.restore();
  }

  function drawCloud(
    type,
    x = 0,
    y = 0,
    scale = 10,
    fillStyle = '#aaaaaa',
    alpha = 0.1
  ) {
    context.save();
    context.translate(x, y);
    context.scale(scale, scale);
    context.globalAlpha = alpha;
    context.fillStyle = fillStyle;
    switch (type) {
      case 1:
        context.beginPath();
        context.moveTo(2, 0);
        context.arcTo(6, 0, 6, 2, 2);
        context.arcTo(6, 4, 6 - 2, 4, 2);
        context.arcTo(0, 4, 0, 4 - 2, 2);
        context.arcTo(0, 0, 2, 0, 2);
        context.closePath();
        context.fill();
        context.beginPath();
        context.moveTo(10, 0);
        context.arcTo(20, 0, 20, 2, 2);
        context.arcTo(20, 4, 18, 4, 2);
        context.arcTo(8, 4, 8, 2, 2);
        context.arcTo(8, 0, 10, 0, 2);
        context.closePath();
        break

      case 2:
        context.beginPath();
        context.arc(11, 2, 2, -1.6, 1.6, 1);
        context.arc(12, 5, 1, -1.6, 1.6, 0);
        context.arc(2, 8, 2, -1.6, 1.6, 1);
        context.arc(21, 8, 2, 1.6, 4.7, 1);
        context.arc(21, 5, 1, 1.6, 4.7, 0);
        context.arc(23, 2, 2, 1.6, 4.7, 1);
        context.closePath();
        break

      case 3:
        context.beginPath();
        context.moveTo(20, 8);
        context.lineTo(11, 8);
        context.bezierCurveTo(10.69, 8, 10.44, 7.55, 10.44, 7);
        context.bezierCurveTo(10.44, 6.45, 10.69, 6, 11, 6);
        context.lineTo(13, 6);
        context.arc(13, 3, 3, 1.57, 4.7, 1);
        context.lineTo(3, 0);
        context.arc(3, 3, 3, -1.57, 1.57, 1);
        context.lineTo(6, 6);
        context.bezierCurveTo(6.31, 6, 6.56, 6.45, 6.56, 7);
        context.bezierCurveTo(6.56, 7.55, 6.31, 8, 6, 8);
        context.arc(6, 10, 2, -1.57, 1.57, 1);
        context.lineTo(20, 12);
        context.arc(20, 10, 2, 1.57, 4.7, 1);
        context.closePath();
        break

      default:
        break
    }
    context.fill();
    context.restore();
  }

  function drawBullet(x = 0, y = 0, w = 2, h = 4) {
    context.save();
    context.fillStyle = '#e2623f';
    context.fillRect(x, y, w, h);
    context.restore();
  }

  function drawFighter(x = 0, y = 0, w = 10, h = 10) {
    context.save();
    context.fillStyle = '#4eb7f7';
    context.fillRect(x, y, w, h);
    context.restore();
  }

  function drawSmallEnemy(x = 0, y = 0, w = 10, h = 10) {
    context.save();
    context.fillStyle = '#ed6e30';
    context.fillRect(x, y, w, h);
    context.restore();
  }

  function drawMiddleEnemy(x = 0, y = 0, w = 24, h = 18) {
    context.save();
    context.fillStyle = '#009688';
    context.fillRect(x, y, w, h);
    context.restore();
  }

  function drawBigEnemy(x = 0, y = 0, w = 40, h = 68) {
    context.save();
    context.fillStyle = '#607d8b';
    context.fillRect(x, y, w, h);
    context.restore();
  }

  class Cloud {
    constructor() {
      this.initStatus();
    }

    initStatus() {
      this.y = randomBetweenNumbers(-300, -200);
      this.x = randomBetweenNumbers(
        canvas$1.canvasWidth * -0.2,
        canvas$1.canvasWidth * 0.8
      );
      this.speed = randomBetweenNumbers(1, 4);
      this.scale = randomBetweenNumbers(4, 9);
      this.type = randomBetweenNumbers(1, 4, true);
    }

    move() {
      if (this.y > canvas$1.canvasHeight) {
        this.initStatus();
      } else {
        this.y = this.y + this.speed;
      }
    }

    draw() {
      drawCloud(this.type, this.x, this.y, this.scale);
    }
  }

  class Star {
    constructor() {
      this.initStar();
    }

    initStar(count) {
      let r = randomBetweenNumbers(0, 2);
      let x = randomBetweenNumbers(0, context.canvas.width, true);
      let y = randomBetweenNumbers(context.canvas.height * -.3, context.canvas.height * .3, true);
      let angle = randomBetweenNumbers(-30, 1, true);
      let speed = randomBetweenNumbers(2, 4);

      this.r = r;
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = speed;
    }

    move() {
      this.y += this.speed * Math.cos(deg2Rad(this.angle));
      this.x += this.speed * Math.sin(deg2Rad(this.angle));
    }

    draw() {
      context.save();
      context.fillStyle = '#aaaaaa';
      context.shadowBlur = 2;
      context.shadowColor = 'rgba(255, 255, 255, .4)';
      drawArc(this.x, this.y, this.r, 0, 360);
      context.restore();
    }
  }

  class Planet {
    constructor() {
      this.initStatus();
    }

    initStatus() {
      this.y = randomBetweenNumbers(-300, -200);
      this.x = randomBetweenNumbers(
        canvas$1.canvasWidth * -0.2,
        canvas$1.canvasWidth * 0.8
      );
      this.speed = randomBetweenNumbers(1, 4);
      this.scale = randomBetweenNumbers(1, 3);
      this.type = randomBetweenNumbers(1, 3, true);
    }

    move() {
      if (this.y > canvas$1.canvasHeight) {
        this.initStatus();
      } else {
        this.y = this.y + this.speed;
      }
    }

    draw1() {
      context.save();
      context.translate(this.x, this.y);
      context.scale(this.scale, this.scale);
      context.save();
      context.fillStyle = '#fc9ea3';
      context.beginPath();
      context.arc(34, 34, 34, 0, Math.PI * 2);
      context.closePath();
      context.fill();
      context.fillStyle = '#ea7d7d';
      context.beginPath();
      context.arc(34, 34, 32, 0, Math.PI * 2);
      context.closePath();
      context.fill();
      context.fillStyle = '#bf6262';
      context.beginPath();
      context.arc(23, 19, 3, 0, Math.PI * 2);
      context.closePath();
      context.fill();
      context.restore();
      context.save();
      context.fillStyle = '#bf6262';
      context.beginPath();
      context.moveTo(48.5, 24);
      context.bezierCurveTo(51, 24, 53, 25, 53, 26.5);
      context.bezierCurveTo(53, 28, 51, 29, 48.5, 29);
      context.bezierCurveTo(46, 29, 44, 28, 44, 26.5);
      context.bezierCurveTo(44, 25, 46, 24, 48.5, 24);
      context.closePath();
      context.fill();
      context.restore();
      context.save();
      context.fillStyle = '#bf6262';
      context.beginPath();
      context.arc(50.5, 37.5, 1.5, 0, 6.2831853, true);
      context.closePath();
      context.fill();
      context.restore();
      context.save();
      context.fillStyle = '#bf6262';
      context.beginPath();
      context.moveTo(22.5, 36);
      context.bezierCurveTo(27.194420373561744, 36, 31, 38.462433875930635, 31, 41.5);
      context.bezierCurveTo(31, 44.537566124069365, 27.194420373561744, 47, 22.5, 47);
      context.bezierCurveTo(17.805579626438256, 47, 14, 44.537566124069365, 14, 41.5);
      context.bezierCurveTo(14, 38.462433875930635, 17.805579626438256, 36, 22.5, 36);
      context.closePath();
      context.fill();
      context.restore();
      context.save();
      context.fillStyle = '#bf6262';
      context.beginPath();
      context.moveTo(32, 48);
      context.bezierCurveTo(33.10456949966159, 48, 34, 48.67157287525381, 34, 49.5);
      context.bezierCurveTo(34, 50.32842712474619, 33.10456949966159, 51, 32, 51);
      context.bezierCurveTo(30.895430500338414, 51, 30, 50.32842712474619, 30, 49.5);
      context.bezierCurveTo(30, 48.67157287525381, 30.895430500338414, 48, 32, 48);
      context.closePath();
      context.fill();
      context.restore();
      context.save();
      context.fillStyle = '#fff';
      context.beginPath();
      context.moveTo(34, 4);
      context.bezierCurveTo(38.76, 4, 42.65, 2.77, 43, 1.2000000000000002);
      context.translate(34, 33.987192621510005);
      context.arc(0, 0, 34, -1.3028974143889072, -1.8386952392008862, 1);
      context.translate(-34, -33.987192621510005);
      context.bezierCurveTo(25.35, 2.77, 29.24, 4, 34, 4);
      context.closePath();
      context.fill();
      context.restore();
      context.restore();
    }

    draw2() {
      context.save();
      context.translate(this.x, this.y);
      context.scale(this.scale, this.scale);
      context.fillStyle = '#D0CFD9';
      context.beginPath();
      context.arc(34, 34, 34, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.fillStyle = '#DFDFE5';
      context.beginPath();
      context.arc(34, 34, 32, Math.PI / 2, 0, 0);
      context.arc(34, 34, 32, 0, Math.PI / 2, 0);
      context.closePath();
      context.fill();
      context.fillStyle = '#AAA9B3';
      context.beginPath();
      context.arc(43.5, 30.5, 3.5, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(45, 43, 2, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(12, 21, 1, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(48, 20, 1, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(19, 38, 2, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(25.5, 13.5, 2.5, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(30, 54, 2, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(48, 55, 1, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(58, 39, 1, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(15, 49, 1, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.beginPath();
      context.arc(29, 28, 1, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
      context.restore();
    }

    draw() {
      switch (this.type) {
        case 1:
          this.draw1();
          break

        case 2:
          this.draw2();
          break

        default:
          break
      }
    }
  }

  class Bg {
    constructor() {
      this.cloud = new Cloud();
      this.planet = new Planet();
      this.stars = [];
      this.initStars(bg.star.starsCount);
    }

    initStars(count) {
      for (let i = 0; i < count; i++) {
        this.stars.push(new Star());
      }
    }

    removeStars() {
      this.stars = this.stars.filter(star => {
        return !(
          star.x < 0 ||
          star.x > canvas$1.canvasWidth ||
          star.y < 0 ||
          star.y > canvas$1.canvasHeight
        )
      });
    }

    drawBg() {
      context.save();
      const bgGradient = context.createLinearGradient(0, 0, 0, canvas$1.canvasHeight);
      bgGradient.addColorStop(0, '#2c2927');
      bgGradient.addColorStop(1, '#120626');
      context.fillStyle = bgGradient;
      context.fillRect(0, 0, canvas$1.canvasWidth, canvas$1.canvasHeight);
      context.restore();
    }

    update() {
      this.stars.forEach(star => {
        star.move();
      });

      this.removeStars();

      this.initStars(bg.star.starsCount - this.stars.length);

      this.cloud.move();

      this.planet.move();
    }

    draw() {
      this.drawBg();
      
      this.stars.forEach(star => {
        star.draw();
      });

      this.cloud.draw();

      this.planet.draw();
    }
  }

  class Scene {
    constructor() {
      this.redirect = false;
      this.afterScene = null;
    }

    update() {
      this.bg.update();
    }

    draw() {
      context.clearRect(0, 0, canvas$1.canvasWidth, canvas$1.canvasHeight);
      this.bg.draw();
    }
  }

  Scene.prototype.bg = new Bg();

  const status = {
    imgsLoad: false,
    storageSupportedFlag: isStorageSupported()
  };

  class ImgsLoader {
    constructor(imgsInfo) {
      this.imgs = this.imgsChange(imgsInfo);
    }

    static imgByUrl(url) {
      let img = new Image();
      img.src = url;
      return img
    }

    imgsChange(imgsInfo) {
      let o = {};
      let l = Object.keys(imgsInfo).length;
      for (var key in imgsInfo) {
        if (imgsInfo.hasOwnProperty(key)) {
          let imgPath = imgsInfo[key];
          let img = new Image();
          img.src = imgPath;
          img.onload = () => {
          };
          o[key] = img;
        }
      }
      return o
    }

    imgByName(name) {
      return this.imgs[name]
    }
  }

  class SceneEnd extends Scene {
    constructor(dataImg, score) {
      super();
      this.score = score;
      this.img = ImgsLoader.imgByUrl(dataImg);

      if (status.storageSupportedFlag) {
        this.storageScore();
      }

      this.handleEvent();
    }

    storageScore() {
      if (storage('game_score') === null || storage('game_score') < this.score)
        storage('game_score', this.score);
    }

    handleEvent() {
      const directEvent = e => {
        canvas.removeEventListener('click', directEvent);
        canvas.removeEventListener('touchstart', directEvent);
        this.afterScene = new SceneStart();
        this.redirect = true;
      };

      if (detectMob()) {
        canvas.addEventListener('touchstart', directEvent, false);
      } else {
        canvas.addEventListener('click', directEvent, false);
      }
    }

    update() {
      super.update();
    }

    draw() {
      super.draw();
      context.drawImage(
        this.img,
        0,
        0,
        canvas$1.canvasWidth,
        canvas$1.canvasHeight
      );
      context.fillStyle = 'rgba(0, 0, 0, .3)';
      context.fillRect(0, 0, canvas$1.canvasWidth, canvas$1.canvasHeight);
      const textWidth = context.measureText('点击返回开始画面').width;
      const textPosX = (canvas$1.canvasWidth - textWidth) / 2;
      context.fillStyle = '#cecece';
      context.font = '18px Verdana';
      context.fillText('你的分数：' + this.score, textPosX, 240);

      if (status.storageSupportedFlag) {
        context.fillText('你的最高分数：' + storage('game_score'), textPosX, 280);
      }

      context.fillText('点击返回开始画面', textPosX, 320);
    }
  }

  class Bullet {
    constructor(x, y, w = 4, h = 8, angle = 0, speed = 12) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.speed = speed;
      this.angle = angle;
    }

    static createBullet(fighter, type = 1) {
      switch (type) {
        case 1:
          return [new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 8)]
          break

        case 2:
          return [
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, -10),
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 0),
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 10)
          ]
          break

        case 3:
          return [
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, -18),
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, -12),
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, -6),
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 0),
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 6),
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 12),
            new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8, 4, 4, 18),
          ]
          break
        default:
          return new this(fighter.x + fighter.w / 2 - 2, fighter.y - 8)
          break
      }
    }

    move() {
      this.y -= this.speed * Math.cos(deg2Rad(this.angle));
      this.x += this.speed * Math.sin(deg2Rad(this.angle));
    }

    kill(array, index, clear = false) {
      if (clear || this.y < 0) {
        array.splice(index, 1);
      }
    }

    draw() {
      drawBullet(this.x, this.y, this.w, this.h);
    }
  }

  class Fighter {
    constructor() {
      this.x = (canvas$1.canvasWidth - 10) / 2;
      this.y = canvas$1.canvasHeight - 10;
      this.w = 10;
      this.h = 10;
      this.speed = 4;
      this.bullets = [];
    }

    moveLeft() {
      this.x = this.x <= 0 ? 0 : this.x - this.speed;
    }

    moveRight() {
      this.x =
        this.x + this.w >= canvas$1.canvasWidth
          ? canvas$1.canvasWidth - this.w
          : this.x + this.speed;
    }

    moveTop() {
      this.y = this.y <= 0 ? 0 : this.y - this.speed;
    }

    moveBottom() {
      this.y =
        this.y + this.h >= canvas$1.canvasHeight
          ? canvas$1.canvasHeight - this.h
          : this.y + this.speed;
    }

    fire() {
      this.bullets.push(...Bullet.createBullet(this));
    }

    draw() {
      drawFighter(this.x, this.y, this.w, this.h);
    }
  }

  class Enemy {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.alive = true;
    }

    static createEnemys(count) {
      const t = [];
      for (let i = 0; i < count; i++) {
        const e = new this(
          randomBetweenNumbers(0, 280),
          randomBetweenNumbers(-30, -20),
          randomBetweenNumbers(1, 4)
        );
        t.push(e);
      }
      return t
    }

    move() {
      this.y += this.speed;
    }

    damage() {
      this.lifes = this.lifes - 1 < 0 ? 0 : this.lifes - 1;
      if (this.lifes === 0) {
        this.alive = false;
        return true
      }
    }

    kill(array, index) {
      if ((!this.alive && !this.time) || this.y > canvas$1.canvasHeight) {
        array.splice(index, 1);
      }
    }

    update() {
      if (!this.alive) this.time--;
    }
  }

  class SmallEnemy extends Enemy {
    constructor(x, y, speed) {
      super(x, y, speed);
      this.w = 16;
      this.h = 16;
      this.lifes = smallEnemy.lifes;
      this.time = smallEnemy.time;
    }

    static createEnemys(count) {
      const t = [];
      for (let i = 0; i < count; i++) {
        const e = new this(
          randomBetweenNumbers(0, canvas$1.canvasWidth - 16),
          randomBetweenNumbers(-30, -20),
          randomBetweenNumbers(1, 2)
        );
        t.push(e);
      }
      return t
    }

    drawParticles(x = 0, y = 0, w, h, fillStyle) {
      context.save();
      context.fillStyle = fillStyle;
      let particleSize = smallEnemy.particleSize;
      let r = 1 - this.time / smallEnemy.time;
      for (let i = x; i < x + w; i = i + particleSize) {
        let xr =
          i - x < w / 2 - particleSize ? (i - x) / (w / 2) : (x + w - i) / (w / 2);

        for (let j = y; j < y + h; j = j + particleSize) {
          let yr =
            j - y < h / 2 - particleSize
              ? (j - y) / (h / 2)
              : (y + h - j) / (h / 2);

          if (xr < r || yr < r) continue

          Math.random() > 0.8 && context.fillRect(i - particleSize / 2, j - particleSize / 2, particleSize, particleSize);
        }
      }
      context.restore();
    }

    draw() {
      if (this.alive) drawSmallEnemy(this.x, this.y, this.w, this.h);
      else {
        this.time--;
        this.drawParticles(this.x, this.y, this.w, this.h, '#ed6e30');
      }
    }
  }

  class MiddleEnemy extends Enemy {
    constructor(x, y, speed) {
      super(x, y, speed);
      this.w = 24;
      this.h = 20;
      this.lifes = middleEnemy.lifes;
      this.time = middleEnemy.time;
    }

    static createEnemys(count) {
      const t = [];
      for (let i = 0; i < count; i++) {
        const e = new this(
          randomBetweenNumbers(0, canvas$1.canvasWidth - 24),
          randomBetweenNumbers(-80, -40),
          randomBetweenNumbers(1, 2)
        );
        t.push(e);
      }
      return t
    }

    drawParticles(x = 0, y = 0, w, h, fillStyle) {
      context.save();
      context.fillStyle = fillStyle;
      let particleSize = middleEnemy.particleSize;
      let r = 1 - this.time / middleEnemy.time;
      for (let i = x; i < x + w; i = i + particleSize) {
        let xr =
          i - x < w / 2 - particleSize ? (i - x) / (w / 2) : (x + w - i) / (w / 2);

        for (let j = y; j < y + h; j = j + particleSize) {
          let yr =
            j - y < h / 2 - particleSize
              ? (j - y) / (h / 2)
              : (y + h - j) / (h / 2);

          if (xr < r || yr < r) continue

          Math.random() > 0.8 && context.fillRect(i - particleSize / 2, j - particleSize / 2, particleSize, particleSize);
        }
      }
      context.restore();
    }

    draw() {
      if (this.alive) drawMiddleEnemy(this.x, this.y, this.w, this.h);
      else {
        this.time--;
        this.drawParticles(this.x, this.y, this.w, this.h, '#009688');
      }
    }
  }

  class BigEnemy extends Enemy {
    constructor(x, y, speed) {
      super(x, y, speed);
      this.w = 40;
      this.h = 68;
      this.lifes = bigEnemy.lifes;
      this.time = bigEnemy.time;
    }

    static createEnemys(count) {
      const t = [];
      for (let i = 0; i < count; i++) {
        const e = new this(
          randomBetweenNumbers(0, canvas$1.canvasWidth - 40),
          randomBetweenNumbers(-600, -400),
          randomBetweenNumbers(1, 1.4)
        );
        t.push(e);
      }
      return t
    }

    drawParticles(x = 0, y = 0, w, h, fillStyle) {
      context.save();
      context.fillStyle = fillStyle;
      let particleSize = bigEnemy.particleSize;
      let r = 1 - this.time / bigEnemy.time;
      for (let i = x; i < x + w; i = i + particleSize) {
        let xr =
          i - x < w / 2
            ? (i - x) / (w / 2)
            : (x + w - i) / (w / 2);

        for (let j = y; j < y + h; j = j + particleSize) {
          let yr =
            j - y < h / 2
              ? (j - y) / (h / 2)
              : (y + h - j) / (h / 2);

          if (xr < r || yr < r) continue

          Math.random() > 0.8 && context.fillRect(i - particleSize / 2, j - particleSize / 2, particleSize, particleSize);
        }
      }
      context.restore();
    }

    draw() {
      if (this.alive) drawBigEnemy(this.x, this.y, this.w, this.h);
      else {
        this.time--;
        this.drawParticles(this.x, this.y, this.w, this.h, '#607d8b');
      }
    }
  }

  class SceneMain extends Scene {
    constructor() {
      super();
      this.fighter = new Fighter();
      this.smallEnemys = SmallEnemy.createEnemys(smallEnemy.count);
      this.middleEnemys = MiddleEnemy.createEnemys(middleEnemy.count);
      this.bigEnemys = BigEnemy.createEnemys(bigEnemy.count);
      this.score = 0;
      this.cooldown = 0;

      this.handleEvent();
    }

    handleEvent() {
      registerKeyEvents('65', () => {
        this.fighter.moveLeft();
      });
      registerKeyEvents('68', () => {
        this.fighter.moveRight();
      });
      registerKeyEvents('87', () => {
        this.fighter.moveTop();
      });
      registerKeyEvents('83', () => {
        this.fighter.moveBottom();
      });

      canvas.addEventListener(
        'touchmove',
        e => {
          e.preventDefault();
          let t = e.changedTouches[0];
          if (
            t.clientX > this.fighter.x &&
            t.clientX < this.fighter.x + this.fighter.w &&
            t.clientY > this.fighter.y &&
            t.clientY < this.fighter.y + this.fighter.h
          ) {
            this.fighter.x = t.clientX - this.fighter.w / 2;
            this.fighter.y = t.clientY - this.fighter.h / 2;
          }
        },
        false
      );
    }

    removeThing(array) {
      array.forEach(function(e, i, a) {
        e.move();
        e.kill(a, i);
      }, this);
    }

    sceneRedirect(array) {
      array.forEach(function(e) {
        if (!e.alive) return
        if (collision(this.fighter, e)) {
          const dataImg = canvas.toDataURL('image/png');
          this.afterScene = new SceneEnd(dataImg, this.score);
          this.redirect = true;
        }
      }, this);
    }

    calculateScore() {
      this.fighter.bullets.forEach(function(b, i, a) {
        this.smallEnemys.forEach(function(e) {
          if (!e.alive) return
          if (collision(b, e)) {
            b.kill(a, i, true);
            if (e.damage()) this.score += smallEnemy.score;
          }
        }, this);
        this.middleEnemys.forEach(function(e) {
          if (!e.alive) return
          if (collision(b, e)) {
            b.kill(a, i, true);
            if (e.damage()) this.score += middleEnemy.score;
          }
        }, this);
        this.bigEnemys.forEach(function(e) {
          if (!e.alive) return
          if (collision(b, e)) {
            b.kill(a, i, true);
            if (e.damage()) this.score += bigEnemy.score;
          }
        }, this);
      }, this);
    }

    update() {
      super.update();

      callKeyEventHandler();

      //remove enemys
      this.removeThing(this.smallEnemys);
      this.removeThing(this.middleEnemys);
      this.removeThing(this.bigEnemys);

      //remove bullets
      this.removeThing(this.fighter.bullets);

      //add enemys
      this.smallEnemys = [
        ...this.smallEnemys,
        ...SmallEnemy.createEnemys(smallEnemy.count - this.smallEnemys.length)
      ];
      this.middleEnemys = [
        ...this.middleEnemys,
        ...MiddleEnemy.createEnemys(middleEnemy.count - this.middleEnemys.length)
      ];
      this.bigEnemys = [
        ...this.bigEnemys,
        ...BigEnemy.createEnemys(bigEnemy.count - this.bigEnemys.length)
      ];

      //add bullets
      if (this.cooldown === 0) {
        this.cooldown = 8;
        this.fighter.fire();
      }

      //collision enemys and bullets then calculate score
      this.calculateScore();

      //collision enemys and fighter then redirect
      this.sceneRedirect(this.smallEnemys);
      this.sceneRedirect(this.middleEnemys);
      this.sceneRedirect(this.bigEnemys);

      this.cooldown--;
    }

    draw() {
      super.draw();

      context.save();
      this.fighter.draw();
      this.smallEnemys.forEach(e => {
        e.draw();
      });
      this.middleEnemys.forEach(e => {
        e.draw();
      });
      this.bigEnemys.forEach(e => {
        e.draw();
      });
      this.fighter.bullets.forEach(e => {
        e.draw();
      });

      context.fillStyle = '#ffffff22';
      drawRoundedRect((canvas$1.canvasWidth - 160) / 2, 10, 160, 32, 16);
      context.fillStyle = '#ffffff';
      context.font = 'bold 20px Arial';
      context.textAlign = 'center';
      context.fillText(this.score, canvas$1.canvasWidth / 2, 32);
      context.restore();
    }
  }

  class SceneStart extends Scene {
    constructor() {
      super();

      this.handleEvent();
    }

    handleEvent() {
      const directEvent = e => {
        canvas.removeEventListener('click', directEvent);
        canvas.removeEventListener('touchstart', directEvent);
        this.afterScene = new SceneMain();
        this.redirect = true;
      };

      if (detectMob()) {
        canvas.addEventListener('touchstart', directEvent, false);
      } else {
        canvas.addEventListener('click', directEvent, false);
      }
    }

    update() {
      super.update();
    }

    draw() {
      super.draw();

      context.save();
      context.fillStyle = '#cecece';
      context.font = '18px Verdana';
      const textWidth = context.measureText('点击开始游戏').width;
      const textPosX = (canvas$1.canvasWidth - textWidth) / 2;
      context.fillText('by inottn', textPosX, 320);
      context.fillText('点击开始游戏', textPosX, 360);
      context.restore();
    }
  }

  const __main = function() {
    if (detectMob()) {
      canvas$1.canvasWidth = window.innerWidth;
      canvas$1.canvasHeight = window.innerHeight;
    }

    if (!status.storageSupportedFlag) {
      alert('您的浏览器版本过低或开启无痕模式，部分功能无法实现');
    }

    const sceneStart = new SceneStart();
    const game = Game.instance(sceneStart);
    game.__start();
  };

  __main();

}());
