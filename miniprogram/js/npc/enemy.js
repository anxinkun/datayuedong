// import Animation from '../base/animation'
import DataBus   from '../databus'
// import Ghost from '../ghost';
import EnemyAnimation from '../enemy_animation';

const ENEMY_IMG_SRC = 'images/enemy/'
const ENEMY_WIDTH   = 60
const ENEMY_HEIGHT  = 60
const ENEMY_IMG_CONT = 4
window.horizantal = 400 //水平线

const __ = {
  speed: Symbol('speed')
}

let databus = new DataBus()

function rnd(start, end){
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends EnemyAnimation {
  constructor() {
    super(ENEMY_WIDTH, ENEMY_HEIGHT)
    this.init_frame.bind(this)()
  }

  init(speed) {
    this.x = window.innerWidth
    this.y = rnd(0, window.horizantal + 100 - ENEMY_HEIGHT)

    this[__.speed] = speed

    this.visible = true
  }

  init_frame(){
    let frames = []
    for(let i=0; i < ENEMY_IMG_CONT; i++){
      let src = ENEMY_IMG_SRC + i + '.png'
      frames.push(src);
    }
    this.onload_frames(frames)
  }

  // 每一帧更新障碍物位置
  update() {
    this.x -= this[__.speed]

    // 对象回收
    if ( this.x < -this.width )
      databus.removeEnemey(this)
  }
}
