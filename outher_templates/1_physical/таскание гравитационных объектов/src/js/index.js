class Game {
  constructor() {
    this.game  = null
    this.cursors = null
    this.blocks = []
    this.mouseBody
    this.mouseConstraint
    
    this.crystalPartsParams = [
      {
        key: 'crystalLeft',
        x: 244,
        y: 290,
        anchor: {
          x: 0,
          y: 1
        },
        angle: -60,
      },
      {
        key: 'crystalTop',
        x: 286,
        y: 175,
        anchor: {
          x: 1,
          y: 0.599
        },
        angle: 80,
      },
      {
        key: 'crystalRight',
        x: 475,
        y: 160,
        anchor: {
          x: 1,
          y: 0.65
        },
        angle: 120,
      },
    ]
    
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
    
    this.game.load.image('crystalLeft', '/src/img/crystalLeft.png')
    this.game.load.image('crystalTop', '/src/img/crystalTop.png')
    this.game.load.image('crystalRight', '/src/img/crystalRight.png')
  
    // загрузка физики
    this.game.load.physics('physicsData', 'src/sprites.json')
  }
  
  create = () => {
    this.cursors = this.game.input.keyboard.createCursorKeys()
    
    this.game.add.sprite(0, 0, 'bg')
    this.game.add.sprite(200, 90, 'crystalBodyWrap')
    this.crystalParts.crystalBody = this.game.add.sprite(380, 350, 'crystalBody')
    this.game.add.sprite(192, 190, 'dots')
    
    this.createCrystalParts()
    this.enablePhysics()
  }
  
  createCrystalParts = () => {
    this.crystalPartsParams.forEach(item => {
      const crystal = this.game.add.sprite(item.x, item.y, item.key)
      
      switch (item.key) {
        case 'crystalLeft':
          this.crystalParts.crystalLeft = crystal
          break
        case 'crystalTop':
          this.crystalParts.crystalTop = crystal
          break
        case 'crystalRight':
          this.crystalParts.crystalRight = crystal
          break
      }
  
      crystal.anchor.set(item.anchor.x, item.anchor.y)
      crystal.angle = item.angle
      crystal.freezePosition = {x: item.x, y: item.y}
      crystal.prevPointerPos = {x: 0, y: 0}
  
      
      //input
      crystal.inputEnabled = true
    })
  }
  
  enablePhysics = () => {
    //  Включить p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    
    // Сделайте более упругими
    this.game.physics.p2.defaultRestitution = 0.8
    this.game.physics.p2.restitution = 1
    this.game.physics.p2.gravity.x = 0
    this.game.physics.p2.gravity.y = 0
    
    // включить физику для следующих объектов
    this.game.physics.p2.enable([
      this.crystalParts.crystalBody,
      this.crystalParts.crystalLeft,
      this.crystalParts.crystalTop,
      this.crystalParts.crystalRight,
    ], true)
  
    // create physics body for mouse which we will use for dragging clicked bodies
    this.mouseBody = new p2.Body()
    this.game.physics.p2.world.addBody(this.mouseBody)
  
    // attach pointer events
    this.game.input.onDown.add(this.onClick, this)
    this.game.input.addMoveCallback(this.onMove, this)
    this.game.input.onUp.add(this.onUp, this)
    
    //  Измените свойств тела
    Object.values(this.crystalParts).forEach(crystal => {
      if (crystal.key === 'crystalBody') {
        // kinematic
        // Сделать кинематическим - Кинематическое означает, что на тело не будет воздействовать
        // физика, такая как гравитация и столкновения, но оно все равно может двигаться и
        // вызовет события столкновения
        // crystal.body.kinematic = true
        crystal.body.setZeroDamping()
        crystal.body.fixedRotation = true // выкл поворот
        crystal.body.dynamic = false // выкл поворот
        // crystal.body.static = true //  Make static
  
        // setInterval(() => {
        //   this.game.add.tween(crystal)
        //     .to({
        //       angle: 230,
        //     }, Phaser.Timer.HALF / 2, Phaser.Easing.Linear.None, true).yoyo(true)
        // }, 1000)
      }
  
      // collideWorldBounds - должен ли спрайт столкнуться с границами мира или нет
      crystal.body.collideWorldBounds = true
      // clearShapes - удаляет квадратную форму
      crystal.body.clearShapes()
      // загружает данные полигона в объекты
      crystal.body.loadPolygon('physicsData', crystal.key)
    })
  }
  
  // CLICK
  onClick(pointer) {
    console.log('click')
    const bodies = this.game.physics.p2.hitTest(pointer.position, [
      this.crystalParts.crystalBody,
      this.crystalParts.crystalLeft,
      this.crystalParts.crystalTop,
      this.crystalParts.crystalRight,
    ])
  
    // p2 использует другую систему координат, поэтому преобразуйте положение указателя в систему координат p2
    const physicsPos = [
      this.game.physics.p2.pxmi(pointer.position.x),
      this.game.physics.p2.pxmi(pointer.position.y)
    ]
  
    if (bodies.length) {
      const clickedBody = bodies[0]
      console.log(clickedBody)
    
      const localPointInBody = [0, 0]
      // эта функция принимает physicspost и привязывает его к локальной системе координат телаZ
      clickedBody.toLocalFrame(localPointInBody, physicsPos)
    
      // use a revoluteContraint to attach this.mouseBody to the clicked body
      this.mouseConstraint = this.game.physics.p2.createRevoluteConstraint(
        this.mouseBody,
        [0, 0],
        clickedBody,
        [this.game.physics.p2.mpxi(localPointInBody[0]), this.game.physics.p2.mpxi(localPointInBody[1])])
    }
  }
  
  onMove = (pointer) => {
    console.log('onMove', pointer)
    this.mouseBody.position[0] = this.game.physics.p2.pxmi(pointer.position.x)
    this.mouseBody.position[1] = this.game.physics.p2.pxmi(pointer.position.y)
  }
  
  onUp() {
    console.warn('onUp')
    // удалить ограничение из тела объекта
    this.game.physics.p2.removeConstraint(this.mouseConstraint)
  }
}

new Game().init()

// crystal.body.setZeroVelocity()
//  редуктор горячей воды / редуктор давления
