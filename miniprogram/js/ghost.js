
export default class Ghost {
  constructor (width, height){
      this.x = 0
      this.y = 0
      this.image_src = ''
      this.width = width
      this.height = height
      this.image = new Image()
      this.visible = true
    }
    
    drawToCanvas(context){
      this.image.src = this.image_src
      context.drawImage(
      this.image,
      this.x,this.y,
      this.width,this.height
      )
    }
}