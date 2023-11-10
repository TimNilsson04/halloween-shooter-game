import MarkiplierDie from './assets/sounds/MarkiplierDie.mp3'
import powerOutage from './assets/sounds/powerOutage.mp3'
// import MarkFnaf from './assets/sounds/MarkFnaf.mp3'
// import SexBomb from './assets/sounds/SexBomb.mp3'
import MarkFnaf2 from './assets/sounds/MarkFnaf2.mp3'
import MarkFnaf1 from './assets/sounds/MarkFnaf1.mp3'
import MarkFnaf4 from './assets/sounds/MarkFnaf4.mp3'

export default class Sound {
  constructor(game) {
    this.game = game
    const a = new Audio()
    a.src = MarkiplierDie
    this.sound = a

    const b = new Audio()
    b.src = powerOutage
    this.soundEnding = b

    const fnaf1 = new Audio()
    fnaf1.src = MarkFnaf1
    this.MarkFnaf1 = fnaf1

    const mark = new Audio()
    mark.src = MarkFnaf4
    this.MarkFnaf4 = mark

    const mark2 = new Audio()
    mark2.src = MarkFnaf2
    this.MarkFnaf2 = mark2
  }

  playSound() {
    this.sound.currentTime = 0
    this.sound.play()
  }
  playEndingSound() {
    this.soundEnding.currentTime = 0
    this.soundEnding.play()
  }
  playMarkFnaf1() {
    this.MarkFnaf1.currentTime = 0
    this.MarkFnaf1.play()
  }
  playMarkFnaf4() {
    this.MarkFnaf4.currentTime = 0
    this.MarkFnaf4.play()
  }
  playMarkFnaf2() {
    this.MarkFnaf2.currentTime = 0
    this.MarkFnaf2.play()
  }
}
