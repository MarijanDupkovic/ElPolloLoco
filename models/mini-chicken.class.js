class MiniChicken extends MoveableObject {
    height = 75;
    y = 480 - this.height - 55;
    width = 75;
    isDead = false;

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['./img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    offset = {
        'top': -5,
        'bottom': 0,
        'left': -10,
        'right': -10
    };
    last_pos_x = [];
    AUDIO_DEATH = new Audio('./audio/deathC.mp3');
    x = 0;
    constructor() {
        super().loadImage(this.IMAGES_DEAD[0]);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + this.randomX();
        this.speed = 1.5 * Math.random() *(1 - 0.5)+0.5;
        this.animate();
    }

    /**
     * Return a Random X by unsing 
     * this.x += 125 + Math.random() * 8000 * 0.125
     * @returns 
     */
    randomX() {
        this.x += 125 + Math.random() * 8000 * 0.125;
        if (this.last_pos_x.includes(this.x)) this.randomX();
        else {
            this.last_pos_x.push(this.x);
            return this.last_pos_x[this.last_pos_x.length - 1] + this.x;
        }
    }

    /**
     * animate Walling when Charater is not dead
     */
    animateWalking() {
        if (!this.isDead) this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Start Animation of MiniChicken
     */
    animate() {
        world.intervals.push(setInterval(() => this.moveLeft(), 1000 / 60));
        world.intervals.push(setInterval(() => this.animateWalking(), 500 / 5));
    }
}
