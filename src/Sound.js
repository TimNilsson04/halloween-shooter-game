import MarkiplierDie from './assets/sounds/MarkiplierDie.mp3'
import powerOutage from './assets/sounds/powerOutage.mp3'

export default class Sound {
  constructor(game) {
    this.game = game
    const a = new Audio()
    a.src = MarkiplierDie
    this.sound = a

    const b = new Audio()
    b.src = powerOutage
    this.soundEnding = b
  }

  playSound() {
    this.sound.currentTime = 0
    this.sound.play()
  }
  playEndingSound() {
    this.soundEnding.currentTime = 0
    this.soundEnding.play()
  }
}
