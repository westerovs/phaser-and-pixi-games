const createTween = (game, sprite, props) => {
  const {
          params,
          duration = 1,
          secondDelay = 0,
          yoyo = false,
          time = Phaser.Timer.SECOND * duration,
          easing = Phaser.Easing.Linear.None,
          autostart = true,
          delay = secondDelay,
          repeat = 0,
        } = props
  
  return game.add.tween(sprite)
    .to(params, time, easing, autostart, delay * 1000, repeat)
    .yoyo(yoyo)
}

const animationMove = (game, sprite, x = 0, y = 0, duration = 0.1, delay = 0, repeat = 0, yoyo = false, autostart = true) => {
  return createTween(game, sprite.position, {
    params   : {
      x: sprite.position.x + x,
      y: sprite.position.y + y,
    },
    delay,
    duration,
    repeat,
    yoyo     : yoyo,
    autostart: autostart
  })
}



const animationAngle = (game, sprite, angle,  duration = 0.1, delay = 0, repeat = 0, yoyo = false) => {
  return createTween(game, sprite, {
    params   : {
      angle: angle,
    },
    delay,
    duration,
    repeat,
    autostart: true,
    yoyo     : yoyo,
  })
}


const cameraScale = (game, factor, scale = 1, duration = 0.5) => {
  return game.add.tween(game.camera.scale)
    .to({
      x: scale * factor,
      y: scale * factor,
    }, Phaser.Timer.SECOND * duration, Phaser.Easing.Linear.None, true)
}


const createScaleTween = (game, sprite, repeat = -1, speedSec = 0.5) => {
  return createTween(game, sprite.scale, {
    params: {
      x: sprite.scale.x * 0.95,
      y: sprite.scale.y * 0.95,
    },
    repeat: -1,
    yoyo  : true,
  })
}


/* анимация уменьшения в ноль 
 Предварительно стоит сделать проверку:
     if (this.scaleAnim && this.scaleAnim.isRunning) {
      this.scaleAnim.stop()
    }
*/
const createScaleAnim = () => {
  this.scaleAnim = this.game.add.tween(this.errorIcon.scale)
    .to({x: 0, y: 0},
      Phaser.Timer.HALF, Phaser.Easing.Linear.None, false, 500)
  this.scaleAnim.start()
}


// анимация движения вверх-вниз
const moveUpDown = (game, sprite, y, time = 1) => {
  return game.add.tween(sprite)
    .to({ y }, 1000 * time , 'Sine.easeInOut', true, 0, -1, true)
}


// подходит как hint
const tweenSetAlphaPulseAlpha = (game, sprite, duration) => {
  return game.add.tween(sprite).to(
    {alpha: 0.5,},
    Phaser.Timer.SECOND * duration, Phaser.Easing.Linear.None, false, 100, -1).yoyo(true)
}

const tweenSetAlphaReplaceSpriteAlpha = (game, sprite1, sprite2, second = 1, secondDelay = 0) => {
  return game.add
    .tween(sprite1)
    .to({alpha: 0}, Phaser.Timer.SECOND * second, Phaser.Easing.Linear.None, true, secondDelay * 1000)
  game.add
    .tween(sprite2)
    .to({alpha: 1}, Phaser.Timer.SECOND * second, Phaser.Easing.Linear.None, true, secondDelay * 1000)
}


const tweenSetAlpha = (game, sprite, alpha, second = 0.5, secondDelay = 0) => {
  return game.add
    .tween(sprite)
    .to({alpha}, Phaser.Timer.SECOND * second, Phaser.Easing.Linear.None, true, secondDelay * 1000)
}

const tweenTint = (game, spriteToTween, startColor, endColor, duration = 0) => {
  const colorBlend = {step: 0}
  
  return game.add.tween(colorBlend).to({step: 100}, 1000 * duration, Phaser.Easing.Default, false)
    .onUpdateCallback(() => {
      spriteToTween.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1)
    })
    .start()
}



// интересные варианты твинов на попробовать. Работает с массивом!

// *** v1 ***
this.testTween = this.game.add.tween(this.hint).to({
  x: [100, 200, 300, 400, 300, 200, 502, 100],
  y: [100, 230, 300, -100, 100, 200, -302, 100]
}, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, true)
  .interpolation(function (v, k) {
    console.log(v, k)
    return Phaser.Math.bezierInterpolation(v, k);
  });


// *** v2 *** простая цепочка

// some coordinates
const steps = [
  {x: 100, y: 100},
  {x: 100, y: 150},
  {x: 100, y: 200},
  {x: 150, y: 200},
  {x: 200, y: 200}
];

// create
this.chainedTween = this.game.add.tween(this.hint)
// attach
for (let i = 0; i < steps.length; i++) {
  this.chainedTween.to(
    {x: steps[i].x, y: steps[i].y},
    500, "Quad.easeOut");
}
this.chainedTween.start();


// *** v3 *** цепочка твинов методом

const tweenA = this.game.add.tween(this.hint).to({x: 100, y: 250}, 1000)
const tweenB = this.game.add.tween(this.hint).to({x: 250, y: 150}, 1000)
const tweenC = this.game.add.tween(this.hint).to({x: 350, y: 200}, 1000)

tweenA.chain(tweenB, tweenC)
tweenA.start()