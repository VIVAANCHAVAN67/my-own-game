var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;
var barrelAttackAnmi;
var trashAttackAnmi;
var ground;
var boxAtkAnmi
var boxRunAnmi
var boxIdleAnmi
var attackMode=false;
var monsterGroup;
var kills=0;
var trashDeathAnmi;

function preload(){
  ground=loadImage("ground.png")
  boxRunAnmi=loadAnimation("boxer run/tile000.png","boxer run/tile001.png","boxer run/tile002.png","boxer run/tile003.png","boxer run/tile004.png","boxer/tile005.png")
  trashDeathAnmi=loadAnimation("trash monster/tile016.png","trash monster/tile017.png","trash monster/tile018.png","trash monster/tile019.png","trash monster/tile020.png","trash monster/tile021.png","trash monster/tile022.png")
  boxIdleAnmi=loadAnimation("boxer Idle/tile000.png","boxer Idle/tile001.png","boxer Idle/tile002.png","boxer Idle/tile003.png")
  boxAtkAnmi=loadAnimation("boxer/tile000.png","boxer/tile001.png","boxer/tile002.png","boxer/tile003.png","boxer/tile004.png","boxer/tile005.png")
  trashAttackAnmi=loadAnimation("trash monster/tile025.png","trash monster/tile026.png","trash monster/tile027.png","trash monster/tile028.png","trash monster/tile029.png","trash monster/tile030.png","trash monster/tile031.png")
  barrelAttackAnmi=loadAnimation("attack/tile000.png","attack/tile001.png","attack/tile002.png","attack/tile003.png","attack/tile004.png","attack/tile005.png","attack/tile006.png","attack/tile007.png","attack/tile008.png","attack/tile009.png","attack/tile010.png","attack/tile011.png","attack/tile012.png","attack/tile013.png","attack/tile014.png","attack/tile015.png","attack/tile016.png")
}
  
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  monsterGroup=new Group()
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  textSize(18)
  text("Kills:"+kills,displayWidth-100,100)
}

function spawnMonsters(){
  var monster = createSprite(random(0,displayWidth),random(displayHeight*-4,0))
  monster.addAnimation("attack",barrelAttackAnmi);
  monster.addAnimation("trattack",trashAttackAnmi)
  monster.addAnimation("tradeath",trashDeathAnmi);
  //monster.shapeColor="green"
 var num=Math.round(random(1,2));
 if(num===1){
  monster.changeAnimation("attack",barrelAttackAnmi)
 }
  else if(num===2){
 monster.changeAnimation("trattack",trashAttackAnmi)
  }
  
  monster.scale=2;
  monster.velocityY=2;
  monsterGroup.add(monster);
}