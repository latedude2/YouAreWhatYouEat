import { Wall } from './gameObjects/Wall';
import { Player } from './gameObjects/Player';
import { Enemy } from './gameObjects/Enemy';
import { Mob } from './gameObjects/Mob';

export class GameScene extends Phaser.Scene {
  sand: Phaser.Physics.Arcade.StaticGroup;
  info: Phaser.GameObjects.Text;
  world: Phaser.Physics.Arcade.World;
  arcadeConfig: Phaser.Types.Physics.Arcade.ArcadeWorldConfig;
  walls: any;
  enemies: any;

  player: Player;
  controls: any;

  constructor() {
    super({
      key: "GameScene"
    });
  }

  init(): void {
    this.controls = this.input.keyboard.addKeys("W, A, S, D,");
  }

  preload(): void {
    this.load.setBaseURL("dist/");
    this.load.image("wall", "assets/wall.png");
    this.load.image("transparent", "assets/transparent.png");
  }

  create(): void {
    this.enemies = this.add.group({ runChildUpdate: true });
    this.player = new Player(this, 100, 100, "wall");

    //this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, this.playerAndEnemyCollision, null, this);
  }

  update(): void {
    this.player.update();
    if (this.enemies.getLength() == 0) {
      this.spawnEnemies();
    }
  }

  //Use to randomize stat values. Value1 is base value, value2 is deviation from 0-1, e.g putting in 10 and .3 outputs a number between 8.5 and 11.5
  statRandomizer(value1: number, value2: number): number {
    return value1 * ((1 - (value2 / 2)) + Math.random() * value2);
  }

  spawnEnemies() {
    while (this.enemies.getLength() < 5) {
      this.enemies.add(new Enemy(this, Math.random() * 1000, Math.random() * 600, "wall"));
    }
  }

  playerAndEnemyCollision(player, enemy) {
    if(player.getTotalVelocity() >= 50) {
      var hitDamage = player.collisionDamage * player.getTotalVelocity() / player.maxSpeed
      enemy.takeDamage(hitDamage);
    }

    if(enemy.getTotalVelocity() >= 50) {
      var hitDamage = enemy.collisionDamage * enemy.getTotalVelocity() / enemy.maxSpeed
      player.takeDamage(hitDamage);
    }
  }

  destroyObject(object) {
    object.destroy();
  }


};