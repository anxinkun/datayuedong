const context = canvas.getContext('2d')
let image = wx.createImage()
export default class TestMain {
  constructor(){
    console.log(canvas.width, canvas.height)
    image.src = 'images/test.jpg'
    image.onload = function(){
        context.drawImage(image,0,0)
        console.log('ok!',image.width, image.height)
    }
    // context.fillStyle = 'red'
    // context.fillRect(0,0,100,100);
  }
}