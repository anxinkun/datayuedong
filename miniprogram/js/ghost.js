
export default class Ghost {
  constructor (width, height){
      this.x = 0
      this.y = 0
      this.image_src = ''
      this.width = width
      this.height = height
    }
    
    drawToCanvas(x, y, context){
      let image = new Image()
      image.src = this.image_src
      this.x = x
      this.y = y
      context.drawImage(
      image,
      x,y,
      this.width,this.height
      )
    }
}