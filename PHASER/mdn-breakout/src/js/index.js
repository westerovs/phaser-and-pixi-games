const game = new Phaser.Game(480, 320, Phaser.AUTO, null, {preload: preload, create: create, update: update});

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    // поменять фон канваса
    game.stage.backgroundColor = '#444000';
}

function create() {}
function update() {}
