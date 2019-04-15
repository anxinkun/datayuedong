const context = canvas.getContext('2d')
let image = wx.createImage()
export default class Jumper {
  constructor(){
    console.log(canvas.width, canvas.height)
    image.src = 'images/test.jpg'
    image.onload = function(){
        context.drawImage(image,0,0,300,300,0,0,100,100)
        console.log('ok!',image.width, image.height)
    }
  }
}