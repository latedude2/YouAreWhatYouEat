import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';


export class Wall extends Phaser.Physics.Arcade.Sprite {
    scene: GameScene;

    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture);
        this.scene = scene;
        scene.sys.displayList.add(this);
        this.setOrigin(0, 0);
        scene.physics.world.enable(this, 1);
        this.setCircle(50);
    }
}