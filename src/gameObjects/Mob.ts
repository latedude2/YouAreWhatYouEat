import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Trait } from '../traits/Trait';

export class Mob extends Phaser.Physics.Arcade.Sprite{
    scene : GameScene;

    //Mob attributes
    sizeMultiplier: number = 1;
    traits: Trait[] = [];

    //Health
    maxHealth: number = 1;
    currentHealth: number;

    //Damage
    collisionDamage: number = 0;
    meleeDamage: number = 0;
    rangedDamage: number = 0;

    //Movement
    originalAcceleration = 100;
    acceleration: number = 100;
    originalMaxSpeed: number = 300;
    maxSpeed: number;
    rotationalSpeed: number = 1 * Math.PI;
    rotationalSpeedDeg: number;
    rotationalTolerance: number;
    drag: number = 50;

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
        this.setDrag(this.drag);
        this.setBounce(1);
        this.setCollideWorldBounds(false);

        this.healthBarVisual = this.scene.add.rectangle(this.x, this.y, 80, 10, 0x6cf9aa);
        this.setValues();
    }

    setValues() {
        this.rotationalSpeedDeg = Phaser.Math.RadToDeg(this.rotationalSpeed);
        this.rotationalTolerance = this.rotationalSpeed * .03;
        this.currentHealth = this.maxHealth;
        this.setScale(this.sizeMultiplier);
        this.maxSpeed = this.originalMaxSpeed;
        this.setMaxVelocity(this.maxSpeed);
    }

    update() {
        this.resetOriginalProperties();
        this.handleTraits();
        this.updateVisuals();
        this.limitSpeed();
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
    }

    limitSpeed()
    {
        if(Math.sqrt(this.body.velocity.x**2 + this.body.velocity.y**2) > this.maxSpeed)
        {
            let normalised  = this.body.velocity.normalize();
            let bod = this.body as unknown as Phaser.Physics.Arcade.Body;
            bod.setVelocityX(normalised.x * this.maxSpeed); 
            bod.setVelocityY(normalised.y * this.maxSpeed);
        }
    }

    resetOriginalProperties()
    {
        this.maxSpeed = this.originalMaxSpeed;
        this.originalAcceleration = this.originalAcceleration;
    }

    handleTraits(){
        for(let trait of this.traits)
        {
            console.log("Handling traits")
            trait.update();
        }
    }
}