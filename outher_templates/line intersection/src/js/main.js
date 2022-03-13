class Game {
  constructor() {
    this.game  = null
  
    this.handle1 = null
    this.handle2 = null
    this.handle3 = null
    this.handle4 = null
    
    this.line1 = null
    this.line2 = null
    
    this.color = 'rgb(255,255,255)';
    this.touchPoint = new Phaser.Point();
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
        render : this.render,
      })
  }
  
  preload = () => {
    this.game.load.spritesheet('balls', 'src/img/sprites/balls.png', 17, 17);
  }
  
  create = () => {
    this.game.stage.backgroundColor = '#124184';
  
    this.handle1 = this.createHandle(200, 200)
    this.handle2 = this.createHandle(600, 200)
    this.handle3 = this.createHandle(200, 400)
    this.handle4 = this.createHandle(500, 500)
  
    this.line1 = new Phaser.Line(this.handle1.x, this.handle1.y, this.handle2.x, this.handle2.y);
    this.line2 = new Phaser.Line(this.handle3.x, this.handle3.y, this.handle4.x, this.handle4.y);
  }
  
  createHandle = (x, y) => {
    const handle = this.game.add.sprite(x, y, 'balls', 0)
    handle.anchor.set(0.5)
    handle.inputEnabled = true
    handle.input.enableDrag(true)
    handle.scale.set(2)
    
    return handle
  }
  
  update = () => {
    // заставляет следовать линию за шариками handle
    this.line1.fromSprite(this.handle1, this.handle2, false);
    this.line2.fromSprite(this.handle3, this.handle4, false);
  
    this.handle1.position.set(this.handle1.position.x += 1, this.handle1.position.y += 2)
    
    // показывает точку, где фигуры коснулись друг друга
    this.touchPoint = this.line1.intersects(this.line2, true);

    if (this.touchPoint) {
      this.color = 'rgb(0,255,0)';
    } else {
      this.color = 'rgb(255,0,255)';
    }
  }
  
  render = () => {
    this.game.debug.geom(this.line1, this.color);
    this.game.debug.geom(this.line2, this.color);
  
    this.game.debug.lineInfo(this.line1, 32, 32);
    this.game.debug.lineInfo(this.line2, 32, 100);
  
    if (this.touchPoint) {
      this.game.context.fillStyle = 'rgb(255,0,255)';
      this.game.context.fillRect(this.touchPoint.x - 2, this.touchPoint.y - 2, 5, 5);
    }
  }
}

new Game().init()
