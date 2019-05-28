import Ghost from "./ghost";

const IMAGE_SRC = "images/background.jpg"
const IMAGE_WIDTH = 430
const IMAGE_HEIGHT = 508

export default class Background extends Ghost{
  constructor(){
    super(IMAGE_WIDTH, IMAGE_HEIGHT)
    this.visible = true
    this.x = 0
    this.y = 0
    this.image = new Image()
    this.image.src = IMAGE_SRC
    this.end = IMAGE_WIDTH //背景的最右段，为了循环播放
    console.log(this.image.width)
    console.log(this.image.height)
    console.log(window.innerHeight)
    console.log(window.innerWidth)
  }

  //更新背景
  update(){
    if(this.end > 0){
      this.end --
    } else {
      this.end = IMAGE_WIDTH
    }
  }

  render(context){
    console.log(this)
    context.drawImage(
      this.image,
      0,0,
      this.width, this.height,
      this.end - window.innerWidth, 40,
      window.innerWidth, window.innerHeight
    )

    context.drawImage(
      this.image,
      0,0,
      this.width, this.height,
      this.end, 40,
      window.innerWidth, window.innerHeight
    )
  }
}