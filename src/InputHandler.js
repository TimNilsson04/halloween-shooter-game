import Sound from './Sound.js'

export default class InputHandler {
  constructor(game) {
    this.game = game
    this.sound = new Sound(this.game)
    this.startOver = false
    this.random;

    window.addEventListener('keydown', (event) => {
      if (
        (event.key === 'w' ||
          event.key === 'a' ||
          event.key === 's' ||
          event.key === 'd') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)
      }

      if (
        (event.key === 'ArrowUp' ||
          event.key === 'ArrowDown' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight') &&
        this.game.keys.indexOf(event.key) === -1
      ) {
        this.game.keys.push(event.key)

      }


      if (event.key === 'p') {
        this.game.debug = !this.game.debug
      }

      if (event.key === 'f') {
        this.game.gameStart = true
        this.random = Math.random()
        if (this.random <= 0.25) {
          this.sound.playSound()
        } else if (this.random > 0.25 && this.random <= 0.5) {
          this.sound.playMarkFnaf1()
        }
        else if (this.random > 0.5 && this.random <= 0.75) {
          this.sound.playMarkFnaf2()
        }
        else if (this.random > 0.75) {
          this.sound.playMarkFnaf4()
        }
      }

      if (event.key === 'r') {
        this.game.gameOver = false
        this.game.player.lives = 3
        this.game.player.x = this.game.width / 2 - this.game.player.width / 2
        this.game.player.y = this.game.height / 2 - this.game.player.height / 2
        this.game.enemies.forEach((enemy) => {
          enemy.markedForDeletion = true
        })
        this.game.gameTime = 0
        this.game.sound.soundEnding.currentTime = 99
        this.random = Math.random()
        if (this.random <= 0.25) {
          this.sound.playSound()
        } else if (this.random > 0.25 && this.random <= 0.5) {
          this.sound.playMarkFnaf1()
        }
        else if (this.random > 0.5 && this.random <= 0.75) {
          this.sound.playMarkFnaf2()
        }
        else if (this.random > 0.75) {
          this.sound.playMarkFnaf4()
        }
      }

    })


    window.addEventListener('keyup', (event) => {
      if (this.game.keys.indexOf(event.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(event.key), 1)
      }
    })
  }
}
