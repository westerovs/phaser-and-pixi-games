const animateText = (game, textObject, params = {}) => {
  const {
          newText  = false,
          callback = false,
          speed    = 80,
          initTextDelay = 0,
          callbackDelay = 500,
          resolveData = true,
        } = params
  
  return new Promise(resolve => {
    game.time.events.add(initTextDelay, () => {
      
      const splitText  = newText ? newText.split('') : textObject._text.split('')
      let letter       = ''
      textObject.alpha = 0
      
      splitText.forEach((word, i) => {
        game.time.events.add(speed * i, () => {
          letter += word
          textObject.setText(letter)
          textObject.alpha = 1
          
          // callback & resolve
          if (i === splitText.length - 1) {
            resolve(resolveData)
            game.time.events.add(callbackDelay, () => (callback ? callback() : null))
          }
        })
      })
    })
  })
}
/* 
Пример вызова:
  // short
  animateText(this.game, this.texts.intro) 

  animateText(this.game, this.texts.intro, {
  speed: 50,
  resolveData: 'bla bla bla'
  })
  .then((data) => animateText(this.game, this.texts.intro, {
    newText: 'xyй ' + data
  }))
  .then(() => animateText(this.game, this.texts.intro, {
    newText: 'zxc фыв счя'
  }))
*/




// вызов 
  // #createText = () => {
  //   const style = {
  //     font         : this.game.constants.FF_BASE,
  //     fontSize     : 40,
  //     fill         : '#5E1300',
  //     // stroke         : '#000000',
  //     // strokeThickness: 4,
  //     fontWeight   : 800,
  //     align        : 'center',
  //     boundsAlignV : 'top',
  //     wordWrap     : true,
  //     wordWrapWidth: 500,
  //   }

  //   const text = this.game.make.text(10, -5, '', style)
  //   text.anchor.set(0.5)

  //   return text
  // }

  // this.animateText(text, this.phrase, false)





const createMask = (game, container, element) => {
  const sprite = element
  const spriteX = sprite.position.x - sprite.width / 2
  const spriteY = sprite.position.y - sprite.height / 2
  const spriteW = sprite.width
  const spriteH = sprite.height
  
  const mask = game.make.graphics(0, 0)
  mask.beginFill(0x000000)
  mask.fillAlpha = 1
  mask.anchor.set(0.5)
  mask.drawRect(spriteX, spriteY, spriteW, spriteH)
  container.add(mask)
  
  return mask
}

const createDarkMask = (game, container, fillAlpha = 0.7) => {
  const drawing = game.make.graphics(0, 0)
  drawing.beginFill(0x000000)
  drawing.fillAlpha = fillAlpha
  drawing.drawRect(0, 0, 1366 * game.factor, 1366 * game.factor)
  drawing.endFill()
  
  drawing.alpha = 0
  return tweenSetAlpha(game, drawing, 1)
}

createRect = (game, container, x, y, w, h) => {
  const rect = game.make.graphics(0, 0);
  rect.beginFill(0x000000);
  rect.fillAlpha = 0.5
  rect.anchor.set(0.5)
  rect.drawRect(x, y, w, h);
  rect.endFill();
  
  container.add(rect)
}

const changeBackground = (game, containers, sprite) => {
  const {backLayer} = containers
  const background = game.make.sprite(0, 0, sprite)
  backLayer.add(background)
  backLayer.children[0].loadTexture(sprite)
}

const createBtn = (game, params) => {
  const {
          x = 0,
          y = 0,
          key = 'panel',
          callback,
          callbackContext = null,
          overFrame,
          outFrame,
          downFrame,
          upFrame,
        } = params
  
  const button = game.make.button(
    x,
    y,
    key,
    callback,
    callbackContext,
    overFrame,
    outFrame,
    downFrame,
    upFrame,
  )
  button.anchor.set(0.5)
  
  return button
}


const createMask = (game, container, element) => {
  const sprite = element
  const spriteX = sprite.position.x - sprite.width / 2
  const spriteY = sprite.position.y - sprite.height / 2
  const spriteW = sprite.width
  const spriteH = sprite.height
  
  const mask = game.make.graphics(0, 0)
  mask.beginFill(0x000000)
  mask.fillAlpha = 1
  mask.anchor.set(0.5)
  mask.drawRect(spriteX, spriteY, spriteW, spriteH)
  container.gameLayer.add(mask)
  
  return mask
}


