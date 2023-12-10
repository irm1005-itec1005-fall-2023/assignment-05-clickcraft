import Player from './player.js'
import Ground from './ground.js'
import asteroidcontroller from './asteroidcontroller.js'
import Score from './score.js'



const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//gamespeed
const gamespeedSTART = 1.0
const gamespeedINCREMENT = 0.00001;

const Game_width = 800;
const Game_height = 200;
const Player_width = 88/ 1.5; //height proportionate
const Player_height = 94/ 1.5

const Max_jump_height = Game_height
const Min_jump_height = 150;
//ground
const ground_width = 2400;
const ground_height = 24;
const ground_asteroid_speed = 0.5;

const asteroidconfig = [
    {width:100 /1.5, height: 90 / 1.5, image: "images/Satellite.webp"},
    {width:90 /1.5, height: 90/ 1.5, image: "images/comet.gif"},
    {width:110 /1.5, height: 140/ 1.5, image: "images/rotating-asteroid-hand-drawn-in-photoshop-after-effects-v0-8fpmswc0avmb1.png"},
]
 

//game objects:
let player = null;
let ground = null;
let AsteroidController = null;
let score = null;

let scaleRatio = null;
let previousTime = null;
let gamespeed = gamespeedSTART;
let gameover = false;
let hasAddedEventListenersForRestart = false;
let waitingtostart = true;

function createSprites() {
    const playerwidthingame = Player_width * scaleRatio;
    const playerheightingame = Player_height * scaleRatio;
    const minjumpheightingame = Min_jump_height * scaleRatio;
    const maxjumpheightingame = Max_jump_height * scaleRatio;

    const groundwidthingame = ground_width * scaleRatio;
    const groundheightingame = ground_height * scaleRatio;

    player = new Player(
        ctx,
        playerwidthingame,
        playerheightingame,
        minjumpheightingame,
        maxjumpheightingame,
        scaleRatio
    );

    ground = new Ground(
        ctx, 
        groundwidthingame, 
        groundheightingame, 
        ground_asteroid_speed, 
        scaleRatio);

    const asteroidImages = asteroidconfig.map(asteroid =>{
        const image = new Image ();
        image.src = asteroid .image;
        return {
            image: image,
            width: asteroid.width * scaleRatio,
            height: asteroid.height * scaleRatio,
        };

    })
    AsteroidController = new asteroidcontroller(
        ctx,
         asteroidImages,
         scaleRatio,
         ground_asteroid_speed,
         )

         score = new Score(ctx, scaleRatio);
}

//screen sizing and compatibility

function setScreen(){
    scaleRatio = getScaleRatio();
    canvas.width = Game_width * scaleRatio;
    canvas.height = Game_height * scaleRatio;
    createSprites();
}

setScreen();
//set timeout to fix on safari browser
window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.oreintation) {
    screen.orientation.addEventListener("change", setScreen);
}


function getScaleRatio(){
    const screenHeight = Math.min(
        window.innerHeight,
        document.documentElement.clientHeight
    );

    const screenWidth = Math.min(
        window.innerWidth,
        document.documentElement.clientWidth
    );
//window is wider than game width
    if(screenWidth/ screenHeight < Game_width/ Game_height){
        return screenWidth/ Game_width;
    } else {
        return screenWidth/ Game_height;
    }
}
function showGameOver() {
    const fontSize = 70 * scaleRatio;
    ctx.font = `${fontSize}px ＭＳ Ｐゴシック`;
    ctx.fillStyle = "#FF69B4";
    const x = canvas.width / 4.5;
    const y = canvas.height / 2;
    ctx.fillText("GAME OVER", x, y);
  }

function setupGameReset() {
    if(!hasAddedEventListenersForRestart){
        hasAddedEventListenersForRestart = true;
        
        setTimeout(()=>{
            window.addEventListener("keyup", reset, { once: true })
            window.addEventListener("touchstart", reset, { once: true });
        }, 100 );

       
    }
}
function clearScreen() {
    ctx.fillStyle = "#00000000";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function reset(){
    hasAddedEventListenersForRestart = false;
    gameover = false;
    waitingtostart = false;
    ground.reset();
    AsteroidController.reset();
    score.reset();
    gamespeed = gamespeedSTART;
}

function showStartGameText(){
    const fontSize = 35 * scaleRatio;
    ctx.font = `${fontSize}px ＭＳ Ｐゴシック`;
    ctx.fillStyle = "#FF69B4";
    const x = canvas.width / 14;
    const y = canvas.height / 2;
    ctx.fillText("TAP SCREEN OR PRESS SPACE TO START", x, y);
}

function updateGameSpeed(frameTimeDelta){
    gamespeed += frameTimeDelta * gamespeedINCREMENT;
}


function gameLoop(currentTime){
    console.log(gamespeed);
        if(previousTime ===  null){
        previousTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
        }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    

    clearScreen();

    if (!gameover && !waitingtostart){
        //update game objects

        ground.update(gamespeed, frameTimeDelta);
        AsteroidController.update(gamespeed, frameTimeDelta);
        player.update(gamespeed, frameTimeDelta);
        score.update(frameTimeDelta);
        updateGameSpeed(frameTimeDelta);
    }

    if (!gameover && AsteroidController.collideWith(player)){
        gameover = true;
        setupGameReset();
        score.setHighScore();
    }
        //draw game objects

    ground.draw();
    AsteroidController.draw();
    player.draw();
    score.draw()

    if(gameover){
        showGameOver(); 
    }

    if(waitingtostart){
        showStartGameText();
    }        
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

window.addEventListener("keyup", reset, { once: true });
window.addEventListener("touchstart", reset, { once: true });