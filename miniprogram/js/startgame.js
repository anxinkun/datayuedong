const IMAGE_SRC = 'images/start_button.png'
const IMAGE_SRC_X = 0
const IMAGE_SRC_Y = 0
const IMAGE_SRC_WIDTH = 349
const IMAGE_SRC_HEIGHT = 260
const IMAGE_X = window.innerWidth/2 - IMAGE_SRC_WIDTH/2 + 50
const IMAGE_Y = window.innerHeight/2
const IMAGE_WIDTH = IMAGE_SRC_WIDTH
const IMAGE_HEIGHT = IMAGE_SRC_HEIGHT

let image = new Image()
image.src = IMAGE_SRC


export default class StartGame{
  render_start_game(context){
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