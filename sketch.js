var bgImg, bg
var net, netImg;
var kageyama,kageyamaImg,kageyamaHit,kageyamaAmn, kageyamaRec;
var kageyamaHand;
var hinata,hinataImg,hinataRec, hinataHit, hinataAmn;
var hinataHappy
var hinataHand
var volleyball, volleyballImage;
var bo1,bo2,bo3,bo4;
var home, homeImg;
var start, startImg;
var restart, restartImg;

var kageyamaScore = 0;
var hinataScore = 0;


var gameState = 0;

function preload(){
  //Load Images
  hinataImg = loadImage("hinata.png");
  kageyamaImg = loadImage("kageyama.png");
  bgImg = loadImage("vbbg-1.jpg");
  volleyballImage = loadImage("volleyball.png");
  netImg = loadImage("net.png");
  homeImg = loadImage("home.png");
  startImg = loadImage("start.png")

  //Load Animations
  kageyamaRec = loadAnimation("kagsRec.png");
  hinataAmn = loadAnimation("hinata.png")
  kageyamaAmn = loadAnimation("kageyama.png");
  hinataHit = loadAnimation("hinata-1.png", "hinata-2.png", "hinata-3.png", "hinata-4.png")
  hinataRec = loadAnimation("hinata(1).png","hinata(2).png","hinata(3).png","hinata(4).png","hinata(5).png","hinata(6).png")
  kageyamaHit = loadAnimation("kageyama(1).png", "kageyama(2).png", "kageyama(3).png", "kageyama(4).png", "kageyama(5).png", "kageyama(6).png");
}

function setup() {
  //Create the canvas
  createCanvas(800,400);

  //Create play screen
  home = createSprite(395,200);
  home.addImage(homeImg)
  home.scale = 0.44
  
  //Create start button
  start = createSprite(400,200);
  start.addImage(startImg);
  start.scale = 0.1;
  
  //Create boundries
  bo1 = createSprite(400,395,800,10);
  bo1.shapeColor = 'black';
  bo2 = createSprite(400,5,800,10);
  bo2.shapeColor = 'black';
  bo3 = createSprite(795,200,10,400);
  bo3.shapeColor = 'black';
  bo4 = createSprite(5,200,10,400);
  bo4.shapeColor = 'black';

  //Create the net
  net = createSprite(413,200);
  net.addImage(netImg);
  net.scale = 0.45;
  net.visible = false
  
  //Create Hinata
  hinata = createSprite(150,200);
  hinata.addImage(hinataImg);
  hinata.scale = 0.17;
  hinata.visible = false
  
  //Create Kageyama
  kageyama = createSprite(645,200);
  kageyama.addImage(kageyamaImg);
  kageyama.scale= 0.2;
  kageyama.visible = false;
  
  //Create Kageyama's hand to hit the ball
  kageyamaHand = createSprite(770,600, 10, 150);
  kageyamaHand.visible = false;
  
  //Hinata's hand
  hinataHand = createSprite(100,200,10,150);
  hinataHand.visible = false;
  
  //Create the ball
  volleyball = createSprite(640, 200);
  volleyball.addImage(volleyballImage);
  volleyball.scale = 0.07;
  volleyball.visible = false;

  //Sprites to show who won
  home2 = createSprite(1500,500);
  home2.addImage(homeImg);
  home2.scale = 1.7;
  home2.visible = false;
  
  home1 = createSprite(-500,700);
  home1.addImage(homeImg);
  home1.scale = 1.7;
  home1.visible = false;

  gameState = 0;
}

