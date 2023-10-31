import Projectile from './Projectile.js'
import Shoot from './Shoot.js'
import Shotgun from './Shotgun.js'
import playerArt from './assets/player/playerArt.webp'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 32
    this.height = 32
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []

    this.directionX;
    this.directionY;

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 6

    const image = new Image()
    image.src = playerArt
    this.image = image

    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 8
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    this.shootTimer = 0
    this.shootInterval = 50

    this.maxAmmo = 20
    this.ammo = 20
    this.ammoTimer = 0
    this.ammoInterval = 500

    this.lives = 10
  }

  update(deltaTime) {
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    // Moving
    if (this.game.keys.includes('a')) {
      this.speedX = -this.maxSpeed
    } else if (
      this.game.keys.includes('d')
    ) {
      this.speedX = this.maxSpeed
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('w')) {
      this.speedY = -this.maxSpeed
    } else if (
      this.game.keys.includes('s')
    ) {
      this.speedY = this.maxSpeed
    } else {
      this.speedY = 0
    }

    // Shooting
    if (this.shootTimer > this.shootInterval) {
      if (this.game.keys.includes('ArrowLeft')) {
        this.directionX = -1
        this.directionY = 0
        this.game.player.shoot()
      } else if (
        this.game.keys.includes('ArrowRight')
      ) {
        this.directionX = 1
        this.directionY = 0
        this.game.player.shoot()
      } else if (
        this.game.keys.includes('ArrowUp')) {
        this.directionY = -1
        this.directionX = 0
        this.game.player.shoot()
      } else if (
        this.game.keys.includes('ArrowDown')
      ) {
        this.directionY = 1
        this.directionX = 0
        this.game.player.shoot()
      }
      this.shootTimer = 0
    } else {
      this.shootTimer += deltaTime
    }

    if (this.x > this.game.width - 26 || this.x < 0) {
      this.x = this.speedX

    }

    if (this.y > this.game.height - 26 || this.y < 0) {
      this.y = this.speedY;
    }

    this.y += this.speedY
    this.x += this.speedX

    if (this.ammoTimer > this.ammoInterval && this.ammo < this.maxAmmo) {
      this.ammoTimer = 0
      this.ammo++
    } else {
      this.ammoTimer += deltaTime
    }

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )

  }

  draw(context) {
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)
    const dx = 10
    const dy = 10
    const angle = Math.atan2(dy, dx)
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const maxLength = 60
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }


    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })


    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height - 14,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

  }


  shoot() {
    this.projectiles.push(
      new Shoot(
        this.game, this.x + 12, this.y + 15, this.directionX, this.directionY
      )
    )
  }


  shotgun(angle) {
    console.log(angle)
    this.projectiles.push(
      new Shotgun(
        this.game, this.x + 12, this.y + 15, angle, this.directionX, this.directionY
      ),
      new Shotgun(
        this.game, this.x + 12, this.y + 15, angle + 5, this.directionX, this.directionY
      ),
      new Shotgun(
        this.game, this.x + 12, this.y + 15, angle - 5, this.directionX, this.directionY
      ),
      new Shotgun(
        this.game, this.x + 12, this.y + 15, angle, this.directionX, this.directionY
      ),
      new Shotgun(
        this.game, this.x + 12, this.y + 15, angle, this.directionX, this.directionY
      )
    )
  }
}

