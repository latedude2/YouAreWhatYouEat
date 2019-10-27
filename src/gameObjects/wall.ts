import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';


export class Wall extends Phaser.Physics.Arcade.Sprite {
    scene : GameScene;

    constructor(scene: GameScene, x: number, y: number)
    {
        super(scene, x, y, "wall");
        this.scene = scene;
        scene.sys.displayList.add(this);
        this.setScale(2);
        this.setOrigin(0,0);
    }

}