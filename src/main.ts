import "./style_sheet.css";

const mapsize = 15;
const snake: { x: number; y: number }[] = [{ x: 1, y: 1 }];
const food: { x: number; y: number } = { x: 5, y: 5 };

const playground = <HTMLDivElement>document.getElementById("playground");
playground.setAttribute("style", `display:flex;flex-wrap:wrap;`);
const tile = 500 / mapsize;
const speed = 1000 / 60;

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

//fooddiv creation
const foodDiv = document.createElement("food");
// position define, tile size * snake y or x + body margin
foodDiv.setAttribute(
  "style",
  `position: absolute;top: calc(${tile.toString()}px * ${food.y.toString()}.25 + 8px);left: calc(${tile.toString()}px * ${food.x.toString()}.25 + 8px)`
);
playground.appendChild(foodDiv);

addEventListener("keydown", input);

//one time map render
function mapRender() {
  for (let i = 0; i < mapsize * mapsize; i++) {
    const div = document.createElement("div");
    playground.appendChild(div);
  }
}

function renderInteractibles() {
  foodInteraction();
  // position updates, tile size * snake y or x + body margin
  snakeDiv.setAttribute(
    "style",
    `position: absolute;top: calc(${tile.toString()}px * ${snake[
      snake.length - 1
    ].y.toString()} + 8px);left: calc(${tile.toString()}px * ${snake[
      snake.length - 1
    ].x.toString()} + 8px)`
  );
  // for (let i = 1; i <= snake.length; i++) {
  //   const bodyDiv = document.createElement("snakeBody");
  //   bodyDiv.setAttribute(
  //     "style",
  //     `position: absolute;top: calc(${tile.toString()}px * ${snake[
  //       snake.length - i
  //     ].y.toString()} + 8px);left: calc(${tile.toString()}px * ${snake[
  //       snake.length - i
  //     ].x.toString()} + 8px)`
  //   );
  // }
}

function input(keycode: KeyboardEvent) {
  //input
  switch (keycode.key.toLowerCase()) {
    case "w":
      snake.push({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y - 1,
      });
      snake.shift();
      break;
    case "s":
      snake.push({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y + 1,
      });
      snake.shift();
      break;
    case "a":
      snake.push({
        x: snake[snake.length - 1].x - 1,
        y: snake[snake.length - 1].y,
      });
      snake.shift();
      break;
    case "d":
      snake.push({
        x: snake[snake.length - 1].x + 1,
        y: snake[snake.length - 1].y,
      });
      snake.shift();
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

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function foodInteraction() {
  //console.log(food, snake[snake.length - 1]);
  if (
    snake[snake.length - 1].x === food.x &&
    snake[snake.length - 1].y === food.y
  ) {
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
    console.log(snake);
    food.x = randomIntFromInterval(0, 14);
    food.y = randomIntFromInterval(0, 14);
    foodDiv.setAttribute(
      "style",
      `position: absolute;top: calc(${tile.toString()}px * ${food.y.toString()}.25 + 8px);left: calc(${tile.toString()}px * ${food.x.toString()}.25 + 8px)`
    );
  }
}

//game execution
mapRender();
setInterval(() => {
  renderInteractibles();
}, speed);
