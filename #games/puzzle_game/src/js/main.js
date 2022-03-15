import {crystalPartsParams} from './config/config.js';
import {crystals, errorIcon} from './const.js';
import ErrorIcon from './components/ErrorIcon.js'
import Crystal from './components/Crystal.js';

class Game {
  constructor() {
    this.game  = null
    this.target = null

    this.target = null
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
    this.game.load.image('crystalBodyWrap', '/src/img/crystalBody-wrap.png')
    this.game.load.image('crystalBody', '/src/img/crystalBody.png')

    this.game.load.image('crystalLeft', '/src/img/crystalLeft.png')
    this.game.load.image('crystalLeftBig', '/src/img/crystalLeftBig.png')
    this.game.load.image('crystalTop', '/src/img/crystalTop.png')
    this.game.load.image('crystalRight', '/src/img/crystalRight.png')
    
    this.game.load.image('iconError', '/src/img/icon-error.png')
  }

  create = () => {
    errorIcon.push(new ErrorIcon(this.game))
    this.game.add.sprite(200, 90, 'crystalBodyWrap')
  
    this.errorIcon = {...errorIcon}[0]
    
    this.#createCrystals()
    
    this.errorIcon.createIcon()
    this.errorIcon.errorIcon.alpha = 0
    this.game.world.bringToTop(this.errorIcon.errorIcon)
  }

  update = () => {}

  render = () => {
    // crystals.forEach(crystal => {
    //   // this.game.debug.spriteBounds(crystal)
    // })
  }
  
  #createCrystals = () => {
    crystalPartsParams.forEach(crystal => {
      crystals.push({
        [crystal._name]:
          new Crystal(
            this.game,
            crystal.x,
            crystal.y,
            crystal.anchor,
            crystal._name,
            crystal.isDisabled,
            crystal.initAngle,
            crystal.finishAngle,
            crystal.isComplete
          ).block
        })
    })
  }
}

new Game().init()

