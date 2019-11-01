import { Wall } from './gameObjects/wall';
import { Player } from './gameObjects/Player';
import { Enemy } from './gameObjects/Enemy';
import { Mob } from './gameObjects/Mob';

export class GameScene extends Phaser.Scene {
  delta: number;
  lastStarTime: number;
  starsCaught: number;
  starsFallen: number;
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

  init(params): void {
    this.delta = 1000;
    this.lastStarTime = 0;
    this.starsCaught = 0;
    this.starsFallen = 0;
    this.controls = this.input.keyboard.addKeys("W, A, S, D,");
  }

  preload(): void {
    this.load.setBaseURL("dist/");
    this.load.image("wall", "assets/wall.png");
  }

  create(): void {
    this.enemies = this.add.group({ runChildUpdate: true });
    this.enemies.add(new Enemy(this, 300, 300, "wall"));
    this.player = new Player(this, 100, 100, "wall");

    this.physics.add.collider(this.player, this.enemies, this.playerAndEnemyCollision, null, this);
  }

  update(time: number): void {
    this.player.update();

  }

  playerAndEnemyCollision(player, enemy) {
    enemy.takeDamage(player.collisionDamage);
    player.takeDamage(enemy.collisionDamage);
  }
};