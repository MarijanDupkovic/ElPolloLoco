class Chicken extends MoveableObject {
    y = 480 - this.height;
    height = 100;
    isDead = false;
    type = 'CHICKEN';
    AUDIO_DEATH = new Audio('./audio/deathC.mp3');
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['./img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    offset = {
        'top': 0,
        'bottom': 0,
        'left': -12,
        'right': 0
    };
    last_pos_x = [];
    x = 0;
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + this.randomX();
        this.AUDIO_DEATH.playbackRate = 1;
        this.speed = 0.9 * Math.random() *(1 - 0.5) +0.5;
        this.animate();
    }

    /**
     * Checks x is already used
     * @param {*} x 
     * @returns 
     */
    includesLastPosX(x) {
        return this.last_pos_x.includes(x);
    }

    /**
     * Returns a Random X by using Math.random()*8000*0.5
     * for getting an Number between 0 and 4000
     * @returns 
     */
    randomX() {
        this.x += Math.random()*8000*0.5;
        if (this.includesLastPosX(this.x)) this.randomX();
        else {
            this.last_pos_x.push(this.x);
            return this.last_pos_x[this.last_pos_x.length-1] + this.x;
        }
    }

    /**
     * animates the Walking of Chicken enemy
     */
    showWalking(){
        if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Start animation of Chicken
     */
    animate() {
        world.intervals.push(setInterval(() => this.moveLeft(), 1000 / 60));
        world.intervals.push(setInterval(() => this.showWalking(), 1000 / 10));
    }
}
