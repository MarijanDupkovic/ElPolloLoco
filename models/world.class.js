class World {
    START_SCREEN = new StartScreen();
    camera_x = 0;
    level;
    keyboard;
    keyboard_dummy;
    canvas_dummy;
    canvas;
    character;
    ctx;
    gameOverScreen = [];
    throwableObjects = [];
    statusbars = [];
    IMAGE_LOSE = './img/9_intro_outro_screens/game_over/you lost.png';
    IMAGE_GAME_OVER = './img/9_intro_outro_screens/game_over/game over.png';
    isGameStartet = false;
    tOActive = 0;
    splash;
    intervals = [];

    constructor(canvas, keyboard) {
        this.canvas_dummy = canvas;
        this.keyboard_dummy = keyboard;
    }


    /**
     * Starts the Game
     */
    startGame() {
        this.character = new Character();
        startLevel1();
        this.initCoins();
        this.initBottles();
        this.initBars();
        this.initLevel();
        this.showCanvas();
        this.drawGame();
        this.runGame();
        loadFromSStorage();
    }

    /**
     * Draws the game to the canvas
     */
    drawGame() {
        this.ctx = this.canvas.getContext('2d');
        this.draw();
    }

    /**
     * runs the Game
     */
    runGame() {
        this.setWorld();
        this.run();
    }

    /**
     * Shows canvas and hides startscreen
     */
    showCanvas() {
        document.getElementById('canvas').classList.remove('d-none');
        document.getElementById('startScreen').classList.add('d-none');
    }

    /**
     * initialises the level and sets isGameStartet to true
     */
    initLevel() {
        this.level = level1;
        this.canvas = this.canvas_dummy;
        this.keyboard = this.keyboard_dummy;
        this.isGameStartet = true;
    }

    /**
     * Initialises the statusbars
     */
    initBars() {
        this.statusbars.push(new CharacterStatusBar(), new CoinStatusBar(), new BottleStatusBar());
    }

    /**
     * Initialises the pickable Bottles
     */
    initBottles() {
        this.bottles = [new Bottle(300 + Math.random() * 4500, 360), new Bottle(300 + Math.random() * 4500, 360), new Bottle(300 + Math.random() * 4500, 360),
        new Bottle(300 + Math.random() * 4500, 360), new Bottle(300 + Math.random() * 4500, 360), new Bottle(300 + Math.random() * 4500, 360),
        new Bottle(300 + Math.random() * 4500, 360), new Bottle(300 + Math.random() * 4500, 360), new Bottle(300 + Math.random() * 4500, 360),
        new Bottle(300 + Math.random() * 4500, 360), new Bottle(300 + Math.random() * 4500, 360), new Bottle(300 + Math.random() * 4500, 360),
        new Bottle(300 + Math.random() * 4500, 360)];
    }

    /**
     * initialises the pickable coins
     */
    initCoins() {
        this.coins = [new Coin(this.genRandomX(), this.genRandomY()),
        new Coin(this.genRandomX(), this.genRandomY()),
        new Coin(this.genRandomX(), this.genRandomY()),
        new Coin(this.genRandomX(), this.genRandomY())];
    }

    /**
     * Clears all intervals
     */
    clearAllIntervals() {
        for (let i = 0; i < 6; i++) this.intervals.forEach((interval) => this.clearOneInterval(interval));
    }

    /**
     * Clears the given interval and removes it from this.intervals
     * @param {*} interval 
     */
    clearOneInterval(interval) {
        const index = this.intervals.indexOf(interval);
        clearInterval(interval);
        this.intervals.splice(index, 1);
    }

    /**
     * Returns true if Game is startet
     * @returns 
     */
    checkGameStartet() {
        return this.isGameStartet;
    }

    /**
     * Generates a random Number between 0 - 300
     * @returns 
     */
    genRandomY() {
        return Math.random() * 300;
    }

    /**
     * Generates a random Numer between 0 - 2500
     * @returns 
     */
    genRandomX() {
        return Math.random() * 2500;
    }

    /**
     * Sets the character world to this object
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the Gamelogic
     */
    run() {
        this.intervals.push(setInterval(() => this.checkAllCollisions(), 50));
    }

    /**
     * Checks all Collisions
     */
    checkAllCollisions() {
        this.checkCollisions();
        this.checkThrowObjects();
    }

    /**
     * 
     * @returns Checks if bottle can be thrown
     */
    isThrown() {
        return this.keyboard.THROW && this.statusbars[2].objectCount > 0;
    }

    /**
     * Checks the active time of an ThrowableObject
     * @returns 
     */
    checkToActiveTime() {
        let now = new Date().getTime();
        return now - this.tOActive > 500;
    }

    /**
     * If ActiveTime is true add a new ThrowObject
     * @param {*} volume 
     */
    addThrowObject(volume) {
        if (this.checkToActiveTime()) this.addNewThrowObject(volume);
    }

    /**
     * Add a new ThrowObject and sets the volume
     * @param {*} volume 
     */
    addNewThrowObject(volume) {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.tOActive = true;
        bottle.AUDIO_PICK.volume = volume;
        this.throwableObjects.push(bottle);
        this.tOActive = new Date().getTime();
    }

    /**
     * When it should be thrown add a new ThrowObject 
     * and check audio
     */
    checkThrowObjects() {
        if (this.isThrown() && (audio || this.audio)) this.addThrowObject(0.5);
        else if (this.isThrown() && (!audio || !this.audio)) this.addThrowObject(0);
    }

    /**
     * Return true is Character is colliding from above
     * @returns 
     */
    isCharacterColidingAbove() {
        return this.character.speedY < 0;
    }

    /**
     * Hits character if not dead else sets GameOver Screen
     */
    hitCharacter() {
        if (!this.character.isDead()) this.characterDmg()
        else this.setGameOverScreen(this.IMAGE_LOSE);
    }

    /**
     * Hits the Character
     */
    characterDmg() {
        this.character.hit();
        this.statusbars[0].setPercentage(this.character.energy);
    }

    /**
     * Sets the Gameover Screen by adding image
     * @param {*} image 
     */
    setGameOverScreen(image) {
        this.clearAllIntervals();
        this.gameOverScreen.push(new GameOverScreen(this.character.x - this.character.width - 40,
            this.character.y - this.character.height + 65, image));
        document.getElementById('restartButton').classList.remove('d-none');
    }

    /**
     * Checks Collision between character and Endboss
     * Hits Character if wether character nor Endboss are dead
     * If Character is Dead sets GameOverScreen
     * @param {*} enemy 
     */
    checkCollisionEndboss(enemy) {
        if (!enemy.isDead() && !this.character.isDead()) this.hitCharacter();
        else if (!enemy.isDead() && this.character.isDead()) this.setGameOverScreen(this.IMAGE_LOSE);
    }

    /**
     * Checks Collision between character and chicken enemies
     * @param {*} enemy 
     */
    checkCollisionChicken(enemy) {
        if (this.isCharacterColidingAbove(enemy) && this.character.isAboveGround() && !enemy.isDead) this.setEnemyDead(enemy);
        else if (!enemy.isDead && !this.character.isDead()) this.hitCharacter();
    }

    /**
     * Checks alls Enemies collisions with character
     * @param {*} enemy 
     */
    checkEnemiesCollisions(enemy) {
        if (this.character.isColliding(enemy) && ((enemy instanceof Chicken) || (enemy instanceof MiniChicken))) this.checkCollisionChicken(enemy);
        if (this.character.isColliding(enemy) && (enemy instanceof Endboss)) this.checkCollisionEndboss(enemy);
    }

    /**
     * Checks the enemies collisions
     */
    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => this.checkEnemiesCollisions(enemy));
    }

    /**
     * Returns true if objectCount is smaller or equal to 10
     * @returns 
     */
    isSpaceInBar() {
        return this.statusbars[2].objectCount < 10;
    }

    /**
     * Add bottle to Statusbar when picked
     * @param {*} bottled 
     * @param {*} bottle 
     */
    addToStatusBar(bottled, bottle) {
        if (bottled > -1) this.bottles.splice(bottled, 1);
        bottle.AUDIO_PICK.play();
        this.statusbars[2].objectCount++;
        this.statusbars[2].setPercentage(this.statusbars[2].objectCount);
    }

    /**
     * Checks Bottle Collisions
     */
    checkCollisionBottles() {
        this.bottles.forEach((bottle) => this.collisionBottles(bottle));
    }

    /**
     * Adds the bottle to bottlebar
     * @param {*} bottle 
     */
    collisionBottles(bottle) {
        const activeBottle = bottle;
        const bottled = this.bottles.indexOf(activeBottle);
        if (this.character.isColliding(activeBottle) && this.isSpaceInBar()) this.addToStatusBar(bottled, bottle);
    }

    /**
     * Adds the Coins to Statusbar
     * @param {*} coined 
     * @param {*} coin 
     */
    addToCoinBar(coined, coin) {
        if (coined > -1) this.coins.splice(coined, 1);
        coin.AUDIO_PICK.play();
        this.statusbars[1].objectCount++;
        this.statusbars[1].setPercentage(this.statusbars[1].objectCount);
    }

    /**
     * Checks collision for each coin
     */
    checkCollisionCoins() {
        this.coins.forEach((coin) => this.collisionCoins(coin));
    }

    /**
     * Add Coin to CoinBar
     * @param {*} coin 
     */
    collisionCoins(coin) {
        const activeCoin = coin;
        let coined = this.coins.indexOf(activeCoin);
        if (this.character.isColliding(activeCoin)) this.addToCoinBar(coined, coin);
    }

    /**
     * When Colling set enemy of instance chicken to dead
     * after a timeout it will be removed
     * @param {*} tO 
     * @param {*} enmy 
     */
    checkToCollidingChicken(tO, enmy) {
        tO.collide = true;
        this.removeToAfterTimeOut(tO);
        this.tOActive = false;
        if ((enmy instanceof Chicken) || (enmy instanceof MiniChicken)) this.setEnemyDead(enmy);
    }

    /**
     * Removes tO after a Timeout
     * @param {*} tO 
     */
    removeToAfterTimeOut(tO) {
        setTimeout(() => this.removeTo(tO), 100);
    }

    /**
     * removes the tO
     * @param {*} tO 
     */
    removeTo(tO) {
        const indexThrow = this.throwableObjects.indexOf(tO);
        this.throwableObjects.splice(indexThrow, 1);
    }

    /**
     * Sets the enemy Dead and removes enemy after Timeout
     * @param {*} enemy 
     */
    setEnemyDead(enemy) {
        enemy.isDead = true;
        enemy.loadImage(enemy.IMAGES_DEAD[0]);
        enemy.AUDIO_DEATH.play();
        this.removeEnemyAfterTimeOut(enemy);
    }

    /**
     * removes Enemy after timeout of 100ms
     * @param {*} enemy 
     */
    removeEnemyAfterTimeOut(enemy) {
        setTimeout(() => {if (!(enemy instanceof Endboss)) this.removeEnemy(enemy)}, 100);
    }

    /**
     * removes the enemy
     * @param {*} enemy 
     */
    removeEnemy(enemy) {
        const index = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(index, 1);
    }
    /**
     * shows the GameOverScreen after Boss is dead with a TimeOut from 500ms
     * @param {*} enmy 
     */
    setEndbossDead() {
        setTimeout(() => this.setGameOverScreen(this.IMAGE_GAME_OVER), 500);
    }

    /**
     * Checks the throwObject collision whith endboss
     * When Endboss is not dead, he will hit else the Ensboss is set Dead
     * @param {*} tO 
     * @param {*} enmy 
     */
    checkToCollidingEndboss(tO, enmy) {
        tO.collide = true;
        this.removeToAfterTimeOut(tO);
        this.tOActive = false;
        if (!enmy.isDead()) enmy.hit();
        else this.setEndbossDead(enmy);
    }

    /**
     * Checks all throwObject collisions to enemies
     * seperates by chicken and endboss collision
     * @param {*} enmy 
     * @param {*} tO 
     */
    checkAllToCollisions(enmy, tO) {
        if (tO.isColliding(enmy) && ((enmy instanceof Chicken) || (enmy instanceof MiniChicken)) && !enmy.isDead) this.checkToCollidingChicken(tO, enmy);
        if (tO.isColliding(enmy) && (enmy instanceof Endboss)) this.checkToCollidingEndboss(tO, enmy);
    }


    /**
     * Checks the collsions of ThrowObject
     */
    checkCollisionTo() {
        this.throwableObjects.forEach((tO) => this.level.enemies.forEach((enmy) => this.checkAllToCollisions(enmy, tO)));
    }

    /**
     * Checks the Collisions
     */
    checkCollisions() {
        this.checkCollisionEnemies();
        this.checkCollisionBottles();
        this.checkCollisionCoins();
        this.checkCollisionTo();
    }

    
    drawStartScreen() {
        this.addToMap(this.START_SCREEN);

    }
    addBackGroundObjects() {
        this.addObjectsToMap(this.level.backGroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    addBars() {
        this.ctx.translate(-this.camera_x, 0);
        this.addObjectsToMap(this.statusbars);
        this.ctx.translate(this.camera_x, 0);
    }

    addPickables() {
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addLevelDesign();
        this.ctx.translate(-this.camera_x, 0);
        this.setSelfDraw();
    }

    addLevelDesign() {
        this.addBackGroundObjects();
        this.addObjectsToMap(this.level.enemies);
        this.addBars();
        this.addPickables();
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.gameOverScreen);
    }

    setSelfDraw() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (mo.otherDirection) this.flipImage(mo);
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) this.flipImageBack(mo);
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}