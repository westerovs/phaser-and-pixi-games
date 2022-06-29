class Game {
  constructor() {
    this.game = null
    
    this.bitmapData = null;
    this.block  = null;
    this.mode = 0;
    this.points = {
      'x': [32, 128, 256, 384, 512, 608],
      'y': [240, 240, 240, 240, 240, 240]
    };
    
    this.pi   = 0;
    this.path = [];
    
    this.init()
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
    this.game.load.image('alien', '/src/img/block1.png')
  }
  
  create = () => {
    this.game.renderer.renderSession.roundPixels = true
    
    this.bitmapData = this.game.add.bitmapData(this.game.width, this.game.height)
    this.bitmapData.addToWorld()
    
    this.block = this.game.add.sprite(0, 0, 'alien');
    this.block.anchor.set(0.5);
    
    let pointY = this.points.y;
    
    for (let i = 0; i < pointY.length; i++) {
      pointY[i] = this.game.rnd.between(32, 432);
    }

    this.game.input.onDown.add(this.changeMode, this.game);
    
    this.plot();
  }
  
  changeMode = () => {
    this.mode++;
    
    if (this.mode === 3) {
      this.mode = 0;
    }
  
    if (this.mode === 0) console.log('Linear')
    if (this.mode === 1) console.log('Bezier')
    if (this.mode === 2) console.log('Catmull')
    
    this.plot();
  }
  
  plot = () => {
    this.bitmapData.clear()
    
    this.path = []
    
    let x = 1 / this.game.width
    
    
    let pointX = null
    let pointY = null
    
    for (let i = 0; i <= 1; i += x) {
      if (this.mode === 0) {
        pointX = this.game.math.linearInterpolation(this.points.x, i)
        pointY = this.game.math.linearInterpolation(this.points.y, i)
      } else if (this.mode === 1) {
        pointX = this.game.math.bezierInterpolation(this.points.x, i)
        pointY = this.game.math.bezierInterpolation(this.points.y, i)
      } else if (this.mode === 2) {
        pointX = this.game.math.catmullRomInterpolation(this.points.x, i)
        pointY = this.game.math.catmullRomInterpolation(this.points.y, i)
      }
      
      this.path.push({x: pointX, y: pointY})
      this.bitmapData.rect(pointX, pointY, 1, 1, 'rgba(255, 255, 255, 1)')
    }
    
    for (let p = 0; p < this.points.x.length; p++) {
      this.bitmapData.rect(this.points.x[p] - 5, this.points.y[p] - 5, 10, 10, 'rgba(255, 0, 0, 1)')
    }
  }
  
  update = () => {
    this.block.x = this.path[this.pi].x;
    this.block.y = this.path[this.pi].y;
    
    this.pi++;
    
    if (this.pi >= this.path.length) {
      this.pi = 0;
    }
  }
}

new Game()



