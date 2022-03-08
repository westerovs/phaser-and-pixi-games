const animateText = (oldText, newText, callback, speed = 150) => {
  const splitText = newText.split('')
  let letter = ''
  
  const time = (i) => setTimeout(() => {
    letter += splitText[i]
    oldText.setText(letter)
    
    if (i === splitText.length - 1) {
      setTimeout(() => {
        if (callback) {
          callback()
        }
      }, 500)
    }
  }, i * speed)
  
  for (let i = 0; i < splitText.length; i++) {
    time(i)
  }
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
  container.add(mask)
  
  return mask
}

const createDarkMask = (game, container, fillAlpha = 0.7) => {
  // container это this.containers.gameLayer
  const drawing = game.make.graphics(0, 0)
  drawing.beginFill(0x000000)
  drawing.fillAlpha = fillAlpha
  drawing.anchor.set(0.5)
  drawing.drawRect(0, 0, 1366, 1366, 0)
  drawing.endFill()
  container.add(drawing)
  
  drawing.alpha = 0
  setAlpha(game, drawing, 1)
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

