const context = canvas.getContext('2d')
let move_x = []
let move_y = []
let delta_t = 1000/60 //帧间隔
let horizantal = 400 //水平线
let v = 150
let i = 0

export default class Jumper {
  constructor(){
    this.x = 0
    this.y = 0
    this.alive = true //判断人物是否活着
    this.is_action = false //是否触屏幕
    this.imageSrc = 'images/test.jpg'
    this.weight = 10 //人物质量，用于实现跳跃逻辑
    this.v = v //跳跃初速度
    this.drawToCanvas(75, horizantal)
    this.event_listener(this)
    // this.test()
    setInterval(this.test, delta_t, this)
    // this.jumping()
    // this.test_sleep()
  }

  drawToCanvas(x, y){
    let image = new Image()
    image.src = this.imageSrc
    this.x = x
    this.y = y
    image.onload = function(){
    context.drawImage(
      image,
      x,y,
      100,100,
      )
    }
  }

  // 触摸监听
  event_listener(jumper){
    wx.onTouchStart(function(e){
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
      console.log("End", jumper.is_lied(jumper), "Jumper.is_action: ", jumper.is_action)
    })
    wx.onTouchCancel(function(e){
      console.log("Cancel: ", e.touches)
    })
  }

  // 判断跳跃
  isjump(jumper){
    let length = move_x.length
    if (move_y[length - 1] - move_y[length - 2] < 0 && jumper.is_action){
      return true;
    } else {
      return false;
    }
  }

  // 半段蹲伏
  is_lied(jumper){
    let length = move_x.length
    if (move_y[length - 1] - move_y[length - 2] > 0 && jumper.is_action){
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

  test(jumper){
    if (jumper.isjump(jumper)){
      jumper.jumping()
      context.clearRect(0, 0, canvas.width, canvas.height)
      jumper.drawToCanvas(jumper.x, jumper.y)
    } else {
      // console.log("Jumping finished.")
    }
    if (jumper.is_lied(jumper) && i < 60){
      i++
    } else if (i == 60){
      i = 0
      jumper.is_action = false
    }
  }
}