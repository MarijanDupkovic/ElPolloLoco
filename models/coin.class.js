class Coin extends PickableObject {
    IMAGES = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];
    
    AUDIO_PICK = new Audio('./audio/coin.mp3');
    offset = {
        'top': 0,
        'bottom': 0,
        'left': 10,
        'right': 0
    };
    constructor(x,y){
        super().loadImage('./img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;
        this.animate();
    }

    animate(){
        world.intervals.push(setInterval(()=> this.playAnimation(this.IMAGES),500));
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }
}