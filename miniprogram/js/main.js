import Jumper from './jumper'
import Enemy from './npc/enemy'
import DataBus from './databus'
import GameInfo from './runtime/gameinfo'
import Background from './background';
import StartGame from './startgame';

let databus = new DataBus()
wx.cloud.init()
const db = wx.cloud.database()

const context = canvas.getContext('2d')
window.move_x = []
window.move_y = []
window.delta_t = 1000/60 //帧间隔
window.horizantal = 400 //水平线
window.v = 400
window.i = 0

export default class Main {
  constructor(){
    this.aniId = 0
    this.restart.bind(this)()
    this.event_listener = this.event_listener.bind(this)
    this.event_listener()
    this.score = 0
    this.score_update_id = 0
    this.maxscore = 0
    this.is_score_updating = false
    this.openid = 0
    this.isstart = false
    this.has_start_event = false
    this.isdeading = false
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        this.openid = res.result.openid
      },
      fail: err => {
        console.error('get openid failed with error', err)
      }
    })
  }
  // 触摸监听
  event_listener(){
    wx.onTouchStart( ((e) => {
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
    }).bind(this) )
    wx.onTouchCancel(function(e){
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
    this.score = 0
    this.isdeading = false
    this.should_play = false
    this.bg = new Background()
    this.startgame = new StartGame()

    // 清除上一局的动画
    cancelAnimationFrame(this.aniId);
    this.aniId = requestAnimationFrame(this.bindLoop)
  }

  //碰撞检测
  colision_detect() {
    databus.enemys.forEach((item) => {
      if (item.y + 30 - (this.jumper.y + 50) < 40 && item.y + 30 - (this.jumper.y + 50) > -40){
        if (item.x + 30 - (this.jumper.x + 50) < 40 && item.x + 30 - (this.jumper.x + 50) > -40){
          this.jumper.alive = false
          wx.cloud.callFunction({
            name: 'add',
            // data 字段的值为传入云函数的第一个参数 event
            data: {
              score: this.score
            },
            success: res => {
            },
            fail: err => {
              console.error(err)
            }
          })
    db.collection('User').doc(this.openid).field({
        score: true
      }).get()
        .then(res => {
              // res.data 包含该记录的数据
          if (this.score < res.data.score)  
            this.maxscore = res.data.score
          else
            this.maxscore = this.score
        })
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

    this.bg.render(context)


    // jumper.drawToCanvas(context)
    databus.enemys
      .forEach((item) => {
        item.play_animation(context)
        item.drawToCanvas(context)
      })

    
    this.jumper.play_animation(context)
    this.jumper.drawToCanvas(context)

    this.gameinfo.renderGameScore(context, this.score)

    if(!this.isstart){
      this.startgame.render_start_game(context)
      if(!this.has_start_event){
        this.has_start_event = true
        this.touchHandler = this.touchStartHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }

    if(this.should_play){
      this.gameinfo.renderGameOver(
        context,
        this.score,
        this.maxscore
      )
      if (!this.hasEventBind) {
        this.hasEventBind = true
        this.touchHandler = this.touchEventHandler.bind(this)
        canvas.addEventListener('touchstart', this.touchHandler)
      }
    }

    if (!this.jumper.alive) {
      let that = this
      if(!this.isdeading){
        this.isdeading = true
        setTimeout(function () {
          that.should_play = true
        }, 1000)
      }
    }
  }

  // 游戏逻辑更新主函数
  update() {
    if (!this.jumper.alive || this.isstart == false){// || this.isstart == false
      if(this.is_score_updating){
        this.is_score_updating = false
        clearInterval(this.score_update_id)
      }
      return;
    }
    this.bg.update()
    this.socre_update()
    databus.enemys
      .forEach((item) => {
        item.update()
      })

    if (this.jumper.isjump()){
      this.jumper.jumping()
    }
    if(this.jumper.islieing){
      this.jumper.lieing()
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

  touchStartHandler(e) {
    e.preventDefault()

    let x = e.touches[0].clientX
    let y = e.touches[0].clientY

    let area = this.startgame.start_area
    if (x >= area.start_x
      && x <= area.end_x
      && y >= area.start_y
      && y <= area.end_y){
        this.isstart = true
        canvas.removeEventListener("touchstart", this.touchHandler)
      }
  }

  // 实现游戏帧循环
  loop() {
    //人物死亡后停止帧循环
    // if(!this.jumper.alive){
    //   return;
    // }
    databus.frame++

    this.update()
    this.render()

    // this.aniId = window.requestAnimationFrame(
    //   this.bindLoop,
    //   canvas
    // )
    this.aniId = requestAnimationFrame(this.bindLoop)
  }

  //实现记分
  score_update_step(){
    this.score++
  }

  socre_update(){
    if(!this.is_score_updating){
      this.is_score_updating = true
      this.score_update_id = setInterval(this.score_update_step.bind(this), 1000)
    }
    if(!this.jumper.alive){
      this.is_score_updating = false
      clearInterval(this.score_update_id)
    }
  }
}


