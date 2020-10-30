let app;

window.onload = function () {
  app = new PIXI.Application({
    width: 1080,
    height: 720,
    backgroundColor: 0xebdbb2,
  });

  document.body.appendChild(app.view);

  player = new PIXI.Sprite.from("images/hulk64.png");
  player.anchor.set(0.5);
  player.x = app.view.width * 0.05,  // spawns player at bottom left of screen
  player.y = app.view.height - 40, //^^
  player.x_velocity = 0,
  player.y_velocity = 0,
  player.jumping = false


  app.stage.addChild(player);
  window.addEventListener("keydown", controller.keyListener)
  window.addEventListener("keyup", controller.keyListener)

  app.ticker.add(gameLoop)
}

controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state
        console.log(controller)
        break
      case 65: // a key
        controller.left = key_state
        console.log(controller)
        break
      case 38: // up key
        controller.up = key_state
        console.log(controller)
        break
      case 32: // spacebar
        controller.up = key_state
        console.log(controller)
        break
      case 87: // w key
        controller.up = key_state
        console.log(controller)
        break
      case 39: // right key
        controller.right = key_state
        console.log(controller)
        break
      case 68: // d key
        controller.right = key_state
        console.log(controller)
        break
    }
  }
}

function gameLoop(){

  if (controller.up && player.jumping == false) {
    player.y_velocity -= 25
    player.jumping = true
  }

  if (controller.left) {
    player.x_velocity -= 0.4
    player.scale.x = -1
  }

  if (controller.right) {
    player.x_velocity += 0.4
    player.scale.x = 1
  }

  player.y_velocity += 0.6 // gravity
  player.x += player.x_velocity // horizontal movement
  player.y += player.y_velocity // vertical movement
  player.x_velocity *= 0.92 // friction
  player.y_velocity *= 0.92 // friction

  // if player is falling below window
  if (player.y > app.view.height - 40 ) {
    player.jumping = false
    player.y = app.view.height - 40
    player.y_velocity = 0
  }

  // if player is going off the left of the screen
  if (player.x < 0 ){
    player.x = app.view.width
  } else if (player.x > app.view.width) {
    // if player goes past right boundary
    player.x = 0
  }
}