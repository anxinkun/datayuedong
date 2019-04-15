const context = canvas.getContext('2d')

export default class Jumper {
  constructor(){
    this.x = 0
    this.y = 0
    this.imageSrc = 'images/test.jpg'
    this.drawToCanvas(this.x,this.y)
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
}