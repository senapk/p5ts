// class V2d {
//     x: number
//     y: number
//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
// }
// //a: Vdd
// //b: Vdd
// //retorno: bool
// function iguais(a: V2d, b: V2d): boolean {
//     return (a.x == b.x) && (a.y == b.y);
// }

// let dim: V2d = new V2d(7, 5);
// let tam: number = 50;

// let grid_cor: p5.Color;
// let food_cor: p5.Color;
// let snake_cor_list : p5.Color[];

// let food_pos = new V2d(2, 2);
// let snake_pos_list = [new V2d(4, 3)];
// let dir   = new V2d(-1, 0);

// let timer = 0;
// let vel = 20;

// function setup() {
//     createCanvas(dim.x * tam, dim.y * tam);
//     grid_cor = color(50);
//     snake_cor_list = [color("green")];
//     food_cor = color(255, 80, 120);
//     noStroke();
// }

// function draw() {
//     if (frameCount > timer + vel) {
//         timer = frameCount;
//         snake_walk();
//     }
    
//     background(255);
//     draw_grid();
//     draw_food();
//     draw_snake();
// }

// function keyPressed() {
//     if (keyCode == LEFT_ARROW) {
//         dir.x = -1;
//         dir.y = 0;
//     } else if (keyCode == RIGHT_ARROW) {
//         dir.x = 1;
//         dir.y = 0;
//     } else if (keyCode == UP_ARROW) {
//         dir.x = 0;
//         dir.y = -1;
//     } else if (keyCode == DOWN_ARROW) {
//         dir.x = 0;
//         dir.y = 1;
//     }
// }

// function snake_walk() {
//     let prox = next_pos();
//     if (iguais(prox, food_pos)) 
//     {
//         snake_pos_list.unshift(food_pos);
//         snake_cor_list.unshift(food_cor);
//         generate_new_food();
//     } 
//     else if (hit_snake(prox)) 
//     {
//         noLoop();
//     }
//     else 
//     {
//         snake_pos_list.unshift(prox);
//         snake_pos_list.pop();
//     }
    
// }

// function generate_new_food() {
//     do {
//         food_pos = new V2d(int(random(0, dim.x)), 
//         int(random(0, dim.y)));
//     } while (hit_snake(food_pos));
    
//     food_cor = color(random(255), random(255), random(255));
// }

// function next_pos() {
//     let prox = new V2d(snake_pos_list[0].x + dir.x, snake_pos_list[0].y + dir.y);
//     if      (prox.x == -1   ) prox.x = dim.x - 1;
//     else if (prox.x == dim.x) prox.x = 0;
//     else if (prox.y == -1   ) prox.y = dim.y - 1;
//     else if (prox.y == dim.y) prox.y = 0;
//     return prox;
// }

// function hit_snake(pos: V2d) {
//     for (let elem of snake_pos_list) {
//         if (iguais(elem, pos)) {
//             return true;
//         }
//     }
//     return false;
// }

// function draw_snake() {
//     for (let i = 0; i < snake_pos_list.length; i++) {
//         draw_cell(snake_pos_list[i].x, snake_pos_list[i].y, snake_cor_list[i]);
//     }
// }

// function draw_food() {
//     draw_circle(food_pos.x, food_pos.y, food_cor);
// }

// function draw_grid() {
//     for (let y = 0; y < dim.y; y++) {
//         for (let x = 0; x < dim.x; x++) {
//             draw_cell(x, y, grid_cor);
//         }
//     }
// }

// function draw_circle(x: number, y: number, cor: p5.Color) {
//     ellipseMode(CORNER);
//     fill(cor);
//     circle(x * tam, y * tam, tam - 2);
// }

// function draw_cell(x: number, y: number, cor: p5.Color) {
//     fill(cor);
//     square(x * tam, y * tam, tam - 2);
// }
