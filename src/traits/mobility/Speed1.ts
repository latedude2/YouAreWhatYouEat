import { MobilityTrait } from '../MobilityTrait';
import { Mob } from '../../gameObjects/Mob';
import { Trait } from '../Trait';


export class Speed1 extends MobilityTrait{

    constructor(mob: Mob){
        super(mob);
    }

    update(){
        this.mob.maxSpeed = this.mob.originalMaxSpeed * 5;
        this.mob.acceleration =  this.mob.originalAcceleration * 5;
        console.log("Increased speed 5 times");
    }
}