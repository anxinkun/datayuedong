import Ghost from './ghost'
// import DataBus from './databus';

// datebus = new DataBus

export default class Animation extends Ghost{
constructor(){
  super(100, 100)
  this.frame_count = 0
  this.frame_num = 0
  this.running_image_list = []
  this.dead_image_list = []
  this.isplaying = false
  this.interval_id = 0
}

  onload_frames(frames, operate){
    if(operate === 1)
      frames.forEach((item) => {
        this.running_image_list.push(item)
      })
    else {
      frames.forEach((item) => {
        this.dead_image_list.push(item)
      })
    }
  }

  draw_ani(context){
    this.frame_num ++
    // context.drawImage(
    //   this.image_list[this.frame_num],
    //   this.x, this.y,
    //   this.width, this.height
    // )
    // console.log(this)
    if(this.alive){
      this.image_src = this.running_image_list[this.frame_num]
      if(this.frame_num == 8){
        this.frame_num = 0
      }
    } else {
      this.image_src = this.dead_image_list[this.frame_num]
      if(this.frame_num == 18){
        this.frame_num = 0
      }
    }
    if(this.frame_num > 19){
      console.log("Err in draw_ani")
    }
    // console.log("width: " + this.width + " height: " + this.height)
    // console.log("hello?")
    // console.log(this)
    // console.log(this.image_list[this.frame_num])
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