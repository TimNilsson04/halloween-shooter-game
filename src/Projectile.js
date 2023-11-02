export default class Projectile {
  constructor(game, directionX, directionY) {
    this.game = game
    this.x = 0
    this.y = 0
    this.directionX = directionX
    this.directionY = directionY

    this.markedForDeletion = false
  }

  update(deltaTime) {



    this.x += this.speed * this.directionX
    this.y += this.speed * this.directionY
    if (this.x > this.game.width + this.game.x) {
      this.markedForDeletion = true
    } else if (this.x < this.game.x) {
      this.markedForDeletion = true
    }

  }

  draw(context) {
    // context.save()
    // context.translate(this.x, this.y)
    // context.rotate(this.angle)

    context.fillStyle = '#a702ed'
    context.fillRect(this.x, this.y, this.width, this.height)
    // context.restore()

  }
}
