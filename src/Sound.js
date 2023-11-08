import MarkiplierDie from './assets/sounds/MarkiplierDie.mp3'
import powerOutage from './assets/sounds/powerOutage.mp3'
import MarkFnaf from './assets/sounds/MarkFnaf.mp3'
import SexBomb from './assets/sounds/SexBomb.mp3'

export default class Sound {
  constructor(game) {
    this.game = game
    const a = new Audio()
    a.src = MarkiplierDie
    this.sound = a

    const b = new Audio()
    b.src = powerOutage
    this.soundEnding = b

    const bomb = new Audio()
    bomb.src = SexBomb
    this.SexBomb = bomb

    const mark = new Audio()
    mark.src = MarkFnaf
    this.MarkFnaf1 = mark
  }

  playSound() {
    this.sound.currentTime = 0
    this.sound.play()
  }
  playEndingSound() {
    this.soundEnding.currentTime = 0
    this.soundEnding.play()
  }
  playSexBomb() {
    this.SexBomb.currentTime = 0
    this.SexBomb.play()
  }
  playMarkFnaf1() {
    this.MarkFnaf1.currentTime = 0
    this.MarkFnaf1.play()
  }
}
