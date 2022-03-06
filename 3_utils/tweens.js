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

// анимация движения вверх-вниз
const moveUpDown = (game, sprite, y, time = 1) => {
  return game.add.tween(sprite)
    .to({ y }, 1000 * time , 'Sine.easeInOut', true, 0, -1, true)
}


// подходит как hint
const pulseAlpha = (game, sprite, duration) => {
  return game.add.tween(sprite).to(
    {alpha: 0.5,},
    Phaser.Timer.SECOND * duration, Phaser.Easing.Linear.None, false, 100, -1).yoyo(true)
}

const replaceSpriteAlpha = (game, sprite1, sprite2, second = 1, secondDelay = 0) => {
  return game.add
    .tween(sprite1)
    .to({alpha: 0}, Phaser.Timer.SECOND * second, Phaser.Easing.Linear.None, true, secondDelay * 1000)
  game.add
    .tween(sprite2)
    .to({alpha: 1}, Phaser.Timer.SECOND * second, Phaser.Easing.Linear.None, true, secondDelay * 1000)
}


const setAlpha = (game, sprite, alpha, second = 1, secondDelay = 0) => {
  return game.add
    .tween(sprite)
    .to({alpha}, Phaser.Timer.SECOND * second, Phaser.Easing.Linear.None, true, secondDelay * 1000)
}