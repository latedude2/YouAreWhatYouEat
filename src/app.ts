import * as Phaser from 'phaser';
import { GameScene } from "./gameScene";
import { WelcomeScene } from "./welcomeScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  title: "Starfall",
  width: 800,
  height: 600,
  parent: "phaser-game",
  backgroundColor: "#18216D",
  scene: [WelcomeScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
};
export class AdaptionGame extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
window.onload = () => {
  var game = new AdaptionGame(config);
};