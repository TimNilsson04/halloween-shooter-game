import Projectile from "./Projectile"

export default class Shotgun extends Projectile {
    constructor(game, x, y, angle, directionX, directionY) {
        super(game)
        this.game = game
        this.width = 5
        this.height = 5
        this.x = x
        this.y = y
        this.angle = angle

        this.directionX = directionX
        this.directionY = directionY

        this.speed = 10
        this.damage = 0.5
        this.markedForDeletion = false

    }

    update(deltaTime) {


        this.x += this.speed * this.directionX * Math.cos(this.angle)
        this.y += this.speed * this.directionY * Math.sin(this.angle)
        if (this.x > this.game.width + this.game.x) {
            this.markedForDeletion = true
        } else if (this.x < this.game.x) {
            this.markedForDeletion = true
        }

    }
}
