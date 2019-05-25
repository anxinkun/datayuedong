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
let jumper = new Jumper()

export default class Main {
  constructor(){
    this.aniId = 0
    this.restart()
    this.event_listener = this.event_listener.bind(this)
    this.event_listener()
    this.score = 0
    this.score_update_id = 0
    this.is_score_updating = false
  }

  // 触摸监听
  event_listener(){
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
    }).bind(this) )

    wx.onTouchEnd( ((e) => {
    }).bind(this) )
    wx.onTouchCancel(function(e){
      // console.log("Cancel: ", e.touches)
    })
  }

  restart() {
    databus.reset()
    // canvas.removeEventListener(
    //   'touchstart',
    //   this.touchHandler
    // )
    this.bindLoop = this.loop.bind(this)
    this.hasEventBind = false

    // 清除上一局的动画
    window.cancelAnimationFrame(this.aniId);

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  //碰撞检测
  colision_detect() {
    databus.enemys.forEach((item) => {
      // console.log(item.y)
      if (item.y - jumper.y < 30 && item.y - jumper.y > -30){
        if (item.x - jumper.x < 30 && item.x - jumper.x > -30)
        console.log("mayday! mayday!")
        jumper.alive = false
      }
    })
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

    // jumper.drawToCanvas(context)
    databus.enemys
      .forEach((item) => {
        item.drawToCanvas(context)
      })

    
    jumper.play_animation(context)
    jumper.drawToCanvas(context)
    this.socre_update()

    // databus.animations.forEach((ani) => {
    //   if (ani.isPlaying) {
    //     ani.aniRender(context)
    //   }
    // })
  }

  // 游戏逻辑更新主函数
  update() {
    databus.enemys
      .forEach((item) => {
        item.update()
      })

      if (jumper.isjump()){
        jumper.jumping()
      }
    this.enemyGenerate()
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++
    this.colision_detect()
    this.update()
    this.render()

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  //实现记分
  score_update_step(){
    this.score++
    console.log(this.score)
  }

  socre_update(){
    if(!this.is_score_updating){
      this.is_score_updating = true
      this.score_update_id = setInterval(this.score_update_step.bind(this), 1000)
    }
    if(!jumper.alive){
      console.log(jumper)
      clearInterval(this.score_update_id)
    }
  }
}


