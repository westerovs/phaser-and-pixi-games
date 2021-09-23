const game = new Phaser.Game(
    800,
    600, Phaser.AUTO,
    'phaser-example', {
        // три главных цикла
        preload: preload, // занимается загрузкой ассетов
        create: create,   // создаёт игровые объекты, где будут находиться, размеры и тп
        update: update    // следит за любыми изменениями в игре (не делать тяжелых вычислений)
    });


function preload() {
    game.load.image('bullet', './src/assets/images/bullet.png');
    game.load.image('ship', './src/assets/images/player.png');
    game.load.spritesheet('kaboom', './src/assets/images/explode.png', 128, 128);
    game.load.image('starfield', './src/assets/images/starfield.png');
    game.load.image('background', './src/assets/images/background2.png');
}


let player = null;
let player2 = null;
let aliens = null;
let bullets1 = null;
let bulletTime = 0;
let bulletTime2 = 0;
let cursors = null;
let fireButton = null;
let explosions = null;
let starfield = null;
let score = 0;
let lives = null;
let firingTimer = 0;
let stateText = null;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE); // физ. движок
    
    //  Прокручиваемый фон звездного поля
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    
    //  группа игровых объектов
    bullets1 = game.add.group();
    bullets1.enableBody = true; // предусматривает столкновение
    bullets1.physicsBodyType = Phaser.Physics.ARCADE;
    bullets1.createMultiple(30, 'bullet'); // пули создаём здесь, а не в цикле update для лучш. производит.
    bullets1.setAll('anchor.x', 0.5); // setAll - исп для группы, менять св-во / anchor - отцентрировать
    bullets1.setAll('anchor.y', 1);
    bullets1.setAll('outOfBoundsKill', true);
    bullets1.setAll('checkWorldBounds', true);
    
    //  группа игровых объектов
    bullets2 = game.add.group();
    bullets2.enableBody = true;
    bullets2.physicsBodyType = Phaser.Physics.ARCADE;
    bullets2.createMultiple(30, 'bullet');
    bullets2.setAll('anchor.x', 0.5);
    bullets2.setAll('anchor.y', 1);
    bullets2.setAll('outOfBoundsKill', true);
    bullets2.setAll('checkWorldBounds', true);
    
    //  The hero! создание игрока
    player = game.add.sprite(400, 570, 'ship'); // ship - это ключ
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    
    //  The hero2! создание 2 игрока
    player2 = game.add.sprite(400, 100, 'ship');
    player2.angle = 180;
    player2.anchor.setTo(0.5, 0.5);
    game.physics.enable(player2, Phaser.Physics.ARCADE);
    
    //  Lives
    lives = game.add.group();
    game.add.text(game.world.width - 110, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });
    
    lives2 = game.add.group();
    game.add.text(game.world.width - 110, game.world.height - 100, 'Lives : ', { font: '34px Arial', fill: '#fff' });
    
    //  Text
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '84px Arial', fill: '#fff' });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;
    
    // в цикле создаём lives
    for (let i = 0; i < 3; i++) {
        let ship = lives.create(game.world.width - 100 + (30 * i), game.world.height - 40, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.6;
        
        let ship2 = lives2.create(game.world.width - 100 + (30 * i), 60, 'ship');
        ship2.anchor.setTo(0.5, 0.5);
        ship2.angle = 90;
        ship2.alpha = 0.6;
    }
    
    //  анимация взрывов
    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(function (explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom');
    }, this);
    
    
    //Player 1 keys
    cursors = game.input.keyboard.createCursorKeys(); // game.input. отвечает за всю работу с контроллами / createCursorKeys - стрелочки на клаве
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
    
    //Player 2 keys
    player2Left = game.input.keyboard.addKey(Phaser.Keyboard.A);
    player2Right = game.input.keyboard.addKey(Phaser.Keyboard.D);
    fireButton2 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    //  Scroll the background
    starfield.tilePosition.y += 2;
    
    // если игрок жив
    if (player.alive) {
        //  Reset the player, then check for movement keys
        player.body.velocity.setTo(0, 0);
        
        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
        }
        
        //  Firing если нажали и держим
        if (fireButton.isDown) {
            fireBullet();
        }
        
        //  RUN COLLISION / столкновения
        // overlap - обработка коллизии bullets → сталкивается с → игроком
        game.physics.arcade.overlap(bullets1, player2, player1Hits2, null, this);
        game.physics.arcade.overlap(bullets2, player, player2Hits1, null, this);
    }
    
    if (player2.alive) {
        //  Reset the player, then check for movement keys
        player2.body.velocity.setTo(0, 0);
        
        if (player2Left.isDown) {
            player2.body.velocity.x = -200;
        } else if (player2Right.isDown) {
            player2.body.velocity.x = 200;
        }
        
        //  Firing?
        if (fireButton2.isDown) {
            fireBullet2();
        }
        
        //  Run collision
        game.physics.arcade.overlap(bullets1, player2, player1Hits2, null, this);
        game.physics.arcade.overlap(bullets2, player, player2Hits1, null, this);
    }
}

