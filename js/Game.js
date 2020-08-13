class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addAnimation("IdleB",boxIdleAnmi)
    car1.addAnimation("attackB",boxAtkAnmi)
    car1.addAnimation("runB",boxRunAnmi)
    car1.scale=3;
    car2 = createSprite(300,200);
    car2.addAnimation("IdleB",boxIdleAnmi)
    car2.addAnimation("attackB",boxAtkAnmi)
    car2.addAnimation("runB",boxRunAnmi)
    car2.scale=3;
   // car2.addImage("car2",car2_img);
  //  car3 = createSprite(500,200);
   // car3.addImage("car3",car3_img);
   // car4 = createSprite(700,200);
   // car4.addImage("car4",car4_img);
    cars = [car1, car2 ];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
     // image(, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distanceY;
        x = displayHeight - allPlayers[plr].distanceX;
    //    y = displayHeight + allPlayers[plr].distanceY;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
         // stroke(10);
          //fill("red");
        //  ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distanceY +=10
      player.update();
      cars[player.index-1].changeAnimation("runB",boxRunAnmi)
    }
    
  

   else if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distanceY -=10
      player.update();
       cars[player.index-1].changeAnimation("runB",boxRunAnmi)
    }

   else if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distanceX -=10
      player.update();
      cars[player.index-1].changeAnimation("runB",boxRunAnmi)
    }

   else if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distanceX +=10
      player.update();
       cars[player.index-1].changeAnimation("runB",boxRunAnmi)
    }

    else{
      cars[player.index-1].changeAnimation("IdleB",boxIdleAnmi)
    }

    

  if(keyWentDown("space") && player.index!==null){
    cars[player.index-1].changeAnimation("attackB",boxAtkAnmi)
    attackMode=true;
  }
  if(keyWentUp("space") && player.index!==null){
    cars[player.index-1].changeAnimation("IdleB",boxIdleAnmi)
    attackMode=false;
  }

  if(cars[player.index-1].isTouching(monsterGroup) && attackMode===true){
   // monsterGroup.changeAnimationEach("tradeath",trashDeathAnmi)
    monsterGroup.destroyEach()
    kills=kills+1
  }

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
     Player.updateCarsAtEnd(player.rank)
    }
    if(frameCount%200===0){
      spawnMonsters();
    }
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