function draw() { 
  //Add image to background
  background(bgImg);
     stroke('red')
    text("Kageyama's score: "+ kageyamaScore, 630, 50)
  text("Hinata's score: "+ hinataScore, 40, 50)
  if(mousePressedOver(start)){
    gameState = 1;
  }
  

 //TO keep his hand moving to serve
  kageyamaHand.y = kageyama.y+10
  
  //State with instructions, and serve
  if(gameState === 1){
    home.destroy();
    start.destroy();
    kageyama.visible = true;
    hinata.visible = true;
    net.visible = true;
    volleyball.visible = true;
    
    if( keyDown('left') && gameState === 1){
      volleyball.velocityY = -6
    } 
    stroke("darkBlue")
    textSize(25)
    text("→  ", 500,100);
    text("↑", 500,150)
    text("←",500,200)
    text("↓",500,250)
    
    stroke("orange")
    text("A",270,100);
    text("W",270,150);
    text("D",270,200);
    text("S",270,250);
    
    textSize(15);
    stroke("darkBlue")
    text("Recieve", 480,120)
    text("Up", 500, 170)
    text("Serve",500,220)
    text("Down", 500,270)
    
    stroke("orange")
    text("Recieve", 260,120)
    text("Up", 270, 170)
    text("Spike",260,220)
    text("Down", 260,270)
    
    stroke("black")
    text("Press R to restart the game", 600,360)
    text("when someone wins!", 600,380)
    text("First to get to 25 is the winner!", 20,380)
  if(volleyball.y<=30){
      volleyball.velocityY = volleyball.velocityY + 4;
      kageyama.addAnimation("hittingTheBall",kageyamaHit);
      kageyama.changeAnimation("hittingTheBall",kageyamaHit);
      kageyamaHand.velocityX = -8;
  }
  if(kageyamaHand.isTouching(volleyball)){
    volleyball.velocityY = 3;
    volleyball.velocityX = -15;
    kageyama.addAnimation("orig",kageyamaAmn);
    kageyama.changeAnimation("orig",kageyamaAmn);
    gameState = 2;
  }
  }
  
  if(gameState == 2){
    //Hinata's receive
    kageyamaHand.velocityX = 0;
    if(keyWentDown('a')){
      hinata.addAnimation("hinataRecieve", hinataRec);
      hinata.changeAnimation("hinataRecieve", hinataRec);
    }
    if(keyWentUp('a')){
      hinata.addAnimation("orig", hinataAmn);
      hinata.changeAnimation("orig", hinataAmn);
    }
  //hinata hit
  if(keyWentDown('d')){
    hinata.addAnimation("hinataSpike", hinataHit)
    hinata.changeAnimation("hinataSpike", hinataHit)
  }
    if(keyWentUp('d')){
      hinata.addAnimation("orig", hinataAmn);
      hinata.changeAnimation("orig", hinataAmn);
    }
  //Kageyama controls
  if(keyDown('up')){
    kageyama.y-=5;
  }
  if(keyDown('down')){
    kageyama.y+=5;
  }
  //Kageyama's recieve
    if(keyWentDown('right')){
      kageyama.addAnimation("kags",kageyamaRec);
      kageyama.changeAnimation("kags",kageyamaRec);
    }
    if(keyWentUp('right')){
       kageyama.addAnimation("orig", kageyamaAmn);
      kageyama.changeAnimation("orig", kageyamaAmn);
       }
  //Kageyama hit
  if(keyWentDown('left')){
        kageyama.addAnimation("hittingTheBall",kageyamaHit);
      kageyama.changeAnimation("hittingTheBall",kageyamaHit);
        //kageyamaHand.y = kageyama.y;
  }
  if(keyWentUp('left')){
     kageyama.addAnimation("orig", kageyamaAmn);
      kageyama.changeAnimation("orig", kageyamaAmn);
  }
volleyball.bounceOff(hinataHand);
 volleyball.bounceOff(kageyamaHand);
    
    if(volleyball.x<0 ){
      kageyamaScore+=1;
      volleyball.x = 640;
      volleyball.velocityX = 0;
      kageyamaHand.x = 770;
      kageyama.x = 645;
      kageyama.y = 200;
            kageyama.changeAnimation("orig", kageyamaAmn);
      hinata.addAnimation("orgi", hinataAmn);
      hinata.changeAnimation("orgi", hinataAmn);
      gameState = 1
    }
    if( volleyball.x>800){
      hinataScore+=1;
      volleyball.x = 640;
      volleyball.velocityX = 0;
      kageyamaHand.x = 770;
      kageyama.x = 645;
      kageyama.y = 200;
      kageyama.addAnimation("orig", kageyamaAmn);
      kageyama.changeAnimation("orig", kageyamaAmn);
      hinata.addAnimation("orgi", hinataAmn);
      hinata.changeAnimation("orgi", hinataAmn);
      gameState = 1
    }
    


  //Hinata controls
  if(keyDown('w')){
    hinata.y-=5;
  }
  if(keyDown('s')){
    hinata.y+=5;
  }
  
  //Collide with the walls
  kageyama.collide(bo1);
  kageyama.collide(bo2);
  kageyama.collide(bo3);
  kageyama.collide(bo4);
  
  hinata.collide(bo1);
  hinata.collide(bo2);
  hinata.collide(bo3);
  hinata.collide(bo4);
  
        volleyball.bounceOff(bo1);
  volleyball.bounceOff(bo2);

  }

      if(kageyamaScore === 25){
      kageyama.visible = false;
      hinata.visible = false;
      volleyball.visible = false;
      net.visible = false;
      home1.visible = true;
        gameState = 3;
        
    }
    if(hinataScore === 25){
            kageyama.visible = false;
      hinata.visible = false;
      volleyball.visible = false;
      net.visible = false;
              home2.visible = true
      gameState = 4
    }
  
  if( keyDown( "r")){
    gameState = 1
     home1.visible = false;
     home2.visible = false
     volleyball.x = 640;
      volleyball.velocityX = 0;
      kageyamaHand.x = 770;
      kageyama.x = 645;
      kageyama.y = 200;
      hinataScore = 0;
      kageyamaScore = 0;
  }

  if(keyDown('w')){
    hinata.y-=5;
  }
  if(keyDown('s')){
    hinata.y+=5;
  }
  hinataHand.y = hinata.y+15;
  
  drawSprites();
 
}


