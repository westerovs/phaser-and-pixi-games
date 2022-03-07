// import { crystalPartsParams, crystalParts } from './const.js';
import Crystal from './Crystal.js'

export default  class Game {
  constructor() {
    this.game  = null
    this.target = null
    this.crystal = null
    // this.currentCrystal = null

    // this.crystalPartsParams = crystalPartsParams
    // this.crystalParts = crystalParts
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
    this.crystal = new Crystal(this.game)
    
    this.game.add.sprite(200, 90, 'crystalBodyWrap')
    // this.createCrystalParts()
    this.game.add.sprite(190, 185, 'dots')
  
    this.crystal.createCrystalParts()
  }

  update = () => {
    // if (this.target && this.currentCrystal) {
    //   this.currentCrystal.rotation = this.game.physics.arcade
    //     // .angleBetween(this.crystalParts.crystalRight, this.target)
    //     .angleBetween(this.target, this.crystalParts.crystalRight)
    // }
  }

  render = () => {
    // this.game.debug.spriteBounds(this.crystalParts.crystalRight)
  }
  
  // createTarget = (x, y) => {
  //   const target = this.game.add.sprite(x, y, 'target')
  //
  //   target.anchor.setTo(0.5, 0.5)
  //   target.inputEnabled = true
  //   target.input.enableDrag(true)
  //
  //   return target
  // }
  
  // createCrystalParts = () => {
  //   this.crystalPartsParams.forEach(item => {
  //     const crystal = this.game.add.sprite(item.x, item.y, item.key)
  //
  //     // определить в массив части кристалов
  //     switch (item.key) {
  //       case 'crystalBody':
  //         this.crystalParts.crystalBody = crystal
  //         break;
  //       case 'crystalLeft':
  //         this.crystalParts.crystalLeft = crystal
  //         break;
  //       case 'crystalTop':
  //         this.crystalParts.crystalTop = crystal
  //         break;
  //       case 'crystalRight':
  //         this.crystalParts.crystalRight = crystal
  //         break;
  //     }
  //
  //     crystal.anchor.set(item.anchor.x, item.anchor.y)
  //     crystal.angle = item.angle
  //     crystal.inputEnabled = true
  //     this.addedEvents(crystal)
  //
  //     // crystal.events.onInputDown.add(() => crystal.rotationReady = true)
  //     // crystal.events.onInputUp.add(() => crystal.rotationReady = false)
  //   })
  // }

  // onTouchMove = (pointer, x, y) => {
  //   if (this.target) {
  //     // делает custom drag для target, инициализирует его в месте курсора
  //     this.target.position.set(x, y)
  //   }
  // }
  //
  // addedEvents = (crystal) => {
  //   //touchStart
  //   crystal.events.onInputDown.add((_, {x, y}) => {
  //     this.currentCrystal = crystal
  //     this.target = this.createTarget(x, y)
  //   })
  //   //touchMove
  //   this.game.input.addMoveCallback(this.onTouchMove)
  //   //touchEnd
  //   crystal.events.onInputUp.add(() => {
  //     this.target.destroy()
  //     this.target = null
  //     this.currentCrystal = null
  //   })
  // }
}

new Game().init()

