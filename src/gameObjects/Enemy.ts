import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Mob } from './Mob';


export class Enemy extends Mob {

    constructor(scene: GameScene, x: number, y: number, spriteKey: string)
    {
        super(scene, x, y, spriteKey);

        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;
        this.damage = 5;
    }

    update() {
        super.update();
    }

    //movement() {
    //   
    //}
}