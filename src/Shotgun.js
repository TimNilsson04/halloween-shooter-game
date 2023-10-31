import Projectile from "./Projectile"

export default class Shotgun extends Projectile {
    constructor(game, x, y, directionX, directionY) {
        super(game)
        this.game = game
        this.width = 5
        this.height = 5
        this.x = x
        this.y = y

        this.directionX = directionX
        this.directionY = directionY

        this.speed = 10
        this.damage = 0.5
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
}
