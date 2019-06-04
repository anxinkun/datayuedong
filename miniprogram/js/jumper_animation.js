import Ghost from './ghost'
// import DataBus from './databus';

// datebus = new DataBus

export default class JumperAnimation extends Ghost{
constructor(){
  super(100, 100)
  this.frame_count = 0
  this.frame_num = 0
  this.running_image_list = []
  this.dead_image_list = []
  this.jump_image_list = []
  this.down_image_list = []
  this.isplaying = false
  this.interval_id = 0
}

  //加载动画图片路径
  onload_frames(frames, operate){
    if(operate === 1)
      frames.forEach((item) => {
        this.running_image_list.push(item)
      })
    else if(operate === 2){
      frames.forEach((item) => {
        this.dead_image_list.push(item)
      })
    }
    else if(operate === 3){
      frames.forEach((item) => {
        this.jump_image_list.push(item)
      })
    }
    else if(operate === 4){
      frames.forEach((item) => {
        this.down_image_list.push(item)
      })
    }
    else {
      console.log("Err in onload_frames")
    }
    
  }

  draw_ani(context){
    
    // context.drawImage(
    //   this.image_list[this.frame_num],
    //   this.x, this.y,
    //   this.width, this.height
    // )
    // console.log(this)
    if(this.alive){
      // console.log(this.isjump())
      if(this.isjump()) {//跳跃
        if(this.frame_num >= 15){
          this.frame_num = 0
        }
        this.image_src = this.jump_image_list[this.frame_num]
      } else if(this.islied()) {//蹲伏
        if(this.frame_num >= 20){
          this.frame_num = 0
        }
        this.image_src = this.down_image_list[this.frame_num]
        // console.log("lieing!")
      }
      else {
        if(this.frame_num >= 8){//跑动
          this.frame_num = 0
        }
        this.image_src = this.running_image_list[this.frame_num]
      }
    } else {
      if(this.frame_num >= 18){//死亡
        return
      }
      this.image_src = this.dead_image_list[this.frame_num]
    }
    if(this.frame_num > 19){
      console.log("Err in draw_ani")
    }
    // console.log(this.alive)
    // console.log("width: " + this.width + " height: " + this.height)
    // console.log("hello?")
    // console.log(this)
    // console.log(this.image_list[this.frame_num])
    this.frame_num ++
  }

  play_animation(context){
    this.bind_draw = this.draw_ani.bind(this)
    if(!this.isplaying){
      this.isplaying = true
      // console.log(this)
      this.interval_id = setInterval(this.bind_draw, 1000/30, context)
    }
    // this.draw_ani(context)
  }
}