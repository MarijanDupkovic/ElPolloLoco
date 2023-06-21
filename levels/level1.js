let level1;

function setEnemies(){
     return [
        new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(),
        new Chicken(), new Chicken(), new Chicken(),
        new MiniChicken(), new MiniChicken(), new MiniChicken(),
        new MiniChicken(), new MiniChicken(), new MiniChicken(),
        new MiniChicken(), new MiniChicken(), new MiniChicken(),
        new Endboss()
    ];
}

function setClouds(){
    return [new Cloud(), new Cloud()];
}

function setBackGrounds(){
   return [
        new BackGroundObject('./img/5_background/layers/air.png', -719),
        new BackGroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
        new BackGroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
        new BackGroundObject('./img/5_background/layers/1_first_layer/2.png', -719),
        new BackGroundObject('./img/5_background/layers/air.png', 0),
        new BackGroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
        new BackGroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
        new BackGroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
        new BackGroundObject('./img/5_background/layers/air.png', 719),
        new BackGroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
        new BackGroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
        new BackGroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
        new BackGroundObject('./img/5_background/layers/air.png', 1438),
        new BackGroundObject('./img/5_background/layers/3_third_layer/1.png', 1438),
        new BackGroundObject('./img/5_background/layers/2_second_layer/1.png', 1438),
        new BackGroundObject('./img/5_background/layers/1_first_layer/1.png', 1438),
        new BackGroundObject('./img/5_background/layers/air.png', 2157),
        new BackGroundObject('./img/5_background/layers/3_third_layer/2.png', 2157),
        new BackGroundObject('./img/5_background/layers/2_second_layer/2.png', 2157),
        new BackGroundObject('./img/5_background/layers/1_first_layer/2.png', 2157),
        new BackGroundObject('./img/5_background/layers/air.png', 2876),
        new BackGroundObject('./img/5_background/layers/3_third_layer/1.png', 2876),
        new BackGroundObject('./img/5_background/layers/2_second_layer/1.png', 2876),
        new BackGroundObject('./img/5_background/layers/1_first_layer/1.png', 2876),
        new BackGroundObject('./img/5_background/layers/air.png', 3595),
        new BackGroundObject('./img/5_background/layers/3_third_layer/2.png', 3595),
        new BackGroundObject('./img/5_background/layers/2_second_layer/2.png', 3595),
        new BackGroundObject('./img/5_background/layers/1_first_layer/2.png', 3595),
        new BackGroundObject('./img/5_background/layers/air.png', 4313),
        new BackGroundObject('./img/5_background/layers/3_third_layer/1.png', 4313),
        new BackGroundObject('./img/5_background/layers/2_second_layer/1.png', 4313),
        new BackGroundObject('./img/5_background/layers/1_first_layer/1.png', 4313),
        new BackGroundObject('./img/5_background/layers/air.png', 5032),
        new BackGroundObject('./img/5_background/layers/3_third_layer/2.png', 5032),
        new BackGroundObject('./img/5_background/layers/2_second_layer/2.png', 5032),
        new BackGroundObject('./img/5_background/layers/1_first_layer/2.png', 5032)
    ];
}

function startLevel1() {
    
    level1 = new Level(
         setEnemies(),
         setClouds(),
         setBackGrounds()
        );
}
