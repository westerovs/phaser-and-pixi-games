class StatusPanel {
  constructor() {
    this.game = null
    this.panel = null
    this.lifeParams = {
      col    : 3,
      width  : 60,
      height : 50,
      padding: 10, // расстояние между sprites
      offset : {
        top : 2,
        left: 40,
      },
    }
    this.panelParams = {
      width : 222,
      height: 55,
      offset: {
        top : 0,
        left: 0,
      },
    }
    this.lights = []
    this.life = []

    this.VisibleItems = {
      light: 3,
      life: 0
    }

    this.livesText = null
    this.lightText = null
    this.textStyle = {
      font: '18px Arial',
      fill: '#0095DD'
    };
  }

  init() {
    this.game = new Phaser.Game(
      400,
      400,
      Phaser.CANVAS,
      null, {
        preload: this.preload,
        create : this.create,
        update : this.update
      })
  }

  preload = () => {
    this.game.stage.backgroundColor = '#244000'
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.game.scale.pageAlignHorizontally = true
    this.game.scale.pageAlignVertically = true

    this.game.load.image('panel', './src/img/panel.png')
    this.game.load.image('light', './src/img/light.png')
    this.game.load.image('life', './src/img/life.png')
    this.game.load.spritesheet('btnLife', './src/img/btn-life.png', 120, 40)
    this.game.load.spritesheet('btnLight', './src/img/btn-light.png', 120, 40)
  }

  create = () => {
    this.createPanel(0, 50, 'life')
    this.createPanel(0, 150, 'light')
    this.createBtn(300, 80, 'btnLife', this.onHandlerLifeBtn)
    this.createBtn(300, 180, 'btnLight', this.onHandlerLightBtn)

    this.createTextStatus()
  }

  update = () => {
    // код внутри update - это requestAnimations - он всё время запущен
    if (this.VisibleItems.life <= 0) {
      this.VisibleItems.life = 0
  
      this.livesText.setText('Life: ' + this.VisibleItems.life);
    }

    this.updateVisibleItems(this.life, this.VisibleItems.life)
    this.updateVisibleItems(this.lights, this.VisibleItems.light)
    this.createWinScreen()
  }

  createTextStatus = () => {
    this.livesText  = this.game.add.text(35, 25, `Life: ${ this.VisibleItems.life }`,  this.textStyle);
    this.lightText = this.game.add.text(35, 125, `Light: ${ this.VisibleItems.light }`, this.textStyle);

    this.livesText.anchor.set(0.5);
    this.lightText.anchor.set(0.5);
  }

  updateVisibleItems = (element, currentVisibleElements) => {
    element.forEach((item, index) => {
      if (index < currentVisibleElements) {
        item.alpha = 1
      } else {
        item.alpha = 0
      }
    })
  }

  createPanel(x, y, sprite) {
    this.panel = this.game.add.group()
    const panelPosX = (this.panelParams.width / 2) + this.panelParams.offset.left
    const panelPosY = this.panelParams.height / 2

    const newPanel = this.game.add.sprite(panelPosX, panelPosY, 'panel')
    newPanel.anchor.set(0.5)
    this.panel.add(newPanel)

    this.createPanelItems(sprite)
    this.panel.position.set(x, y)
  }

  createPanelItems(sprite) {
    for (let i = 0; i < this.lifeParams.col; i++) {
      const lifePosX = (i * (this.lifeParams.width + this.lifeParams.padding)) + this.lifeParams.offset.left
      const lifePosY = (this.lifeParams.height / 2) + this.lifeParams.offset.top

      const newItem = this.game.add.sprite(lifePosX, lifePosY, sprite)
      newItem.anchor.set(0.5)
      newItem.alpha = 0.1
      this.panel.add(newItem)

      switch (sprite) {
        case 'light':
          this.lights.push(newItem)
          break
        case 'life':
          this.life.push(newItem)
          break
      }
    }
  }

  createBtn(x, y, sprite, callback) {
    this.startButton = this.game.add.button(
      x, // pos x
      y,// pos y
      sprite,  // имя
      callback, // Ф-ция обратного вызова, которая будет выполняться при нажатии кнопки.
      this,      // Ссылка на this определение контекста выполнения
      1, 0, 2    // кадры анимации
    );
    this.startButton.anchor.set(0.5);
  }

  onHandlerLightBtn = () => {
    this.VisibleItems.light--

    if (this.VisibleItems.light === 0 && this.VisibleItems.life === 2) {
      this.createWinScreen()
      // this.updateTextStatus()
      this.updateVisibleItems(this.lights, this.VisibleItems.light)
      return
    }
    this.VisibleItems.life--
  
    this.livesText.setText('Life: ' + this.VisibleItems.life);
    this.lightText.setText('Light: ' + this.VisibleItems.light);
  }

  onHandlerLifeBtn = () => {
    this.VisibleItems.life++
    this.livesText.setText('Life: ' + this.VisibleItems.life);
  }

  createWinScreen = () => {
    if (this.VisibleItems.light === 0 && this.VisibleItems.life === 2) {
      this.game.stage.backgroundColor = '#00FFA9'
  
      console.log('YOU WIN !!!')
      console.log(this.VisibleItems.light === 0 && this.VisibleItems.life === 2)
      console.log(' ')
      return
    }
    if (this.VisibleItems.light === 0) {
      this.game.stage.backgroundColor = '#D0001C'
      console.log(' ------------------ ')
      console.log('light === 0 ***!YOU FAIL!***')
      console.log(' ------------------ ')
      return
    }
    if (this.VisibleItems.life === 3) {
      this.game.stage.backgroundColor = '#00FFA9'
      console.log(' ------------------ ')
      console.log('life === 3 ***!YOU WIN!***')
      console.log(' ------------------ ')
    }

  }
}

new StatusPanel().init()
