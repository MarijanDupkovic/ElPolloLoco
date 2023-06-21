class Character extends MoveableObject {
    speed = 10;
    height = 250;
    width = 150;
    y = 480 - this.height - 100;

    IMAGES_IDLE = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_IDLE_LONG = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];
    world;
    startIdle;
    moving;
    WALKING_SOUND = new Audio('./audio/walkingCharacter.mp3');
    offset = {
        'top': 150,
        'bottom': 30,
        'left': 30,
        'right': 65
    };
    idle;
    idledLong;
    walking;
    hurting;
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.startIdle = new Date().getTime();
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    /**
     * Returns true if character idles longer than 5 seconds
     * @returns bool
     */
    checkIdleTime() {
        return new Date().getTime() - this.startIdle >= 5000;
    }
    /**
     * Returns true, if Rightkey is presses and level is not ended
     * @returns 
     */
    isMovingRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - 300;
    }

    /**
     * Returns true, if Leftkey is presses and level is not ended
     * @returns 
     */
    isMovingLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Checks if Character is jumping
     * true if key is pressed and character is not already above Ground
     * @returns 
     */
    isJumping() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Moves the Character right, uses the superclass method.
     * Sets startIdle and sets direction, also plays sound if activated
     */
    moveRight() {
        super.moveRight();
        this.startIdle = new Date().getTime();
        this.otherDirection = false;
        if (!this.isAboveGround()) this.WALKING_SOUND.play();
    }

    /**
     * turns Audio volume of Character to 0 
     */
    audioOff() {
        this.WALKING_SOUND.volume = 0;
    }

    /**
     * Let chararter jump uses the superclass funtion
     * and sets startIdle
     */
    jump() {
        this.speedY = 20;
        this.startIdle = new Date().getTime();
    }

    /**
     * Moves the Character left, using superclass funtion.
     * sets startIdle, changes direction and play sound
     */
    moveLeft() {
        super.moveLeft();
        this.startIdle = new Date().getTime();
        this.otherDirection = true;
        if (!this.isAboveGround()) this.WALKING_SOUND.play();
    }

    /**
     * Sets the options for Walking sound.
     */
    setMovingSound() {
        this.WALKING_SOUND.pause();
        this.WALKING_SOUND.playbackRate = 6;
    }

    /**
     * Checks if character is moving oder jumping
     */
    setMoving() {
        this.setMovingSound();
        if (this.isMovingRight()) this.moveRight();
        if (this.isMovingLeft()) this.moveLeft();
        this.world.camera_x = -this.x + 50;
    }

    /**
     * checks if the right key is pressed
     * @returns 
     */
    isRightPressed() {
        return this.world.keyboard.RIGHT;
    }

    /**
     * checks if the left key is pressed
     * @returns 
     */
    isLeftPressed() {
        return this.world.keyboard.LEFT;
    }

    /**
     * checks if the space key is pressed
     * @returns 
     */
    isSpacePressed() {
        return this.world.keyboard.SPACE;
    }

    /**
     * checks if the Throw key is pressed
     * @returns 
     */
    isThrowPressed() {
        return this.world.keyboard.THROW;
    }

    /**
     * Checks if character is doing nothing
     * @returns 
     */
    isNotMoving() {
        return !this.isRightPressed() && !this.isLeftPressed() &&
            !this.isSpacePressed() && !this.isThrowPressed() && !this.isAboveGround(); 
    }

   /**
     * Clear idleLong interval when exist
     * then start idle animation
     */
    animateIdle() {
        if (this.idledLong.length > 0 && !this.isJumping()) clearInterval(this.idledLong);
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Clear idle interval when exist
     * then start long idle animation 
     */
    animateIdleLong() {
        if (this.idle.length > 0 ) clearInterval(this.idle);
        if(!this.isJumping()) this.playAnimation(this.IMAGES_IDLE_LONG);
    }

    /**
     * Animates the Jump when character is above the ground.
     * When on the ground show First Image of Idle
     */
    animateJump() {
        if (this.isAboveGround() && !this.isJumping() && !this.isHurt()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else this.currentImage = 0;
    }


    /**
     * Animates moving when character is on ground and moves left or right
     */
    animateMoving() {
        if (!this.isAboveGround() && (this.isMovingRight() || this.isMovingLeft() )&& !this.isJumping() && !this.isHurt())  this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * If character has been hurt but is still alive
     * show the hurt animation
     */
    animateHurt() {
        if (this.isHurt() && !this.isDead()) this.hurt();
    }

    hurt(){
        this.playAnimation(this.IMAGES_HURT)
    
    }

    /**
     * Ends the Game after 1000ms
     */
    endgame() {
        setTimeout(() => this.showGameOver(), 1000);
    }

    /**
     * clears all intervals and set Game Over Screen
     */
    showGameOver() {
        world.clearAllIntervals();
        world.setGameOverScreen(world.IMAGE_LOSE);
    }

    /**
     * start idle when character is not moving
     */
    startAnimateIdle() {
        if (this.isNotMoving() && !this.isHurt() && !this.checkIdleTime() &&!this.isJumping()) this.animateIdle();
    }

    /**
     * start long Idle when idle Time is arrived and character is not moving
     */
    startAnimateIdleLong() {
        if (this.isNotMoving() && !this.isHurt() && this.checkIdleTime() &&!this.isJumping()) this.animateIdleLong();
    }

    /**
     * Clears walking and moving intervals and plays animation
     * of Character when dead
     */
    deathanimate() {
        clearInterval(this.walking);
        clearInterval(this.moving);
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Starts animation when charater is dead
     */
    startDeadAnimation() {
        if (this.isDead()) this.deathanimate();
    }

    /**
     * If Character is at 0 energy start
     * endgame
     */
    startEnd() {
        if (this.isDead()) this.endgame();
    }

    setJumping(){
        if (this.isJumping()) this.jump();
        this.world.camera_x = -this.x + 50;
    }

    /**
     * animates character by inserting intervals
     */
    animate() {
        world.intervals.push(this.walking = setInterval(() => this.setMoving(), 1000 / 60));
        world.intervals.push(this.walking = setInterval(() => this.setJumping(), 1000 /60));
        world.intervals.push(setInterval(() => this.animateJump(), 1000 /60*9));
        world.intervals.push(this.moving = setInterval(() => this.animateMoving(), 1000 / 40));
        world.intervals.push(this.hurting = setInterval(() => this.animateHurt(), 1000 /60*6));
        world.intervals.push(this.idle = setInterval(() => this.startAnimateIdle(), 1000/90*10));
        world.intervals.push(this.idledLong = setInterval(() => this.startAnimateIdleLong(), 1000 /90*10));
        world.intervals.push(setInterval(() => this.startDeadAnimation(), 1000 / 7));
        world.intervals.push(setInterval(() => this.startEnd(), 75));
    }

}

