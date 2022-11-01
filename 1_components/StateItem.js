/* eslint-disable */

export default class StateItem extends Phaser.Sprite {
  constructor({game, atlas, frame, x, y}) {
    super(game, x, y, atlas, frame)
  
    this.game = game
    this.atlas = atlas
    this.frame = frame
    
    this.anchor.set(0.5)
    this.alpha = 1
    this.inputEnabled = true
  
    this.game.add.existing(this)
  }
  
  
}

/*

const stateItem = new StateItem({
  game : this.game,
  atlas: this.atlasName,
  frame: `${ data.name }.png`,
  x    : data.x,
  y    : data.y,
})

this.add(stateItem) → добавить в контейнер extends Phaser.Group
*/