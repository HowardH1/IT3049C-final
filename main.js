// CUBE GAME //
//    authors:
// Corey Zaher
// Trent McGinnis
//
//

var context, controller, rectangle, loop;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = window.innerHeight - window.innerHeight * 0.1;
context.canvas.width = window.innerWidth - window.innerWidth * 0.1;

rectangle = {
  height: 32,
  jumping: true,
  width: 32,
  x: 144, // center of the canvas
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
};

controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function (event) {
    var key_state = event.type == "keydown" ? true : false;

    switch (event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 65: // a key
        controller.left = key_state;
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 32: // spacebar
        controller.up = key_state;
        break;
      case 87: // w key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
      case 68: // d key
        controller.right = key_state;
        break;
    }
  },
};

loop = function () {
  if (controller.up && rectangle.jumping == false) {
    rectangle.y_velocity -= 20;
    rectangle.jumping = true;
  }

  if (controller.left) {
    rectangle.x_velocity -= 0.5;
  }

  if (controller.right) {
    rectangle.x_velocity += 0.5;
  }

  rectangle.y_velocity += 1.5; // gravity
  rectangle.x += rectangle.x_velocity;
  rectangle.y += rectangle.y_velocity;
  rectangle.x_velocity *= 0.95; // friction
  rectangle.y_velocity *= 0.95; // friction

  // if rectangle is falling below floor line
  if (rectangle.y > context.canvas.height - 16 - 32) {
    rectangle.jumping = false;
    rectangle.y = context.canvas.height - 16 - 32;
    rectangle.y_velocity = 0;
  }

  // if rectangle is going off the left of the screen
  if (rectangle.x < -32) {
    rectangle.x = context.canvas.width;
  } else if (rectangle.x > context.canvas.width) {
    // if rectangle goes past right boundary

    rectangle.x = -32;
  }

  context.fillStyle = "#202020"; // game window bg color
  context.fillRect(0, 0, context.canvas.width, context.canvas.height); // x, y, width, height
  context.fillStyle = " #fe8019"; // player color
  context.beginPath();
  context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  context.fill();
  context.strokeStyle = "#fbf1c7"; // platform color
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, context.canvas.height - 16);
  context.lineTo(context.canvas.width, context.canvas.height - 16);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);
};

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
window.addEventListener("resize", () => {
  context.canvas.height = window.innerHeight - window.innerHeight * 0.1;
  context.canvas.width = window.innerWidth - window.innerWidth * 0.1;
});
