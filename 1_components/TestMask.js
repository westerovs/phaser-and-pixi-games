createTestMask = () => {
    const group = this.game.add.group()
    
    const line = this.game.make.graphics(0, 0)
    line.beginFill(0x000000)
    line.drawRect(0, 0, 100, 20, 0)
    
    this.maskLine = this.game.make.graphics(0, 0)
    this.maskLine.beginFill(0x999222)
    this.maskLine.drawRect(-100, 0, 100, 20, 0)
    
    line.mask = this.maskLine
    group.add(line)
    group.add(this.maskLine)
    group.position.set(100, 200)
    this.game.add.tween(this.maskLine.position)
      .to({
        x: line.width,
      }, Phaser.Timer.SECOND * 3, Phaser.Easing.Linear.None, true)
  }
  
  // *****  ДЛЯ ТЕСТОВ *****
  createTestBtns = () => {
    this.createTestMask()
    
    this.btnMinus = this.createBtn('minus', 80, 120)
    this.btnPlus  = this.createBtn('plus', 150, 120)
    
    this.btnMinus.addEventListener('click', () => {
      this.maskLine.position.x -= 10
      console.log('-')
    })
    
    this.count = 5
    this.btnPlus.addEventListener( 'click', () => {
      this.maskLine.position.x += 10
      console.log('+')
    })
  }
  
  createBtn = (name, x = 0, y = 0) => {
    const btn = document.createElement('button')
    btn.innerText = name.toUpperCase()
    btn.style.position  = 'absolute'
    btn.style.padding  = '10px'
    btn.style.top = `${ y }px`
    btn.style.left = `${ x }px`
    
    document.body.append(btn)
    
    return btn
  }