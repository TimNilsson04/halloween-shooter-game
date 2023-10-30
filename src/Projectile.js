export default class Projectile {
  constructor(game, x, y, angle, directionX, directionY) {
    this.game = game
    this.width = 10
    this.height = 10
    this.x = x
    this.y = y
    this.angle = angle
    this.directionX = directionX
    this.directionY = directionY

    this.speed = 10
    this.damage = 1
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

    context.fillStyle = '#ff0'
    context.fillRect(this.x, this.y, this.width, this.height)
    // context.restore()

  }
}
