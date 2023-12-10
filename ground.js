export default class Ground {
    constructor(ctx, width, height, speed, scaleRatio) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.scaleRatio = scaleRatio;

        this.x = 0;
        this.y = this.canvas.height - this.height;

        this.groundimage = new Image();
        this.groundimage. src = 'images/Empty.png';
    }

    update(gamespeed, frameTimeDelta) {
        this.x -= gamespeed * frameTimeDelta * this.speed * this.scaleRatio;
    }

    draw() {
        this.ctx.drawImage(
            this.groundimage,
            this.x,
            this.y,
            this.width,
            this.height,
        );

        this.ctx.drawImage(
            this.groundimage,
            this.x + this.width,
            this.y,
            this.width,
            this.height,
        );

        if(this.x < -this.width){
            this.x = 0;
        }
    }

    reset(){
        this.x = 0;
    }
}