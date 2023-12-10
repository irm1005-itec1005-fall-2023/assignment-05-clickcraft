import Asteroid from "./asteroid.js"

export default class asteroidcontroller {
    asteroid_interval_min = 500;
    asteroid_interval_max  = 2000;

    nextAsteroidInterval = null;
    asteroids = []; 

    constructor(ctx, asteroidImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.asteroidImages = asteroidImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;

        this.setNextAsteroidTime();
    }

    setNextAsteroidTime(){
        const num = this.getRandomNumber(
            this.asteroid_interval_min,
            this.asteroid_interval_max
            );

            this.nextAsteroidInterval = num;
    }

    getRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createAsteroid(){
        const index = this.getRandomNumber(0, this.asteroidImages.length - 1);
        const asteroidimage = this.asteroidImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.canvas.height - asteroidimage.height;
        const asteroid = new Asteroid(
            this.ctx, 
            x, 
            y, 
            asteroidimage.width, 
            asteroidimage.height, 
            asteroidimage.image
            );
//check these innter
            this.asteroids.push(asteroid);
    }


    update(gamespeed, frameTimeDelta) {
        if(this.nextAsteroidInterval <= 0){
            this.createAsteroid();
            this.setNextAsteroidTime();
        }
        this.nextAsteroidInterval -= frameTimeDelta;
 
        this.asteroids.forEach((asteroid) => {
            asteroid.update(this.speed, gamespeed, frameTimeDelta, this.scaleRatio);
        });

        this.asteroids = this.asteroids.filter((asteroid) => asteroid.x > -asteroid.width);

        console.log(this.asteroids.length);
    }
    
    draw() {
        this.asteroids.forEach((asteroid) => asteroid.draw());
    }

    collideWith(sprite){
        return this.asteroids.some((asteroid) => asteroid.collideWith(sprite));
    }

    reset(){
        this.asteroids = [];
    }
}