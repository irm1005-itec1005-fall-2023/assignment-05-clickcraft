
const app = document.getElementById("app")
const rex = document.getElementById("rex");
const spike = document.getElementById("spike");



function hop() {
  if (rex.classList != "jump") {
    rex.classList.add("jump");

    setTimeout(function () {
      rex.classList.remove("jump");
    }, 500);
  }
}
function startGame() {
  document.getElementById("startBtn").blur();
  document.getElementById("myImage").src = "";
  if (spike.classList != "slide") {
    spike.classList.add("slide");
  } 
  else if (spike.classList == "slide"){
    spike.classList.remove("slide");
  }

}

let isAlive = setInterval(checkOverlap, 10);
  
function checkOverlap () {
  // get current dino Y position
  let dinoTop = parseInt(window.getComputedStyle(rex).getPropertyValue("top"));

  // get current cactus X position
  let cactusLeft = parseInt(
    window.getComputedStyle(spike).getPropertyValue("left")
  );

  // detect collision
  if (cactusLeft < 45 && cactusLeft > 0 && dinoTop >= 140) {
    // collision
    spike.classList.remove("slide");
    //document.getElementById("gameOver").innerText = "GAME OVER!!!";
    document.getElementById("myImage").src = "images/game over.png";
    //alert("Game Over!");
  }
}

document.addEventListener("keydown", hop);
startBtn.addEventListener("click", startGame);

//<<<<<<< HEAD
//adrien: high score counter+save, increasing speed?
//laura: spacebar, speed
// 
//=======
document.querySelector("form.userform").addEventListener("submit", function(event) {
  event.preventDefault();
  document.getElementById("playerName").innerText = "Go  " + document.getElementById("name").value + "  !!!";
  document.getElementById("playerName").className = "pNameClass";
});
//>>>>>>> 7d80629ef9506df596a891513f242460b224f332
