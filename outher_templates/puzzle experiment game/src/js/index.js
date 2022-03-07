import { crystalPartsParams, crystalParts } from './const.js';

class Game {
  constructor() {
    this.game  = null
    this.target = null
    
    this.crystalPartsParams = crystalPartsParams
    this.crystalParts = crystalParts
  }

  init() {
    this.game = new Phaser.Game(
      800,
      800,
      Phaser.CANVAS,
      null,
      {
        preload: this.preload,
        create : this.create,
        update : this.update,
        render : this.render
      })
  }

  preload = () => {
    this.game.stage.backgroundColor = '#114333'
    this.game.load.image('crystalBody', '/src/img/crystalBody.png')
    this.game.load.image('crystalBodyWrap', '/src/img/crystalBody-wrap.png')
    this.game.load.image('dots', '/src/img/dots.png')

    this.game.load.image('block', '/src/img/block.jpg')

    this.game.load.image('crystalLeft', '/src/img/crystalLeft.png')
    this.game.load.image('crystalTop', '/src/img/crystalTop.png')
    this.game.load.image('crystalRight', '/src/img/crystalRight.png')
    this.game.load.image('target', '/src/img/target.png')

    // загрузка физики
    this.game.load.physics('physicsData', 'src/sprites.json')
  }

  create = () => {
    this.game.add.sprite(200, 90, 'crystalBodyWrap')

    this.createCrystalParts()
    this.game.add.sprite(190, 185, 'dots')
  
    this.target = this.createTarget(200, 200)
  }

  update = () => {
    // Боря input вариант
    // if (this.game.input.activePointer.isDown) {
    //   console.log('click')
    //   for (const part of Object.values(this.crystalParts)) {
    //     if (part.rotationReady) {
    //       console.log(this.game.input)
    //       part.angle += 2
    //     }
    //   }
    // }
  }

  render = () => {
  }
  
  createTarget = (x, y, anchorX = 0.5, anchorY = 0.5) => {
    const target = this.game.add.sprite(x, y, 'target')
    target.anchor.setTo(anchorX, anchorY)
    target.inputEnabled = true
    target.input.enableDrag(true)
    // target.scale.set(3)
    
    return target
  }
  
  createCrystalParts = () => {
    this.crystalPartsParams.forEach((item, index) => {
      const crystal = this.game.add.sprite(item.x, item.y, item.key)

      // определить в массив части кристалов
      switch (item.key) {
        case 'crystalBody':
          this.crystalParts.crystalBody = crystal
          break;
        case 'crystalLeft':
          this.crystalParts.crystalLeft = crystal
          break;
        case 'crystalTop':
          this.crystalParts.crystalTop = crystal
          break;
        case 'crystalRight':
          this.crystalParts.crystalRight = crystal
          break;
      }

      crystal.anchor.set(item.anchor.x, item.anchor.y)
      crystal.angle = item.angle
      crystal.index = index
      crystal.freezePosition = {x: item.x, y: item.y}
      crystal.prevPointerPos = {x: 0, y: 0}
      crystal.inputEnabled = true

      //Input вариант
      // crystal.events.onInputDown.add(() => crystal.rotationReady = true)
      // crystal.events.onInputUp.add(() => crystal.rotationReady = false)
    })
  }
}

new Game().init()

