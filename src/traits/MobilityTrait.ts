import { Trait } from './Trait';
import { Mob } from '../gameObjects/Mob';

export abstract class MobilityTrait extends Trait{

    constructor(mob: Mob){
        super(mob);
    }

    abstract update()
}