const context = canvas.getContext('2d')
let move_x = []
let move_y = []
export default class Jumper {
  constructor(){
    this.x = 0
    this.y = 0
    this.alive = true
    this.imageSrc = 'images/test.jpg'
    this.drawToCanvas(this.x,this.y)
    this.event_listener(this.jump, this);
  }

  drawToCanvas(x, y){
    let image = new Image()
    image.src = this.imageSrc

    image.onload = function(){
    context.drawImage(
      image,
      x,y,
      100,100,
      )
      console.log('OK!')
    }
  }

  event_listener(jump, jumper){
    wx.onTouchStart(function(e){
      jumper.touched = true
      console.log("Start: ", e.touches)
    })
    wx.onTouchMove(function(e){
      if(move_x.length > 3){
        move_x.shift()
        move_y.shift()
      }
      move_x.push(e.touches[0].clientX)
      move_y.push(e.touches[0].clientY)
      console.log("MoveX: ", move_x, "MoveY: ", move_y)
    })
    wx.onTouchEnd(function(e){
      console.log("End", jump(jumper), "Jumper.touched: ", jumper.touched)
      this.touched = false
    })
    wx.onTouchCancel(function(e){
      console.log("Cancel: ", e.touches)
    })
  }

  jump(jumper){
    let length = move_x.length
    if (move_y[length - 1] - move_y[length - 2] < 0 && jumper.touched){
      return true;
    } else {
      return false;
    }
  }
}