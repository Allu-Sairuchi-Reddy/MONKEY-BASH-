
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var bananas=0;
var lives=1;

function preload(){
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);

  FoodGroup = createGroup();
  obstacleGroup=createGroup();
}


function draw() {
background(255)
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  
  textSize(20);
  fill("black");
  text("Survival Time: "+survivalTime,20,50);
  text("Bananas: "+bananas,200,50);
  text("Life: "+lives,20,80)
  
  if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      bananas++;
    }
  
  if(monkey.isTouching(obstacleGroup)){
    lives--;
  }
  
  if(lives===0){
    FoodGroup.lifetime=-2;
    obstacleGroup.lifetime=-2;
    monkey.destroy();
    FoodGroup.velocityX=0;
    obstacleGroup.velocityX=0;
    survivalTime=0;
    text("GAME OVER",170,200)
  }
  
  spawnBanana();
  spawnObs();
  ST();
  
  drawSprites();
}

function spawnBanana() {
  if(frameCount%90===0){
    banana=createSprite(400,170,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(60,150));
    banana.velocityX=-4;
    banana.lifetime=200;
    FoodGroup.add(banana);
  }
}


function spawnObs() {
  if(frameCount%100===0){
    obstacle=createSprite(300,330,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.x=Math.round(random(250,350));
    obstacle.velocityX=-4;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
}

function ST(){
  if(frameCount%20===0){
    survivalTime++;
  }
}






