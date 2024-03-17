//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

let score = 0;

var gameOver = false;

function drawScore() {
    document.getElementById('scoreDisplay').innerText = 'Score: ' + score;
}

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1600/10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="blue";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.beginPath();
        context.arc(snakeBody[i][0] + blockSize / 2, snakeBody[i][1] + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
        context.fill();
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert('Game Over! Score: ' + score);
        location.reload(); // Recarrega a página para reiniciar o jogo
        return;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert('Game Over! Score: ' + score);
            location.reload(); // Recarrega a página para reiniciar o jogo
            return;
        }
    }

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 10; // Incrementar a pontuação
        drawScore(); // Atualizar a pontuação na tela
    }

}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    // Calcula o número máximo de posições onde a comida pode ser colocada
    var maxX = (cols - 1) * blockSize;
    var maxY = (rows - 1) * blockSize;

    // Gera coordenadas aleatórias dentro dos limites do canvas
    foodX = Math.floor(Math.random() * maxX / blockSize) * blockSize;
    foodY = Math.floor(Math.random() * maxY / blockSize) * blockSize;
}
// Adicionar event listeners para os botões de controle
document.getElementById('upButton').addEventListener('click', function() {
    if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    }
});
document.getElementById('leftButton').addEventListener('click', function() {
    if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    }
});
document.getElementById('downButton').addEventListener('click', function() {
    if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    }
});
document.getElementById('rightButton').addEventListener('click', function() {
    if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
});

// Chamar drawScore() dentro da função update() quando a pontuação for atualizada
if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
    score += 10; // Incrementar a pontuação
    drawScore(); // Atualizar a pontuação na tela
}


// Adicionar event listener para cliques na janela inteira
window.addEventListener('click', handleClick, false);

// Função para lidar com o clique na janela inteira
function handleClick(event) {
    event.preventDefault();
    var clickedButtonId = event.target.id; // Obtém o ID do botão clicado
    
    switch (clickedButtonId) {
        case "upButton":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case "leftButton":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case "downButton":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case "rightButton":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
        default:
            break;
    }
}