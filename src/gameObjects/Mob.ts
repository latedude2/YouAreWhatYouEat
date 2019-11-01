import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';


export class Mob extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene;
    
    //Mob attributes
    maxHealth: number = 1;
    currentHealth: number;
    acceleration: number = 300;
    damage: number;

    //Mob visuals
    healthBarVisual: any;
    healthBarSize: number = 80;
    healthBarOffset: number = 100;
    bodyVisual: any;

    constructor(scene: GameScene, x: number, y: number, spriteKey: string)
    {
        super(scene, x, y, spriteKey);
        this.scene = scene;
        scene.sys.displayList.add(this);
        scene.physics.world.enable(this);
        this.setCircle(32);
        this.setOrigin(0.5, 0.5);
        this.setScale(2);
        this.setDrag(50);
        this.setMaxVelocity(300);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        
        this.healthBarVisual = this.scene.add.rectangle(this.x, this.y, 80, 10, 0x6cf9aa);
        this.bodyVisual = this.scene.add.circle(this.x, this.y, 80, 0x6666ff);
    }

    update() {
        this.healthBarVisual.x = this.x;
        this.healthBarVisual.y = this.y - 100;
        this.healthBarVisual.width = (this.currentHealth/this.maxHealth) * this.healthBarSize;
        this.bodyVisual.x = this.x;
        this.bodyVisual.y = this.y;
    }
}