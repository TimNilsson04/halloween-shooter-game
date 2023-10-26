export default class Projectile {
  constructor(game, x, y, angle, direction, directionY) {
    this.game = game
    this.width = 10
    this.height = 4
    this.x = x
    this.y = y
    this.angle = angle
    this.direction = direction
    this.directionY = directionY

    this.speed = 400
    this.damage = 1
    this.markedForDeletion = false
  }

  update(deltaTime) {
    // const velocity = {
    //   x: this.speed * Math.cos(this.angle),
    //   y: this.speed * Math.sin(this.angle),
    // }

    this.x += this.speed * this.direction
    this.y += this.speed * this.directionY
    if (this.x > this.game.width + this.game.x) {
      this.markedForDeletion = true
    } else if (this.x < this.game.x) {
      this.markedForDeletion = true
    }

    // this.x += velocity.x * (deltaTime / 1000)
    // this.y += velocity.y * (deltaTime / 1000)

    // if (this.x > this.game.width) {
    //   this.markedForDeletion = true
    // }
  }

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.fillStyle = '#ff0'
    context.fillRect(0, 0, this.width, this.height)
    context.restore()
  }
}
