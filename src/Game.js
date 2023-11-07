import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Vampire from './Vampire.js'
import Goblin from './Goblin.js'
import Background from './Background.js'
import WeaponDrop from './WeaponDrop.js'

export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.background = new Background(this)

    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gameStart = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0
    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 1000
    this.round = 1

    this.dropTimer = 0
    this.dropInterval = 5000
    this.weaponUpgrade = 0

    this.player = new Player(this)
  }

  update(deltaTime) {
    if (this.gameOver || !this.gameStart) {
      return
    }
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }


    // this.enemyInterval = Math.pow()



    if (this.enemyTimer > this.enemyInterval) {
      let x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge
      let dropX = Math.floor(Math.random() * (1440 - 1) + 1)
      let dropY = Math.floor(Math.random() * (800 - 1) + 1)
      if (x === 0) {
        y = Math.random() * this.height // if on left edge, randomize y position
      } else if (x === this.width) {
        y = Math.random() * this.height // if on right edge, randomize y position
      }
      if (y === 0) {
        x = Math.random() * this.width // if on top edge, randomize x position
      } else if (y === this.height) {
        x = Math.random() * this.width // if on bottom edge, randomize x position
      }
      if (Math.random() < 0.6) {
        this.enemies.push(new Pumpkin(this, y, x))
      }
      if (Math.random() < 0.6) {
        this.enemies.push(new Pumpkin(this, x, y))
      }
      if (Math.random() < 0.03) {
        this.enemies.push(new Vampire(this, y, x))
      }
      if (Math.random() < 0.03) {
        this.enemies.push(new Vampire(this, x, y))
      }
      if (Math.random() < 0.2) {
        this.enemies.push(new Goblin(this, y, x))
      }
      if (Math.random() < 0.2) {
        this.enemies.push(new Goblin(this, x, y))
      }
      if (Math.random() < 0.005) {
        this.enemies.push(new WeaponDrop(this, dropX, dropY))
      }
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }


    this.player.update(deltaTime)

    this.enemies.forEach((enemy) => {
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {
        if (enemy.type !== 'weaponDrop') {
          this.player.lives--
          enemy.markedForDeletion = true
        }
        if (enemy.type === 'weaponDrop') {
          enemy.markedForDeletion = true
          this.player.lives++
          // if (this.dropTimer < this.dropInterval) {
          //   this.weaponUpgrade = 1
          //   // this.dropTimer = 0
          //   // for (let i = 0; i < 5000; i++) {


          // }

        }
      }
      console.log(this.dropTimer)
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.lives > 1) {
            enemy.lives -= projectile.damage
          } else {
            enemy.markedForDeletion = true
          }
          projectile.markedForDeletion = true
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)

  }



  draw(context) {
    this.background.draw(context)
    this.ui.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
