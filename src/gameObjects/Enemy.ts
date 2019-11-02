import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Mob } from './Mob';


export class Enemy extends Mob {

    constructor(scene: GameScene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey);
        
        this.sizeMultiplier = this.scene.statRandomizer(.5, .3);
        this.maxHealth = this.scene.statRandomizer(50, .3);
        this.acceleration = this.scene.statRandomizer(150, .3);
        this.maxSpeed = this.scene.statRandomizer(150, .3);
        this.collisionDamage = this.scene.statRandomizer(5, .3);
        this.setTint(0xff8953);
        this.setValues();
    }

    update() {
        super.update();
        this.rotate();
        this.movement();
        this.death();
    }

    rotate() { //  !--make more natural rotation using angularAcceleration--!
        var x = this.scene.player.x - this.x;
        var y = this.scene.player.y - this.y;
        this.rotation = Math.atan2(y, x);
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