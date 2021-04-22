var knife,knifeImage;
var PLAY=1;
var END=0;
var gameState=1;
var score=0;
var fruit,fruitGroup;
var monster,monsterGroup;
var fruit1,fruit2,fruit3,fruit4;
var monsterImage;
var gameOver,gameOverImage;
var knifeswoohsound;
var gameoversound;
var position;

function preload(){
  knifeImage = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadImage("alien1.png");
  gameOverImage = loadImage("gameover.png");
  knifeswoohsound = loadSound("knifeSwooshSound.mp3");
  gameoversound = loadSound("gameover.mp3");
}
function setup(){
  createCanvas(600,600);
  knife = createSprite(300,300);
  knife.addImage(knifeImage);
  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw(){
 background("brown");
 if(gameState === PLAY){
   knife.x = World.mouseX;
   knife.y = World.mouseY;
   textSize(24);
   text("Score: "+score,50,30);
  //increase score if sword touches fruit
   if(fruitGroup.isTouching(knife)){
     fruitGroup.destroyEach();
     knifeswoohsound.play();

     score = score+2;
   
   }
   
  
//Call fruits and Enemy function
   fruits();
   Enemy();
   
  if(monsterGroup.isTouching(knife)){
    gameState = END;
    gameoversound.play();
  }
 }
  if(gameState === END){
    fruitGroup.destroyEach();
    monsterGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    monsterGroup.setVelocityXEach(0);
    knife.addImage(gameOverImage);
    knife.x = 300;
    knife.y = 300;
    
  }
 drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    }else if (r == 2) {
      fruit.addImage(fruit2);
    }else if (r == 3) {
      fruit.addImage(fruit3);
    }else{
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    if(position==1){
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }
    else{
      if(position==2){
        fruit.x = 0;
        fruit.velocityX = (7+(score/4));
      }
    }
    fruit.setlifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy (){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addImage(monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    
    monsterGroup.add(monster);
  }
}