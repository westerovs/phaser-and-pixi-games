export default class SpritePosition {
  constructor(sprite, scalePanel) {
    this.sprite = sprite
    this.className = 'sprite-position-panel'
    this.scalePanel = scalePanel
    this.elementX = null
    this.elementY = null
    this.step = 1
    this.stepAccelerator = 10

    this.createInfoPanel()
    this.setSpritePosition()
  }

  createInfoPanel = () => {
    const wrapInfo = document.createElement('div')
    wrapInfo.setAttribute('style', `
        position: absolute;
        top: 0;
        left: 0;
        min-width: 80px;
        padding: 10px;
        font-size: ${this.scalePanel ? this.scalePanel : 3}em;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        cursor: none;
        z-index: 999;
    `)

    this.elementX = document.createElement('p')
    this.elementY = document.createElement('p')

    wrapInfo.append(this.elementX)
    wrapInfo.append(this.elementY)
    document.body.append(wrapInfo)

    this.elementX.innerHTML = `X: ${Math.trunc(this.sprite.position.x)}`
    this.elementY.innerHTML = `Y: ${Math.trunc(this.sprite.position.y)}`
  }

  setSpritePosition() {
    let startPositionX = this.sprite.position.x
    let startPositionY = this.sprite.position.y

    document.addEventListener('keydown', (key) => {
      if (key.code === 'ArrowDown') startPositionY += this.step
      if (key.code === 'ArrowUp') startPositionY -= this.step
      if (key.code === 'ArrowLeft') startPositionX -= this.step
      if (key.code === 'ArrowRight') startPositionX += this.step
      // важен порядок → сперва зажимаем shift, потом кнопку
      if (key.code === 'ArrowDown' && key.shiftKey === true) startPositionY += this.stepAccelerator
      if (key.code === 'ArrowUp' && key.shiftKey === true) startPositionY -= this.stepAccelerator
      if (key.code === 'ArrowLeft' && key.shiftKey === true) startPositionX -= this.stepAccelerator
      if (key.code === 'ArrowRight' && key.shiftKey === true) startPositionX += this.stepAccelerator

      this.elementX.innerHTML = `X: ${Math.trunc(startPositionX)}`
      this.elementY.innerHTML = `Y: ${Math.trunc(startPositionY)}`

      this.sprite.position.set(startPositionX, startPositionY)
    })
  }
}
