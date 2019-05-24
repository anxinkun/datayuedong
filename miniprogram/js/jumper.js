// import Ghost from './ghost'
import Animation from './animation'

const ANIMATION_SRC = 'images/ProgressBar_Person/Person'
const ANIMATION_COUNT = 9


export default class Jumper extends Animation{
  constructor(){
    super(100, 100)
    this.x = 75
    this.y = horizantal
    this.alive = true //判断人物是否活着
    this.is_action = false //是否触屏幕
    this.image_src = 'images/test.jpg'  //ANIMATION_SRC + '1.png'  //
    this.weight = 10 //人物质量，用于实现跳跃逻辑
    this.v = v //跳跃初速度
    this.isjump = this.isjump.bind(this)
    this.islied = this.islied.bind(this)
    this.visible = true
    console.log(this.image_src)
    this.init_run_frames()
  }

  // 判断跳跃
  isjump(){
    let length = move_x.length
    if (move_y[length - 1] - move_y[length - 2] < 0 && this.is_action){
      return true;
    } else {
      return false;
    }
  }

  // 半段蹲伏
  islied(){
    let length = move_x.length
    if (move_y[length - 1] - move_y[length - 2] > 0 && this.is_action){
      return true;
    } else {
      return false;
    }
  }

  //跳跃位置的确定
  jumping(){
    let g = 200 //重力加速度
    this.v -= g * delta_t/1000
    this.y = this.y - (this.v * delta_t/1000 - 0.5 * v * delta_t/1000*delta_t/1000)
    if(this.y > horizantal){
      this.v = v
      this.is_action = false
    }
  }

  init_run_frames(){
    this.frame_count = ANIMATION_COUNT
    let frames = []
    for(let i = 1; i < ANIMATION_COUNT + 1; i++){
      let frame_path = ANIMATION_SRC + i + '.png'
      console.log("in init_run_frames: " + frame_path)
      frames.push(frame_path);
    }
    this.onload_frames(frames)
  }

  // initEvent(){
  //   canvas.addEventListener('touch_start', ((e) => {
  //     e.preventDefault()
  //     this.is_action = true
  //   }).bind(this))

  //   canvas.addEventListener('touche')
  // }
}