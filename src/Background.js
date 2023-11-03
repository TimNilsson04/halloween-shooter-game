import backgroundImage from './assets/background/backgroundImage.jpg'
// import backgroundAnimatronics from './assets/background'
import purpleBackgroundDarken from './assets/background/purpleBackgroundDarken.webp'
import Layer from './Layer'

export default class Background {
  constructor(game) {
    this.game = game
    const background = new Image()
    background.src = purpleBackgroundDarken
    this.backgroundLayer = new Layer(this.game, background, 1708, 500, 0.1)
    this.layers = [
      this.backgroundLayer
    ]
  }

  update() {
    this.layers.forEach((layer) => layer.update())
  }

  draw(context) {
    this.layers.forEach((layer) => layer.draw(context))
  }
}
