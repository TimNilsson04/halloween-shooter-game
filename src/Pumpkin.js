import Enemy from './Enemy.js'
import deadChild from './assets/enemy/deadChild.webp'

export default class Pumpkin extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 29
    this.height = 35
    this.x = x
    this.y = y
    this.speed = 2
    this.lives = Math.floor(Math.random() * 3) + 1
    this.color = 'orange'

    const dead = new Image()
    dead.src = deadChild
    this.dead = dead

    this.frameXPumpkin = 0
    this.frameYPumpkin = 1
    this.maxFramePumpkin = 8
    this.fpsPumpkin = 20
    this.timerPumpkin = 0
    this.intervalPumpkin = 1000 / this.fps

    this.flipPumpkin = false
  }

  update(player) {
    const dx = player.x - this.x // calculate the x distance to the player
    const dy = player.y - this.y // calculate the y distance to the player
    const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
    const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
    const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
    this.x += speedX // move the enemy towards the player on the x axis
    this.y += speedY // move the enemy towards the player on the y axis


    if (speedX < 0) {
      this.flipPumpkin = false
    } else if (speedX > 0) {
      this.flipPumpkin = true
    }

    console.log()
  }

  draw(context) {

    if (this.game.debug) {
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.fillStyle = 'white'
      context.font = '20px Arial'
      context.fillText(this.lives, this.x, this.y - 5)
      context.font = '12px Arial'
      context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
      context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
    }

    if (this.flipPumpkin) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.dead,
      this.frameXPumpkin * this.width,
      this.frameYPumpkin * this.height - 34,
      this.width,
      this.height,
      this.flipPumpkin ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

    context.restore()
  }
}
