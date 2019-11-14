import { Mob } from '../../gameObjects/Mob';
import { GeneralTrait } from '../GeneralTrait';


export class Pinball extends GeneralTrait{

    collisionMultiplier = 0.5;
    bounceMultiplier = 4;

    constructor(mob: Mob){
        super(mob);
    }

    update(){
        this.mob.collisionDamage = this.mob.baseCollisionDamage * this.collisionMultiplier;
        this.mob.setBounceX(this.mob.body.bounce.x * this.bounceMultiplier);
        this.mob.setBounceY(this.mob.body.bounce.y * this.bounceMultiplier);
    }

    resetProperties()
    {
        this.mob.collisionDamage = this.mob.baseCollisionDamage;
        this.mob.setBounceX(this.mob.baseBounce);
        this.mob.setBounceY(this.mob.baseBounce);
    }
}