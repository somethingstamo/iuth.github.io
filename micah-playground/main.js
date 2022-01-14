// function openPage() {
//   // window.open("index.html", "_blank");
// }

// // onclick event listner for the button with the id button2 that calls random()
// document.getElementById("button2").onclick = random;
// document.getElementById("button3").onclick = randomLoc;

// function random() {
//   // set the element with the id button2 text to the random number
//   document.getElementById("button2").innerHTML = Math.random();
// }



// function randomLoc() {
//   document.getElementById("button3").style.color = "green";

// }

const color = document.getElementById("color");
const box = document.getElementById("box");
const log = document.getElementById('log');
const color_code = document.getElementById('color-code');

document.addEventListener('keypress', logKey);

color.onclick = function () {
  color.style.backgroundColor = randomColor();
  color_code.textContent = color.style.backgroundColor;
}

function randomColor() {
  var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

function logKey(e) {
  log.textContent = ` ${e.code}`;

  if (e.code === 'KeyD') {
    var pos = box.offsetLeft;
    if (pos + 25 + 400 < window.innerWidth) {
      box.style.left = pos + 25 + 'px';
    }
  }
  if (e.code === 'KeyA') {
    var pos = box.offsetLeft;
    if (pos - 25 > 0) {
        box.style.left = pos - 25 + 'px';
    }
  }
  if (e.code === 'KeyW') {
    var pos = box.offsetTop;
    box.style.top = pos - 25 + 'px';
  }
  if (e.code === 'KeyS') {
    var pos = box.offsetTop;
    box.style.top = pos + 25 + 'px';
  }

}


const start = document.getElementById('start-button');

start.onclick = startGame;
const game = document.getElementById('game');
const score = document.getElementById('score');

function startGame() {
  score.innerHTML = 0;
  const new_button = document.createElement('button');
  new_button.textContent = 'Click Me';
  new_button.onclick = function () {
    new_button.style.position = 'absolute';
    new_button.style.left = Math.random() * (window.innerWidth - 30) + 'px';
    new_button.style.top = Math.random() * (window.innerHeight -40) + 'px';
    score.innerHTML = parseInt(score.innerHTML) + 1;
  }
  game.appendChild(new_button);
}


const start_pong = document.getElementById('start-pong');
start_pong.onclick = startPong;
const ball = document.createElement('div');

function startPong() {
  ball.style.width = '45px';
  ball.style.height = '45px';
  ball.style.backgroundColor = 'grey';
  ball.style.position = 'absolute';
  ball.style.border = '1px solid black';
  ball.style.borderRadius = '50%';
  game.appendChild(ball);
  moveBall(ball)
}

function moveBall(speed = 1, angle = 100) {
  ball.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  const top = ball.offsetTop;
  const left = ball.offsetLeft;
  ball.style.top = top + speed  + "px";
  ball.style.left = left + (speed * (angle)) + "px";

}

setInterval(moveBall, 1);