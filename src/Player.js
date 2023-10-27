import Projectile from './Projectile.js'

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

    console.log(this.speedX)




  }

  draw(context) {
    context.fillStyle = '#f00'
    context.fillRect(this.x, this.y, this.width, this.height)
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = 16
      const dy = 16
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }



    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })
  }

  shoot() {
    // get angle between player and mouse
    // const angle = Math.atan2(
    //   16,
    //   16
    // )


    // if (this.ammo > 0) {
    this.projectiles.push(
      new Projectile(
        this.game, this.x + 12, this.y + 15, 0, this.directionX, this.directionY
      )
    )

    // } else {
    //   console.log('out of ammo')
    // }
  }
}

