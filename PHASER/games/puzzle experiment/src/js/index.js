import { crystalPartsParams } from './const.js';

class Game {
  constructor() {
    this.game  = null
    this.cursors = null
    this.block = null
    
    this.crystalPartsParams = Object.values({...crystalPartsParams})
    
    this.crystalParts = {
      crystalBody: null,
      crystalLeft: null,
      crystalTop: null,
      crystalRight: null,
    }
  }
  
  init() {
    this.game = new Phaser.Game(
      800,
      800,
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
    
    this.game.load.image('block', '/src/img/block.jpg')
    
    this.game.load.image('crystalLeft', '/src/img/crystalLeft.png')
    this.game.load.image('crystalTop', '/src/img/crystalTop.png')
    this.game.load.image('crystalRight', '/src/img/crystalRight.png')
  
    // загрузка физики
    this.game.load.physics('physicsData', 'src/sprites.json')
  }
  
  create = () => {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    
    this.game.add.sprite(0, 0, 'bg')
    this.game.add.sprite(200, 90, 'crystalBodyWrap')
    this.block = this.game.add.sprite(100, 100, 'block') // test block
    
    this.createCrystalParts()
    // this.enablePhysics()
    this.game.add.sprite(190, 185, 'dots')
  }
  
  update = () => {
    // Боря
    if (this.game.input.activePointer.isDown) {
      for (const part of Object.values(this.crystalParts)) {
        if (part.rotationReady) {
          console.log(this.game.input)
          part.angle += 2
        }
      }
    }
  }
  
  render = () => {
    // this.game.debug.geom(new Phaser.Point(this.block.x, this.block.y), '#ffff00');
  }
  
  createCrystalParts = () => {
    this.crystalPartsParams.forEach((item, index) => {
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
      crystal.index = index
      crystal.prevPointerPos = {x: 0, y: 0}
      crystal.freezePosition = {x: item.x, y: item.y}
      
      //input
      crystal.inputEnabled = true
      crystal.input.enableDrag()
  
      //Input вариант
      crystal.events.onInputDown.add(()=>{
        // crystal.rotationReady = true
        console.log(crystal.key)
      })

      crystal.events.onInputUp.add(()=>{
        // crystal.rotationReady = false
      })
  
      // Drag вариант
      // crystal.events.onDragStart.add(this.onDragStart, this)
      // crystal.events.onDragUpdate.add(this.onDragUpdate, this)
      // crystal.events.onDragStop.add(this.onDragStop, this)
    })
  }
  
  enablePhysics = () => {
    return
    //  Включить p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    
    // Сделайте более упругими
    this.game.physics.p2.defaultRestitution = 0.8;
    this.game.physics.p2.restitution = 1;
    this.game.physics.p2.gravity.x = 0;
    this.game.physics.p2.gravity.y = 0;
  
    this.block.smoothed = false;
    this.block.animations.add('fly', [0,1,2,3,4,5], 10, true);
    this.block.play('fly');
    
    // включить физику для следующих объектов
    this.game.physics.p2.enable([
      this.crystalParts.crystalBody,
      this.crystalParts.crystalLeft,
      this.crystalParts.crystalTop,
      this.crystalParts.crystalRight,
      this.block
    ], true); // true - визуальный отлатчик
  
    // задать орбиту дистанции
    const constraint = this.game.physics.p2.createDistanceConstraint(
      this.block, this.crystalParts.crystalBody, 320);
  
    // create physics body for mouse which we will use for dragging clicked bodies
    this.mouseBody = new p2.Body();
    this.game.physics.p2.world.addBody(this.mouseBody);
  
    // attach pointer events
    this.game.input.onDown.add(this.onClick, this);
    this.game.input.addMoveCallback(this.onMove, this);
    this.game.input.onUp.add(this.onUp, this);
    
    //  Измените свойств тела
    Object.values(this.crystalParts).forEach(crystal => {
      if (crystal.key === 'crystalBody') {
        // kinematic
        // Сделать кинематическим - Кинематическое означает, что на тело не будет воздействовать
        // физика, такая как гравитация и столкновения, но оно все равно может двигаться и
        // вызовет события столкновения
        // crystal.body.kinematic = true
        //
        // crystal.body.setZeroDamping()
        // crystal.body.fixedRotation = true // выкл поворот
        crystal.body.dynamic = false; // выкл поворот
        //  Make static
        // crystal.body.static = true;
      }
  
      // collideWorldBounds - должен ли спрайт столкнуться с границами мира или нет
      crystal.body.collideWorldBounds = true;
      // clearShapes - удаляет квадратную форму
      crystal.body.clearShapes()
      // загружает данные полигона в объекты
      crystal.body.loadPolygon('physicsData', crystal.key)
    })
  }
  
  // DRAG
  onDragStart = () => {
    console.log('onDragStart')
  }
  
  onDragUpdate = (sprite, pointer) => {
    console.log('onDragUpdate')
    sprite.position = {
      x: sprite.freezePosition.x,
      y: sprite.freezePosition.y
    }
  
    if (pointer.y < sprite.prevPointerPos.y || pointer.x > sprite.prevPointerPos.x) {
      sprite.angle -= 2
    }
    if (pointer.y > sprite.prevPointerPos.y || pointer.x < sprite.prevPointerPos.x) {
      sprite.angle += 2
    }
    
    sprite.prevPointerPos = {
      x: pointer.x,
      y: pointer.y
    }
  }
  
  onDragStop = () => {
    console.log('onDragStop')
  }
}

new Game().init()

// crystal.body.setZeroVelocity();
//  редуктор горячей воды / редуктор давления
// this.block.body.setZeroVelocity();
// if (this.cursors.left.isDown) {
//   this.block.body.moveLeft(400);
// } else if (this.cursors.right.isDown) {
//   this.block.body.moveRight(400);
// }
//
// if (this.cursors.up.isDown) {
//   this.block.body.moveUp(400);
// } else if (this.cursors.down.isDown) {
//   this.block.body.moveDown(400);
// }
