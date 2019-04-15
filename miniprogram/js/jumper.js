let context = canvas.getContext('2d')

export default class Jumper {
  constructor(){
    console.log(canvas.width, canvas.height)
    this.image = new Image()
    this.image.src = 'images/test.jpg'
    this.draw(this.image)
  }
  draw(image){
    this.image.onload = function(){
        context.drawImage(image, 0, 0, 100, 100)
        console.log('onload')
    }
    context.drawImage(image, 0, 0, 100, 100)
  }
}