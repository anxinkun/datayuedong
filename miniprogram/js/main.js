import Jumper from './jumper'

const context = canvas.getContext('2d')
window.move_x = []
window.move_y = []
window.delta_t = 1000/60 //帧间隔
window.horizantal = 400 //水平线
window.v = 150
window.i = 0
let jumper = new Jumper(v)

export default class Main {
  constructor(){
    this.jump_animation_id = 0
    jumper.drawToCanvas(75, horizantal, context)
    this.event_listener = this.event_listener.bind(this)
    this.event_listener(jumper)
    this.bindtest = this.test.bind(this)
    // setTimeout(jumper.drawToCanvas, 1000, 0, 0, context)
    // this.test = this.test.bind(jumper)
    // setInterval(this.test, delta_t, jumper)
  }
  test(){
    (() => {
      function repaint() {
        if (jumper.isjump()){
          requestAnimationFrame(repaint, canvas)
          jumper.jumping()
          // context.clearRect(0, 0, canvas.width, canvas.height)
          jumper.drawToCanvas(jumper.x, jumper.y, context)
        }
      }
      repaint()
    })()
    // console.log(this)
      console.log("is jumping!")
      // this.repaint()
    if (jumper.islied() && i < 60){
      i++
    } else if (i == 60){
      i = 0
      jumper.is_action = false
    }
    console.log("testing!")
  }

  // repaint(){
  //   if (jumper.isjump()){
  //     requestAnimationFrame(this.repaint.bind(this), canvas)
  //     jumper.jumping()
  //     context.clearRect(0, 0, canvas.width, canvas.height)
  //     jumper.drawToCanvas(jumper.x, jumper.y, context)
  //   }
  // }

  // 触摸监听
  event_listener(jumper){
    wx.onTouchStart( ((e) => {
      // console.log("start: ", move_x, move_y)
      move_x = []
      move_y = []
      jumper.is_action = true
    }).bind(this) )

    wx.onTouchMove( ((e) => {
      if(move_x.length > 3){
        move_x.shift()
        move_y.shift()
      }
      move_x.push(e.touches[0].clientX)
      move_y.push(e.touches[0].clientY)
      this.test()
    }).bind(this) )

    wx.onTouchEnd( ((e) => {
      // console.log("End", jumper.islied(jumper), "Jumper.isaction: ", jumper.is_action)
    }).bind(this) )
    wx.onTouchCancel(function(e){
      // console.log("Cancel: ", e.touches)
    })
  }
}


