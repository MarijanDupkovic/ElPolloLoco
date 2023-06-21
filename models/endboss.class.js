class Endboss extends MoveableObject {
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    width = 250;
    height = 350;
    y = 95;
    type = 'ENDBOSS';
    offset = {
        'top': 0,
        'bottom': 0,
        'left': 50,
        'right': 0
    };
    isAlerted = false;
    alertion;
    walking;
    activate;
    alerted;
    isWalking = false;
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_ALERT);
        this.energy = 15;
        this.speed = 3;
        this.x = 4700;
        this.animate();
    }

    /**
     * Returns true if character is nearer 550px to the
     * Boss
     * @returns bool
     */
    checkDistanceToCharacter550() {
        return this.x - world.character.x <= 550;
    }
    /**
     * Returns true if the Distance to Character ist more
     * than 50px
     * @returns bool
     */
    checkDistanceToCharacterGr50() {
        return this.x - world.character.x > 50;

    }
    /**
    * Returns true if character is nearer 50px to the
    * Boss
    * @returns bool
    */
    checkDistanceToCharacter50() {
        return this.x - world.character.x <= 100;
    }

    /**
     * Clears all intervals and activates the GameOverScreen
     */
    endgame() {
        setTimeout(() => {
            world.clearAllIntervals();
            world.setGameOverScreen(world.IMAGE_GAME_OVER);
        }, 1000);
    }
    /**
     * Animates the death of Endboss
     * After 1 second the GameOverScreen is called
     */
    animateDeath() {
        if (this.isDead()) this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Activates Alertion of Boss.
     */
    setAlert() {
        if (world.checkGameStartet() && !this.isDead() &&
            this.checkDistanceToCharacter550() && !this.isAlerted) this.isAlerted = true;
    }

    /**
     * Start Animation of alerted Endboss when alerted
     */
    animateAlert() {
        if (!this.isDead() && this.isAlerted) {
            clearInterval(this.alerted);
            this.playAnimation(this.IMAGES_ALERT);
        }
    }

    /**
     * Starts Moving the Boss after 3 seconds when Distance is less than 550px
     * and Endboss is alerted
     */
    startBossMoveLeft() {
        setTimeout(() => this.startBossMoveTimed(), 3000);
    }

    /**
     * Moves the Boss left with animation. Clears alertion animation
     */
    startBossMoveTimed() {
        clearInterval(this.alertion);
        this.isWalking = true;
        this.playAnimation(this.IMAGES_WALKING);
    }

    /**
     * Activeate the Endboss
     */
    activateBoss() {
        if (world.checkGameStartet() && !this.isDead() && this.checkDistanceToCharacterGr50()
            && this.checkDistanceToCharacter550 && this.isAlerted) {
            world.intervals.push(this.walking = setInterval(() => this.startBossMoveLeft(), 1000 / 4));
            clearInterval(this.activate);
        }
    }

    /**
     * Attacks the Character and starts animation of attack
     */
    startAttackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK);
        world.hitCharacter();
    }

    /**
     * animates attack when distance is less than 50px and Endboss is alerted
     */
    animateAttack() {
        if (world.checkGameStartet() && !this.isDead() &&
            this.checkDistanceToCharacter50() && this.isAlerted) this.startAttackAnimation();
    }

    /**
     * Moves the Boss left with animation.
     * Uses superclass moveLeft function
     */
    moveLeft() {
        clearInterval(this.walking);
        this.playAnimation(this.IMAGES_WALKING);
        super.moveLeft();
    }

    /**
     * plays animation if Endboss has been hurt
     */
    animateIsHurt() {
        if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * starts all intervals for Endboss and saves them in world.intervals
     * Array
     */
    animate() {
        world.intervals.push(setInterval(() => this.animateDeath(), 1000 / 60*4),
            this.alerted = setInterval(() => this.setAlert(), 25),
            this.alertion = setInterval(() => this.animateAlert(), 1000 / 40*8),
            setInterval(() => this.animateAttack(), 1000 / 20),
            setInterval(() => this.animateIsHurt(), ((1000 / 30*3)+(1000/(30-this.speed)*3))),
            this.activate = setInterval(() => this.activateBoss(),25),
            setInterval(() => { if (this.isWalking && !this.isDead() && !this.isHurt()) this.moveLeft(); },1000 /(30-this.speed)*3),
            setInterval(() => { if (this.isDead()) this.endgame() }, 75));
    }
}               
