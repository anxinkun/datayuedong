import Jumper from './jumper'

const context = canvas.getContext('2d')
window.move_x = []
window.move_y = []
window.delta_t = 1000/60 //帧间隔
window.horizantal = 400 //水平线
window.v = 150
window.i = 0

export default class Main {
  constructor(){
    let jumper = new Jumper(v)
    jumper.drawToCanvas(75, horizantal, context)
    this.event_listener(jumper)
    setInterval(this.test, delta_t, jumper)
  }

  test(jumper){
    if (jumper.isjump(jumper)){
      jumper.jumping()
      jumper.drawToCanvas(jumper.x, jumper.y, context)
      context.clearRect(0, 0, canvas.width, canvas.height)
    }
    if (jumper.islied(jumper) && i < 60){
      i++
    } else if (i == 60){
      i = 0
      jumper.is_action = false
    }
  }

  // 触摸监听
  event_listener(jumper){
    wx.onTouchStart(function(e){
      console.log("start: ", move_x, move_y)
      move_x = []
      move_y = []
      jumper.is_action = true
    })
    wx.onTouchMove(function(e){
      if(move_x.length > 3){
        move_x.shift()
        move_y.shift()
      }
      move_x.push(e.touches[0].clientX)
      move_y.push(e.touches[0].clientY)
    })
    wx.onTouchEnd(function(e){
      console.log("End", jumper.islied(jumper), "Jumper.isaction: ", jumper.is_action)
    })
    wx.onTouchCancel(function(e){
      console.log("Cancel: ", e.touches)
    })
  }
}


