import Jumper from './jumper'
import Enemy from './npc/enemy'
import DataBus from './databus'
import GameInfo from './runtime/gameinfo'

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
      this.jumper.is_action = true
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
      console.log("touched end")
    }).bind(this) )
    wx.onTouchCancel(function(e){
      // console.log("Cancel: ", e.touches)
    })
  }

  restart() {
    databus.reset()
    canvas.removeEventListener(
      'touchstart',
       this.touchHandler
    )
    this.jumper = new Jumper()
    this.gameinfo = new GameInfo()
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
      if (item.y + 30 - (this.jumper.y + 50) < 80 && item.y + 30 - (this.jumper.y + 50) > -80){
        if (item.x + 30 - (this.jumper.x + 50) < 80 && item.x + 30 - (this.jumper.x + 50) > -80){
          console.log("mayday! mayday!")
          this.jumper.alive = false
        }
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

    
    this.jumper.play_animation(context)
    this.jumper.drawToCanvas(context)
    this.socre_update()

    this.gameinfo.renderGameScore(context, this.score)

    if (!this.jumper.alive) {
      this.gameinfo.renderGameOver(
        context,
        0,
        0
      )

      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }

    // databus.animations.forEach((ani) => {
    //   if (ani.isPlaying) {
    //     ani.aniRender(context)
    //   }
    // })
  }

  // 游戏逻辑更新主函数
  update() {
    if (!this.jumper.alive)
      return;
    databus.enemys
      .forEach((item) => {
        item.update()
      })

      if (this.jumper.isjump()){
        this.jumper.jumping()
      }
    this.enemyGenerate()
    this.colision_detect()
  }

  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.gameinfo.btnArea

    if (x >= area.startX
      && x <= area.endX
      && y >= area.startY
      && y <= area.endY)
      this.restart()
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
    if(!this.jumper.alive){
      // console.log(jumper)
      this.is_score_updating = false
      clearInterval(this.score_update_id)
    }
  }
}


