//Create variables here
var dog;
var standingDog;
var database;
var foodS;
var foodStock;
var standingDogImage;
var dogImage;
var feed;
var addFood;
var fedTime;
var lastFed;
var foodObj;

function preload()
{
  //load images here
  standingDogImage= loadImage("dogImg.png");
  dogImage= loadImage("dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database()
  dog= createSprite(250,400);
  dog.addImage(dogImage)
dog.scale=0.2;
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);

  foodObj= new food();
  feed= createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add food");
  addFood.position(800,95)
  addFood.mousePressed(addFoods);
 
}


function draw() {  
background(46,139,87)
//if(keyWentDown(UP_ARROW)){
 // writeStock(foodS);
  dog.addImage(standingDogImage);
foodObj.display();
 
fedTime=database.ref('feedTime');
fedTime.on("value", function(data){
  lastFed= data.val();
})
  //add styles here
 /* textSize(24)
  textFont("Avenir")
  stroke(4)
  text(" Note: Press UP_ARROW key To Feed the Dog Milk",100,200)*/
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text(" Last Feed : "+ lastFed%12 + " PM", 350, 30);
} else if(lastFed==0){
  text(" Last Feed : 12 AM",350,30);
  }else{
    text(" Last Feed :"+ lastFed+ "AM",350,30);
  }
  drawSprites();
}


function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}

/*function writeStock(x){
  if(x<=0){
    x=0;
}else{
  x=x-1;
}
database.ref('/').update({
  Food:x
})
display();
fedTime=database.ref('FeedTime');
fedTime.on("value", function(data){
lastFed=data.val();
}
} */


function feedDog(){
  dog.addImage(dogImage);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
 
}



