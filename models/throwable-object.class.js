class ThrowableObject extends MoveableObject {
    AUDIO_PICK = new Audio('./audio/throw.mp3');
    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    collide = false;
    thrown;
    throwTime = 0;
    constructor(x, y) {
        super();
        this.loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.throw(this.x, this.y);
        this.animate();

    }
    throw() {
        if (this.y < 380 && !this.collide) this.startThrowing();
        else this.collide = true;
    }

    startThrowing() {
        if (world.character.otherDirection) this.throwNow(-10);
        else this.throwNow(10);
    }

    throwNow(number) {
        let throwTimenow = new Date().getTime();
        if(throwTimenow - this.throwTime > 500){
            this.AUDIO_PICK.play();
            world.statusbars[2].bottleCount--;
            world.statusbars[2].setPercentage(world.statusbars[2].bottleCount);
            this.x -= world.character.offset.left;
            this.speedY = 10;
            this.applyGravity();
            world.intervals.push(this.thrown = setInterval(() => this.x += number, 25));
            world.character.startIdle = new Date().getTime();
            this.throwTime = throwTimenow;
        }
        
    }

    animate() {
        setInterval(() => {if (!this.collide) this.playAnimation(this.IMAGES_ROTATION)}, 1000 / 60 * 4);
        setInterval(() => {if (this.collide) this.playAnimation(this.IMAGES_SPLASH)}, 1000 / 60 * 6);
    }

}