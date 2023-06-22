class V2d {
  x: number;
  y: number;
  constructor(_x: number, _y: number) {
    this.x = _x;
    this.y = _y;
  }
  equals(_other: V2d): boolean {
    return this.x === _other.x && this.y === _other.y;
  }
}

let game: Game;

class Cell {
  pos: V2d;
  color: p5.Color;
  static size: number = 50;

  constructor(_pos: V2d, _color: p5.Color) {
    this.pos = _pos;
    this.color = _color;
  }

  draw_square() {
    noStroke();
    fill(this.color);
    square(2 + this.pos.x * Cell.size, 2 + this.pos.y * Cell.size, Cell.size - 2);
  }
  draw_circle() {
    ellipseMode(CORNER);
    stroke(255);
    fill(this.color);
    circle(2 + this.pos.x * Cell.size, 2 + this.pos.y * Cell.size, Cell.size - 2);
  }

}

class Snake {
  dir: V2d;
  body: Cell[];
  timer: number = 0;
  speed: number = 10;

  constructor(_pos: V2d, _color: p5.Color, _dir: V2d) {
    this.dir = _dir;
    this.body = [new Cell(_pos, _color)];
  }

  calc_next_pos(): V2d {
    let head = this.body[0];
    let next = new V2d(head.pos.x + this.dir.x, head.pos.y + this.dir.y);
    if (next.x < 0) next.x = game.dim.x - 1;
    if (next.x >= game.dim.x) next.x = 0;
    if (next.y < 0) next.y = game.dim.y - 1;
    if (next.y >= game.dim.y) next.y = 0;
    return next;
  }

  control() {
    if (keyIsDown(LEFT_ARROW)) { this.dir = new V2d(-1, 0); }
    if (keyIsDown(RIGHT_ARROW)) { this.dir = new V2d(1, 0); }
    if (keyIsDown(UP_ARROW)) { this.dir = new V2d(0, -1); }
    if (keyIsDown(DOWN_ARROW)) { this.dir = new V2d(0, 1); }
  }

  collide(v: V2d): boolean {
    for (let c of this.body) {
      if (c.pos.equals(v))
        return true;
    }
    return false;
  }

  draw() {
    for (let i = 0; i < this.body.length; i++) {
      if (i == 0) {
        this.body[i].draw_square();
        this.body[i].draw_circle();
      }
      else {
        this.body[i].draw_square();
      }
    }
  }
}

class Game {
  dim: V2d;
  color: p5.Color;

  snake: Snake;
  food: Cell;
  is_game_over: boolean = false;

  constructor(dim: V2d, color: p5.Color) {
    this.dim = dim;
    this.color = color;
    createCanvas(this.dim.x * Cell.size, this.dim.y * Cell.size);
    frameRate(30);

    this.snake = new Snake(new V2d(3, 3), this.create_random_color(), new V2d(1, 0));
    this.food = this.create_food();
  }

  run() {
    this.snake.control();
    if (frameCount > this.snake.timer + this.snake.speed) {
      this.snake.timer = frameCount;
      this.walk();
    }
  }

  walk() {
    let next = this.snake.calc_next_pos();

    if (next.equals(this.food.pos)) {
      this.snake.body.unshift(this.food);
      this.food = this.create_food();
    } else if (this.snake.collide(next)) {
      this.is_game_over = true;
    } else {
      for (let i = this.snake.body.length - 1; i > 0; i--) {
        this.snake.body[i].pos = this.snake.body[i - 1].pos;
      }
      this.snake.body[0].pos = next;
    }
  }

  create_food(): Cell {
    while (true) {
      let x = Math.floor(random(this.dim.x));
      let y = Math.floor(random(this.dim.y));
      let pos = new V2d(x, y);
      if (!this.snake.collide(pos)) 
        return new Cell(pos, this.create_random_color());
    }
  }

  create_random_color(): p5.Color {
    return color(random(0, 150), random(0, 150), random(0, 150));
  }

  draw() {
    for (let x = 0; x < this.dim.x; x++) {
      for (let y = 0; y < this.dim.y; y++) {
        let c = new Cell(new V2d(x, y), this.color);
        c.draw_square();
      }
    }
    this.snake.draw();
    this.food.draw_circle();
  }

  draw_game_over() {
    textSize(40);
    fill(255);
    text("Game Over", 10, 200);
  }

}

function setup() {
  game = new Game(new V2d(6, 8), color(200));
}

function draw() {
  background(255);
  game.draw();
  
  if (game.is_game_over) {
    game.draw_game_over();
  } else {
    game.run();
  }
}





