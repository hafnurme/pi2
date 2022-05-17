const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreBanner = document.getElementById("score");
const timeBanner = document.getElementById("time");
const starBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const splus = document.getElementById('splus')
const smin = document.getElementById('smin')
const speedIdx = document.getElementById('speed')
let speed = 5;
const myTiles = [];
let keyMiss = 0;
let tilesCreated = 0;
let keyNotMiss = 0;
let score;
let animate;
let interval;
let live = false;
const keynote = ['D','F','J','K']
scoreBanner.innerHTML = "0";


starBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stopGame);
splus.addEventListener('click',()=>{
  speed += 1
  speedIdx.innerHTML = speed
  if( speed > 8 ){
    speed = 1
  }
  
})
smin.addEventListener('click',()=>{
  speed -= 1
  speedIdx.innerHTML = speed
  if( speed > 8 ){
    speed = 1
  }
  
})

function drawKey() {
  for (i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.fillStyle = "#272932";
    ctx.rect(i * 75, canvas.height - 80, 75, 80);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fill();
  }
}

function drawKeyNote() {
  for (i = 0; i < 5; i++) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(keynote[i], i * 75 + 30, canvas.height - 34);
  }
}

function drawBorder() {
  for (i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.rect(i * 75, canvas.height - 110, 75, 30);
    ctx.fill();
  }
}
drawBorder();
drawKey();
drawKeyNote()

function getRandom() {
  return Math.floor(Math.random() * 4);
}

function tilesRandom(index) {
  ctx.beginPath();
  switch (index) {
    case 0:
      myTiles.push({ i: index, y: 0, k: 68, d: null });
      break;
    case 1:
      myTiles.push({ i: index, y: 0, k: 70, d: null });
      break;
    case 2:
      myTiles.push({ i: index, y: 0, k: 74, d: null });
      break;
    case 3:
      myTiles.push({ i: index, y: 0, k: 75, d: null });
      break;
  }
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function hitBottom() {
  myTiles.forEach((e) => {
    if (e.y > canvas.height) {
      myTiles.shift();
      if (e.d === null) {
        keyMiss += 1;
      }
    }
  });
}

let hoverPress;

window.addEventListener("keydown", (k) => {
  myTiles.forEach((e, index) => {
    if (e.y > 460 && e.y < 530) {
      if (e.i == 0 && e.k == k.keyCode) {
        keyNotMiss += 1;
        myTiles.splice(index, 1);
        hoverPress = 0;
        requestAnimationFrame(drawHover);
      } else if (e.i == 1 && e.k == k.keyCode) {
        keyNotMiss += 1;
        myTiles.splice(index, 1);
        hoverPress = 1;
        requestAnimationFrame(drawHover);
      } else if (e.i == 2 && e.k == k.keyCode) {
        keyNotMiss += 1;
        myTiles.splice(index, 1);
        hoverPress = 2;
        requestAnimationFrame(drawHover);
      } else if (e.i == 3 && e.k == k.keyCode) {
        keyNotMiss += 1;
        myTiles.splice(index, 1);
        hoverPress = 3;
        requestAnimationFrame(drawHover);
      }
    }
  });
});

function drawHover() {
  ctx.clearRect(hoverPress * 75, canvas.height - 110, 75, 30);
  ctx.beginPath();
  ctx.fillStyle = "#66cfff";
  ctx.rect(hoverPress * 75, canvas.height - 110, 75, 30);
  ctx.rect(hoverPress * 75, canvas.height - 80, 75, 80);
  ctx.stroke();
  ctx.fill();
}

function update() {
  clear();
  myTiles.forEach((e) => {
    ctx.fillStyle = "#3e8db1";
    ctx.fillRect(e.i * 75, (e.y += speed), 75, 30 + speed);
  });
  drawBorder();
  drawKey();
  hitBottom();
  drawKeyNote()

  speedIdx.innerHTML = speed
  score = Math.round(((keyNotMiss - keyMiss) / tilesCreated) * 100);

  if (score) {
    scoreBanner.innerHTML = score;
  }

  if (score < 0) {
    stopThe();
  }

  if( speed > 8 ){
    speed = 1
  }

  animate = requestAnimationFrame(update);
}

// for timer
let howMinute = 3;
let totalSecond = howMinute * 60;
let minute;
let second;
let updateTime;
// --===--

function start() {
  live = !live;

  if (live) {
    interval = setInterval(() => {
      tilesRandom(getRandom());
      tilesCreated += 1;
    }, 1000 - speed * 100);

    updateTime = setInterval(() => {
      minute = Math.floor(totalSecond / 60);
      second = totalSecond % 60;
      console.log(minute);
      timeBanner.innerHTML = ` ${minute}:${second}`;
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(updateTime);
        stopThe();
      }
    }, 1000);

    starBtn.innerHTML = "PAUSE";

    update();
  } else {
    stopThe();
    starBtn.innerHTML = "START";
  }
}

function stopGame() {
  stopThe();
}

function stopThe() {
  clearInterval(updateTime);
  cancelAnimationFrame(animate);
  clearInterval(interval);
  date = null;
}
