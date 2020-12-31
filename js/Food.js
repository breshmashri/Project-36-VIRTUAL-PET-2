class Food{
    constructor(){
        this.foodStock;
        this.fedTime;
        this.image = loadImage("images/Milk.png");
    }
    getFoodStock(){
        return this.foodStock;
    }
    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }
    deductFoodStock(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock -1;
        }
    }
    getTime(){
        var timeRef  = database.ref('FeedTime');
        timeRef.on("value", function(data){
           lastTime = data.val();
        });
      }
      updateTime(time){
        database.ref('/').update({
          FeedTime: time
        });
      }
    display(){
        var x = 80;
        var y = 100;
        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);
        if(this.foodStock != 0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10 == 0){
                    x = 80;
                    y = y +50;
                }
        image(this.image, x, y, 50, 50);
        x = x +30;
            }
        }
    }
}
