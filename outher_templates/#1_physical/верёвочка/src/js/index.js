var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', {preload: preload, create: create});

function preload() {
  game.load.image('clouds', 'src/img/clouds.jpg');
  game.load.spritesheet('chain', 'src/img/chain.png', 16, 26);
}

function create() {
  game.add.tileSprite(0, 0, 800, 600, 'clouds');
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1200;
  
  //  Length, xAnchor, yAnchor
  createRope(40, 400, 64);
}

function createRope(length, xAnchor, yAnchor) {
  var newRect;
  var lastRect;
  var height   = 20;        //  Height for the physics body - your image height is 8px
  var width    = 16;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
  var maxForce = 20000;   //  The force that holds the rectangles together.
  
  for (var i = 0; i <= length; i++) {
    var x = xAnchor;                    //  All rects are on the same x position
    var y = yAnchor + (i * height);     //  Every new rect is positioned below the last
    
    if (i % 2 === 0) {
      //  Add sprite (and switch frame every 2nd time)
      newRect = game.add.sprite(x, y, 'chain', 1);
    } else {
      newRect = game.add.sprite(x, y, 'chain', 0);
      lastRect.bringToTop();
    }
    
    //  Enable physicsbody
    game.physics.p2.enable(newRect, false);
    
    //  Set custom rectangle
    newRect.body.setRectangle(width, height);
    
    if (i === 0) {
      newRect.body.static = true;
    } else {
      //  Anchor the first one created
      newRect.body.velocity.x = 400;      //  Give it a push :) just for fun
      newRect.body.mass       = length / i;     //  Reduce mass for evey rope element
    }
    
    //  After the first rectangle is created we can add the constraint
    if (lastRect) {
      game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
    }
    
    lastRect = newRect;
  }
}


// import Controls from './Controls.js'
//
// class Game {
//   constructor() {
//     this.game    = null
//
//     this.rect    = null
//     this.rectGoal = null
//     this.image1   = null
//     this.image2   = null
//
//     this.cursors = null
//     this.controls = null
//   }
//
//   init() {
//     this.game = new Phaser.Game(
//       1366,
//       1366,
//       Phaser.CANVAS,
//       null,
//       {
//         preload: this.preload,
//         create : this.create,
//         update : this.update,
//         render : this.render
//       })
//   }
//
//   preload = () => {
//     this.game.load.image('bg', '/src/img/background.jpg')
//     this.game.load.image('sprite1', '/src/img/item_panel1.jpg')
//     this.game.load.image('sprite2', '/src/img/item_panel2.jpg')
//   }
//
//   create = () => {
//     console.log(Phaser)
//     // this.game.physics.startSystem(Phaser.Physics.NINJA);
//
//     // this.game.add.sprite(0, 0, 'bg')
//     // this.cursors = this.game.input.keyboard.createCursorKeys()
//     // // this.rect  = this.createRect(200, 200, 100, 100, '0x0FFA9')
//     //
//     // this.image1 = this.createImage('sprite1', 200, 200)
//     // this.image2 = this.createImage('sprite2', 400, 200, 30)
//     // this.game.physics.enable( [ this.image1, this.image2 ], Phaser.Physics.ARCADE);
//     //
//     // this.image1.body.velocity.x = 40;
//     // this.image2.body.velocity.x = -40;
//   }
//
//   update = () => {
//     // this.game.physics.arcade.collide(this.image1, this.image2, this.collisionHandler, null, this);
//     //
//     // // ARROWS
//     // if (this.cursors.up.isDown) {
//     //   this.rect.position.y -= 10
//     // } else if (this.cursors.down.isDown) {
//     //   this.rect.position.y += 10
//     // }
//     // if (this.cursors.left.isDown) {
//     //   this.rect.position.x -= 10
//     // } else if (this.cursors.right.isDown) {
//     //   this.rect.position.x += 10
//     // }
//   }
//
//   collisionHandler = (obj1, obj2) => {
//     //  The two sprites are colliding
//     console.warn('BOOM')
//     this.game.stage.backgroundColor = '#992d2d';
//   }
//
//
//   createImage = (key, x = 0, y = 0, angle) => {
//     const image = this.game.add.sprite(x, y, key)
//     image.angle = angle
//
//     image.events.onDragStart.add(this.onDragStart, this)
//     image.events.onDragUpdate.add(this.onDragUpdate, this)
//     image.events.onDragStop.add(this.onDragStop, this)
//
//     image.inputEnabled = true
//     image.input.enableDrag()
//
//     image.events.onDragStart.add(this.onDragStart, this)
//     image.events.onDragUpdate.add(this.onDragUpdate, this)
//     image.events.onDragStop.add(this.onDragStop, this)
//
//     return image
//   }
//
//   createRect = (x, y, w, h, color = '0x000000') => {
//     const rect = this.game.add.graphics(x, y)
//     rect.beginFill(color)
//     rect.drawRect(0, 0, w, h)
//     rect.endFill()
//     rect.angle = 60
//
//     rect.inputEnabled = true
//     rect.input.enableDrag()
//
//     rect.events.onDragStart.add(this.onDragStart, this)
//     rect.events.onDragUpdate.add(this.onDragUpdate, this)
//     rect.events.onDragStop.add(this.onDragStop, this)
//
//     return rect
//   }
//
//   onDragStart = () => {
//     // console.log('onDragStart')
//   }
//
//   onDragUpdate = (element) => {
//     console.log('position', element.position.x)
//     console.log('worldPosition', element.worldPosition.x)
//     console.log('')
//   }
//
//   onDragStop = () => {
//     // console.log('onDragStop')
//   }
// }
//
// new Game().init()
//
