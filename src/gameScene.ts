import { Wall } from './gameObjects/wall';
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
  }

  create(): void {
    this.enemies = this.add.group({ runChildUpdate: true });
    this.player = new Player(this, 100, 100, "wall");

    //this.physics.add.collider(this.enemies, this.enemies);
    this.physics.add.collider(this.player, this.enemies, this.playerAndEnemyCollision, null, this);
  }

  update(): void {
    this.player.update();
    this.spawnEnemies();
  }

  spawnEnemies() {
    if (this.enemies.getLength() < 3) {
      this.enemies.add(new Enemy(this, Math.random() * 1000, Math.random() * 600, "wall"));
    }
  }

  playerAndEnemyCollision(player, enemy) {
    enemy.takeDamage(player.collisionDamage);
    player.takeDamage(enemy.collisionDamage);
  }

  destroyObject(object) {
    object.destroy();
  }

};