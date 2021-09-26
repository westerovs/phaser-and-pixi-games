class Game {
  constructor() {
    this.game = null;
    
    this.player = null;
    this.player2 = null;
    
    this.bullets1 = null;
    this.bullets2 = null;
    
    this.bulletTime = 0;
    this.bulletTime2 = 0;
    
    this.cursors = null;
    this.fireButton = null;
    this.explosions = null;
    this.starfield = null;
    
    this.score = 0;
    this.lives = null;
    this.firingTimer = 0;
    this.stateText = null;
  }
  
  preload = () => {
    this.game.load.image('bullet', './src/assets/images/bullet.png');
    this.game.load.image('ship', './src/assets/images/player.png');
    this.game.load.spritesheet('kaboom', './src/assets/images/explode.png', 128, 128);
    this.game.load.image('starfield', './src/assets/images/starfield.png');
    this.game.load.image('background', './src/assets/images/background2.png');
  }
  
  create = () => {
    this.game.physics.startSystem(Phaser.Physics.ARCADE); // физ. движок
    //  Прокручиваемый фон звездного поля
    this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'starfield');

    //  группа игровых объектов
    this.bullets1 = this.game.add.group();
    this.bullets1.enableBody = true; // предусматривает столкновение
    this.bullets1.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets1.createMultiple(30, 'bullet'); // пули создаём здесь, а не в цикле update для лучш. производит.
    this.bullets1.setAll('anchor.x', 0.5); // setAll - исп для группы, менять св-во / anchor - отцентрировать
    this.bullets1.setAll('anchor.y', 1);
    this.bullets1.setAll('outOfBoundsKill', true);
    this.bullets1.setAll('checkWorldBounds', true);

    //  группа игровых объектов
    this.bullets2 = this.game.add.group();
    this.bullets2.enableBody = true;
    this.bullets2.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets2.createMultiple(30, 'bullet');
    this.bullets2.setAll('anchor.x', 0.5);
    this.bullets2.setAll('anchor.y', 1);
    this.bullets2.setAll('outOfBoundsKill', true);
    this.bullets2.setAll('checkWorldBounds', true);

    //  The hero! создание игрока
    this.player = this.game.add.sprite(400, 570, 'ship'); // ship - это ключ
    this.player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

    //  The hero2! создание 2 игрока
    this.player2 = this.game.add.sprite(400, 100, 'ship');
    this.player2.angle = 180;
    this.player2.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this.player2, Phaser.Physics.ARCADE);

    //  Lives
    this.lives = this.game.add.group();
    this.game.add.text(this.game.world.width - 110, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    this.lives2 = this.game.add.group();
    this.game.add.text(this.game.world.width - 110, this.game.world.height - 100, 'Lives : ', {
      font: '34px Arial',
      fill: '#fff'
    });

    //  Text
    this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', { font: '84px Arial', fill: '#fff' });
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;

    // в цикле создаём lives
    for (let i = 0; i < 3; i++) {
      let ship = this.lives.create(this.game.world.width - 100 + (30 * i), this.game.world.height - 40, 'ship');
      ship.anchor.setTo(0.5, 0.5);
      ship.angle = 90;
      ship.alpha = 0.6;

      let ship2 = this.lives2.create(this.game.world.width - 100 + (30 * i), 60, 'ship');
      ship2.anchor.setTo(0.5, 0.5);
      ship2.angle = 90;
      ship2.alpha = 0.6;
    }

    //  анимация взрывов
    this.explosions = this.game.add.group();
    this.explosions.createMultiple(30, 'kaboom');
    this.explosions.forEach(function (explosion) {
      explosion.anchor.x = 0.5;
      explosion.anchor.y = 0.5;
      explosion.animations.add('kaboom');
    }, this);

    //Player 1 keys
    this.cursors = this.game.input.keyboard.createCursorKeys(); // this.game.input. отвечает за всю работу с контроллами / createCursorKeys - стрелочки на клаве
    this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);

    //Player 2 keys
    this.player2Left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.player2Right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.fireButton2 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }
  
  update = () => {
    //  Scroll the background
    this.starfield.tilePosition.y += 2;

    // если игрок жив
    if (this.player.alive) {
      //  Reset the player, then check for movement keys
      this.player.body.velocity.setTo(0, 0);

      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -200;
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 200;
      }

      //  Firing если нажали и держим
      if (this.fireButton.isDown) {
        this.fireBullet();
      }

      //  RUN COLLISION / столкновения
      // overlap - обработка коллизии bullets → сталкивается с → игроком
      this.game.physics.arcade.overlap(this.bullets1, this.player2, this.player1Hits2, null, this);
      this.game.physics.arcade.overlap(this.bullets2, this.player, this.player2Hits1, null, this);
    }

    if (this.player2.alive) {
      //  Reset the player, then check for movement keys
      this.player2.body.velocity.setTo(0, 0);

      if (this.player2Left.isDown) {
        this.player2.body.velocity.x = -200;
      } else if (this.player2Right.isDown) {
        this.player2.body.velocity.x = 200;
      }

      //  Firing?
      if (this.fireButton2.isDown) {
        this.fireBullet2();
      }

      //  Run collision
      this.game.physics.arcade.overlap(this.bullets1, this.player2, this.player1Hits2, null, this);
      this.game.physics.arcade.overlap(this.bullets2, this.player, this.player2Hits1, null, this);
    }
  }

  player1Hits2 = (player2, bullet) => {
    bullet.kill();  // убиваем исп. кнопки

    const live = this.lives2.getFirstAlive(); // берет жизнь ??

    // если есть живые эл-ты, мы их убиваем
    if (live) {
      live.kill();
    }

    // И создать взрыв :)
    let explosion = this.explosions.getFirstExists(false); // берём из созданных первый взрыв
    explosion.reset(player2.body.x, player2.body.y); // ставим позицию взрыва
    explosion.play('kaboom', 30, false, true); // запускаем анимацию

    // When the player dies
    if (this.lives2.countLiving() < 1) {
      player2.kill();
      this.bullets2.callAll('kill');

      this.stateText.text = " PLAYER 2 \n this.GAME OVER \n Click to restart";
      this.stateText.visible = true;

      //the "click to restart" handler
      this.game.input.onTap.addOnce(this.restart, this);
    }

  }

  player2Hits1 = (player1, bullet) => {
    bullet.kill();

    const live = this.lives.getFirstAlive();

    if (live) {
      live.kill();
    }

    // And create an explosion :)
    let explosion = this.explosions.getFirstExists(false);
    explosion.reset(this.player.body.x, this.player.body.y);
    explosion.play('kaboom', 30, false, true);

    // When the player dies
    if (this.lives.countLiving() < 1) {
      this.player.kill();
      this.bullets1.callAll('kill');

      this.stateText.text = " PLAYER 1 \n this.GAME OVER \n Click to restart";
      this.stateText.visible = true;

      //the "click to restart" handler
      this.game.input.onTap.addOnce(this.restart, this);
    }

  }

  fireBullet = () => {
    //  Чтобы они не стреляли слишком быстро, мы установили ограничение по времени
    if (this.game.time.now > this.bulletTime) {
      //  Возьмите первую пулю, которую мы сможем, из пула
      const bullet = this.bullets1.getFirstExists(false);

      if (bullet) {
        //  And fire it
        bullet.reset(this.player.x, this.player.y + 10); // координаты. появления пули
        bullet.body.velocity.y = -310; // скорость полёта
        this.bulletTime = this.game.time.now + 100; // задержка
      }
    }

  }

  fireBullet2 = () => {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (this.game.time.now > this.bulletTime2) {
      //  Grab the first bullet we can from the pool
      const bullet = this.bullets2.getFirstExists(false);

      if (bullet) {
        //  And fire it
        bullet.reset(this.player2.x, this.player2.y + 30);
        bullet.body.velocity.y = 400;
        this.bulletTime2 = this.game.time.now + 500;
      }
    }
  }

  resetBullet = (bullet) => {
    //  Вызывается, если пуля выходит за пределы экрана
    bullet.kill();
  }

  restart = () => {
    //resets the life count
    this.lives.callAll('revive');
    this.lives2.callAll('revive');

    //revives the player
    this.player.revive();
    this.player2.revive();
    //hides the text
    this.stateText.visible = false;
  }
  
  init = () => {
    this.game = new Phaser.Game(
      800,
      600, Phaser.AUTO,
      'phaser-example', {
        // три главных цикла
        preload: this.preload, // занимается загрузкой ассетов
        create: this.create,   // создаёт игровые объекты, где будут находиться, размеры и тп
        update: this.update    // следит за любыми изменениями в игре (не делать тяжелых вычислений)
      });
  }
}


new Game().init()
