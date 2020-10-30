let app;

window.onload = function () {
  app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0xebdbb2,
  });

  document.body.appendChild(app.view);

  player = new PIXI.Sprite.from("images/player.png");
  player.anchor.set(0.5);
  player.x = app.view.width / 2;
  player.y = app.view.height / 2;

  app.stage.addChild(player);
};
