class Game {
  constructor() {
    this.game  = null
    this.blocks = []
    
    this.crystalParts = [
      {
        // key: 'crystalLeft',
        key: 'itemPanel1',
        x: 250,
        y: 400,
        anchor: {
          x: 1,
          y: 1
        },
        // angle: 47,
        angle: 0,
      },
      {
        key: 'crystalTop',
        x: 250,
        y: 80,
        anchor: {
          x: 0,
          y: 0
        },
        angle: 0,
      },
      {
        key: 'crystalRight',
        x: 530,
        y: 130,
        anchor: {
          x: 0,
          y: 0
        },
        angle: 0,
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
    
    this.game.load.image('crystalLeft', '/src/img/crystal_left.png')
    this.game.load.image('itemPanel1', '/src/img/item_panel1.jpg')
    this.game.load.image('crystalTop', '/src/img/crystal_top.png')
    this.game.load.image('crystalRight', '/src/img/crystal_right.png')
  }
  
  create = () => {
    this.game.add.sprite(0, 0, 'bg')
    this.game.add.sprite(200, 90, 'crystalBodyWrap')
    this.game.add.sprite(200, 200, 'crystalBody')
  
    this.createCrystalParts()
  }
  
  render = () => {
    this.game.debug.spriteBounds(this.blocks[0])
    this.game.debug.spriteBounds(this.blocks[1])
    this.game.debug.spriteBounds(this.blocks[2])
  }
  
  createCrystalParts = () => {
    this.crystalParts.forEach(item => {
      const crystal = this.game.add.sprite(item.x, item.y, item.key)
      crystal.anchor.set(item.anchor.x, item.anchor.x)
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
  
      if (item.key === 'itemPanel1') {
        crystal.alpha = 0.8
        crystal.anchor.set(0, 0.5)
        
        this.game.add.tween(crystal)
          .to({
            angle: -230,
          }, Phaser.Timer.HALF / 2, Phaser.Easing.Linear.None, true).yoyo(true)
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

