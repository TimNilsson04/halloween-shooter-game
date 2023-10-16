export default class Layer {
  constructor(game, image, width, height, speedModifier) {
    this.game = game
    this.image = image
    this.width = width
    this.height = height
    this.speedModifier = speedModifier
    this.x = 0
    this.y = 0
  }

  update() {
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x -= this.game.speed * this.speedModifier
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y)
    context.drawImage(this.image, this.x + this.width, this.y)
  }
}
