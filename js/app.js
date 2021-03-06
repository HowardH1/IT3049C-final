//declare global variables here
  //must declare spritesheets as global objects
let app
let playerSheet = {}
let rooms = 3
let ticker = PIXI.Ticker.shared

//initial load function
window.onload = function () {
  app = new PIXI.Application({
    width: 1200,
    height: 600,
    backgroundColor: 0xebdbb2,
  })
  document.body.appendChild(app.view)

  //use this space to pre-load commonly used assets
  app.loader.add('player', 'images/skeleton64x.png')

  app.loader.load(doneLoading)
}

//use this function to call other startup functions after load
function doneLoading(){
  createPlayerSheet()
  createPlayer()
  createRoom()
  app.ticker.add(gameLoop)
}

//player sprite properties here
function createPlayerSheet(){
  let spriteSheet = new PIXI.BaseTexture.from(app.loader.resources['player'].url)
  let w = 64
  let h = 64
  let numFrames = 4

  playerSheet['standIdle'] = [
    new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1 * w, 0, w, h))
  ]

  playerSheet['walking'] = [
    new PIXI.Texture(spriteSheet, new PIXI.Rectangle(0 * w, 0, w, h)),
    new PIXI.Texture(spriteSheet, new PIXI.Rectangle(1 * w, 0, w, h)),
    new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2 * w, 0, w, h)),
    new PIXI.Texture(spriteSheet, new PIXI.Rectangle(3 * w, 0, w, h))
  ]
}

//player properties here
function createPlayer(){
  player = new PIXI.AnimatedSprite(playerSheet.standIdle)
  player.anchor.set(0.5)
  player.animationSpeed = 0.1
  player.loop = false
  player.x = app.view.width * 0.05  // spawns player at bottom left of screen
  player.y = app.view.height - 40 //^^
  player.x_velocity = 0
  player.y_velocity = 0
  player.jumping = false
  player.inRoom = 1
  app.stage.addChild(player)
}

//load objects for each room here
function createRoom(){
  switch (player.inRoom) {
    case 1:
      //create room indicator
      {
      indicator = PIXI.Sprite.from('images/1.png')
      indicator.anchor.set(0.5)
      indicator.x = app.view.width / 2
      indicator.y = app.view.height / 2
      app.stage.addChild(indicator)
      }

      break
  
    case 2:
      //create room indicator
      {
      indicator = PIXI.Sprite.from('images/2.png')
      indicator.anchor.set(0.5)
      indicator.x = app.view.width / 2
      indicator.y = app.view.height / 2
      app.stage.addChild(indicator)
      }
      break

    case 3:
      //create room indicator
      {
      indicator = PIXI.Sprite.from('images/3.png')
      indicator.anchor.set(0.5)
      indicator.x = app.view.width / 2
      indicator.y = app.view.height / 2
      app.stage.addChild(indicator)
      }
      break
  }
}

//modify game properties here
function gameLoop(){
  if (controller.up && player.jumping == false) {
    player.y_velocity -= 20
    player.jumping = true
  }

  if (controller.left) {
    if(!player.playing){
      player.textures = playerSheet.walking
      player.play()
    }
    player.x_velocity -= 0.4
    player.scale.x = -1
  }

  if (controller.right) {
    if(!player.playing){
      player.textures = playerSheet.walking
      player.play()
    }
    player.x_velocity += 0.4
    player.scale.x = 1
  }

  player.y_velocity += 0.6 // gravity
  player.x += player.x_velocity // horizontal movement
  player.y += player.y_velocity // vertical movement
  player.x_velocity *= 0.92 // friction
  player.y_velocity *= 0.92 // friction

  // if player is falling below window
  if (player.y > app.view.height - 32 ) {
    player.jumping = false
    player.y = app.view.height - 32
    player.y_velocity = 0
  }

  // player is in leftmost room
  if (player.inRoom == 1){
    // left boundary
    if (player.x < 18 ){
      player.x = 18
    }
    // right boundary
    else if (player.x > app.view.width) {  
      player.inRoom+=1
      player.x = 0
      app.stage.removeChild(indicator)
      app.loader.load(createRoom)
    }
  } 

  // player is in rightmost room
  else if (player.inRoom == rooms){
    // left boundary
    if (player.x < 0 ){
      player.inRoom-=1
      player.x = app.view.width
      app.stage.removeChild(indicator)
      app.loader.load(createRoom)
    }
    // right boundary
    else if (player.x > app.view.width - 18) {  
      player.x = app.view.width - 18
    }
  } 

  // player is in middle rooms
  else{
    // if player goes past left boundary
    if (player.x < 0 ){
      player.inRoom-=1
      player.x = app.view.width
      app.stage.removeChild(indicator)
      app.loader.load(createRoom)
    } 
    // if player goes past right boundary
    else if (player.x > app.view.width) {  
      player.inRoom+=1
      player.x = 0
      app.stage.removeChild(indicator)
      app.loader.load(createRoom)
    }
  }

  // console.log('player is in room #' + player.inRoom)
}

//read keyboard input here
controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    var key_state = event.type == 'keydown' ? true : false

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state
        break
      case 65: // a key
        controller.left = key_state
        break
      case 38: // up key
        controller.up = key_state
        break
      case 32: // spacebar
        controller.up = key_state
        break
      case 87: // w key
        controller.up = key_state
        break
      case 39: // right key
        controller.right = key_state
        break
      case 68: // d key
        controller.right = key_state
        break
    }
  }
}
window.addEventListener('keydown', controller.keyListener)
window.addEventListener('keyup', controller.keyListener)