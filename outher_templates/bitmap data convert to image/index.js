
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
  
  game.load.image('pic', 'assets/pics/questar.png');
  game.load.image('mask', 'assets/pics/mask-test2.png');
  
}

function create() {
  game.stage.backgroundColor = 0x4d4d4d;
  
  game.add.text(64, 10, 'Source image', { font: '16px Arial', fill: '#ffffff' })
  game.add.text(400, 10, 'Alpha mask', { font: '16px Arial', fill: '#ffffff' })
  
  const pic = game.make.image(64, 32, 'pic');
  const maks = game.make.image(400, 32, 'mask');
  const bmd = game.make.bitmapData(320, 256);
  
  const myImage = game.add.image(game.world.centerX, 320, bmd)
  game.world.add(pic)
  game.world.add(maks)
  
  this.game.add.tween(myImage)
    .to({
      alpha: 0,
    }, Phaser.Timer.SECOND, Phaser.Easing.Linear.None, true)
    .yoyo(true)
    .repeat(-1)

  //	And create an alpha mask image by combining pic and mask from the cache
  bmd.alphaMask('mask', 'pic',);
}

