import Jumper from './jumper'
import Enemy from './npc/enemy'
import DataBus from './databus'

let databus = new DataBus()

const context = canvas.getContext('2d')
window.move_x = []
window.move_y = []
window.delta_t = 1000/60 //帧间隔
window.horizantal = 400 //水平线
window.v = 150
window.i = 0

export default class Main {
  constructor(){
    this.aniId = 0
    this.restart()
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

  restart() {
    databus.reset()
    this.jumper = new Jumper(v)
    canvas.removeEventListener(
      'touchstart',
      this.touchHandler
    )
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * 随着帧数变化的敌机生成逻辑
   * 帧数取模定义成生成的频率
   */
  enemyGenerate() {
    if (databus.frame % 30 === 0) {
      let enemy = databus.pool.getItemByClass('enemy', Enemy)
      enemy.init(4)
      databus.enemys.push(enemy)
    }
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.drawToCanvas(context)
      })
    
    this.jumper.drawToCanvas(75, horizantal, context)
    this.event_listener(this.jumper)
    setInterval(this.test, delta_t, this.jumper)

    databus.animations.forEach((ani) => {
      if (ani.isPlaying) {
        ani.aniRender(context)
      }
    })
  }

  // 游戏逻辑更新主函数
  update() {
    databus.bullets
      .concat(databus.enemys)
      .forEach((item) => {
        item.update()
      })

    this.enemyGenerate()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}


