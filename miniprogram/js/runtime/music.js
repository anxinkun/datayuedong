let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
    this.bgmAudio.src  = 'audio/bgm.mp3'

    this.jumpeAudio     = new Audio()
    this.jumpeAudio.src = 'audio/jumpe.mp3'

    this.lieAudio     = new Audio()
    this.lieAudio.src = 'audio/lie.mp3'

    this.playBgm()
  }

  playBgm() {
    this.bgmAudio.play()
  }

  playJumpe() {
    this.jumpeAudio.currentTime = 0
    this.jumpeAudio.play()
  }

  playLie() {
    this.lieAudio.currentTime = 0
    this.lieAudio.play()
  }
}
