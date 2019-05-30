import Ghost from './ghost'

export default class EnemyAnimation extends Ghost{
constructor(){
  super(60, 60)
  this.frame_count = 0
  this.frame_num = 0
  this.image_list = []
  this.isplaying = false
  this.interval_id = 0
}

  //加载动画图片路径
  onload_frames(frames){
    frames.forEach((item) => {
      this.image_list.push(item)
    })
  }

  draw_ani(context){
    if(this.frame_num > 3){
      this.frame_num = 0
    }
    this.image_src = this.image_list[this.frame_num]
    this.frame_num ++
  }

  play_animation(context){
    this.bind_draw = this.draw_ani.bind(this)
    if(!this.isplaying){
      this.isplaying = true
      this.interval_id = setInterval(this.bind_draw, 1000/20, context)
    }
  }
}