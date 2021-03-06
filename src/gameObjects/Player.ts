import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Mob } from './Mob';
import { Trait } from '../traits/Trait';
import { Speed1 } from '../traits/mobility/Speed1';
import { Pinball } from '../traits/general/Pinball';



export class Player extends Mob {
    cursorKeys: any;

    constructor(scene: GameScene, x: number, y: number, spriteKey: string) {
        super(scene, x, y, spriteKey);

        this.sizeMultiplier = 1.3;
        this.baseAcceleration = 600;
        this.maxHealth = 100;
        this.maxSpeed = 300;
        this.rotationalSpeed = 1 * Math.PI;
        this.baseCollisionDamage = 10;
        this.collisionDamage = this.baseCollisionDamage;
        this.rangedDamage = 10;
        this.setTint(0x8fff53);
        this.setValues();

        this.traits.push(new Speed1(this));
        this.traits.push(new Pinball(this))
    }

    update() {
        super.update();
        this.rotate();
        this.movement();
    }

    rotate() {
        var x = this.scene.input.mousePointer.x + this.scene.cameras.main.scrollX - this.x;
        var y = this.scene.input.mousePointer.y + this.scene.cameras.main.scrollY - this.y;
        var angleRad = Math.atan2(y, x);
        var angleDelta = Phaser.Math.Angle.Wrap(angleRad - this.rotation);
          
        if (Phaser.Math.Within(angleDelta, 0, this.rotationalTolerance)) {
            this.setAngularVelocity(0);
            this.rotation = angleRad;
        } else if (angleDelta > 0) {
            this.setAngularVelocity(1 * this.rotationalSpeedDeg);
        } else if (angleDelta < 0) {
            this.setAngularVelocity(-1 * this.rotationalSpeedDeg);
        } else this.setAngularVelocity(0);
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

    mouseClick() {
        this.scene.spawnFriendlyProjectile(this);
    }
}