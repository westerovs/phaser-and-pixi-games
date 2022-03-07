import { crystalPartsParams, crystalParts } from './const.js';

export default class Crystal {
  constructor(game) {
    
    this.game = game
    this.currentCrystal = null

    this.crystalPartsParams = crystalPartsParams
    this.crystalParts = crystalParts
  }
  
  update = () => {
    console.log('111')
  }
  
  init = () => {
    console.log(this.game)
  }
  
  createCrystalParts = () => {
      this.crystalPartsParams.forEach(item => {
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
        crystal.inputEnabled = true
        this.addedEvents(crystal)
    
        // crystal.events.onInputDown.add(() => crystal.rotationReady = true)
        // crystal.events.onInputUp.add(() => crystal.rotationReady = false)
      })
  }
  
  onTouchMove = (pointer, x, y) => {
    if (this.target) {
      // делает custom drag для target, инициализирует его в месте курсора
      this.target.position.set(x, y)
    }
  }
  
  addedEvents = (crystal) => {
    //touchStart
    crystal.events.onInputDown.add((_, {x, y}) => {
      this.currentCrystal = crystal
      this.target = this.createTarget(x, y)
    })
    //touchMove
    this.game.input.addMoveCallback(this.onTouchMove)
    //touchEnd
    crystal.events.onInputUp.add(() => {
      this.target.destroy()
      this.target = null
      this.currentCrystal = null
    })
  }
}
