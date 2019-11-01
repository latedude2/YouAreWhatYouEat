import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Mob } from './Mob';


export class Enemy extends Mob {

    constructor(scene: GameScene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey);

        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;
        this.acceleration = 150;
        this.collisionDamage = 5;
    }

    update() {
        super.update();
        this.movement();
        this.rotate();
    }

    rotate() {
        var x = this.x - this.scene.player.x;
        var y = this.y - this.scene.player.y;
        this.rotation = Math.atan2(y, x);
    }

    movement() {
        this.setAccelerationX(Math.cos(this.rotation) * -this.acceleration);
        this.setAccelerationY(Math.sin(-this.rotation) * this.acceleration);
    }
}