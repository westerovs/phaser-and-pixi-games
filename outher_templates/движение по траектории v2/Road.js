import { runDebugMode } from './utils/utils.js';

/*
  получает джемы из контроллера
*/

export default class Road {
  constructor(game, gem) {
    this.game = game
    this.gem = gem
  
    // св-ва дороги
    this.points = {
      'x': [0, 200, 120, 456, 640],
      'y': [0, 300, 120, 156, 480]
    };
  
    this.isDebugMode = true
    this.bmd = null;
    this.i = 0;
    this.timer1Stopped = true;
    this.timer1        = null;
    this.increment     = null
    
    this.increment = 1 / this.game.width;
    
    this.init()
  }
  
  init = () => {
    runDebugMode(this.game, this.bmd, this.increment, this.points, this.isDebugMode)
  }
  
  #initSignals = () => {
    this.game.isFinal = new Phaser.Signal()
  }
  
  update = () => {
    // таймер, чтобы движение повторялось
    if (this.timer1Stopped) {
      console.log(1)
      this.timer1Stopped = false;
      this.timer1  = this.game.time.create(true);
      this.timer1.loop(1, () => this.plot(), this);
      this.timer1.start();
    }
  }
  
  plot = () => {
    const getPos = (bird, delay = 0) => {
      const posx = this.game.math.bezierInterpolation(this.points.x, this.i + delay);
      const posy = this.game.math.bezierInterpolation(this.points.y, this.i + delay);
      bird.x = posx;
      bird.y = posy;
      
      if (posy > 480) {
        this.timer1.stop();
        this.timer1.destroy();
        this.i             = 0;
        this.timer1Stopped = true;
      }
    }

    getPos(this.gem, 0.1)
    
    this.i += this.increment;
  }
  
  
}

