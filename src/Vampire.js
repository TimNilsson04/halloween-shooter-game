import Enemy from './Enemy.js'
import puppetChild from './assets/enemy/puppetChild.webp'

export default class Vampire extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 40
        this.height = 63
        this.x = x
        this.y = y
        this.speed = 1
        this.lives = Math.floor(Math.random() * (60 - 40) + 40)
        this.color = 'black'


        const puppet = new Image()
        puppet.src = puppetChild
        this.puppet = puppet

        this.frameXPuppet = 0
        this.frameYPuppet = 1
        this.maxFramePuppet = 8
        this.fpsPuppet = 20
        this.timerPuppet = 0
        this.intervalPuppet = 1000 / this.fps

        this.flipPuppet = false
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
            this.flipPuppet = false
        } else if (speedX > 0) {
            this.flipPuppet = true
        }
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

        if (this.flipPuppet) {
            context.save()
            context.scale(-1, 1)
        }

        context.drawImage(
            this.puppet,
            this.frameXPuppet * this.width,
            this.frameYPuppet * this.height - 64,
            this.width,
            this.height,
            this.flipPuppet ? this.x * -1 - this.width : this.x,
            this.y,
            this.width,
            this.height
        )

        context.restore()
    }
}
