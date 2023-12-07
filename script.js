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
    alert("Game Over!");
  }
}
// keydown works faster
document.addEventListener("keydown", hop);
