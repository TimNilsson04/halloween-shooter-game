export default class Projectile {
  constructor(game, x, y, direction, directionY) {
    this.game = game
    this.width = 4
    this.height = 4
    this.x = x
    this.y = y
    this.direction = direction
    this.directionY = directionY

    this.speed = 8
    this.damage = 1
    this.markedForDeletion = false
  }

  update() {
    this.x += this.speed * this.direction
    this.y += this.speed * this.directionY
    if (this.x > this.game.width + this.game.x) {
      this.markedForDeletion = true
    } else if (this.x < this.game.x) {
      this.markedForDeletion = true
    }

  }

  draw(context) {
    context.fillStyle = '#ff0'
    context.fillRect(this.x, this.y, this.width, this.height)
  }
}
