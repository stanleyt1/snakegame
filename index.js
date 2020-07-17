
let board = [];
let WIDTH = 800;
let HEIGHT = 800;
let tile_size = 40;

let RIGHT = true;
let LEFT = false;
let UP = false;
let DOWN = false;

function keyPressed(){
    if(keyCode == RIGHT_ARROW && !LEFT  && !RIGHT){
        RIGHT = true;

        LEFT = false;
        UP = false;
        DOWN = false;
        
    }else if(keyCode == LEFT_ARROW && !RIGHT && !LEFT){
        LEFT = true; 

        RIGTH = false;
        UP = false;
        DOWN = false;

    }else if(keyCode == UP_ARROW && !UP && !DOWN){
        UP = true;
        
        RIGHT = false;
        LEFT = false;
        DOWN = false;
    }else if(keyCode == DOWN_ARROW && !UP && !DOWN){
        DOWN = true;
        
        RIGHT = false;
        LEFT = false;
        UP = false;
    }
}



function setup(){
    createCanvas(WIDTH, HEIGHT);
    
    frameRate(5);

    for(let i = 0; i < WIDTH/tile_size; i ++ ){
        let row = [];
        for(let j = 0; j < HEIGHT/tile_size; j++ ){
            row.push(0)
        } 
        board.push(row);
    }

}

let snake = [[12,6],[11,6],[10,6]];

let fruit = [5,5];

let gameOver = false;

function detectCollition(pair){
    if(!(pair[0] < WIDTH/tile_size && pair[0] >= 0)){
        return true;
    }
    if(!(pair[1] < HEIGHT/tile_size && pair[1] >= 0)){
        return true;
    }
    for(let i = 0; i < snake.length; i ++){
        if(pair[0] == snake[i][0] && pair[1] == snake[i][1]){
            return true;
        }
    }
    return false;
}

function move(pair){
    
    if (!detectCollition(pair)){

        snake.unshift(pair);

        board[snake[snake.length-1][0]][snake[snake.length-1][1]] = 0;
        snake.pop();
        
    
    }else{
        gameOver = true;
    }

    
    
}

function ateFruit(){
    if(snake[0][0] == fruit[0] && snake[0][1] == fruit[1]){
        snake.unshift(snake[0]);
        moveFruit();
    }
}

function moveFruit(){

    
    
    fruit[0] = Math.round(Math.random() * (WIDTH/tile_size - 1));
    fruit[1] = Math.round(Math.random() * (HEIGHT/tile_size - 1));

    for(let i = 0; i < snake.length; i ++){
        if(fruit[0] == snake[i][0] && fruit[1] == snake[i][1]){
            console.log(fruit);
            moveFruit();
        }
    }
    

}

function endScreen(){
    background(220);
    fill(0);
    textSize(50);
    text("Game Over", WIDTH/2 - 150, HEIGHT/2);
}

function draw(){
   
   
    

    if(RIGHT){
    
        console.log("RIGHT")
        let pair = [snake[0][0] + 1, snake[0][1]];
        move(pair);
        ateFruit();
        
    }

    if(LEFT){
        
        console.log("LEFT")
        let pair = [snake[0][0] - 1, snake[0][1]];
        move(pair);
        ateFruit();
    }

    if(UP){
            
        console.log("UP")
        let pair = [snake[0][0], snake[0][1] - 1];
        move(pair);
        ateFruit();
    }

    if(DOWN){
        console.log("LEFT")
        let pair = [snake[0][0], snake[0][1] + 1];
        move(pair);
        ateFruit();
    }

    


    // Add Snake to Board
    for(let i = 0; i < snake.length; i ++){
        board[snake[i][0]][snake[i][1]] = 1;
    }
    
    board[fruit[0]][fruit[1]] = 2;


  

    // Draw Board & Snake
    for(let i = 0; i < WIDTH/tile_size; i ++ ){
        for(let j = 0; j < HEIGHT/tile_size; j++ ){
            if(board[i][j] == 0){
                fill(220);
                square(i*tile_size, j*tile_size, tile_size);
            }else if(board[i][j] == 1){
                fill(255);
                square(i*tile_size, j*tile_size, tile_size);
            }else if(board[i][j] == 2){
                fill(100);
                square(i*tile_size, j*tile_size, tile_size);
            }
        }     
    }

    if(gameOver){
        console.log()
        endScreen();
    }
   
    
}