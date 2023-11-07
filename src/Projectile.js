import knife from './assets/projectile/knife.png'

export default class Projectile {
  constructor(game, directionX, directionY) {
    this.game = game
    this.x = 0
    this.y = 0
    this.directionX = directionX
    this.directionY = directionY

    this.markedForDeletion = false

    const image = new Image()
    image.src = knife
    this.image = image

    this.frameXKnife = 0
    this.frameYKnife = 1
    this.animationIntervalKnife = 1000 / this.animationFps

    this.flip = false

  }

  update(deltaTime) {



    this.x += this.speed * this.directionX
    this.y += this.speed * this.directionY
    if (this.x > this.game.width + this.game.x) {
      this.markedForDeletion = true
    } else if (this.x < this.game.x) {
      this.markedForDeletion = true
    }

    if (this.directionX < 0) {
      this.flip = false
    } else if (this.directionY > 0) {
      this.flip = true
    }

  }

  draw(context) {
    // context.save()
    // context.translate(this.x, this.y)
    // context.rotate(this.angle)

    context.fillStyle = '#b40afc'
    context.fillRect(this.x, this.y, this.width, this.height)
    // context.restore()

    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.image,
      this.frameXKnife * this.width,
      this.frameYKnife * this.height,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

    context.restore()

  }
}
