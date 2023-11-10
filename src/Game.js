import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Vampire from './Vampire.js'
import Goblin from './Goblin.js'
import Background from './Background.js'
import WeaponDrop from './WeaponDrop.js'
import Sound from './Sound.js'
import OneUp from './OneUp.js'

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
    this.enemyInterval = 100
    this.round = 0

    this.dropTimer = 0
    this.dropInterval = 5000
    this.weaponUpgrade = 0

    this.song;
    this.newRandom;

    this.weaponTimer


    this.player = new Player(this)

    this.sound = new Sound(this.game)
  }

  update(deltaTime) {
    if (this.gameOver || !this.gameStart) {
      return
    }
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }



    this.round = 1 + Math.floor(this.gameTime / 25000)

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
      if (Math.random() < 0.009) {
        this.enemies.push(new OneUp(this, dropX, dropY))
      }
      if (Math.random() < 0.02) {
        dropX = Math.floor(Math.random() * (1440 - 1) + 1)
        dropY = Math.floor(Math.random() * (800 - 1) + 1)
        this.enemies.push(new WeaponDrop(this, dropX, dropY))
      }
      this.enemyTimer = 0
    } else {
      if (this.round >= 10) {
        this.enemyTimer += Math.pow(this.round + 1, 2) / 100
      } else if (this.round >= 7) {
        this.enemyTimer += Math.pow(this.round + 1, 2) / 65
      } else if (this.round >= 5) {
        this.enemyTimer += Math.pow(this.round + 1, 2) / 40
      } else if (this.round >= 3) {
        this.enemyTimer += Math.pow(this.round + 1, 2) / 20
      } else {
        this.enemyTimer += Math.pow(this.round + 1, 2) / 5
      }
    }


    this.player.update(deltaTime)

    if (this.weaponTimer > this.gameTime) {
      this.weaponUpgrade = 1
    } else {
      this.weaponUpgrade = 0
    }

    this.enemies.forEach((enemy) => {
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {
        if (enemy.type !== 'oneup' && enemy.type !== 'weapondrop') {
          this.player.lives--
          enemy.markedForDeletion = true
        }
        if (enemy.type === 'oneup') {
          enemy.markedForDeletion = true
          this.player.lives++
        }
        if (enemy.type === 'weapondrop') {
          enemy.markedForDeletion = true
          // this.player.lives += 0
          this.weaponTimer = this.gameTime + 20000
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.type === 'oneup' || enemy.type === 'weapondrop') {
            return
          }
          else if (enemy.lives > 1) {
            enemy.lives -= projectile.damage
          } else {
            enemy.markedForDeletion = true
          }
          projectile.markedForDeletion = true
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)



    if (this.input.sound.sound.currentTime > 180 || this.input.sound.MarkFnaf1.currentTime > 168 || this.input.sound.MarkFnaf2.currentTime > 170 || this.input.sound.MarkFnaf4.currentTime > 174) {
      this.input.sound.sound.pause()
      this.input.sound.MarkFnaf1.pause()
      this.input.sound.MarkFnaf2.pause()
      this.input.sound.MarkFnaf4.pause()
      this.input.random = Math.random()
      // console.log(this.input.random)
      if (this.input.random <= 0.25) {
        this.input.sound.playSound()
      } else if (this.input.random > 0.25 && this.input.random <= 0.5) {
        this.input.sound.playMarkFnaf1()
      }
      else if (this.input.random > 0.5 && this.input.random <= 0.75) {
        this.input.sound.playMarkFnaf2()
      }
      else if (this.input.random > 0.75) {
        this.input.sound.playMarkFnaf4()
      }
    }

    // console.log(this.input.sound.sound.currentTime)

    if (this.gameOver) {
      this.input.sound.sound.pause()
      this.input.sound.MarkFnaf1.pause()
      this.input.sound.MarkFnaf4.pause()
      this.input.sound.MarkFnaf2.pause()
      this.sound.playEndingSound()
    }
  }



  draw(context) {
    this.background.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
    this.ui.draw(context)
    this.player.draw(context)
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
