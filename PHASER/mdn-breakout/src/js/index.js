const game = new Phaser.Game(
  480,
  320,
  Phaser.AUTO,
  null, {
      preload: preload,
      create : create,
      update : update
  });

let ball = null;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    // поменять фон канваса
    game.stage.backgroundColor = '#444000';
    //                 имя
    game.load.image('ball', './src/img/ball.png');
}

function create() {
  // чтобы вывести наш мяч на экран, мы используем  метод add.sprite()
  // последний параметр — это имя ↓ картинки
  ball = game.add.sprite(50, 50, 'ball');
}

function update() {}
