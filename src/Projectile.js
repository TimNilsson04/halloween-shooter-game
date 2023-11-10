import knife from './assets/projectile/knife.png'

export default class Projectile {
  constructor(game, directionX, directionY) {
    this.game = game
    this.x = 0
    this.y = 0
    this.directionX = directionX
    this.directionY = directionY

    this.markedForDeletion = false

    const knifeSprite = new Image()
    knifeSprite.src = knife
    this.knifeSprite = knifeSprite

    this.flipKnifeX = false
    this.flipKnifeY = false

  }

  update(deltaTime) {



  }

  draw(context) {
    // context.save()
    // context.translate(this.x, this.y)
    // context.rotate(this.angle)

    // context.fillStyle = '#b40afc'
    // context.fillRect(this.x, this.y, this.width, this.height)
    // context.restore()

    if (this.flipKnife) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.knifeSprite,
      this.x,
      this.y,
      this.width,
      this.height,
      // this.flipKnife ? this.x * -1 - this.width : this.x,
    )

    context.restore()

  }
}