const getRandomNumber = (min = 0, max) => Math.round(Math.random() * (max - min) + min)


const getDprFactor = (factorGame) => {
  let factor = null
  
  if (window.devicePixelRatio === 1) {
    factor = factorGame
  }
  if (window.devicePixelRatio === 2) {
    factor = factorGame / 2
  }
  if (window.devicePixelRatio === 3) {
    factor = factorGame / 3
  }
  
  return factor
}

const setSpriteParams = (elements, setDim, setPos) => {
  [...elements].forEach(element => {
    [element.width, element.height] = setDim(element)
    element.position.set(...setPos(element))
  })
}


// вычисление угла
const angle = Phaser.Point.angle({x: 0, y: 0}, {x: 10, y: 10});
console.log(angle);  // 0.7853981633974483
console.log(angle / Math.PI * 180); // 45


// вычисление угла между двумя спрайтами
const game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea')

game.state.add('basic', {
  create: function () {
    const sprite  = game.add.sprite(10, 10)
    const sprite2 = game.add.sprite(10, -20)
    const angle = new Phaser.Point(sprite.x, sprite.y).angle(sprite2) / Math.PI * 180

    console.log(angle)  // -90
  }
})

game.state.start('basic')


/*
    
    addSparkleToElement(this.game, {
      spriteKey: 'light',
      posX: 0,
      posY: 0,
    })
*/

// particle
const addSparkleToElement = (game, params) => {
  const {
          tweenItem,
          frame,
          count = 50,
          minSpeedX = -450,
          minSpeedY = -450,
          maxSpeedX = 450,
          maxSpeedY = 450,
          gravitation = 0,
        } = params
  
  const sparkleEmitter = game.add
    .emitter(tweenItem.worldPosition.x, tweenItem.worldPosition.y, count)
  
  sparkleEmitter.makeParticles('main', `${frame}.png`)
  sparkleEmitter.minParticleSpeed.setTo(minSpeedX * game.factor, minSpeedY * game.factor)
  sparkleEmitter.maxParticleSpeed.setTo(maxSpeedX * game.factor, maxSpeedY * game.factor)
  sparkleEmitter.setScale(0.5 * game.factor, 5 * game.factor, 0.5 * game.factor, 5 * game.factor, 2500)
  sparkleEmitter.gravity = gravitation
  sparkleEmitter.start(true, 500, null, 25)
  
  game.stage.add(sparkleEmitter)
}

// вызов
    addSparkleToElement(this.game, {
      tweenItem: sprite,
      frame    : 'flash',
      count    : getRandomNumber(8, 20),
      gravitation: getRandomNumber(500, 1500),
    })


const checkOverlap = (spriteA, spriteB) => {
  const boundsA = spriteA.getBounds()
  const boundsB = spriteB.getBounds()
  
  return Phaser.Rectangle.intersects(boundsA, boundsB)
}


#createTick = (delay = 1) => {
  this.tick = this.game.time.create(false)
  this.tick.loop(Phaser.Timer.SECOND * delay, () => {
    if (this.game.input.activePointer.isDown) return
    this.test()
  })
  this.tick.start()
}


#resizeFontAndPos = (texts, width, height, isLandscape) => {
  [...texts].forEach(text => {
    text.fontSize = text.data.offset.fontSize * this.game.factor
    text.position.set(...setPosition(width, height, this.game.factor, isLandscape, text))
  })

}

// для быстрого ресайза
#resize = () => {
  const setPositionGroup = (isLandscape) => {
    if (isLandscape) {

    } else {

    }
  }

  setPositionGroup(this.game.scale.isGameLandscape)

  this.game.onResizeSignal.add((isLandscape) => {
    setPositionGroup(isLandscape)
  })
}


// что бы кнопку не плющило
const setCtaText = (game, x, y, fontSize, text) => {
  const ctaText = game.make.text(x, y, text, {
    font    : game.constants.FF_BASE,
    fill    : '#ffead2',
    fontSize,
  })
  ctaText.anchor.set(0.5, 0.5)
  ctaText.setShadow(0, 3, '#000000', 2)
  game.containers.cta.addChild(ctaText)
}
setCtaText(this.game, 0, -8, 36, 'KOSTENLOS SPIELEN!')


const setPointerEvents = (game, status) => {
  game.canvas.style.pointerEvents = status
}