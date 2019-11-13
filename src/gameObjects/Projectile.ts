import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Mob } from './Mob';

export class Projectile extends Phaser.Physics.Arcade.Sprite{
    scene: GameScene;

    //Projectile attributes
    damage: number = 0;
    speed: number = 100;

    constructor(scene: GameScene, owner: Mob, spriteKey: string) {
        super(scene, owner.x, owner.y, spriteKey);
        this.scene = scene;
        scene.sys.displayList.add(this);
        scene.physics.world.enable(this);
        this.setCircle(32);
        this.setOrigin(0.5, 0.5);
        this.setDrag(50);
        this.setBounce(1);
        this.setCollideWorldBounds(true);
        this.rotation = owner.rotation;
        this.damage = owner.rangedDamage;
        console.log(this.damage);

    }

    update() {
        
    }

}