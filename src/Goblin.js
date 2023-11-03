import Enemy from './Enemy.js'
import goldenFreddy from './assets/enemy/goldenFreddy.webp'

export default class Goblin extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 23
        this.height = 16
        this.x = x
        this.y = y
        this.speed = 5
        this.lives = 1
        this.color = '#90EE90'

        const golden = new Image()
        golden.src = goldenFreddy
        this.golden = golden

        this.frameXgolden = 0
        this.frameYgolden = 1
        this.maxFramegolden = 8
        this.fpsgolden = 20
        this.timergolden = 0
        this.intervalgolden = 1000 / this.fps

        this.flipgolden = false
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
            this.flipgolden = false
        } else if (speedX > 0) {
            this.flipgolden = true
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

        if (this.flipgolden) {
            context.save()
            context.scale(-1, 1)
        }

        context.drawImage(
            this.golden,
            this.frameXgolden * this.width,
            this.frameYgolden * this.height - 15,
            this.width,
            this.height,
            this.flipgolden ? this.x * -1 - this.width : this.x,
            this.y,
            this.width,
            this.height
        )

        context.restore()
    }
}
