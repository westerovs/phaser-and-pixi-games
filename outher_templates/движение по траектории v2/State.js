import Road from './Road.js';

class Game {
  constructor() {
    this.game = null
  
    this.road1 = null
  }
  
  init() {
    this.game = new Phaser.Game(
      1366,
      1366,
      Phaser.CANVAS,
      null,
      {
        preload: this.preload,
        create : this.create,
        update : this.update,
      })
  }
  
  preload() {
    for (let i = 1; i <= 2; i++) {
      this.game.load.image(`item${ i }`, `./img/gems/item${ i }.png`)
    }
  }
  
  create = () => {
    this.game.stage.backgroundColor = '#111444';
    
    // create the bird sprite - we will make this sprite
    const gemSprite = this.game.add.sprite(0, 0, "item1");
    gemSprite.anchor.setTo(0.5, 0.5);
    
    const gemSprite2 = this.game.add.sprite(0, 0, "item2");
    gemSprite2.anchor.setTo(0.5, 0.5);
    
    this.road1 = new Road(this.game, gemSprite)
  }
  
  update = () => {
    this.road1.update()
  }
  
}

new Game().init()
