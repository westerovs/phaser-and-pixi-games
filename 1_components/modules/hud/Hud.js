/* eslint-disable */
import Progress from './Progress.js';

export default class Hud {
  constructor(game) {
    this.game = game
    
    this.hudGroup = game.add.group()
    this.namesData = {
      bow : {
        name: this.game.strings.itemNames.bow,
        pos : {
          x: -254,
          y: -10
        }
      },
      ragdoll: {
        name: this.game.strings.itemNames.ragdoll,
        pos : {
          x: -176,
          y: -10
        }
      },
      envelope: {
        name: this.game.strings.itemNames.envelope,
        pos : {
          x: -58,
          y: -10
        }
      },
      lollipop    : {
        name: this.game.strings.itemNames.lollipop,
        pos : {
          x: 75,
          y: -10
        }
      },
      deer     : {
        name: this.game.strings.itemNames.deer,
        pos : {
          x: 201,
          y: -10
        }
      },
    }
    this.texts = {}
    
    this.hud = null
    this.progress = null
    
    this.game.Signals.hudStrikeText.add(spriteName => {
      Object.entries(this.texts).find((textItem) => {
        const name   = textItem[0]
        const textElement = textItem[1]
        
        if (name.toLowerCase() === spriteName.toLowerCase()) {
          this.strikeOutText(textElement)
          this.game.progressPlus.dispatch(true)
        }
      })
    })
  }
  
  init = () => {
    this.createHud()
    this.createHudNames()
    this.createProgressBar()
    
    this.game.Signals.onResizeSignal.add((isLandscape) => this.#resize(isLandscape))
  }
  
  createHud = () => {
    this.hud = this.game.make.image(0, 0, 'state', 'hud.png')
    this.hud.anchor.set(0.5)
    
    this.hudGroup.add(this.hud)
    this.game.LAYERS.GAME.add(this.hudGroup)
  }
  
  createProgressBar = () => {
    new Progress(this.game, 'state', 'hud-progress', this.hudGroup)
  }
  
  createHudNames = () => {
    const style = {
      fontSize  : 24,
      font      : game.constants.FF_BASE,
      fill      : '#5B3200',
    }
    
    Object.values(this.namesData).forEach(item => {
      const text = game.make.text(item.pos.x, item.pos.y, item.name, style)
      text.setShadow(1, 1, '#FFFFFF', 0);
      this.texts[item.name] = text
      this.hudGroup.add(text)
    })
  }
  
  strikeOutText(text) {
    text.fill = '#8D6F4A'
    
    const line = this.game.make.graphics(0, text.height / 2)
    line.beginFill(0x8D6F4A)
    line.drawRect(0, 2, text.width, 2)
    
    const maskLine = this.game.make.graphics(0, text.height / 2)
    maskLine.beginFill(0x8D6F4A)
    maskLine.alpha = 0
    maskLine.drawRect(-text.width, 2, text.width, 4)
    
    line.mask = maskLine
    text.addChild(line)
    text.addChild(maskLine)
    
    this.game.add.tween(maskLine.position)
      .to({x: line.width}, Phaser.Timer.HALF, Phaser.Easing.Linear.None, true)
  }
  
  #resize = (isLandscape) => {
    if (isLandscape) this.hudGroup.position.set(363, 883)
    else this.hudGroup.position.set(682, 1110)
  }
}
