const IMAGE_SRC = 'images/start.jpg'
const IMAGE_SRC_X = 180
const IMAGE_SRC_Y = 250
const IMAGE_SRC_WIDTH = 450
const IMAGE_SRC_HEIGHT = 140
const IMAGE_X = window.innerWidth/2 - 100
const IMAGE_Y = window.innerHeight/2
const IMAGE_WIDTH = 200
const IMAGE_HEIGHT = 75

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