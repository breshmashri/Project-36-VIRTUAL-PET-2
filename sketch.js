//Creating varibles
var database;
var dog, dogImg, happydogImg;
var boy, boyImg;
var doghouse, doghouseImg;
var feedButton,addFoodButton;
var food,foodS,foodStock;
var fedTime;
var lastTime;
var readState,gameState;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/happydogImg.png");
  boyImg = loadImage("images/boyImg.png");
  doghouseImg = loadImage("images/doghouseImg.png");
}

function setup(){
  database = firebase.database();
  createCanvas(1000, 500);

  dog = createSprite(820, 200, 15, 15);
  dog.addImage(dogImg);
  dog.scale = 0.25;
  boy = createSprite(360, 365, 10, 10);
  boy.addImage(boyImg);
  boy.scale = 0.1;
  doghouse = createSprite(100, 400, 10, 10);
  doghouse.addImage(doghouseImg);
  doghouse.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  food = new Food();

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  });
  feedButton = createButton("Feed The Dog");
  feedButton.position(685, 100);
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(795, 100);
  addFoodButton.mousePressed(addFood);
}
function draw(){
  currentTime = hour();
  background(46, 139, 87);  
  food.display();
  food.getTime();
  drawSprites();
  textSize(20);
  fill("white");
  text("Food Remaining: " +foodS, 170, 100);
  if(lastTime!=undefined){
    if(lastTime >= 12){
      fill("white");
      textSize(15); 
      text("Last Fed : "+ lastTime%12 + " PM", 350, 30);
    }
    else if(lastTime === 0){
      fill("white");
      textSize(15); 
      text("Last Fed : 12 AM", 350, 30);
    }
    else{
      fill("white");
      textSize(15); 
      text("Last Fed : "+ lastTime + " AM", 350, 30);
    }
  }
}

function readStock(data){
  foodS = data.val();
  food.updateFoodStock(foodS);
}

function feedDog(){
    dog.addImage(happydogImg);
    foodS--;
    database.ref('/').update({
      Food : foodS
    });
    fedTime = hour(); 
}

function addFood(){
  dog.addImage(dogImg);
  foodS++;
  database.ref('/').update({
    Food : foodS
  });
  updateTime(hour());
}