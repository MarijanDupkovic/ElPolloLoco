class MoveableObject extends DrawableObject {
    speed = 0.05;
    otherDirection = false;
    speedY = 0;
    accelaration = 1;
    energy = 100;
    lastHit = 0;
    indexX = 0;

    applyGravity() {
        world.intervals.push(setInterval(() => {if (this.isAboveGround() || this.speedY > 0) this.setGravity()}, 1000 / 35));
    }

    setGravity() {
        this.y -= this.speedY;
        this.speedY -= this.accelaration;
    }

    hit() {
        let hit = new Date().getTime();
        if (hit - this.lastHit > 250) this.doTheHit(hit);
    }

    doTheHit(hit) {
        this.energy -= 5;
        if (this.energy <= 0) this.energy = 0;
        else this.lastHit = hit;
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isColliding(obj) {
        return (this.x + this.width) - this.offset.right >= obj.x + obj.offset.left &&
            this.x + this.offset.left <= (obj.x + obj.width) - obj.offset.right &&
            (this.y + this.height) - this.offset.bottom >= obj.y + obj.offset.top &&
            (this.y + this.offset.top) <= (obj.y + obj.height) - obj.offset.bottom;
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) return true;
        else return this.y < 180;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }
    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }
}