function player1Hits2(player2, bullet) {
    
    bullet.kill();  // убиваем исп. кнопки
    
    live = lives2.getFirstAlive(); // берет жизнь ??
    
    // если есть живые эл-ты, мы их убиваем
    if (live) {
        live.kill();
    }
    
    // И создать взрыв :)
    let explosion = explosions.getFirstExists(false); // берём из созданных первый взрыв
    explosion.reset(player2.body.x, player2.body.y); // ставим позицию взрыва
    explosion.play('kaboom', 30, false, true); // запускаем анимацию
    
    // When the player dies
    if (lives2.countLiving() < 1) {
        player2.kill();
        bullets2.callAll('kill');
        
        stateText.text = " PLAYER 2 \n GAME OVER \n Click to restart";
        stateText.visible = true;
        
        //the "click to restart" handler
        game.input.onTap.addOnce(restart, this);
    }
    
}

function player2Hits1(player1, bullet) {
    
    bullet.kill();
    
    live = lives.getFirstAlive();
    
    if (live) {
        live.kill();
    }
    
    // And create an explosion :)
    let explosion = explosions.getFirstExists(false);
    explosion.reset(player.body.x, player.body.y);
    explosion.play('kaboom', 30, false, true);
    
    // When the player dies
    if (lives.countLiving() < 1) {
        player.kill();
        bullets1.callAll('kill');
        
        stateText.text = " PLAYER 1 \n GAME OVER \n Click to restart";
        stateText.visible = true;
        
        //the "click to restart" handler
        game.input.onTap.addOnce(restart, this);
    }
    
}

function fireBullet() {
    //  Чтобы они не стреляли слишком быстро, мы установили ограничение по времени
    if (game.time.now > bulletTime) {
        //  Возьмите первую пулю, которую мы сможем, из пула
        bullet = bullets1.getFirstExists(false);
        
        if (bullet) {
            //  And fire it
            bullet.reset(player.x, player.y + 10); // координаты. появления пули
            bullet.body.velocity.y = -10; // скорость полёта
            bulletTime = game.time.now + 100; // задержка
        }
    }
    
}

function fireBullet2() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime2) {
        //  Grab the first bullet we can from the pool
        bullet = bullets2.getFirstExists(false);
        
        if (bullet) {
            //  And fire it
            bullet.reset(player2.x, player2.y + 30);
            bullet.body.velocity.y = 400;
            bulletTime2 = game.time.now + 500;
        }
    }
    
}

function resetBullet(bullet) {
    //  Вызывается, если пуля выходит за пределы экрана
    bullet.kill();
}

function restart() {
    //resets the life count
    lives.callAll('revive');
    lives2.callAll('revive');
    
    //revives the player
    player.revive();
    player2.revive();
    //hides the text
    stateText.visible = false;
}

