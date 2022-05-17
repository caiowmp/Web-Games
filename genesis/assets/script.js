let order = [];
let clicked_order = [];
let score = 0;

/*/ 0 - verde
    1 - vermelho
    2 - amarelo
    3 - azul    /*/

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

function shufflerOrder () { //cria ordem aleatória de cores
    let color_order = Math.floor(Math.random() * 4); //sorteia numeros de 0 a 3
    order[order.length] = color_order;
    clicked_order = [];

    for(let i in order){
        let element_color = createColorElement(order[i]);
        ligthColor(element_color,Number(i) + 1);
    }
}

function ligthColor(element, number) { //acende próxima cor
    number = number * 500;
    setTimeout(() => { // função q executa uma ação em determinado intervalo de tempo.
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    });
}

function checkOrder () { //checa se clicou na ordem certa
    for(let i in clicked_order){
        if(clicked_order[i] != order[i]) {
            gameOver();
            break;
        }
    }

    if(clicked_order.length == order.length){
        alert(`Pontuacao: ${score}\nVoce acertou! Iniciando proximo nivel`);
        nextLevel();
    }
}

function click(color){
    clicked_order[clicked_order.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

function createColorElement(color) {
    if (color == 0) return green;
    else if (color == 1) return red;
    else if (color == 2) return yellow;
    else if (color == 3) return blue;
}

function nextLevel () {
    score++;
    shufflerOrder();
}

function gameOver() {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clicked_order = [];

    playGame();
}

function playGame () {
    alert(`Bem vindo ao Genesis! Iniciando um novo jogo!`);
    score = 0;

    nextLevel();
}

//eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();