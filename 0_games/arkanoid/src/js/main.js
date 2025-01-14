// DANGER - очень грязный код !

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
    
    this.lives = null;
    this.stateText = null;
  }
  
  preload = () => {
    this.game.load.image('bullet', './src/assets/images/bullet.png');
    this.game.load.image('ship', './src/assets/images/player.png');
    this.game.load.spritesheet('kaboom', './src/assets/images/explode.png', 128, 128);
    this.game.load.image('starfield', './src/assets/images/starfield.png');
    this.game.load.image('background', './src/assets/images/background2.png');
  };
  
  createBullets = (bullets) => {
    bullets = this.game.add.group();
    bullets.enableBody = true; // предусматривает столкновение
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet'); // пули создаём здесь, а не в цикле update для лучш. производит.
    bullets.setAll('anchor.x', 0.5); // setAll - исп для группы, менять св-во / anchor - отцентрировать
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    
    return bullets;
  };
  
  createPlayer = ({ player, x = 400, y = 570, angle, degAngle = 180 }) => {
    player = this.game.add.sprite(x, y, 'ship'); // ship - это ключ
    player.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(player, Phaser.Physics.ARCADE);
    
    if (angle) {
      player.angle = degAngle;
    }
    
    return player;
  };
  
  createLives = ({ lives, x, y, text = 'Player x', }) => {
    lives = this.game.add.group();
    
    this.game.add.text(x, y, text, {
      font: '34px Arial',
      fill: '#fff'
    });
    
    return lives;
  };
  
  createWorld = () => {
    this.game.physics.startSystem(Phaser.Physics.ARCADE); // физ. движок
    //  Прокручиваемый фон звездного поля
    this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'starfield');
    
    this.bullets1 = this.createBullets(this.bullets1);
    this.bullets2 = this.createBullets(this.bullets2);
    
    this.player = this.createPlayer({
      player: this.player
    });
    this.player2 = this.createPlayer({
      player: this.player2,
      y: 50,
      angle: true,
    });
    
    this.lives = this.createLives({
      lives: this.lives,
      text: 'Player 1',
      x: this.game.world.width - 140,
      y: 10,
    });
    this.lives2 = this.createLives({
      lives: this.lives2,
      text: 'Player 2',
      x: this.game.world.width - 140,
      y: this.game.world.height - 100,
    });

    //  Text final screen
    this.stateText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, ' ', {
      font: '84px Arial',
      fill: 'red'
    });
    this.stateText.anchor.setTo(0.5, 0.5);
    this.stateText.visible = false;
    
    // в цикле создаём lives
    for (let i = 0; i < 3; i++) {
      let ship  = this.lives.create(this.game.world.width - 100 + (30 * i), this.game.world.height - 40, 'ship');
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
  };
  
  update = () => {
    // запущена всё время 60fps
    
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
      
      // слушает RUN COLLISION / столкновения
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
  };
  
  player1Hits2 = (player2, bullet) => {
    bullet.kill();  // останавливаем выстрелы на противнике
    
    const live = this.lives2.getFirstAlive(); // берет жизнь ??
    
    // если есть живые эл-ты, мы их убиваем
    if (live) {
      live.kill();
    }
    
    // И создать взрыв :)
    let explosion = this.explosions.getFirstExists(false); // берём из созданных первый взрыв
    explosion.reset(player2.body.x, player2.body.y); // вызываем первый шаг взрыва
    explosion.play('kaboom', 30, false, true); // проигрываем остальные шаги взрыва
    
    // When the player dies
    if (this.lives2.countLiving() < 1) {
      player2.kill();
      this.bullets2.callAll('kill');
      
      this.stateText.text = " PLAYER 2 WIN \n GAME OVER \n Click to restart";
      this.stateText.visible = true;
      
      //the "click to restart" handler
      this.game.input.onTap.addOnce(this.restart, this);
    }
  };
  
  player2Hits1 = (player1, bullet) => {
    bullet.kill();
    
    const live = this.lives.getFirstAlive();
    
    if (live) {
      live.kill();
    }
    
    // And draw an explosion :)
    let explosion = this.explosions.getFirstExists(false);
    explosion.reset(this.player.body.x, this.player.body.y);
    explosion.play('kaboom', 30, false, true);
    
    // When the player dies
    if (this.lives.countLiving() < 1) {
      this.player.kill();
      this.bullets1.callAll('kill');
      
      this.stateText.text = " PLAYER 1 WIN \n GAME OVER \n Click to restart";
      this.stateText.visible = true;
      
      //the "click to restart" handler
      this.game.input.onTap.addOnce(this.restart, this);
    }
    
  };
  
  fireBullet = () => {
    if (this.game.time.now > this.bulletTime) {
      const bullet = this.bullets1.getFirstExists(false);
      
      if (bullet) {
        bullet.reset(this.player.x, this.player.y + 10);
        bullet.body.velocity.y = -400;
        this.bulletTime = this.game.time.now + 500;
      }
    }
  };
  
  fireBullet2 = () => {
    if (this.game.time.now > this.bulletTime2) {
      const bullet = this.bullets2.getFirstExists(false);
      
      if (bullet) {
        bullet.reset(this.player2.x, this.player2.y + 10);
        bullet.body.velocity.y = 400;
        this.bulletTime2 = this.game.time.now + 500;
      }
    }
  };
  
  resetBullet = (bullet) => {
    //  Вызывается, если пуля выходит за пределы экрана
    bullet.kill();
  };
  
  restart = () => {
    //resets the life count
    this.lives.callAll('revive');
    this.lives2.callAll('revive');
    
    //revives the player
    this.player.revive();
    this.player2.revive();
    //hides the text
    this.stateText.visible = false;
  };
  
  init = () => {
    this.game = new Phaser.Game(
      800,
      600, Phaser.AUTO,
      'phaser-example', {
        // три главных цикла
        preload: this.preload, // занимается загрузкой ассетов
        create: this.createWorld,   // создаёт игровые объекты, где будут находиться, размеры и тп
        update: this.update    // следит за любыми изменениями в игре (не делать тяжелых вычислений)
      });
  };
}

new Game().init();
