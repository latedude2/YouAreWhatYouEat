import { Trait } from './Trait';
import { Mob } from '../gameObjects/Mob';

export abstract class GeneralTrait extends Trait{

    constructor(mob: Mob){
        super(mob);

    }

    abstract update()
}