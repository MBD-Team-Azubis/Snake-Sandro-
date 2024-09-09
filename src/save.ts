import "./style.css";

const playground = <HTMLDivElement>document.getElementById("playground");
const output = <HTMLDivElement>document.getElementById("output");
const divarr: HTMLDivElement[] = [];
const fruit = document.createElement("div");
const size: number = 15;
const playerlength: HTMLDivElement[] = [];
const spawn = Math.round((size * size) / 2);
let points: number = 0;
let speedmodifier: number = 1;
playground.setAttribute(
  "style",
  `display:grid; grid-template-columns: repeat(${size.toString()}, 1fr); width: 500px; height: 500px`
);

for (let i = 0; i < size * size; i++) {
  const div = document.createElement("div");
  div.setAttribute("id", i.toString());
  div.setAttribute("style", "display:grid");
  divarr.push(div);
  playground.appendChild(div);
}

const player = document.createElement("div");
player.setAttribute("id", "player");
// <HTMLElement>(
//   document.getElementById((spawn + 24).toString()).appendChild(player)
// );
if (player.parentElement) {
  playerlength.push(player.parentElement);
}
function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Input/Key tracking
let n: number = spawn;
let a: string = "";
let b: { code: string } = { code: "KeyS" };
//to implement: repeat input untill new input for constant movement// replace empty return with death states
function logKey(e: { code: string }) {
  a = e.code;
  b = e;
  if (parseInt(divarr[n].id) >= size * size - size && a === "KeyS") {
    window.location.reload();
    alert("gameover");

    return;
  }
  if (parseInt(divarr[n].id) <= size - 1 && a === "KeyW") {
    window.location.reload();
    alert("gameover");

    return;
  }
  for (let i = 0; i < size; i++) {
    if (parseInt(divarr[n].id) === size - 1 + i * size && a === "KeyD") {
      window.location.reload();
      alert("gameover");

      return;
    }
    if (parseInt(divarr[n].id) === 0 + i * size && a === "KeyA") {
      window.location.reload();
      alert("gameover");

      return;
    }
  }
  if (a === "KeyW") {
    n = n - size;
    //move up
  } else if (a === "KeyS") {
    n = n + size;
    //move down
  } else if (a === "KeyA") {
    n = n - 1;
    //move left
  } else if (a === "KeyD") {
    n = n + 1;
    //move right
  }
  divarr[n].appendChild(player);
  if (EatFruit(player, fruit)) {
    SpawnFruit();
    if (player.parentElement) {
      playerlength.push(player.parentElement);
      return;
    }
  }
  if (player.parentElement) {
    playerlength.push(player.parentElement);
  }
  for (let i = 0; i < playerlength.length; i++) {
    playerlength[i].setAttribute("style", "background-color: rgb(3, 63, 106)");
  }
  playerlength[0].removeAttribute("style");
  playerlength[0].setAttribute("style", "display:grid");
  playerlength.shift();
  detectOverlap();
  console.log(player.parentElement);
  console.log(playerlength);
}

addEventListener("keydown", logKey);

function SpawnFruit() {
  let randint = randomIntFromInterval(0, size * size - 1);
  while (playerlength.includes(divarr[randint])) {
    randint = randomIntFromInterval(0, size * size - 1);
  }
  fruit.setAttribute("id", "fruit");
  fruit.setAttribute(
    "style",
    "height:50%; width:50%; background-color:red;align-self:center;justify-self:center; border-radius:50%;"
  );
  divarr[randint].appendChild(fruit);
  return;
}

SpawnFruit();

function EatFruit(c: HTMLDivElement, d: HTMLDivElement) {
  if (c.parentElement && d.parentElement) {
    if (c.parentElement.id === d.parentElement.id) {
      points += 10 * playerlength.length;
      if (points >= 500 && points < 2000) {
        clearInterval(interval);
        speedmodifier = 2;
        interval = startInterval(speedmodifier);
      } else if (points >= 2000 && points < 4000) {
        clearInterval(interval);
        speedmodifier = 4;
        interval = startInterval(speedmodifier);
      } else if (points >= 4000 && points < 8000) {
        clearInterval(interval);
        speedmodifier = 6;
        interval = startInterval(speedmodifier);
      } else if (points >= 8000) {
        clearInterval(interval);
        speedmodifier = 8;
        interval = startInterval(speedmodifier);
      }
      output.innerHTML = points.toString();
      return d.parentElement.removeChild(d);
    }
  }
}

function detectOverlap() {
  for (let i = 0; i < playerlength.length - 1; i++) {
    if (player.parentElement) {
      if (player.parentElement.id === playerlength[i].id) {
        window.location.reload();
        alert("gameover");
        return;
      }
    }
  }
}

function startInterval(l: number) {
  const interval = setInterval(() => {
    logKey(b);
  }, 2000 / l);
  return interval;
}
let interval = startInterval(speedmodifier);
