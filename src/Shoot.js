import Projectile from "./Projectile"

export default class Shoot extends Projectile {
    constructor(game, x, y, directionX, directionY) {
        super(game)
        this.game = game
        this.width = 10
        this.height = 10
        this.x = x
        this.y = y
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
}
