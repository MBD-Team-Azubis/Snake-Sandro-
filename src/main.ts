import "./style_sheet.css";

const mapsize = 15;
const snake: { x: number; y: number }[] = [{ x: 1, y: 1 }];
const food: { x: number; y: number } = { x: -1, y: -1 };

const playground = <HTMLDivElement>document.getElementById("playground");
playground.setAttribute("style", `display:flex;flex-wrap:wrap;`);
const tile = 500 / mapsize;
const speed = 1000 / 60;

//one time map render
function mapRender() {
  for (let i = 0; i < mapsize * mapsize; i++) {
    const div = document.createElement("div");
    playground.appendChild(div);
  }
}

//playerdiv creation
const snakeDiv = document.createElement("snake");
// position define, tile size * snake y or x + body margin
snakeDiv.setAttribute(
  "style",
  `position: absolute;top: calc(${tile.toString()}px * ${snake[
    snake.length - 1
  ].y.toString()} + 8px);left: calc(${tile.toString()}px * ${snake[
    snake.length - 1
  ].x.toString()} + 8px)`
);
playground.appendChild(snakeDiv);

function renderInteractibles() {
  addEventListener("keydown", input);
  // position updates, tile size * snake y or x + body margin
  snakeDiv.setAttribute(
    "style",
    `position: absolute;top: calc(${tile.toString()}px * ${snake[
      snake.length - 1
    ].y.toString()} + 8px);left: calc(${tile.toString()}px * ${snake[
      snake.length - 1
    ].x.toString()} + 8px)`
  );
}

//   const foodDiv = document.createElement("div");
//   playground.appendChild(foodDiv);

function input(keycode: KeyboardEvent) {
  //input
  switch (keycode.key.toLowerCase()) {
    case "w":
      snake.push({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y - 1,
      });
      break;
    case "s":
      snake.push({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y + 1,
      });
      break;
    case "a":
      snake.push({
        x: snake[snake.length - 1].x - 1,
        y: snake[snake.length - 1].y,
      });
      break;
    case "d":
      snake.push({
        x: snake[snake.length - 1].x + 1,
        y: snake[snake.length - 1].y,
      });
      break;
  }
  //map collision
  if (
    snake[snake.length - 1].y < 0 ||
    snake[snake.length - 1].x < 0 ||
    snake[snake.length - 1].y > mapsize - 1 ||
    snake[snake.length - 1].x > mapsize - 1
  ) {
    window.location.reload();
    alert("gameover");
  }
  //player self collision
  for (let i = 0; i < snake.length - 2; i++) {
    if (snake[snake.length - 1] === snake[i]) {
      window.location.reload();
      alert("gameover");
    }
  }
}

//game execution
mapRender();
setInterval(() => {
  renderInteractibles();
}, speed);
