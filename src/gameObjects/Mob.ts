import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Trait } from '../Trait';


export class Mob extends Phaser.Physics.Arcade.Sprite{
    scene : GameScene;
    trait: Trait;


    //Mob attributes
    sizeMultiplier: number = 1;
    maxHealth: number = 1;
    currentHealth: number;
    acceleration: number = 100;
    maxSpeed: number = 300;
    rotationalSpeed: number = 1 * Math.PI;
    rotationalSpeedDeg: number;
    rotationalTolerance: number;
    collisionDamage: number;
    meleeDamage: number;
    rangedDamage: number;

    //Mob visuals
    healthBarVisual: any;
    healthBarSize: number = 80;
    healthBarOffset: number = 50;
    bodyVisual: any;

    constructor(scene: GameScene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey);
        this.scene = scene;
        scene.sys.displayList.add(this);
        scene.physics.world.enable(this);
        this.setCircle(32);
        this.setOrigin(0.5, 0.5);
        this.setDrag(50);
        this.setBounce(1);
        this.setCollideWorldBounds(true);

        //this.bodyVisual = this.scene.add.circle(this.x, this.y, this.sizeMultiplier * 35, 0x6666ff);
        this.healthBarVisual = this.scene.add.rectangle(this.x, this.y, 80, 10, 0x6cf9aa);
        this.setValues();
    }

    setValues() {
        this.rotationalSpeedDeg = Phaser.Math.RadToDeg(this.rotationalSpeed);
        this.rotationalTolerance = this.rotationalSpeed * .03;
        this.currentHealth = this.maxHealth;
        this.setScale(this.sizeMultiplier);
        this.setMaxVelocity(this.maxSpeed);
        //this.bodyVisual.radius = this.sizeMultiplier * 35;
    }

    update() {
        this.updateVisuals();
    }

    takeDamage(damage: number) {
        if (this.currentHealth > 0) {
            this.currentHealth -= damage;
            if (this.currentHealth < 0) {
                this.currentHealth = 0;
            }
            this.healthBarVisual.width = (this.currentHealth / this.maxHealth) * this.healthBarSize;
        }
    }

    getTotalVelocity() {
        return Math.sqrt(this.body.velocity.x**2 + this.body.velocity.y**2);
    }

    updateVisuals() {
        this.healthBarVisual.x = this.x;
        this.healthBarVisual.y = this.y - (this.healthBarOffset * this.sizeMultiplier);
        /*this.bodyVisual.x = this.x;
        this.bodyVisual.y = this.y;*/
    }
}