/*
* Утилита для быстрого позиционирования спрайтов на сцене.
* Принимает первым аргументом объект {} с любым кол-вом спрайтов
* Второй необязательный параметр - число отвечает за масштаб интерфейса (масштаб в EM).
*
*
* Controls:
* W/S/A/D - change position +/- 1px
* SHIFT + W/S/A/D - change position +/- 10px
* CTRL + arrowLeft/arrowRight - change sprite
*
* Пример: new SpritePosition(sprites, 3)
* */

class SpritePosition {
  constructor(sprites, scalePanel) {
    this.sprites = sprites
    this.checkedIndexSprite = 0
    this.sprite = null
    this.spritesLength = Object.entries(sprites).length - 1
    this.spriteName = null

    this.className = 'sprite-position-panel'
    this.scalePanel = scalePanel

    this.startPositionX = null
    this.startPositionY = null

    this.elementName = null
    this.elementX = null
    this.elementY = null
    this.step = 1
    this.stepAccelerator = 10

    this.init()
  }

  init = () => {
    this.update()
    this.createInfoPanel()
    this.setSpritePosition()
  }

  update = () => {
    if (this.checkedIndexSprite >= this.spritesLength) {
      this.checkedIndexSprite = this.spritesLength
    }
    if (this.checkedIndexSprite <= 0) {
      this.checkedIndexSprite = 0
    }

    this.sprite = Object.entries(this.sprites)[this.checkedIndexSprite][1]
    this.spriteName = Object.entries(this.sprites)[this.checkedIndexSprite][0]
    this.startPositionX = this.sprite.position.x
    this.startPositionY = this.sprite.position.y
  }

  checkoutSprite = () => {
    this.update()

    this.elementName.innerHTML = `Sprite: ${this.spriteName}`
    this.elementX.innerHTML = `X: ${Math.trunc(this.sprite.position.x)}`
    this.elementY.innerHTML = `Y: ${Math.trunc(this.sprite.position.y)}`
  }

  createInfoPanel = () => {
    const wrapInfo = document.createElement('div')
    wrapInfo.setAttribute('style', `
        position: absolute;
        top: 5px;
        left: 5px;
        min-width: 80px;
        padding: 0 10px;
        font-family: Monospace, Arial;
        font-size: ${this.scalePanel ? this.scalePanel : 2}em;
        line-height: 5px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 15px;
        box-shadow: 5px 5px 5px black;
        color: white;
        z-index: 999;
    `)

    this.elementName = document.createElement('p')
    this.elementX = document.createElement('p')
    this.elementY = document.createElement('p')

    wrapInfo.append(this.elementName)
    wrapInfo.append(this.elementX)
    wrapInfo.append(this.elementY)
    document.body.append(wrapInfo)

    this.elementName.innerHTML = `Sprite: ${this.spriteName}`
    this.elementX.innerHTML = `X: ${Math.trunc(this.sprite.position.x)}`
    this.elementY.innerHTML = `Y: ${Math.trunc(this.sprite.position.y)}`
  }

  setSpritePosition() {
    document.addEventListener('keydown', (key) => {
      if (key.code === 'KeyS') this.startPositionY += this.step
      if (key.code === 'KeyW') this.startPositionY -= this.step
      if (key.code === 'KeyA') this.startPositionX -= this.step
      if (key.code === 'KeyD') this.startPositionX += this.step

      // важен порядок → сперва зажимаем shift, потом кнопку
      if (key.code === 'KeyS' && key.shiftKey === true) this.startPositionY += this.stepAccelerator
      if (key.code === 'KeyW' && key.shiftKey === true) this.startPositionY -= this.stepAccelerator
      if (key.code === 'KeyA' && key.shiftKey === true) this.startPositionX -= this.stepAccelerator
      if (key.code === 'KeyD' && key.shiftKey === true) this.startPositionX += this.stepAccelerator

      this.elementName.innerHTML = `Sprite: ${this.spriteName}`
      this.elementX.innerHTML = `X: ${Math.trunc(this.startPositionX)}`
      this.elementY.innerHTML = `Y: ${Math.trunc(this.startPositionY)}`

      this.sprite.position.set(this.startPositionX, this.startPositionY)

      // сменить sprite
      if (key.code === 'ArrowLeft' && key.ctrlKey === true) {
        this.checkedIndexSprite--
        this.checkoutSprite()
      }
      if (key.code === 'ArrowRight' && key.ctrlKey === true) {
        this.checkedIndexSprite++
        this.checkoutSprite()
      }
    })
  }
}
