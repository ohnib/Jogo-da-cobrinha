//interface do game
let containerTamanho = 25; 
let rows = 20;
let cols = 20;
let container;
let context;


//cobra
let cobraX = containerTamanho *5;
let cobraY = containerTamanho *5;

let velocidadeX =0;
let velocidadeY =0;

let corpoCobra = [];
let gameOver = false;

//comida
let comidaX ;
let comidaY ;
window.onload = function() {
    container = document.getElementById('container');
    container.height = rows * containerTamanho;
    container.width = cols * containerTamanho;
    context = container.getContext('2d');

    posicionarComida();
    document.addEventListener("keyup", mudarDirecao);
    /* update(); */
    setInterval(update, 1000/10); 
}

function update(){
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, container.width, container.height);

    context.fillStyle="lime";
    cobraX += velocidadeX * containerTamanho;
    cobraY += velocidadeY *containerTamanho;
    context.fillRect(cobraX, cobraY, containerTamanho, containerTamanho);
    for(let i = 0;  i< corpoCobra.length; i++){
        context.fillRect(corpoCobra[i][0], corpoCobra[i][1], containerTamanho, containerTamanho);
    }

    //condição do gameOver
    if (cobraX < 0 || cobraX > cols*containerTamanho || cobraY < 0 || cobraY > rows*containerTamanho){
        gameOver = true;
        alert("Game Over!");
        {
            for(let i = 0; i < corpoCobra.length; i++){
                if (cobraX == corpoCobra[i][0] && cobraY == corpoCobra[i][1])
                gameOver = true;
                alert('Game Over')
            }
        }
    }


    context.fillStyle="red";
    context.fillRect(comidaX, comidaY, containerTamanho, containerTamanho);

    if(cobraX == comidaX && cobraY == comidaY) {
        corpoCobra.push(comidaX, comidaY)
        posicionarComida();
    }

    for(let i = corpoCobra.length-1; i > 0; i--){
        corpoCobra[i] = corpoCobra[i-1];
    }
    if(corpoCobra.length){
        corpoCobra[0] = [cobraX,cobraY]
    }
}

function mudarDirecao(e) {
    if (e.code == "ArrowUp" && velocidadeY != 1){
        velocidadeX = 0;
        velocidadeY = -1;
    }
    else if (e.code == "ArrowDown" && velocidadeY != -1){
        velocidadeX = 0;
        velocidadeY = 1;
    }
    else if (e.code == "ArrowLeft" && velocidadeX != 1){
        velocidadeX = -1;
        velocidadeY = 0;
    }
    else if (e.code == "ArrowRight" && velocidadeX != -1){
        velocidadeX = 1;
        velocidadeY = 0;
    }
}

//codigos do score
let scoreSeletor = document.querySelector('[data-score="score"]')
let restartSeletor = document.querySelector('[data-restart="restart"]')
let score = 0;

function posicionarComida() {
    comidaX = Math.floor(Math.random() * cols) * containerTamanho
    comidaY = Math.floor(Math.random() * rows) * containerTamanho
    scoreSeletor.innerHTML++;
}