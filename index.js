console.log(600 % 60)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const myTiles = [];
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
let live = false;
let score = 0;


function drawKey(x, y) {
  let key = {
    x: 0,
    y: 0,
    w: 75,
    h: 90,
    key: 0,
    pos: 0,
  };
  key.x = x;
  key.y = y;
  ctx.beginPath();
  ctx.rect(key.x, key.y, key.w, key.h);
  ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
  ctx.stroke();
  ctx.fill();
}

function drawBorder(x, y) {
  let border = {
    x: 0,
    y: 0,
    w: 75,
    h: 20,
    key: 0,
    pos: 0,
  };
  border.x = x;
  border.y = y;
  ctx.beginPath();
  ctx.rect(border.x, border.y, border.w, border.h);
  ctx.fillStyle = "rgba(150, 150, 151, 0.5)";
  ctx.stroke();
  ctx.fill();
}

function randomTiles(index) {
  let tiles = {
    x: 0,
    y: 0,
    w: 75,
    h: 30,
    dy: 5,
    key: 0,
    pos: 0,
    l: 0,
  };
  switch (index) {
    case 0:
      tiles.x = 0;
      tiles.pos = 0;
      tiles.l = 68;
      break;
    case 1:
      tiles.x = 75;
      tiles.pos = 1;
      tiles.l = 70;
      break;
    case 2:
      tiles.x = 150;
      tiles.pos = 2;
      tiles.l = 74;
      break;
    case 3:
      tiles.x = 225;
      tiles.pos = 3;
      tiles.l = 75;
      break;
  }
  myTiles.push(tiles);
  myTiles.forEach((e) => {
    ctx.beginPath();
  });
  return tiles;
}

drawKey(0, 510);
drawKey(75, 510);
drawKey(150, 510);
drawKey(225, 510);

drawBorder(0, 490);
drawBorder(75, 490);
drawBorder(150, 490);
drawBorder(225, 490);

function indexRandom() {
  return Math.floor(Math.random() * 4);
}

function hitBottom() {
  myTiles.forEach((e) => {
    if (e.y + e.h > canvas.height) {
      ctx.clearRect(e.x, e.y, e.w, e.h);
      myTiles.shift();
      if(e.key == 0){
        stopIt()
      }
    }
  });
}

let animate;
let interval;
const scoreD = document.getElementById('score')

function update() {
  myTiles.forEach((e) => {
    e.y += e.dy;
    ctx.fillStyle = "#3e8db1";
    ctx.fillRect(e.x, e.y, e.w, e.h );
    ctx.clearRect(e.x, e.y, e.w, 5);
    if (e.y > 400 && e.y < 520) {
      window.addEventListener("keydown", (k) => {
        if (e.pos == 0 && e.l == k.keyCode) {
          e.key = 68;
        } else if (e.pos == 1 && e.l == k.keyCode) {
          e.key = 70;
        } else if (e.pos == 2 && e.l == k.keyCode) {
          e.key = 74;
        } else if (e.pos == 3 && e.l == k.keyCode) {
          e.key = 75;
        }
      });
    }
    if (e.key == 68 || e.key == 70 || e.key == 74 || e.key == 75) {
      ctx.clearRect(e.x, e.y, e.w, e.h + 1);
      score += 1
    }
    scoreD.innerHTML = score
  });

  hitBottom();
  
  drawKey(0, 510);
  drawKey(75, 510);
  drawKey(150, 510);
  drawKey(225, 510);

  drawBorder(0, 490);
  drawBorder(75, 490);
  drawBorder(150, 490);
  drawBorder(225, 490);
  animate = requestAnimationFrame(update);
}

function pressed() {}

function start() {
  live = !live;
  if (live) {
    interval = setInterval(() => {
      console.log(score)
      randomTiles(indexRandom());
    }, 600);
    update();
    startButton.innerHTML = "PAUSE";
  } else {
    clearInterval(interval);
    cancelAnimationFrame(animate);
    startButton.innerHTML = "START";
  }
}
function stopIt() {
  clearInterval(interval);
  cancelAnimationFrame(animate);
}

startButton.addEventListener("click", start);