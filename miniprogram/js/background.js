import Ghost from "./ghost";

const IMAGE_SRC = "images/back"
const IMAGE_WIDTH = 890
const IMAGE_HEIGHT = 600

export default class Background extends Ghost{
  constructor(){
    super(IMAGE_WIDTH, IMAGE_HEIGHT)
    this.visible = true
    this.x = 0
    this.y = 0
    this.image1 = new Image()
    this.image2 = new Image()
    this.image1.src = IMAGE_SRC + '1.jpg'
    this.image2.src = IMAGE_SRC + '2.jpg'
    this.which_order = true
    this.end = 0 //背景的最右段，为了循环播放
  }

  //更新背景
  update(){
    if(this.end > -IMAGE_WIDTH){
      this.end --
    } else {
      if(this.which_order){
        this.which_order = false
        this.image1.src = IMAGE_SRC + '2.jpg'
        this.image2.src = IMAGE_SRC + '1.jpg'
      }
      else {
        this.which_order = true
        this.image1.src = IMAGE_SRC + '1.jpg'
        this.image2.src = IMAGE_SRC + '2.jpg'
      }
      this.end = 0
    }
  }

  render(context){
    context.drawImage(
      this.image1,
      0,0,
      IMAGE_WIDTH, IMAGE_HEIGHT,
      this.end, 25,
      IMAGE_WIDTH, IMAGE_HEIGHT
    )
    
    context.drawImage(
      this.image2,
      0,0,
      IMAGE_WIDTH, IMAGE_HEIGHT,
      this.end + IMAGE_WIDTH, 25,
      IMAGE_WIDTH, IMAGE_HEIGHT
    )
  }
}