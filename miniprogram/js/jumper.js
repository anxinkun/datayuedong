// import Ghost from './ghost'
import Animation from './animation'
import Music from './runtime/music'

const RUNNING_ANIMATION_SRC = 'images/ProgressBar_Person/Person'
const DEAD_ANIMATION_SRC = 'images/explosion'
const JUMP_ANIMATION_SRC = 'images/jump/'
const DOWN_ANIMATION_SRC = 'images/down/'
const RUNNING_ANIMATION_COUNT = 9
const DEAD_ANIMATION_COUNT = 19
const JUMP_ANIMATION_COUNT = 15
const DOWN_ANIMATION_COUNT = 7
const RUNNING_LOAD = 1
const DEAD_LOAD = 2
const JUMP_LOAD = 3
const DOWN_LOAD = 4


export default class Jumper extends Animation{
  constructor(){
    super(100, 100)
    this.jumpe_num = 1
    this.lied_num = 1 
    this.x = 75
    this.y = horizantal
    this.alive = true //判断人物是否活着
    this.is_action = false //是否触屏幕
    this.lied_interval = 0 //蹲伏长度
    this.image_src = 'images/test.jpg'  //RUNNING_ANIMATION_SRC + '1.png'  //
    this.weight = 10 //人物质量，用于实现跳跃逻辑
    this.v = v //跳跃初速度
    this.isjump = this.isjump.bind(this)
    this.islied = this.islied.bind(this)
    this.visible = true
    console.log(this.image_src)
    this.init_run_frames.bind(this)()
    this.music = new Music()
    // this.init_animation_map()
  }

  // 判断跳跃
  isjump(){
    let length = move_x.length
    if (move_y[length - 1] - move_y[length - 2] < 0 && this.is_action){
      if (this.jumpe_num==1){
        this.music.playExplosion()
        this.jumpe_num ++
      }
      return true;
    } else {
      return false;
    }
  }

  // 半段蹲伏
  islied(){
    let length = move_x.length
    // console.log(this.is_action)
    if (move_y[length - 1] - move_y[length - 2] > 0 && this.is_action){
      if (this.lied_num == 1) {
        this.music.playExplosion()
        this.lied_num ++
      }
      console.log(this.lied_num)
      if(this.lied_interval >= 30){
        this.lied_interval = 0
        this.is_action = false
        this.lied_num = 1
      }
      this.lied_interval ++
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
      this.jumpe_num = 1
    }
  }

  //加载动画图片
  init_run_frames(){
    this.read_animation_path(RUNNING_LOAD)
    this.read_animation_path(DEAD_LOAD)
    this.read_animation_path(JUMP_LOAD)
    this.read_animation_path(DOWN_LOAD)
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
    } else if(operator === DOWN_LOAD){
      animation_src = DOWN_ANIMATION_SRC
      animation_count = DOWN_ANIMATION_COUNT
    }
    for(let i = 1; i < animation_count + 1; i++){
      let frame_path = animation_src + i + '.png'
      console.log("in init_run_frames: " + frame_path)
      frames.push(frame_path);
    }
    this.onload_frames(frames, operator)
  }
}