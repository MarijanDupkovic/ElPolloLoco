class StatusBar extends DrawableObject {
    IMAGES = [];
    objectCount = 0;
    percentage = 100;

    constructor(){
        super();
        this.x = 0;
        this.y = 20;
        this.width = 200;
        this.height = 60;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }   

    resolveImageIndex() {
        if (this.objectCount == 0) {
            return 0;
        } else if (this.objectCount <= 2) {
            return 1;
        } else if (this.objectCount <= 4) {
            return 2;
        } else if (this.objectCount <= 6) {
            return 3;
        } else if (this.objectCount <= 8) {
            return 4;
        } else if (this.objectCount <= 10) {
            return 5;
        }
    }
}