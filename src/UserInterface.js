

export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'

  }

  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(`Lives: ${this.game.player.lives}`, 20, 30)
    context.fillText(`Round: ${this.game.round}`, 20, 90)
    context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}s`, 20, 60)

    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
      context.fillText(
        `Your time: ${(this.game.gameTime * 0.001).toFixed(3)}s`,
        this.game.width / 2,
        this.game.height / 2 + 40
      )
      context.fillText(
        `Press r to restart`,
        this.game.width / 2,
        this.game.height / 2 + 100
      )
    }

    if (!this.game.gameStart) {
      context.fillStyle = "black"
      context.fillRect(this.game.width / 2 - 600, this.game.height / 2 - 300, 1200, 600)
      context.fillStyle = "#970AFC"
      context.shadowColor = 'black'
      context.fillText(
        `William Afton's Nightmare`,
        this.game.width / 2 - 570,
        this.game.height / 2 - 250,
      )
      context.fillText(
        `Instructions:`,
        this.game.width / 2 - 570,
        this.game.height / 2 - 200,
      )
      context.fillText(
        `Use the |W| |A| |S| |D| keys to move`,
        this.game.width / 2 - 570,
        this.game.height / 2 - 150,
      )
      context.fillText(
        `Use the arrow keys to shoot`,
        this.game.width / 2 - 570,
        this.game.height / 2 - 100,
      )
      context.fillText(
        `This is you =>`,
        this.game.width / 2 - 200,
        this.game.height / 2 + 10,
      )
      context.fillText(
        `These are the 1ups    =>`,
        this.game.width / 2 - 570,
        this.game.height / 2 + 80,
      )
      context.fillText(
        `These are the weapon upgrades    =>`,
        this.game.width / 2 - 570,
        this.game.height / 2 + 130,
      )
      context.fillText(
        `You can also teleport by going into the walls 😉`,
        this.game.width / 2 - 570,
        this.game.height / 2 + 180,
      )
      context.fillText(
        `This is a fast paced game so be ready!`,
        this.game.width / 2 - 570,
        this.game.height / 2 + 230,
      )
      context.fillText(
        `Good luck have fun  😊 One more tip, turn up the volume`,
        this.game.width / 2 - 570,
        this.game.height / 2 + 280,
      )
      context.fillStyle = "#0f0"
      context.fillRect(this.game.width / 2 - 290, this.game.height / 2 + 56, 32, 32)
      context.fillStyle = "#FF0000"
      context.fillRect(this.game.width / 2 - 145, this.game.height / 2 + 106, 32, 32)
      context.fillStyle = "#970AFC"
      context.fillText(
        `Press f to start`,
        this.game.width / 2 + 420,
        this.game.height / 2 + 280,
      )
    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
      context.fillText(
        `mouseX: ${this.game.input.mouseX}`,
        this.game.width - 20,
        75
      )
      context.fillText(
        `mouseY: ${this.game.input.mouseY}`,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed}`,
        this.game.width - 20,
        125
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
    }

    context.restore()
  }
}
