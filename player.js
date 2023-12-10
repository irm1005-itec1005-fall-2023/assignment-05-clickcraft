export default class Player {

//alien jump

    jumpPressed = false;
    jumpInProgress = false;
    falling = false;
    jumpspeed = 0.6;
    gravity = 0.4;

    constructor(ctx, width, height, minjumpheight, maxjumpheight, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.minjumpheight = minjumpheight;
    this.maxjumpheight = maxjumpheight;
    this.scaleRatio = scaleRatio;
    
        this.x = 10 * scaleRatio;
        this.y = this.canvas.height - this.height - 1.5 * scaleRatio;
        this.ystandingposition = this.y;


        this.completeimage = new Image ();
        this.completeimage.src = "images/alien.gif";
        this.image = this.completeimage;
        //key listeners

        window.removeEventListener('keydown', this.keydown);
        window.removeEventListener('keyup', this.keyup);

        window.addEventListener('keydown', this.keydown);
        window.addEventListener('keyup', this.keyup);
        //touch
        window.removeEventListener('touchstart', this.touchstart);
        window.removeEventListener('touchend', this.touchend);


        window.addEventListener('touchstart', this.touchstart);
        window.addEventListener('touchend', this.touchend);


}

    touchstart = () => { 
        this.jumpPressed = true;
    };
    touchend = () => {
        this.jumpPressed = false;
    };


    keydown = (event) => {
      if (event.code === 'Space') {
        this.jumpPressed = true;
      }
    };

    
    keyup = (event) => {     
        if (event.code === 'Space') {
          this.jumpPressed = false;
        }
      };

      update(gamespeed, frameTimeDelta) {
       // console.log(this.jumpPressed);
        this.run(gamespeed, frameTimeDelta);
        this.jumpInProgress(frameTimeDelta);
      }

      jump(frameTimeDelta){
        if (this.jumpPressed) {
            this.jumpInProgress = true;
        }

        if (this.jumpInProgress && !this.falling) {
            if (this.y > this.canvas.height - this.minjumpheight ||
                (this.y > this.canvas.height - this.maxjumpheight && this.jumpPressed)) {
                    this.y -= this.jumpspeed * frameTimeDelta * this.scaleRatio;
                }
            else {
                this.falling = true;
            }
        }
        else {
            if(this.y < this.ystandingposition){
                this.y += this.gravity * frameTimeDelta * this.scaleRatio;
            if(this.y + this.height > this.canvas.height){
                this.y = this.ystandingposition;
            }
            else {
                this.falling = false;
                this.jumpInProgress = false;
            }
            }

        
        }
      }

      update(gamespeed, frameTimeDelta) {
        console.log(this.jumpPressed);
        this.jump(frameTimeDelta);
      }


    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    };
}