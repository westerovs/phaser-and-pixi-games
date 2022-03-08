import { crystalParts } from './const.js';

export default class Crystal {
  constructor(game) {
    
    this.game = game
    this.target = null
    this.currentCrystal = null

    this.crystalParts = crystalParts
  }
  
  createCrystal = (crystalParams) => {
    const crystal = this.game.add.sprite(crystalParams.x, crystalParams.y, crystalParams.key)
  
    // определить в массив части кристалов
    switch (crystalParams.key) {
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
  
    crystal.anchor.set(crystalParams.anchor.x, crystalParams.anchor.y)
    crystal.angle = crystalParams.angle
    crystal.inputEnabled = true
    this.#addedEvents(crystal)
  
    return crystal
  }
  
  #createTarget = (x, y) => {
    const target = this.game.add.sprite(x, y, 'target')

    target.anchor.setTo(0.5, 0.5)
    target.inputEnabled = true
    target.input.enableDrag(true)

    return target
  }
  
  onTouchStart = (crystal) => {
    crystal.events.onInputDown.add((_, {x, y}) => {
      this.currentCrystal = crystal
      this.target = this.#createTarget(x, y)
    })
  }
  
  onTouchMove = (pointer, x, y) => {
    console.log(111)
    if (this.target) {
      // делает custom drag для target, инициализирует его в месте курсора
      this.target.position.set(x, y)
    }
  }
  
  onTouchEnd = (crystal) => {
    crystal.events.onInputUp.add(() => {
      this.target.destroy()
      this.target = null
      this.currentCrystal = null
    })
  
  }
  
  #addedEvents = (crystal) => {
    this.onTouchStart(crystal)
    this.onTouchEnd(crystal)
    this.game.input.addMoveCallback(this.onTouchMove)
  }
}
