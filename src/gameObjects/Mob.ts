import * as Phaser from 'phaser';
import { GameScene } from '../gameScene';
import { Trait } from '../Trait';


export class Mob extends Phaser.Physics.Arcade.Sprite{
    scene : GameScene;
    speed: number = 300;
    trait: Trait;
    HP: number = 100;


    constructor(scene: GameScene, x: number, y: number, spriteKey: string)
    {
        super(scene, x, y, spriteKey);
        this.scene = scene;
        scene.sys.displayList.add(this);
        scene.physics.world.enable(this);
        this.setCircle(32);
        this.setOrigin(0.5, 0.5);
        this.setScale(2);
        this.setDrag(50);
        this.setMaxVelocity(300);
        this.setBounce(1);
        this.setCollideWorldBounds(true);


        this.trait = new Trait(this, "doubleSpeed");
    }

    update()
    {
        this.trait.update();
    }
}