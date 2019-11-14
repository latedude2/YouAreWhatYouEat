import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Mob } from './Mob';


export class Enemy extends Mob {
    targetPosX: number;
    targetPosY: number;

    constructor(scene: GameScene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey);
        
        this.sizeMultiplier = this.scene.statRandomizer(.5, .3);
        this.maxHealth = this.scene.statRandomizer(50, .3);
        this.acceleration = this.scene.statRandomizer(150, .3);
        this.maxSpeed = this.scene.statRandomizer(150, .3);
        this.rotationalSpeed = .8 * Math.PI;
        this.baseCollisionDamage = this.scene.statRandomizer(5, .3);
        this.collisionDamage = this.baseCollisionDamage;
        this.setTint(0xff8953);
        this.setValues();

    }

    update() {
        super.update();

        //Temp solution to set target values
        this.targetPosX = this.scene.player.x;
        this.targetPosY = this.scene.player.y;

        this.rotate();
        this.movement();
        this.death();
    }

    rotate() {
        var x = this.targetPosX - this.x;
        var y = this.targetPosY - this.y;
        var angleRad = Math.atan2(y, x);
        var angleDelta = Phaser.Math.Angle.Wrap(angleRad - this.rotation);
          
        if (angleDelta > 0) {
            this.setAngularVelocity(1 * this.rotationalSpeedDeg*.5);
        } else if (angleDelta < 0) {
            this.setAngularVelocity(-1 * this.rotationalSpeedDeg*.5);
        } else this.setAngularVelocity(0);
    }

    movement() {
        this.setAccelerationX(Math.cos(this.rotation) * this.acceleration);
        this.setAccelerationY(Math.sin(this.rotation) * this.acceleration);
    }

    death() {
        if(this.currentHealth <= 0) {
            this.scene.destroyObject(this.healthBarVisual);
            //this.scene.destroyObject(this.bodyVisual);
            this.scene.destroyObject(this);
        }
    }
}