class Sprite {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }
}
let banco_imagens = [];
let sprites_tela = [];
function setup() {
    createCanvas(400, 600);
    for (let i = 0; i < 10; i++) {
        let x = random(width - 60);
        let y = random(height - 60);
        let img = random(banco_imagens);
        sprites_tela.push(new Sprite(x, y, img));
    }
}
function preload() {
    banco_imagens.push(loadImage("assets/img1.jpg"));
    banco_imagens.push(loadImage("assets/img2.jpg"));
    banco_imagens.push(loadImage("assets/img3.jpg"));
}
function draw() {
    background(0);
    for (let sprite of sprites_tela) {
        image(sprite.img, sprite.x, sprite.y, 50, 50);
    }
}
//# sourceMappingURL=build.js.map