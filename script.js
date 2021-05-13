let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let box = 32
let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right"
let food = {
    x: Math.floor(Math.random() * 16) * box,
    y: Math.floor(Math.random() * 16) * box
}

function criarBG(){
    let img = document.getElementById('jungle')
    let pat = context.createPattern(img, 'repeat')
    context.fillStyle = pat  
    context.fillRect(0, 0, 16 * box, 16 * box)
}

function criarCobrinha(){

    context.fillStyle = 'wheat'
    context.strokeStyle = 'black'
    context.lineWidth = 4
    context.strokeRect(snake[0].x, snake[0].y, box, box)
    context.fillRect(snake[0].x, snake[0].y, box, box)


    for(i=1; i < snake.length; i++){
        let img = document.getElementById('cobra')
        let pat = context.createPattern(img, 'no-repeat')
        context.fillStyle = pat
        context.fillRect(snake[i].x, snake[i].y, box, box)

    }
}

function drawFood(){
    context.strokeStyle = 'red'
    context.fillStyle = 'darkred'
    context.strokeRect(food.x, food.y, box, box)
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener('keydown', update)

function update (event){
    if((event.keyCode == 37 || event.keyCode === 65) && direction != "right") direction = "left"
    if((event.keyCode == 38 || event.keyCode === 87) && direction != "down") direction = "up"
    if((event.keyCode == 39 || event.keyCode === 68) && direction != "left") direction = "right"
    if((event.keyCode == 40 || event.keyCode === 83) && direction != "up") direction = "down"
    if((event.keyCode == 13) || (event.keyCode === 32)) location.reload()
}

function iniciarJogo(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0
    if(snake[0].x < 0 && direction == "left") snake[0].x = 15* box
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0
    if(snake[0].y < 0 && direction == "up") snake[0].y = 15 * box

    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            document.getElementById('Titulo').textContent = 'GAME OVER! aperte ENTER'
            document.getElementById('Titulo').style.color = 'white'
            Titulo.classList.toggle('animar')
            document.getElementById('Titulo').style.background = 'red'
            document.getElementById('Titulo').addEventListener('mouseover', ()=>{
                Titulo.innerHTML = 'Tente Novamente'
                Titulo.style.background = 'lightgreen'
            })
            document.getElementById('Titulo').addEventListener('mouseout', ()=>{
                Titulo.innerHTML = 'GAME OVER! aperte ENTER'
                Titulo.style.background = 'red'
                Titulo.style.color = 'White'
            })
            document.getElementById('Titulo').addEventListener('click', ()=>{
                location.reload()
            })
            
        }
    }
    criarBG()
    criarCobrinha()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

  
    

    if(direction == "right") snakeX += box
    if(direction == "left") snakeX -= box
    if(direction == "up") snakeY -= box
    if(direction == "down") snakeY += box

    if(snake.length <= 15 && (snakeX === food.x && snakeY === food.y)){
        document.getElementById('points').textContent = snake.length * 8
    }else if ((snake.length > 15 && snake.length <= 25) && (snakeX === food.x && snakeY === food.y)){
        document.getElementById('points').textContent = snake.length * 12
    } else if (snake.length > 25 && (snakeX === food.x && snakeY === food.y)){
        document.getElementById('points').textContent = snake.length * 16
    }
    
    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    }else{
        food.x = Math.floor(Math.random() * 16) * box
        food.y = Math.floor(Math.random() * 16) * box
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}



const jogo = setInterval(iniciarJogo, 100)



