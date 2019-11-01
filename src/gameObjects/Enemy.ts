import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Mob } from './Mob';


export class Enemy extends Mob {

    constructor(scene: GameScene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey);
        
        this.sizeMultiplier = 1.5;
        this.maxHealth = 100;
        this.acceleration = 150;
        this.maxSpeed = 150;
        this.collisionDamage = 5;
        this.setValues();
    }

    update() {
        super.update();
        this.rotate();
        this.movement();
        this.death();
    }

    rotate() { //make more natural rotation using angularAcceleration
        var x = this.x - this.scene.player.x;
        var y = this.y - this.scene.player.y;
        this.rotation = Math.atan2(y, x);
    }

    movement() {
        this.setAccelerationX(Math.cos(this.rotation) * -this.acceleration);
        this.setAccelerationY(Math.sin(-this.rotation) * this.acceleration);
    }

    death() {
        if(this.currentHealth <= 0) {
            this.scene.destroyObject(this.healthBarVisual);
            this.scene.destroyObject(this.bodyVisual);
            this.scene.destroyObject(this);
        }
    }
}