// import Ghost from './ghost'
import Animation from './animation'

const RUNNING_ANIMATION_SRC = 'images/ProgressBar_Person/Person'
const DEAD_ANIMATION_SRC = 'images/explosion'
const JUMP_ANIMATION_SRC = 'images/jump/'
const RUNNING_ANIMATION_COUNT = 9
const DEAD_ANIMATION_COUNT = 19
const JUMP_ANIMATION_COUNT = 15
const RUNNING_LOAD = 1
const DEAD_LOAD = 2
const JUMP_LOAD = 3


export default class Jumper extends Animation{
  constructor(){
    super(100, 100)
    this.x = 75
    this.y = horizantal
    this.alive = true //判断人物是否活着
    this.is_action = false //是否触屏幕
    this.image_src = 'images/test.jpg'  //RUNNING_ANIMATION_SRC + '1.png'  //
    this.weight = 10 //人物质量，用于实现跳跃逻辑
    this.v = v //跳跃初速度
    this.isjump = this.isjump.bind(this)
    this.islied = this.islied.bind(this)
    this.visible = true
    console.log(this.image_src)
    this.init_run_frames.bind(this)()
    // this.init_animation_map()
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

  //加载动画图片
  init_run_frames(){
    this.read_animation_path(RUNNING_LOAD)
    this.read_animation_path(DEAD_LOAD)
    this.read_animation_path(JUMP_LOAD)
  }

  //载入动画路径
  read_animation_path(operator){
    let animation_src
    let animation_count
    let frames = []
    if(operator === RUNNING_LOAD){
      animation_src = RUNNING_ANIMATION_SRC
      animation_count = RUNNING_ANIMATION_COUNT
    } else if(operator === DEAD_LOAD){
      animation_src = DEAD_ANIMATION_SRC
      animation_count = DEAD_ANIMATION_COUNT
    } else if(operator === JUMP_LOAD){
      animation_src = JUMP_ANIMATION_SRC
      animation_count = JUMP_ANIMATION_COUNT
    }
    for(let i = 1; i < animation_count + 1; i++){
      let frame_path = animation_src + i + '.png'
      console.log("in init_run_frames: " + frame_path)
      frames.push(frame_path);
    }
    this.onload_frames(frames, operator)
  }

  // init_animation_map(){
  //   this.animation_map = [
  //     RUNNING_ANIMATION_SRC,
  //     DEAD_ANIMATION_SRC,

  //   ]
  // }

  // initEvent(){
  //   canvas.addEventListener('touch_start', ((e) => {
  //     e.preventDefault()
  //     this.is_action = true
  //   }).bind(this))

  //   canvas.addEventListener('touche')
  // }
}