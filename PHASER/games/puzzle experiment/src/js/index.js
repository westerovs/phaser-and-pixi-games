class Game {
  constructor() {
    this.game  = null
    this.blocks = []
    
    this.crystalParts = [
      {
        key: 'crystalLeft',
        x: 204,
        y: 352,
        anchor: {
          x: 0,
          y: 1
        },
        angle: -60,
      },
      {
        key: 'crystalTop',
        x: 386,
        y: 205,
        anchor: {
          x: 1,
          y: 0.599
        },
        angle: 80,
      },
      {
        key: 'crystalRight',
        x: 564,
        y: 198,
        anchor: {
          x: 1,
          y: 0.65
        },
        angle: 120,
      },
    ]
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
        render : this.render
      })
  }
  
  preload = () => {
    this.game.load.image('bg', '/src/img/bg.jpg')
    this.game.load.image('crystalBody', '/src/img/crystalBody.png')
    this.game.load.image('crystalBodyWrap', '/src/img/crystalBody-wrap.png')
    this.game.load.image('dots', '/src/img/dots.png')
    
    this.game.load.image('crystalLeft', '/src/img/crystal_left.png')
    this.game.load.image('crystalTop', '/src/img/crystal_top.png')
    this.game.load.image('crystalRight', '/src/img/crystal_right.png')
  }
  
  create = () => {
    this.game.add.sprite(0, 0, 'bg')
    this.game.add.sprite(200, 90, 'crystalBodyWrap')
    this.game.add.sprite(200, 200, 'crystalBody')
    this.game.add.sprite(192, 190, 'dots')
  
    this.createCrystalParts()
  }
  
  render = () => {
    // this.game.debug.spriteBounds(this.blocks[0])
    // this.game.debug.spriteBounds(this.blocks[1])
    // this.game.debug.spriteBounds(this.blocks[2])
  }
  
  createCrystalParts = () => {
    this.crystalParts.forEach(item => {
      const crystal = this.game.add.sprite(item.x, item.y, item.key)
      crystal.anchor.set(item.anchor.x, item.anchor.y)
      crystal.angle = item.angle
      this.blocks.push(crystal)
      
      // this.game.input.mouse.capture = true;

      //input
      crystal.inputEnabled = true;
      // crystal.events.onInputDown.add(this.onInputDown)
      // crystal.events.onInputOver.add(() => console.log('over'))
      // crystal.events.onDragUpdate.add(() => console.log('onDragUpdate'))
      // crystal.events.onInputUp.add(() => console.log('onInputUp'))

      // drag
      // crystal.events.onDragStart.add(this.onDragStart, this)
      // crystal.events.onDragUpdate.add(this.onDragUpdate, this)
      // crystal.events.onDragStop.add(this.onDragStop, this)
      // crystal.input.enableDrag()
  
      if (item.key === 'crystalRight') {
        crystal.alpha = 0.6
  
        // this.game.add.tween(crystal)
        //   .to({
        //     angle: 230,
        //   }, Phaser.Timer.HALF / 2, Phaser.Easing.Linear.None, true).yoyo(true)
      }

    })
  }
  
  onMove = () => {
    console.log('MOVE')
  }
  
  onInputDown = () => {
    console.log('down')
  }
  
  onDragStart = () => {
    console.log('onDragStart')
  }
  
  onDragUpdate = () => {
    console.log('onDragUpdate')
  }
  
  onDragStop = () => {
    console.log('onDragStop')
  }
}

new Game().init()

