function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}

var maxX = 900;
var maxY = 300;
var playerHeight = 20;
var playerWidth = 20;
var platformWidth = 200;
var platformHeight = 30;

// The status of the arrow keys    
var keys = {
    right: false,
    left: false,
    up: false,
    };

var friction = 0.7;
var gravity = 0.6;

//game character
var player = {
    x: platformWidth/2,
    y: maxY/2,
    x_v: 0,
    y_v: 0,
    jump : true,
    height: playerHeight,
    width: playerWidth
    };

function gamePlayer(){
    ctx.fillStyle = "#F08080";
    ctx.fillRect((player.x)-playerWidth, (player.y)-playerHeight, player.width, player.height);
}

//tea

//green: #C9E3AC
//white: #EAEFBD
//black: TBD


//platform
var numOfPlatforms = randomIntFromInterval(2,6);
var platforms = [];

function createPlatforms(){
	//first platform is always static
	platforms.push(
            {
                x: 0,
                y: maxY/2,
                width: platformWidth,
                height: platformHeight
            }
        );

    for(i = 1; i < numOfPlatforms; i++) {
        platforms.push(
            {
                x: 200 * i,
                y: randomIntFromInterval(0,maxY),
                width: platformWidth,
                height: platformHeight
            }
        );
    }
}

function gamePlatforms(){
    ctx.fillStyle = "#68683B";
    for(i = 0; i < numOfPlatforms; i++) {
        ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }	    
}

function gameBackground(){
    ctx.fillStyle = "#E6D3F4";
    ctx.fillRect(0, 0, maxX, maxY); //width, height
}

// This function is called when one of the arrow keys is pressed
function keydown(e) {
    // 37 is the code for thr left arrow key
    if(e.keyCode == 37) {
        keys.left = true;
    }

    // 38 is the code for the up arrow key
    if(e.keyCode == 38) {
        if(player.jump == false) {
            player.y_v = -10;
        }
    }

    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        keys.right = true;
    }
}
// This function is called when the key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }

    if(e.keyCode == 38) {
        if(player.y_v < -2) {
        player.y_v = -3;
        }
    }

    if(e.keyCode == 39) {
        keys.right = false;
    }
}

function loop() {
	// If the player is not jumping apply the effect of frictiom
    if(player.jump == false) {
        player.x_v *= friction;
    } else {
        // If the player is in the air then apply the effect of gravity
        player.y_v += gravity;
    }
    player.jump = true;

	// If the left key is pressed, move the player to the left
    if(keys.left) {
        player.x+= -2.5;
    }
     // If the right key is pressed, move the player to the right
    if(keys.right) {
        player.x  += 2.5;
    }

    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;

    // A simple code that checks for collions with the platform
    let i = -1;
    for(j = 0; j < numOfPlatforms; j++)
    {
    	if(platforms[j].x < player.x && 
    		player.x - player.width < platforms[j].x + platforms[j].width && //to edge
    		platforms[j].y < player.y && 
    		player.y < platforms[j].y + platforms[j].height)
    	{
            i = j;
        }
    }

    if (i > -1){
        player.jump = false;
        player.y = platforms[i].y;    
    }

    gameBackground();
    gamePlatforms();
    gamePlayer();
}

canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
ctx.canvas.height = maxY;
ctx.canvas.width = maxX;
createPlatforms();

document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
// Calling loop every 15 milliseconds to update the frame
setInterval(loop,15);