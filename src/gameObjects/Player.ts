import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Mob } from './Mob';


export class Player extends Mob {
    cursorKeys: any;

    constructor(scene: GameScene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey);

        this.sizeMultiplier = 2;
        this.maxHealth = 100;
        this.acceleration = 600;
        this.maxSpeed = 600;
        this.collisionDamage = 10;
        this.setValues();
    }

    update() {
        super.update();
        this.rotate();
        this.movement();
    }

    rotate() {
        this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.scene.input.mousePointer.x + this.scene.cameras.main.scrollX, this.scene.input.mousePointer.y + this.scene.cameras.main.scrollY);
    }

    movement() {
        if (this.scene.controls.S.isDown) {
            this.setAccelerationY(this.acceleration);
        }
        else if (this.scene.controls.W.isDown) {
            this.setAccelerationY(-this.acceleration);
        }
        else this.setAccelerationY(0);

        if (this.scene.controls.A.isDown) {
            this.setAccelerationX(-this.acceleration);
        }
        else if (this.scene.controls.D.isDown) {
            this.setAccelerationX(this.acceleration);
        }
        else this.setAccelerationX(0);
    }
}