import { MobilityTrait } from '../MobilityTrait';
import { Mob } from '../../gameObjects/Mob';


export class Speed1 extends MobilityTrait{

    constructor(mob: Mob){
        super(mob);
    }

    update(){
        this.mob.maxSpeed = this.mob.baseMaxSpeed * 5;
        this.mob.acceleration =  this.mob.baseAcceleration * 5;
    }

    resetProperties()
    {
        this.mob.maxSpeed = this.mob.baseMaxSpeed;
        this.mob.acceleration = this.mob.baseAcceleration;
    }
}