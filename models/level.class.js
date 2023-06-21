class Level {

    enemies;
    clouds;
    backGroundObjects;
    level_end_x = 5000;

    constructor(enemies , clouds , backGroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backGroundObjects = backGroundObjects;
    }
}