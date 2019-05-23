import Ghost from './ghost'


export default class Jumper extends Ghost{
  constructor(v){
    super(100, 100)
    this.x = 0
    this.y = 0
    this.alive = true //判断人物是否活着
    this.is_action = false //是否触屏幕
    this.image_src = 'images/test.jpg'
    this.weight = 10 //人物质量，用于实现跳跃逻辑
    this.v = v //跳跃初速度
    this.isjump = this.isjump.bind(this)
    this.islied = this.islied.bind(this)
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

  initEvent(){
    canvas.addEventListener('touch_start', ((e) => {
      e.preventDefault()
      this.is_action = true
    }).bind(this))

    canvas.addEventListener('touche')
  }
}