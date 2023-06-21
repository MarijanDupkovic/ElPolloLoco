class Cloud extends MoveableObject {
    y = 0;
    width = 600;
    height = 300;
    constructor() {
        super().loadImage('./img/5_background/layers/4_clouds/1.png');
        this.x = 0 + Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}



