/* eslint-disable */
import * as PIXI from 'pixi.js'

const wrapper = document.querySelector('.wrapper')

console.log(wrapper)

const app = new PIXI.Application({
  width: 400,
  height: 400,
  transparent: false,
  antialias: true
});

app.renderer.backgroundColor = '0x24495D'

// The application will create a canvas element for you that you
wrapper.append(app.view);


// load the texture we need
app.loader.add('bunny', 'bunny.png').load((loader, resources) => {
  // This creates a texture from a 'bunny.png' image
  const bunny = new PIXI.Sprite(resources.bunny.texture);

  // Setup the position of the bunny
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
  });
});

console.log(app)
