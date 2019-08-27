(function () {
  PIXI = require('../node_modules/pixi.js/dist/pixi.min.js')
  let type = "WebGL"
  if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
  }

  let app = new PIXI.Application({width: 256, height: 256});
  
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  
  document.body.appendChild(app.view);
  
  function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;

    key.downHandler = event => {
      if (event.key === key.value) {
        //if (key.isUp && key.press) key.press();
        if (key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };

    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };

    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);

    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );

    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };

    return key;
  }
  
  let middleX = app.renderer.width / 2;
  let middleY = app.renderer.height / 2;
  
  // Character selection screen grid
  let characterSelectionColumns = 5;
  let characterSelectionRows = 1;
  
  let player1selection = new PIXI.Graphics();
  player1selection.lineStyle(4, 0xFF0000, 1);
  player1selection.moveTo(0, 0);
  player1selection.lineTo(64, 0);
  player1selection.lineTo(64, 64);
  player1selection.lineTo(0, 64);
  player1selection.lineTo(0, 0);
  player1selection.pivot.set(32, 32);
  player1selection.x = middleX - (characterSelectionColumns / 2) * 64;
  player1selection.y = middleY;
  app.stage.addChild(player1selection);
  
  let player2selection = new PIXI.Graphics();
  player2selection.lineStyle(4, 0xFFFF00, 1);
  player2selection.moveTo(0, 0);
  player2selection.lineTo(64, 0);
  player2selection.lineTo(64, 64);
  player2selection.lineTo(0, 64);
  player2selection.lineTo(0, 0);
  player2selection.pivot.set(32, 32);
  player2selection.x = middleX + (characterSelectionColumns / 2) * 64;
  player2selection.y = middleY;
  app.stage.addChild(player2selection);
  
  PIXI.loader.add([
    "sprites/Sonic Battle.png"
  ]).load(setup);
  
  function setup() {
    let sprite = new PIXI.Sprite(
      PIXI.loader.resources["sprites/Sonic Battle.png"].texture
    );
    sprite.pivot.set(20, 29);
    app.stage.addChild(sprite);
    
    sprite.x = middleX;
    sprite.y = middleY;
  }
  
  let characterSelectionA = keyboard("a");
  characterSelectionA.press = () => {
    player1selection.x -= 64;
  }
  let characterSelectionD = keyboard("d");
  characterSelectionD.press = () => {
    player1selection.x += 64;
  }
  let characterSelectionW = keyboard("w");
  characterSelectionW.press = () => {
    player1selection.y -= 64;
  }
  let characterSelectionS = keyboard("s");
  characterSelectionS.press = () => {
    player1selection.y += 64;
  }
  
  let characterSelectionLeft = keyboard("ArrowLeft");
  characterSelectionLeft.press = () => {
    player2selection.x -= 64;
  }
  let characterSelectionRight = keyboard("ArrowRight");
  characterSelectionRight.press = () => {
    player2selection.x += 64;
  }
  let characterSelectionUp = keyboard("ArrowUp");
  characterSelectionUp.press = () => {
    player2selection.y -= 64;
  }
  let characterSelectionDown = keyboard("ArrowDown");
  characterSelectionDown.press = () => {
    player2selection.y += 64;
  }
})()