class GameOverScreen extends DrawableObject{
    constructor(x,y, IMAGE){
        super().loadImage(IMAGE);
        this.x = x;
        this.y = y;
        this.width = 1000;
        this.height = 480;
    }
}