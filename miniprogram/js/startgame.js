const IMAGE_SRC = 'images/start_button.png'
const IMAGE_SRC_X = 0
const IMAGE_SRC_Y = 0
const IMAGE_SRC_WIDTH = 349
const IMAGE_SRC_HEIGHT = 260
const IMAGE_X = window.innerWidth/2 - IMAGE_SRC_WIDTH/2 + 40
const IMAGE_Y = window.innerHeight/2 - 60
const IMAGE_WIDTH = IMAGE_SRC_WIDTH
const IMAGE_HEIGHT = IMAGE_SRC_HEIGHT

let image = new Image()
let atlas = new Image()
atlas.src = 'images/Common.png'
image.src = IMAGE_SRC


export default class StartGame{
  render_start_game(context){
    context.drawImage(atlas, 205, 30, 40, 40, window.innerWidth / 2 - 150, window.innerHeight / 2 - 110, 300, 300)
    context.fillStyle = "#a0ff00"
    context.font    = "30px Arial"
    context.fillText(
      "Data跃动",
      window.innerWidth / 2 - 150 + 90,
      window.innerHeight / 2 - 110 + 130
      )

    context.drawImage(
      image,
      IMAGE_SRC_X, IMAGE_SRC_Y,
      IMAGE_SRC_WIDTH, IMAGE_SRC_HEIGHT,
      IMAGE_X, IMAGE_Y,
      IMAGE_WIDTH, IMAGE_HEIGHT
    )

    this.start_area = {
      start_x: IMAGE_X,
      end_x: IMAGE_X + IMAGE_WIDTH,
      start_y: IMAGE_Y,
      end_y: IMAGE_Y + IMAGE_HEIGHT
    }
  }
}